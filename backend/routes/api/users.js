const express = require("express");
const router = express.Router();
const protectedRoute = require("../../middleware/auth");

const User = require("../../models/user");

router.get("/", protectedRoute, async (req, res) => {
    res.send({
        message: "lit"
    })
})

module.exports = router;