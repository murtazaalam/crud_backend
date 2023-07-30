const { Router } = require("express");
const UserController = require("../controller/user");
const {
  getUserQueryValidator,
  updatePasswordValidator,
  updateProfileUser,
} = require("../validator/user");
const user = new UserController();
const userRoutes = Router();
userRoutes.get("/", getUserQueryValidator, user.handleGetUserList);
userRoutes.delete("/profile", user.deleteUserAccount);
userRoutes.put("/profile",updateProfileUser, user.updateProfile);
userRoutes.put("/password", updatePasswordValidator, user.changePassword);
module.exports = userRoutes;
