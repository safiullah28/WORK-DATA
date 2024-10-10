const express = require("express");
const {
  addRole,
  getAllRoles,
  getSingleRole,
  updateRole,
  deleteRole,
} = require("../Controllers/roleController");
const roleRouter = express.Router();
roleRouter.post("/addRole", addRole);

roleRouter.get("/getAllRoles", getAllRoles);
roleRouter.get("/getSingleRole/:id", getSingleRole);
roleRouter.put("/updateRole/:id", updateRole);
roleRouter.delete("/deleteRole/:id", deleteRole);

module.exports = roleRouter;
