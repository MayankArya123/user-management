const User = require("../models/User");
const bcrypt = require("bcryptjs");

exports.updateUser = async (req, res) => {
  try {
    console.log("update user route hitting", req.body);

    const user = await User.findById(req.params.id);

    console.log("user check", user);

    const body = { ...req.body }; // now it's a plain JS object

    if (!user) return res.status(404).json({ message: "User not found" });
    if ("name" in body) user.name = body.name;
    if ("email" in body && body.email !== user.email) user.email = body.email;
    if ("phone" in body) user.phone = body.phone;
    if ("bio" in body) user.bio = body.bio;

    if (req.file) {
      console.log("new file check...");
      user.profilePicture = `/uploads/${req.file.filename}`;
    }

    console.log("user check", user);

    const updatedUser = await user.save();

    res.json({ message: "User updated successfully", user: updatedUser });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};

exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.changePassword = async (req, res) => {
  console.log("check", req.body);

  try {
    const { currentPassword, newPassword, confirmPassword } = req.body;

    if (!currentPassword || !newPassword || !confirmPassword) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (newPassword !== confirmPassword) {
      return res.status(400).json({ message: "Passwords do not match" });
    }

    const user = await User.findById(req.user.id);

    const isMatch = await bcrypt.compare(currentPassword, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Current password is incorrect" });
    }

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(newPassword, salt);

    await user.save();

    res.json({ message: "Password changed successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
