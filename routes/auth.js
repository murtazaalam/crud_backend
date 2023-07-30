const { Router } = require("express");
const AuthController = require("../controller/auth");
const {
  validateAuthLoginBody,
  validateAuthRegisterBody,
} = require("../validator/auth");
const authRoutes = Router();
const auth = new AuthController();
authRoutes.post("/register", validateAuthRegisterBody, auth.register);
authRoutes.post("/login", validateAuthLoginBody, auth.login);
module.exports = authRoutes;
