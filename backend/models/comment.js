const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
    body: {
        type: String,
        required: true,
    },
    postBy: {
        type: String,
        required: true,
    },
    itemId: {
        type: String,
        required: true,
    }
});

module.exports = mongoose.model("Comment", commentSchema);