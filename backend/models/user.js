const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    picture: {
        type: String,
        require: false,
        default: `${process.env.S3_URL}/defaults/profile.png`
    },
    date: {
        type: Date,
        default: Date.now
    },
});

module.exports = mongoose.model("User", userSchema);