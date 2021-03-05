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
    price: {
        type: Number,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    thumbnail: {
        main: {
            type: Number,
            required: false,
            default: 0
        },
        images: {
            type: Array,
            required: false,
            default: [`${process.env.S3_URL}/defaults/profile.png`]
        }
    }
});

module.exports = mongoose.model("Item", itemSchema);