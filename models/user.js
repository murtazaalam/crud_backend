const db = require("../database/connection");
const Sequelize = require("sequelize");
const users = db.sequelize.define(
  "users",
  {
    user_id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    user_name: {
      type: Sequelize.STRING,
    },
    user_email: {
      type: Sequelize.STRING,
      unique: true,
    },
    user_phone: {
      type: Sequelize.TEXT,
    },
    user_gender: {
      type: Sequelize.STRING,
      defaultValue: "MALE",
    },
    user_password: {
      type: Sequelize.TEXT,
    },
    user_status: {
      type: Sequelize.STRING,
      defaultValue: "PENDING",
    },
    user_profile_image: {
      type: Sequelize.STRING,
      defaultValue: "https://cdn-icons-png.flaticon.com/512/3177/3177440.png",
    },
  },
  {
    timestamps: true,
    tableName: "users",
    // indexes:
  }
);

module.exports = users;
