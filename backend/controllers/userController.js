const userModel = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const registerUser = async (req, res) => {
  try {
    const { fullName, username, password, confirmPassword, gender } = req.body;
    if (!fullName || !username || !password || !confirmPassword || !gender) {
      return res.status(400).json({ message: "All fields are required" });
    }
    if (password !== confirmPassword) {
      return res
        .status(400)
        .json({ message: "Password and confirm password do not match" });
    }
    const existingUser = await userModel.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: "Username already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const maleProfilePhoto = `https://api.dicebear.com/7.x/lorelei/svg?seed=${username}`; // You can set a default profile photo URL or leave it empty
    const femaleProfilePhoto = `https://api.dicebear.com/7.x/adventurer/svg?seed=${username}`; // You can set a default profile photo URL or leave it empty
    const newUser = await userModel.create({
      fullName,
      username,
      password: hashedPassword,
      profilePhoto: gender === "male" ? maleProfilePhoto : femaleProfilePhoto,
      gender,
    });
    res.status(201).json({
      success: true,
      message: "User registered successfully",
      newUser,
    });
  } catch (error) {
    console.error("Error in registerUser:", error);
    res.status(500).json({ message: "Server error" });
  }
};
const loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res
        .status(400)
        .json({ message: "Username and password are required" });
    }
    const user = await userModel.findOne({ username });
    if (!user) {
      return res.status(400).json({ message: "Invalid username or password" });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid username or password" });
    }
    const tokendata = {
      id: user._id,
    };
    const token = jwt.sign(tokendata, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    return res
      .status(200)
      .cookie("token", token, {
        maxAge: 24 * 60 * 60 * 1000,
        httpOnly: true,
        sameSite: "strict",
      })
      .json({
        message: "Login successful",
        _id: user._id,
        username: user.username,
        fullName: user.fullName,
        profilePhoto: user.profilePhoto,
        user,
      });
  } catch (error) {
    console.error("Error in loginUser:", error);
    res.status(500).json({ message: "Server error" });
  }

  //   res.cookie("token", token)
};
const logoutUser = (req, res) => {
  try {
    return res
      .status(200)
      .clearCookie("token", { httpOnly: true, sameSite: "strict" })
      .json({ message: "Logout successful" });
  } catch (error) {
    console.error("Error in logoutUser:", error);
    res.status(500).json({ message: "Server error in Logging Out" });
  }
};

const getOtherUsers = async (req, res) => {
  try {
    const loggedInUserId = req.id; // Assuming the logged-in user's ID is stored in req.id
    const otherUsers = await userModel
      .find({ _id: { $ne: loggedInUserId } })
      .select("-password");
    return res.status(200).json({ otherUsers });
  } catch (error) {
    console.error("Error in getOtherUsers:", error);
  }
};
module.exports = { registerUser, loginUser, logoutUser, getOtherUsers };
