const express = require("express");
const router = express.Router();
const protected = require("../../middleware/auth");

router.get("/", protected, async (req, res) => {
    console.log(req.user);
    res.send({
        message: "lit"
    })
})

module.exports = router;