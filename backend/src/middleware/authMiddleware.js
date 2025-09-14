const jwt = require("jsonwebtoken");
const TokenBlacklist = require("../models/TokenBlackList");

const authMiddleware = async (req, res, next) => {
  const token = req.header("Authorization")?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "No token provided" });

  try {
    const blacklisted = await TokenBlacklist.findOne({ where: { token } });
    if (blacklisted) {
      return res.status(401).json({ message: "Token is no longer valid" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch {
    res.status(401).json({ message: "Invalid token" });
  }
};

module.exports = authMiddleware;
