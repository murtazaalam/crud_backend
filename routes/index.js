const { Router } = require("express");
const authRoutes = require("./auth");
const userRoutes = require("./user");
const { checkValidSessionToken } = require("../middleware/auth");
const fileRoutes = require("./file");

const V1Router = Router();

V1Router.use("/auth", authRoutes);
V1Router.use("/users", checkValidSessionToken, userRoutes);
V1Router.use("/media", fileRoutes);

module.exports = V1Router;
