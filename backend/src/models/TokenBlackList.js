const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");

const TokenBlacklist = sequelize.define("TokenBlacklist", {
  token: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  expiresAt: {
    type: DataTypes.DATE,
    allowNull: false
  }
});

module.exports = TokenBlacklist;
