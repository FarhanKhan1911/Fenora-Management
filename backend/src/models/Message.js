const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");
const User = require("./User");

const Message = sequelize.define(
  "Message",
  {
    id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
    chatId: { type: DataTypes.UUID, allowNull: false },
    senderId: { type: DataTypes.UUID, allowNull: false },
    content: { type: DataTypes.TEXT, allowNull: false },
  },
  {
    timestamps: true,
  },
);

Message.belongsTo(User, { foreignKey: "senderId", as: "sender" });

module.exports = Message;
