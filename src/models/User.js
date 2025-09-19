const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");
const userType = require("../constants/type");

const User = sequelize.define(
  "User",
  {
    id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
    name: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, unique: true, allowNull: false },
    password: { type: DataTypes.STRING, allowNull: false },
    role: { type: DataTypes.ENUM(userType.BuyerUser, userType.SellerUser), allowNull: false },
    phone: { type: DataTypes.INTEGER, allowNull: true },
    address: { type: DataTypes.STRING, allowNull: true },
    city: { type: DataTypes.STRING, allowNull: true },
    state: { type: DataTypes.STRING, allowNull: true },
    country: { type: DataTypes.STRING, allowNull: true },
    pinCode: { type: DataTypes.INTEGER, allowNull: true },
    mediaURL: { type: DataTypes.BLOB, allowNull: true },
  },
  {
    timestamps: true,
  }
);

module.exports = User;
