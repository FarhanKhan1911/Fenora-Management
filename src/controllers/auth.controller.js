const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const User = require("../models/User");
const TokenBlacklist = require("../models/TokenBlackList");
const userType = require("../constants/type");
const { postsWithMediaPath } = require("../utils/media");
const { ignoreAttributes } = require("../utils/validator");
const { resetPasswordUrl } = require("../utils/apiContants");

const SALT_ROUNDS = parseInt(process.env.BCRYPT_SALT_ROUNDS || "10", 10);

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const userRegister = async (req, res) => {
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
};

const userLogin = async (req, res) => {
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
      expiresIn: "6h",
    });
    res.json({ token });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const forgetPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const oldUser = await User.findOne({ where: { email } });
    if (!oldUser) return res.status(404).json({ message: "User not found" });
    const secret = process.env.JWT_SECRET + oldUser.password;
    const token = jwt.sign({ id: oldUser.id, email: oldUser.email }, secret, { expiresIn: "5m" });
    const encodedToken = encodeURIComponent(token);
    const resetPasswordURL = resetPasswordUrl(oldUser.id, encodedToken);
    const mailOptions = {
      to: email,
      subject: "Password Reset",
      text: `You requested a password reset. Please use the following link to reset your password: ${resetPasswordURL}`,
    };
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: "Password reset email sent" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const resetPassword = async (req, res) => {
  const { id, token } = req.params;
  try {
    const { newPassword } = req.body;
    const oldUser = await User.findOne({ where: { id } });
    if (!oldUser) return res.status(404).json({ message: "User not found" });
    const secret = process.env.JWT_SECRET + oldUser.password;
    decodedToken = decodeURIComponent(token);
    let verify;
    try {
      verify = jwt.verify(decodedToken, secret);
    } catch (err) {
      return res.status(400).json({ message: "Invalid or expired token" });
    }
    const hashedPassword = await bcrypt.hash(newPassword, SALT_ROUNDS);
    await oldUser.update({ password: hashedPassword });
    res.status(200).json({ message: "Password reset successfully", userType: oldUser.role });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const userLogout = async (req, res) => {
  try {
    const token = req.header("Authorization").split(" ")[1];
    const decoded = jwt.decode(token);
    const expiresAt = new Date(decoded.exp * 1000);
    await TokenBlacklist.create({ token, expiresAt });
    res.json({ message: "Logged out successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

setInterval(
  async () => {
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
  },
  1 * 60 * 60 * 1000,
);

const getUserProfile = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.findByPk(userId, {
      attributes: { exclude: ["password", ignoreAttributes] },
    });
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(postsWithMediaPath([user], req)[0]);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const updateUserProfile = async (req, res) => {
  try {
    const userId = req.params.id;
    const { phone, address, city, state, country, pinCode } = req.body;
    const user = await User.findByPk(userId);
    if (!user) return res.status(404).json({ message: "User not found" });
    const mediaURL = req.file ? `/media/${req.file.filename}` : user.mediaURL;
    await user.update({ phone, address, city, state, country, pinCode, mediaURL });
    res.json({
      message: "Profile updated successfully",
      data: postsWithMediaPath([user], req)[0],
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { userRegister, userLogin, userLogout, getUserProfile, updateUserProfile, forgetPassword, resetPassword };
