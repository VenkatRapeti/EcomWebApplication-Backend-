const product = require('../models/Product');

// ADD PRODUCT

exports.addProduct = async (req, res) => {
    const newProduct = new product(req.body);
    try {
        const product = await newProduct.save();
        res.status(200).json(product);
    }
    catch (err) {
        res.status(500).json(err)
    }
}

// UPDATE PRODUCT

exports.updateProduct = async (req, res) => {
    try {
        const updatedProduct = await product.findByIdAndUpdate(req.params.id, {
            $set: req.body
        }, { new: true })
        res.status(200).json(updatedProduct);
    } catch (err) {
        res.status(500).json(err);
    }
}

// DELETE PRODUCT

exports.deleteProduct = async (req, res) => {
    try {
        await product.findByIdAndDelete(req.params.id);
        res.status(200).json("Product has been sucessfully deleted")
    }
    catch (err) {
        res.status(500).json(err);
    }
}

// GET PRODUCT DETAILS

exports.getProduct = async (req, res) => {
    try {
        const productDetails = await product.findById(req.params.id);
        res.status(200).json(productDetails);
    }
    catch (err) {
        res.status(500).json(err);
    }
}

// GET ALL PRODUCT DETAILS OR BY CATEGORIES OR TOP 5 NEW PRODUCTS

exports.getAllProducts = async (req, res) => {
    const qNew = req.query.new;
    const qCategory = req.query.category;
    try {
        let products;
        if (qNew) {
            products = await product.find().sort({ createdAt: -1 }).limit(5);
        }
        else if (qCategory) {
            products = await product.find({
                categories: {
                    $in: [qCategory]
                }
            })
        } else {
            products = await product.find();
        }
        res.status(200).json(products);
    }
    catch (err) {
        res.status(500).json(err);
    }
}

