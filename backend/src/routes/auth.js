const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const {
  userRegister,
  userLogin,
  userLogout,
  forgetPassword,
  resetPassword,
  getUserProfile,
  updateUserProfile,
} = require("../controllers/auth.controller");
const { upload } = require("../utils/media");

const router = express.Router();

router.post("/register", userRegister);
router.post("/login", userLogin);
router.post("/logout", authMiddleware, userLogout);
router.post("/forget-password", forgetPassword);
router.post("/reset-password/:id/:token", resetPassword);

router.get("/get-profile/:id", authMiddleware, getUserProfile);
router.put("/update-profile/:id", authMiddleware, upload.single("profilePicture"), updateUserProfile);

module.exports = router;
