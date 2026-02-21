const User = require("../models/User");

exports.updateUser = async (req, res) => {
  try {
    console.log("update user route hitting", req.file);

    const { name, email, phone, bio } = req.body;

    const updateData = { name, email, phone, bio };

    if (req.file) {
      console.log("new file check...");
      updateData.profilePicture = `/uploads/${req.file.filename}`;
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true },
    ).select("-password");

    res.json({ message: "User updated successfully", user: updatedUser });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};
