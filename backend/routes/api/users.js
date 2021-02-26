const express = require("express");
const router = express.Router();
const protected = require("../../middleware/auth");

const User = require("../../models/user");

/**
 * @route   GET api/users
 * @desc    Fetches all existing users.
 * @access  Private
 */
router.get("/search", protected, async (req, res) => {
    const usersPerPage = 10;
    const page = Number(req.query.page) || 1;

    const keyword = req.query.keyword ? {
        name: {
            $regex: req.query.keyword,
            $options: "i",
        }
    }: {};

    try {
        const count = await User.countDocuments({ ...keyword });
        const users = await User.find({ ...keyword })
            .limit(usersPerPage)
            .skip(usersPerPage * (page -1));

        res.json({
            users: users,
            success: true,
            page: page,
            pages: Math.ceil(count / itemsPerPage)
        })
    } catch(error) {
        console.log(error);
        res.status(400).json({
            message: "Failed to fetch users.",
            success: false
        });
    }
});

/**
 * @route   GET api/users/{userId}
 * @desc    Fetch an individual user.
 * @access  Private
 */
router.get("/:id", protected, async (req, res) => {
    const user = await User.findById(req.params.id);
    if (user) {
        res.json({
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName
        });
    } else {
        res.status(404).json({
            message: "User doesn't exist in the database.",
            success: false
        });
    }
});

/**
 * @route   GET api/users/{userId}/update
 * @desc    updates an indivdual's profile.
 * @access  Private
 */
router.get(":id/profile/update", protected, async (req, res) => {
    res.send({
        message: "lit",
        success: true
    })
});

/**
 * @route   DELETE api/users/{userId}
 * @desc    removes the user's account.
 * @access  Private
 */
router.delete("/:id", protected, async (req, res) => {
    const user = await User.findById(req.params.id);
    if (user) {
        await user.remove();
        res.json({
            message: "User has been sucessfully deleted.",
            success: true
        });
    } else {
        res.status(404).json({
            message: "User doesn't exist in the database.",
            success: false
        });
    }
});

module.exports = router;