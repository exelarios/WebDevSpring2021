const express = require("express");
const router = express.Router();
const protected = require("../../middleware/auth");

const User = require("../../models/user");

router.get("/", protected, async (req, res) => {
    const users = await User.find({});
    res.json(users);
});

router.get("/", protected, async (req, res) => {
    res.send({
        message: "lit",
        success: true
    })
})

module.exports = router;