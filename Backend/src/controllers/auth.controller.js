const userModel = require("../models/user.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

async function registerController(req, res) {
  try {
    const { username, password } = req.body;

    const existingUser = await userModel.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: "Username already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await userModel.create({
      username,
      password: hashedPassword,
    });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d", // optional
    });

    res.cookie("token", token, { httpOnly: true, secure: false }); // set secure:true if using HTTPS

    res.status(201).json({
      message: "User registered successfully",
      user,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
}

async function loginController(req, res) {
  try {
    const { username, password } = req.body;

    const user = await userModel.findOne({ username });
    if (!user) {
      return res.status(400).json({ message: "Invalid username or user not found" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid password" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.cookie("token", token, { httpOnly: true, secure: false });

    res.status(200).json({
      message: "User logged in successfully",
      user,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
}

module.exports = { registerController, loginController };
