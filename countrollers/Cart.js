const Cart = require('../models/Cart');

// ADD CART

exports.addCart = async (req, res) => {
    const newCart = new Cart(req.body);
    try {
        const cart = await newCart.save();
        res.status(200).json(cart);
    }
    catch (err) {
        res.status(500).json(err)
    }
}

// UPDATE CART

exports.updateCart = async (req, res) => {
    try {
        const updatedCart = await Cart.findByIdAndUpdate(req.params.id, {
            $set: req.body
        }, { new: true })
        res.status(200).json(updatedCart);
    } catch (err) {
        res.status(500).json(err);
    }
}

// DELETE CART

exports.deleteCart = async (req, res) => {
    try {
        await Cart.findByIdAndDelete(req.params.id);
        res.status(200).json("Product has been sucessfully deleted")
    }
    catch (err) {
        res.status(500).json(err);
    }
}

// GET CART DETAILS

exports.getCart = async (req, res) => {
    try {
        const cartDetails = await Cart.findOne({ userId: req.params.userID });
        res.status(200).json(cartDetails);
    }
    catch (err) {
        res.status(500).json(err);
    }
}

// GET ALL CARTS

exports.getAllCarts = async (req, res) => {
    try {
        const allCarts = await Cart.find();
        res.status(200).json(allCarts);
    }
    catch (err) {
        res.status(500).json(err);
    }
}

