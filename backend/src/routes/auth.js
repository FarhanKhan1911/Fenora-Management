const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const authController = require("../controllers/auth.controller");
const { upload } = require("../utils/media");

const router = express.Router();

router.post("/register", authController.userRegister);
router.post("/login", authController.userLogin);
router.post("/logout", authMiddleware, authController.userLogout);

router.get("/get-profile/:id", authMiddleware, authController.getUserProfile);
router.put("/update-profile/:id", authMiddleware, upload.single("profilePicture"), authController.updateUserProfile);

module.exports = router;
