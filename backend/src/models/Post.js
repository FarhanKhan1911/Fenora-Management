const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");
const User = require("./User");

const Post = sequelize.define("Post", {
  mediaURL: { type: DataTypes.BLOB, allowNull: false },
  title: { type: DataTypes.STRING, allowNull: false },
  description: { type: DataTypes.TEXT, allowNull: false },
  price: { type: DataTypes.FLOAT, allowNull: false },
  quantity: { type: DataTypes.INTEGER, allowNull: true },
});
Post.belongsTo(User, { foreignKey: "userId", as: "user" });

module.exports = Post;
