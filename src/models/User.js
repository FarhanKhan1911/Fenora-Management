const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");
const userType = require("../constants/type");

const User = sequelize.define("User", {
  name: { type: DataTypes.STRING, allowNull: false },
  email: { type: DataTypes.STRING, unique: true, allowNull: false },
  password: { type: DataTypes.STRING, allowNull: false },
  role: { type: DataTypes.ENUM(userType.BuyerUser, userType.SellerUser), allowNull: false }
});

module.exports = User;