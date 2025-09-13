require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { connectDB, sequelize } = require("./config/db");
const User = require("./models/User");
const TokenBlackList = require("./models/TokenBlackList");
const Post = require("./models/Post");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/posts", require("./routes/posts"));
app.use("/api/auth", require("./routes/auth"));
app.use("/api", require("./routes/protected"));

const PORT = process.env.PORT;

(async () => {
  await connectDB();
  await sequelize.sync({ alter: true });
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
})();
