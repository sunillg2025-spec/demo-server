const jwt = require("jsonwebtoken");

const authenticateUser = async (req, res, next) => {

    const token = req.header('Authorization');

    if (!token) {
        return res.status(401).json({ message: "Access denied! No token provided" });
    }

    try {
        const decoded = jwt.verify(token.split(" ")[1], 'abcdef');
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(401).json({ message: "Invalid token" });
    }
}

module.exports = authenticateUser;