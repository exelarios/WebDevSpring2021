const express = require("express");
const router = express.Router();
const protected = require("../../middleware/auth");
const Item = require("../../models/Item");

/**
 * @route   GET api/auth/items
 * @desc    Fetch all items.
 * @access  Private
 */
router.get("/", protected, async (req, res) => {
    const itemsPerPage = 10;
    const page = Number(req.query.page) || 1;

    const keyword = req.query.keyword ? {
        name: {
            $regex: req.query.keyword,
            $options: "i",
        }
    }: {};

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
router.post("/add", protected, async(req, res) => {
    const {name, description, category, price} = req.body;

    if (!name || !description || !category || !price) {
        return res.status(400).json({
            message: "All fields are required.",
            success: false
        })
    }

    try {
        const item = await Item.create({
            name: name,
            description: description,
            category: category,
            price: price,
            seller: req.user.id
        })

        if (item) {
            res.status(200).json({
                item: {
                    name: name,
                    description: description,
                    category: category,
                    price: price,
                    seller: req.user.id
                },
                success: true
            })
        }
    } catch(error) {
        res.status(400).json({
           message: error.message,
           success: false
        })
    }

});

module.exports = router;