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

// authRouter.get("/getAllUsers", verifyToken, getAllUsers);

module.exports = authRouter;
