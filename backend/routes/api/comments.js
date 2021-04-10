const express = require("express");
const router = express.Router();
const protected = require("../../middleware/auth");
const Comment = require("../../models/comment");
const User = require("../../models/user");

/**
 * @route   GET api/comments/{commentId}
 * @desc    Fetch an comment.
 * @access  Private
 */
router.get("/:commentId", protected, async (req, res) => {
    try {
        const comment = await Comment.findById(req.params.commentId);
        if (!comment) throw Error("Failed to find comment.");
        res.json({
            success: true,
            comment: {
                body: comment.body,
                postId: comment.postId,
                id: comment._id
            }
        })
    } catch(error) {
        res.status(404).json({
            message: error.message,
            success: false
        });
    }
});

/**
 * @route   POST api/comments/{postId}/add
 * @desc    Add an comment to a item.
 * @access  Private
 */
router.post("/:postId/add", protected, async (req, res) => {
    try {
        const comment = await Comment.create({
            body: req.body.body,
            postBy: req.user.id,
            itemId: req.params.postId
        });

        res.status(200).json({
            comment: {
                body: comment.body,
                postBy: comment.postBy,
                id: comment._id,
                date: comment.date
            },
            success: true
        })
    } catch(error) {
        res.status(400).json({
            message: error.message,
            success: false
        });
    }
});

/**
 * @route   PUT api/comments/{commentId}
 * @desc    Updates a comment.
 * @access  Private
 */
router.put("/:commentId", protected, async (req, res) => {
    const { body } = req.body;
    try {
        const user = await User.findById(req.user.id);
        if (!user) throw Error("Failed to find user.");
        const comment = await Comment.findById(req.params.commentId);
        if (!comment) throw Error("Failed to find comment.");
        if (user.id == comment.postBy) {
            comment.body = body;
            comment.save();
            res.status(200).json({
                comment: {
                    body: comment.body,
                    postBy: comment.postBy,
                    id: comment._id
                },
                success: true
            });
        } else {
            throw Error("You must be the owner of the post to update it.");
        }
    } catch(error) {
        res.status(400).json({
            message: error.message,
            success: false
        });
    }
});

/**
 * @route   DELETE api/comments/{commentId}
 * @desc    delete the user's comment.
 * @access  Private
 */
router.delete("/:commentId", protected, async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        if (!user) throw Error("Failed to find user.");
        const comment = await Comment.findById(req.params.commentId);
        if (!comment) throw Error("Failed to find comment.");
        if (comment.postBy == user.id) {
            await comment.remove();
            res.send({
                success: true,
                message: "Item has been sucessfully deleted."
            });
        } else {
            throw Error("Must be the poster in order to delete this comment.");
        }
    } catch(error) {
        res.status(404).send({
            message: error.message,
            success: false
        });
    }
});

module.exports = router;