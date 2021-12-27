const jwt = require('jsonwebtoken');

exports.verifyToken = (req, res, next) => {
    const authentHeader = req.headers.token;
    if (authentHeader) {
        const token = authentHeader.split(" ")[1];
        jwt.verify(token, process.env.JWT_KEY, (err, user) => {
            if (err) res.status(403).json("Token is not valid!");
            req.user = user;
            next();
        })
    } else {
        return res.status(401).json("You are not authenticated!");
    }

}

exports.verifyTokenAndAuthorization = (req, res, next) => {
    this.verifyToken(req, res, () => {
        if (req.user._id === req.params.id || req.user.isAdmin) {
            next();
        } else {
            res.status(403).json("You are not allowed to do that")
        }
    })
}

exports.verifyTokenAndAdmin = (req, res, next) => {
    this.verifyToken(req, res, () => {
        if (req.user.isAdmin) {
            next();
        } else {
            res.status(403).json("You are not allowed to do that")
        }
    })
}