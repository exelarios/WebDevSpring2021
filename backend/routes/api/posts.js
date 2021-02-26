const express = require("express");
const router = express.Router();
const protected = require("../../middleware/auth");
const Post = require("../../models/Post");

/**
 * @route   GET api/auth/items/search
 * @desc    Fetch all items.
 * @access  Private
 */
router.get("/search", protected, async (req, res) => {
    const postsPerPage = 10;
    const page = Number(req.query.page) || 1;

    const keyword = req.query.keyword ? {
        name: {
            $regex: req.query.keyword,
            $options: "i",
        }
    }: {};

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
        })
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
        await Post.create({
            title: title,
            topic: topic,
            body: body,
            postBy: req.user.id
        })

        res.status(200).json({
            post: {
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

module.exports = router;