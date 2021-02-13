const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const router = express.Router();

const User = require("../../models/user");

const protected = async (req, res, next) => {
    console.log("yeeeeeeeeee");
    next();
}

/**
 * @route   POST api/auth/register
 * @desc    Registers a new user.
 * @access  Public
 */
router.post("/register", protected, async (req, res) => {
    // Deconstructing the request body.
    const { email, firstName, lastName, password } = req.body;

    // Checks the database if the email already exist to prevent people from registering more than once.
    const userExists = await User.findOne({ email });
    if (userExists) {
        return res.status(400).json({
            message: "Email already registered."
        });
    }

    try {
        const salt = await bcrypt.genSalt(10);
        if (!salt) throw Error("Failed to generate salt.");

        const hash = await bcrypt.hash(password, salt);
        if (!hash) throw Error("Failed to hash password.");

        const user = await User.create({ // Also saves the data; no need to do ".save()"
            email: email,
            firstName: firstName,
            lastName: lastName,
            password: hash
        });

        const token = jwt.sign(
            { id: user._id}, 
            process.env.JWT_SECRET, 
            {expiresIn: "1d" }
        );

        res.status(200).json({
            token: token,
            user: {
                id: user._id,
                firstName: user.firstName,
                lastName: user.lastName,
            }
        });
    } catch(error) {
        res.status(400).json({
            message: error.message
        })
    }

})

/**
 * @route   POST api/auth/login
 * @desc    Logins in an existing user.
 * @access  Public
 */
router.post("/login", async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ 
            message: "Please enter all required fields."
        })
    }

    try {
        const user = await User.findOne({ email });
        if (!user) throw Error("Email hasn't been registered.");

        const isValidPassword = await bcrypt.compare(password, user.password);
        if (!isValidPassword) throw Error("Invalid Credentitals");

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {expiresIn: "1d"});
        if (!token) throw Error("Failed to sign a token.");

        res.status(200).json({
            token: token,
            user: {
                id: user._id,
                firstName: user.firstName,
                lastName: user.lastName
            }
        })
    } catch(error) {
        res.status(400).json({
            message: error.message
        })
    }
})

module.exports = router;