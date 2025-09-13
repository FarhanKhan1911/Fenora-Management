const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const authMiddleware = require("../middleware/authMiddleware");
const userType = require("../constants/type");
const TokenBlacklist = require("../models/TokenBlackList");

const router = express.Router();
const SALT_ROUNDS = parseInt(process.env.BCRYPT_SALT_ROUNDS || "10", 10);

router.post("/register", async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    if (![userType.BuyerUser, userType.SellerUser].includes(role)) {
      return res.status(400).json({ message: "Invalid role" });
    }

    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) return res.status(400).json({ message: "Email already exists" });

    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

    const newUser = await User.create({ name, email, password: hashedPassword, role });

    res.status(201).json({ message: "User registered successfully", id: newUser.id });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password, role } = req.body;

    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(404).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    if (user.role !== role) {
      return res.status(403).json({ message: "Incorrect role" });
    }

    const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res.json({ token });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post("/logout", authMiddleware, async (req, res) => {
  try {
    const token = req.header("Authorization")?.split(" ")[1];
    if (!token) {
      return res.status(400).json({ message: "No token provided" });
    }
    const decoded = jwt.decode(token);
    if (!decoded || !decoded.exp) {
      return res.status(400).json({ message: "Invalid token" });
    }

    const expiresAt = new Date(decoded.exp * 1000);

    await TokenBlacklist.create({ token, expiresAt });

    res.json({ message: "Logged out successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

setInterval(async () => {
  try {
    await TokenBlacklist.destroy({
      where: {
        expiresAt: { [require("sequelize").Op.lt]: new Date() },
      },
    });
    console.log("Expired tokens cleaned");
  } catch (err) {
    console.error("Token cleanup error:", err);
  }
}, 24 * 60 * 60 * 1000);

module.exports = router;
