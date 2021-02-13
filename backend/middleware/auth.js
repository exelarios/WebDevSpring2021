const jwt = require("jsonwebtoken");
const User = require("../models/user");

async function protectedRoute(req, res, next) {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        try {
            token = req.headers.authorization.split(" ")[1];
            const decodedJWT = jwt.verify(token, process.env.JWT_SECRET);
            req.user = await User.findById(decodedJWT.id).select("-password");
            next();
        } catch(error) {
            console.error(error);
            res.stats(401);
            throw new Error("Not authorized, token failed");
        }
    }

    if (!token) {
        res.stats(401);
        throw new Error("Not Authorized, no token");
    }
}

module.exports = protectedRoute