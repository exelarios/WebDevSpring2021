const express = require("express");
const router = express.Router();
const uploadImage = require("../../utils/uploadImage");
const protected = require("../../middleware/auth");
const Item = require("../../models/item");
const User = require("../../models/user");
const uploadImage = require("../../utils/uploadImage");
const validation = require("../../middleware/validate");
/**
 * @route   GET api/auth/items/search
 * @desc    Fetch all items.
 * @access  Private
 */
router.get("/search", protected, async (req, res) => {
    const itemsPerPage = 10;
    const page = Number(req.query.page) || 1;

    // const keyword = req.query.keyword ? {
    //     name: {
    //         $regex: req.query.keyword,
    //         $options: "i",
    //     }
    // }: {};

    let keyword = {};
    if (req.query.name) {
        keyword = {
            name: {
                $regex: req.query.name,
                $options: "i",
            }
        }
    } else if (req.query.category) {
        keyword = {
            category: {
                $regex: req.query.category,
                $options: "i",
            }
        }
    } else {
        keyword = {};
    }

    try {
        const count = await Item.countDocuments({ ...keyword });
        const items = await Item.find({ ...keyword })
            .limit(itemsPerPage)
            .skip(itemsPerPage * (page -1));

        res.json({
            items: items,
            success: true,
            page: page,
            pages: Math.ceil(count / itemsPerPage)
        })
    } catch(error) {
        console.log(error);
        res.status(400).json({
            message: "Failed to fetch items.",
            success: false
        });
    }
});

/**
 * @route   POST api/auth/items/add
 * @desc    Create a new item.
 * @access  Private
 */
router.post("/add", [protected, validation.postItem], async(req, res) => {
    const {name, description, category, price} = req.body;
    try {
        const item = await Item.create({
            name: name,
            description: description,
            category: category,
            price: price,
            seller: req.user.id
        });

        res.status(200).json({
            item: {
                id: item._id,
                name: name,
                description: description,
                category: category,
                price: price,
                seller: req.user.id
            },
            success: true
        });
    } catch(error) {
        res.status(400).json({
           message: error.message,
           success: false
        })
    }
});

/**
 * @route   GET api/items/{itemId}
 * @desc    Fetch an individual item
 * @access  Private
 */
router.get("/:id", protected, async (req, res) => {
    const item = await Item.findById(req.params.id);
    if (item) {
        res.json({
            name: item.name,
            description: item.description,
            category: item.category,
            price: item.price,
            seller: item.seller
        });
    } else {
        res.status(404).json({
            message: "Item doesn't exist in the database.",
            success: false
        });
    }
});

/**
 * @route   DELETE api/items/{itemId}
 * @desc    delete an individual item
 * @access  Private
 */
router.delete("/:id", protected, async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        const item = await Item.findById(req.params.id);
        if (item) {
            if (item.seller === user.id) {
                await item.remove();
                return res.json({
                    message: "Item has been sucessfully deleted.",
                    success: true
                });
            } else {
                return res.status(401).json({
                    message: "You must be the seller in order to delete this item.",
                    success: false
                });
            }
        }
    } catch(error) {
        res.status(404).json({
            message: "Item doesn't exist in the database.",
            success: false
        });
    }
});

const multiUpload = uploadImage.array("images", 5);
router.put("/:id/upload", [protected, validation.uploadThumbnail], async (req, res) => {
    multiUpload(req, res, async function(error) {
        if (error) {
            return res.json({
                success: false,
                errors: {
                    title: "Image Upload Error",
                    detail: error.message,
                    error: error,
                },
            });
        }

        try {
            let thumbnails = [];
            const files = req.files;
            let item = await Item.findById(req.params.id);
            if (item) {
                files.forEach(file => {
                    thumbnails.push(file.location);
                });
                item.thumbnail.images = thumbnails;
                item.save();
                res.json({
                    success: true,
                    item: item
                })
            }
        } catch(error) {
            res.status(404).json({
                message: "Item doesn't exist in the database.",
                success: false
            })
        }
    });
})

module.exports = router;