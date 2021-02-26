const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    topic: {
        type: String,
        required: true,
    },
    body: {
        type: String,
        required: true,
    },
    postBy: {
        type: String,
        required: true,
    },
});

module.exports = mongoose.model("Post", postSchema);
