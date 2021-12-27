const user = require('../models/User');


// UPDATE USER DETAILS BY USER OR ADMIN

exports.updatedUser = async (req, res) => {
    if (req.body.password) {
        req.body.password = CryptoJS.AES.encrypt(req.body.password, process.env.PASSWORD_SEC).toString();
    }
    try {
        const updatedUser = await user.findByIdAndUpdate(req.params.id, {
            $set: req.body
        }, { new: true })
        res.status(200).json(updatedUser);
    } catch (err) {
        res.status(500).json(err);
    }
}

// DELETE USER BY USER OR ADMIN

exports.deleteUser = async (req, res) => {
    try {
        await user.findByIdAndDelete(req.params.id);
        res.status(200).json("User has been sucessfully deleted")
    }
    catch (err) {
        res.status(500).json(err);
    }
}

// GET USER DETAILS

exports.getUser = async (req, res) => {
    try {
        const userDetails = await user.findById(req.params.id);
        const { password, ...others } = userDetails._doc;
        res.status(200).json(others);
    }
    catch (err) {
        res.status(500).json(err);
    }
}

// GET ALL USER DETAILS OR TOP 5 USERS

exports.getUsers = async (req, res) => {
    const query = req.query.new;
    try {
        const usersDetails = query ? await user.find().sort({ _id: -1 }).limit(5) : await user.find();
        res.status(200).json(usersDetails);
    }
    catch (err) {
        res.status(500).json(err);
    }
}

// GET USERS STATISTICS

exports.getUserStatistics = async (req, res) => {
    const date = new Date();
    const lastYear = new Date(date.setFullYear(date.getFullYear() - 1));
    try {
        const usersData = await user.aggregate([
            {
                $match: {
                    createdAt: { $gte: lastYear } }
            },
            {
                $project: { 
                    month : { $month: "$createdAt" } }
            },
            {
                $group: {_id: "$month",total: { $sum: 1 }}
            }
        ]);
        res.status(200).json(usersData);
    }
    catch (err) {
        res.status(500).json(err);
    }
}