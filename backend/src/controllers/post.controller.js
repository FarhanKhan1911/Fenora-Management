const fs = require("fs");
const path = require("path");
const Post = require("../models/Post");
const { postsWithMediaPath } = require("../utils/media");
const validatePostData = require("../utils/validator");

const createPost = async (req, res) => {
  try {
    const { title, description, price, quantity } = req.body;

    const mediaURL = req.file ? `/media/${req.file.filename}` : null;

    const validationError = validatePostData({ ...req.body, mediaURL });
    if (validationError) return res.status(400).json({ message: validationError });

    const userId = req.user.id;
    const newPost = await Post.create({ mediaURL, title, description, price, quantity, userId });
    res.status(201).json(newPost);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "An error occurred while creating the post." });
  }
};

const getAllPost = async (req, res) => {
  try {
    const posts = await Post.findAll({ include: ["user"] });
    res.json(postsWithMediaPath(posts, req));
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "An error occurred while fetching posts." });
  }
};

const editPost = async (req, res) => {
  try {
    const postId = req.params.id;
    const post = await Post.findByPk(postId);
    if (!post) return res.status(404).json({ message: "Post not found." });
    const userId = req.user.id;
    if (post.userId !== userId) return res.status(403).json({ message: "Unauthorized" });

    const { title, description, price, quantity } = req.body;
    const mediaURL = req.file ? `/media/${req.file.filename}` : post.mediaURL;
    const validationError = validatePostData({ ...req.body, mediaURL });
    if (validationError) return res.status(400).json({ message: validationError });

    await post.update({ mediaURL, title, description, price, quantity });
    res.json(post);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "An error occurred while editing the post." });
  }
};

const deletePost = async (req, res) => {
  try {
    const postId = req.params.id;
    const userId = req.user.id;
    const post = await Post.findByPk(postId);
    if (!post) return res.status(404).json({ message: "Post not found." });
    if (post.userId !== userId) return res.status(403).json({ message: "Unauthorized" });

    const postWithMediaPath = postsWithMediaPath([post], req);
    if (postWithMediaPath[0].mediaPath) {
      const filePath = path.join(
        __dirname,
        "..",
        "..",
        postWithMediaPath[0].mediaPath.replace(req.protocol + "://" + req.get("host"), "").replace(/^\//, "")
      );
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    }

    await post.destroy();
    res.json({ message: "Post deleted successfully." });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "An error occurred while deleting the post." });
  }
};

module.exports = { createPost, getAllPost, editPost, deletePost };
