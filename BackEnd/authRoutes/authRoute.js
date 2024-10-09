const express = require("express");
const {
  logIn,
  signUp,
  getAllUsers,
  verifyToken,
} = require("../Controllers/userController");
const authRouter = express.Router();

authRouter.post("/createUser", signUp);

authRouter.post("/getUser", logIn);

module.exports = authRouter;
