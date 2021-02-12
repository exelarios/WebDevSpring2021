const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema({
    seller: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
});

module.exports = mongoose.model("Item", itemSchema);