const jwt = require("jsonwebtoken");
const User = require("../models/user");

async function protectedRoute(req, res, next) {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        try {
            token = req.headers.authorization.split(" ")[1];
            const decodedJWT = jwt.verify(token, process.env.JWT_SECRET);

            // `.select() with a prefix of "-" removes password from the object`
            const user = await User.findById(decodedJWT.id).select("-password");
            req.user = {
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName,
                id: user._id,
                picture: user.picture
            }
            next();
        } catch(error) {
            res.status(401).json({
                message: "Failed to verify token."
            })
        }
    }

    if (!token) {
        return res.status(401).json({
            message: "Requires authorization token to access this route."
        })
    }
}

module.exports = protectedRoute