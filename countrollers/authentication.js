const user = require('../models/User');
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");

exports.userRegister = (req, res) => {
    const { username, email, firstname, lastname,} = req.body;
    const newUserDetails = new user({
        username,
        email,
        firstname,
        lastname,
        password: CryptoJS.AES.encrypt(req.body.password, process.env.PASSWORD_SEC).toString()
    })
    newUserDetails.save().then(response => {
        res.status(200).json({
            message: "User Registered successfully",
            user: response
        })
    })
        .catch(err => {
            res.status(500).json({ error: err })
        })
}


exports.userLogin = (req, res) => {
    const { username } = req.body;
    user.findOne({
        username
    }).then(response => {
        !response && res.status(401).json("Wrong Username or No User Found");
        const HassedPassword = CryptoJS.AES.decrypt(response.password, process.env.PASSWORD_SEC);
        const userPassword = HassedPassword.toString(CryptoJS.enc.Utf8);
        const { password, ...others } = response._doc;
        const acessToken = jwt.sign(
            {
                id: response._id,
                isAdmin: response.isAdmin
            }, process.env.JWT_KEY,
            { expiresIn: "3d" }
        )
        if (req.body.password === userPassword) {
            res.status(200).json({
                message: "User Validated Successfully",
                isAuthenticated: true,
                user: { ...others, acessToken }
            })
        } else {
            res.status(401).json({
                message: "Wrong Password Please check once",
                isAuthenticated: false
            })
        }
    }).catch(err => {
        res.status(500).json({ error: err })
    })
}
