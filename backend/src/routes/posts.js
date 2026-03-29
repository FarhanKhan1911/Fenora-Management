const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");
const userType = require("../constants/type");
const { upload } = require("../utils/media");
const { createPost, getAllPost, editPost, deletePost } = require("../controllers/post.controller");

const router = express.Router();
router.use(authMiddleware);

router.post("/create-post", roleMiddleware([userType.SellerUser]), upload.single("mediaFile"), createPost);
router.get("/all-posts", getAllPost);
router.put("/edit-post/:id", roleMiddleware([userType.SellerUser]), upload.single("mediaFile"), editPost);
router.delete("/delete-post/:id", roleMiddleware([userType.SellerUser]), deletePost);

module.exports = router;
