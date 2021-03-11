const express = require("express");
const router = express.Router();
const protected = require("../../middleware/auth");
const Post = require("../../models/post");
const User = require("../../models/user");

/**
 * @route   GET api/auth/items/search
 * @desc    Fetch all items.
 * @access  Private
 */
router.get("/search", protected, async (req, res) => {
    const postsPerPage = 15;
    const page = Number(req.query.page) || 1;

    // const keyword = req.query.keyword ? {
    //     title: {
    //         $regex: req.query.keyword,
    //         $options: "i",
    //     }
    // }: {};

    let keyword = {};
    if (req.query.title) {
        keyword = {
            title: {
                $regex: req.query.title,
                $options: "i",
            }
        }
    } else if (req.query.topic) {
        keyword = {
            category: {
                $regex: req.query.topic,
                $options: "i",
            }
        }
    } else {
        keyword = {};
    }

    try {
        const count = await Post.countDocuments({ ...keyword });
        const posts = await Post.find({ ...keyword })
            .limit(postsPerPage)
            .skip(postsPerPage * (page -1));

        res.json({
            posts: posts,
            success: true,
            page: page,
            pages: Math.ceil(count / postsPerPage)
        });
    } catch(error) {
        console.log(error);
        res.status(400).json({
            message: "Failed to fetch items.",
            success: false
        });
    }
});

/**
 * @route   POST api/auth/items/add
 * @desc    Create a new item.
 * @access  Private
 */
router.post("/add", protected, async(req, res) => {
    const {title, topic, body } = req.body;

    if (!title || !topic || !body) {
        return res.status(400).json({
            message: "All fields are required.",
            success: false
        })
    }

    try {
        const post = await Post.create({
            title: title,
            topic: topic,
            body: body,
            postBy: req.user.id
        })

        res.status(200).json({
            post: {
                id: post._id,
                title: title,
                topic: topic,
                body: body,
                postBy: req.user.id
            },
            success: true
        })
    } catch(error) {
        res.status(400).json({
           message: error.message,
           success: false
        })
    }

});

/**
 * @route   GET api/post/{postId}
 * @desc    Fetch an individual post
 * @access  Private
 */
router.get("/:id", protected, async (req, res) => {
    const post = await Post.findById(req.params.id);
    if (post) {
        res.json({
            title: post.title,
            topic: post.topic,
            body: post.body,
            postBy: post.postBy
        });
    } else {
        res.status(404).json({
            message: "Post doesn't exist in the database.",
            success: false
        });
    }
});

/**
 * @route   DELETE api/posts/{itemId}
 * @desc    delete an individual post
 * @access  Private
 */
router.delete("/:id", protected, async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        const post = await Post.findById(req.params.id);
        if (post) {
            if (post.postBy === user.id) {
                await post.remove();
                return res.json({
                    message: "Post has been sucessfully deleted.",
                    success: true
                });
            } else {
                return res.status(401).json({
                    message: "You must be the poster in order to delete this item.",
                    success: false
                });
            }
        }
    } catch(error) {
        res.status(404).json({
            message: "Post doesn't exist in the database.",
            success: false
        });
    }
});

/**
 * @route   PUT api/posts/{itemId}
 * @desc    updates the indivudal post
 * @access  private
 */
router.put("/:id", protected, async (req, res) => {
    const user = await User.findById(req.user.id);
    const post = await Post.findById(req.params.id);
    if (post) {
        if (post.seller === user.id) {
            await post.remove();
            return res.json({
                message: "Post has been sucessfully deleted.",
                success: true
            });
        } else {
            return res.status(401).json({
                message: "You must be the poster in order to delete this item.",
                success: false
            });
        }
    }
    res.status(404).json({
        message: "Post doesn't exist in the database.",
        success: false
    });
});

module.exports = router;