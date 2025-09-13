const express = require("express");
const Post = require("../models/Post");
const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

const router = express.Router();

router.post("/create-post", authMiddleware, roleMiddleware(["seller"]), async (req, res) => {
  try {
    const { mediaURL, title, description, price } = req.body;
    const userId = req.user.id;
    const newPost = await Post.create({ mediaURL, title, description, price, userId });
    res.status(201).json(newPost);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get("/all-posts", authMiddleware, async (req, res) => {
  try {
    const posts = await Post.findAll({ include: ["user"] });
    res.json(posts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.put("/edit-post/:id", authMiddleware, roleMiddleware(["seller"]), async (req, res) => {
  try {
    const postId = req.params.id;
    const { mediaURL, title, description, price } = req.body;
    const userId = req.user.id;
    const post = await Post.findByPk(postId);
    if (!post) return res.status(404).json({ message: "Post not found" });
    if (post.userId !== userId) return res.status(403).json({ message: "Unauthorized" });
    await post.update({ mediaURL, title, description, price });
    res.json(post);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.delete("/delete-post/:id", authMiddleware, roleMiddleware(["seller"]), async (req, res) => {
  try {
    const postId = req.params.id;
    const userId = req.user.id;
    const post = await Post.findByPk(postId);
    if (!post) return res.status(404).json({ message: "Post not found" });
    if (post.userId !== userId) return res.status(403).json({ message: "Unauthorized" });
    await post.destroy();
    res.json({ message: "Post deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
