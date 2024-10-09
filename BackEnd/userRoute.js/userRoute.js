const express = require("express");
const { verifyToken, getAllUsers } = require("../Controllers/userController");
const userRouter = express.Router();

userRouter.get("/getAllUsers", verifyToken, getAllUsers);

module.exports = userRouter;
