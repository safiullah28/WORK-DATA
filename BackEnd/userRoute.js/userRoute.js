const express = require("express");
const {
  verifyToken,
  getAllUsers,
  updateName,
  deleteUser,
  getSingleUser,
} = require("../Controllers/userController");
const userRouter = express.Router();

userRouter.get("/getAllUsers", verifyToken, getAllUsers);
userRouter.put("/update/:id", verifyToken, updateName);
userRouter.delete("/delete/:id", verifyToken, deleteUser);
userRouter.get("/getSingleUser/:id", verifyToken, getSingleUser);

module.exports = userRouter;
