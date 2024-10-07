const express = require("express");
const router = express.Router();
const { Signup, Login } = require("../Controllers/userController");

router.get("/", (req, res) => {
  res.send("Hello, World!");
});
router.post("/createUser", Signup);
router.post("/getUser", Login);

module.exports = router;
