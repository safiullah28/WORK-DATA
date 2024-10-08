const express = require("express");
const { signUp, logIn } = require("../Controllers/userController");
const router = express.Router();

router.get("/", (req, res) => {
  res.send("Hello, World!");
});
router.post("/createUser", signUp);
router.post("/getUser", logIn);

module.exports = router;
