const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.signUp = async (req, res) => {
  await User.create(req.body);
  res.status(201).json({
    success: true,
    message: "User created successfully",
  });
};

exports.logIn = async (req, res) => {
  const { email, password } = req.body;
  try {
    // Find the user by email
    const user = await User.findOne({ email }).lean();
    if (!user) {
      return res.status(401).json({ error: "Authentication failed" });
    }

    // Compare the provided password with the stored hashed password
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ error: "Authentication failed" });
    }

    // Exclude the password field from the user object
    const { password: _, ...others } = user;

    const token = jwt.sign({ data: others }, process.env.JWT_SECRET_KEY, {
      expiresIn: process.env.EXPIRES_IN,
    });

    res.status(200).json({ access_token: token, others });
  } catch (error) {
    res.status(400).json({ error: "Login failed" });
  }
};

exports.verifyToken = function (req, res, next) {
  let testToken = req.header("Authorization");
  let token;
  if (testToken && testToken.startsWith("Bearer")) {
    token = testToken.split(" ")[1];
  }
  // console.log("token :", token);

  if (!token) {
    return res.status(401).json({ error: "Access denied" });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.data = decoded.data;
    next();
  } catch (error) {
    console.log("error", error);
    res.status(401).json({ error: "Invalid token" });
  }
};

exports.updateName = async (req, res) => {
  try {
    const id = req.params.id;
    const updateUser = await User.findByIdAndUpdate(
      { _id: id },
      { name: req.body.name },
      { new: true }
    );
    // console.log(id);

    if (!updateUser) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json({
      message: "Username updated successfully",
      user: updateUser,
    });
  } catch (error) {
    // Error handling
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const id = req.params.id;
    const deletedUser = await User.findByIdAndDelete(id);
    // console.log(id);

    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json({
      message: "User Deleted successfully",
    });
  } catch (error) {
    // Error handling
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.getSingleUser = async (req, res) => {
  const id = req.params.id;
  const user = await User.findById(id).lean();
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  const { password, ...others } = user;
  res.status(200).json({
    success: true,
    data: others,
  });
};

exports.getAllUsers = async (req, res) => {
  const limitValue = req.query.limit || 2;
  const skipValue = req.query.skip || 0;
  const users = await User.find().limit(limitValue).skip(skipValue).lean();
  const sanitizedUsers = users.map((user) => {
    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword; // Return the user object without the password
  });
  res.status(200).json({
    success: true,
    data: sanitizedUsers,
  });
};
