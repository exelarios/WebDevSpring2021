const express = require("express");
const router = express.Router();
const protected = require("../../middleware/auth");

const User = require("../../models/user");

router.get("/", protected, async (req, res) => {
    res.send({
        message: "lit"
    })
})

module.exports = router;