const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const uploadImage = require("../../utils/uploadImage");
const validation = require("../../middleware/validate");
const router = express.Router();
const User = require("../../models/user");

/**
 * @route   POST api/auth/register
 * @desc    Registers a new user.
 * @access  Public
 */

router.post("/register", validation.register, async (req, res) => {
    const { email, firstName, lastName, password } = req.body;
    try {
        const salt = await bcrypt.genSalt(10);
        if (!salt) throw Error("Failed to generate salt.");
        const hashedPassword = await bcrypt.hash(password, salt);
        if (!hashedPassword) throw Error("Failed to hash password.");

        const user = await User.create({ // Also saves the data; no need to do ".save()"
            email: email,
            firstName: firstName,
            lastName: lastName,
            password: hashedPassword,
            picture: req.file?.location
        });

        // todo: Implement refresh token to prevent users from randomly getting logged out from token expiration.

        const payload = {
            id: user._id,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            picture: req.file?.location || user.picture
        }

        const token = jwt.sign(
            payload, 
            process.env.JWT_SECRET, 
            {expiresIn: "1d" }
        );

        res.status(200).json({
            token: token,
            refresh_token: 0,
            success: true
        });
    } catch(error) {
        res.status(400).json({
            message: error.message,
            success: false
        })
    }
});

/**
 * @route   POST api/auth/login
 * @desc    Logins in an existing user.
 * @access  Public
 */
router.post("/login", async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ 
            message: "Please enter all required fields.",
            success: false
        });
    }

    try {
        const user = await User.findOne({ email });
        if (!user) throw Error("Email hasn't been registered.");

        const isValidPassword = await bcrypt.compare(password, user.password);
        if (!isValidPassword) throw Error("Invalid Credentitals");

        const payload = {
            id: user._id,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            picture: req.file?.location
        }

        const token = jwt.sign(payload, process.env.JWT_SECRET, {expiresIn: "1d"});
        if (!token) throw Error("Failed to sign a token.");

        res.status(200).json({
            token: token,
            refresh_token: 0,
            success: true
        })
    } catch(error) {
        res.status(400).json({
            message: error.message,
            success: false
        })
    }
})

module.exports = router;