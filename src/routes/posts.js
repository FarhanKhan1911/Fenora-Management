const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");
const userType = require("../constants/type");
const { upload } = require("../utils/media");
const postController = require("../controllers/post.controller");

const router = express.Router();

router.post("/create-post", authMiddleware, roleMiddleware([userType.SellerUser]), upload.single("mediaFile"), postController.createPost);

router.get("/all-posts", authMiddleware, postController.getAllPost);

router.put("/edit-post/:id", authMiddleware, roleMiddleware([userType.SellerUser]), upload.single("mediaFile"), postController.editPost);

router.delete("/delete-post/:id", authMiddleware, roleMiddleware([userType.SellerUser]), postController.deletePost);

module.exports = router;
