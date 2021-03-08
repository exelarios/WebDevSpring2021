const User = require("../models/user");
const Item = require("../models/item");
const multer = require("multer")();

const anyMulter = multer.any();
async function register(req, res, next) {
    // Checks the database if the email already exist to prevent people from registering more than once.
    anyMulter(req, res, async () => {
        console.log(req.files);
        const email = req.body.email;
        console.log(email);
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({
                message: "Email already registered.",
                location: req.files[0].location,
                success: false
            });
        }
        next();
    })
}

async function postItem(req, res, next) {
    const {name, description, category, price} = req.body;
    if (!name || !description || !category || !price) {
        return res.status(400).json({
            message: "All fields are required.",
            success: false
        })
    }
    next();
}

async function uploadThumbnail(req, res, next) {
    try {
        const item = await Item.findById(req.params.id);
        if (item.seller == req.user.id) {
            next();
        } else {
            res.status(401).json({
                success: false,
                message: "Must be the seller to upload thumbnails to this item."
            });
        }
    } catch(error) {
        res.status(404).json({
            success: false,
            message: "Item doesn't exist in the database."
        })
    }
}

module.exports = {
    register,
    postItem,
    uploadThumbnail
}

