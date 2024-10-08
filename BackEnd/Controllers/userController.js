const User = require("../Models/userModel");

exports.Signup = async (req, res) => {
  await User.create(req.body);
  res.status(201).json({
    success: true,
    // data: newUser,
    message: "User created successfully",
  });
};

exports.Login = async (req, res) => {
  const user = await User.findOne({
    email: req.body.email,
    password: req.body.password,
  });
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  res.status(200).json({
    success: true,
    message: "User successfully Login",
    data: user,
  });
};
