const Order = require('../models/Order');

// ADD ORDER

exports.addOrder = async (req, res) => {
    const newOrder = new Order(req.body);
    try {
        const newOrderDetails = await newOrder.save();
        res.status(200).json(newOrderDetails);
    }
    catch (err) {
        res.status(500).json(err)
    }
}

// UPDATE ORDER

exports.updateOrder = async (req, res) => {
    try {
        const updatedOrder = await Order.findByIdAndUpdate(req.params.id, {
            $set: req.body
        }, { new: true })
        res.status(200).json(updatedOrder);
    } catch (err) {
        res.status(500).json(err);
    }
}

// DELETE ORDER

exports.deleteOrder = async (req, res) => {
    try {
        await Order.findByIdAndDelete(req.params.id);
        res.status(200).json("Order has been sucessfully deleted")
    }
    catch (err) {
        res.status(500).json(err);
    }
}

// GET USER ORDERS

exports.getOrders = async (req, res) => {
    try {
        const ordersDetails = await Order.find({ userId: req.params.userId });
        res.status(200).json(ordersDetails);
    }
    catch (err) {
        res.status(500).json(err);
    }
}

// GET ALL ORDERS

exports.getAllOrders = async (req, res) => {
    try {
        const allOrders = await Order.find();
        res.status(200).json(allOrders);
    }
    catch (err) {
        res.status(500).json(err);
    }
}

// GET INCOME STATISTICS

exports.getOrdersIncomeStatistics = async (req, res) => {
    const productId = req.query.pid;
    const date = new Date();
    const lastMonth = new Date(date.setMonth(date.getMonth() - 1));
    const previousMonth = new Date(new Date().setMonth(lastMonth.getMonth() - 1));
    try {
        const income = await Order.aggregate([
            {
                $match: { createdAt: { $gte: previousMonth },
            ...(productId && {
                products : {$elemMatch :{productId}}
            }) }
            },
            {
                $project: {
                    month: { $month: "$createdAt" },
                    sales: "$amount"
                }
            }, {
                $group: {
                    _id: "$month",
                    total: { $sum: "$sales" }
                }
            }
        ])
        res.status(200).json(income)
    }
    catch (err) {
        res.status(500).json(err)
    }
}
