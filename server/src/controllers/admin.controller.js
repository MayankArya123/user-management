const User = require("../models/User");

exports.getUsers = async (req, res) => {
  const { page = 1, limit = 10, search = "" } = req.query;

  const query = {
    name: { $regex: search, $options: "i" },
  };

  const users = await User.find(query)
    .select("-password")
    .limit(limit * 1)
    .skip((page - 1) * limit)
    .lean();

  const total = await User.countDocuments(query);

  res.json({
    total,
    page: Number(page),
    users,
  });
};

exports.blockUser = async (req, res) => {
  const user = await User.findById(req.params.id);
  user.isBlocked = !user.isBlocked;
  await user.save();

  res.json({ message: "Updated", user });
};