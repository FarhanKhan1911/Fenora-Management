const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");
const User = require("./User");

const Chat = sequelize.define(
  "Chat",
  {
    id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
    user1Id: { type: DataTypes.UUID, allowNull: false },
    user2Id: { type: DataTypes.UUID, allowNull: false },
  },
  {
    timestamps: true,
    indexes: [
      {
        unique: true,
        fields: ["user1Id", "user2Id"],
      },
    ],
  },
);

Chat.belongsTo(User, { foreignKey: "user1Id", as: "user1" });
Chat.belongsTo(User, { foreignKey: "user2Id", as: "user2" });

module.exports = Chat;
