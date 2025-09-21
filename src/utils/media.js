const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "media/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });

const postsWithMediaPath = (posts, req) => {
  const host = req.protocol + "://" + req.get("host");
  const postsWithMediaPath = posts.map((post) => {
    const postJson = post && typeof post.toJSON === "function" ? post.toJSON() : post;
    if (postJson.mediaURL) {
      postJson.mediaPath = host + postJson.mediaURL;
    } else {
      postJson.mediaPath = null;
    }
    return postJson;
  });
  return postsWithMediaPath;
};

module.exports = { upload, postsWithMediaPath };
