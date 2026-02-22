const User = require("../models/User");
const ImpersonationLog = require("../models/Impersonate");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

exports.getUsers = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const search = req.query.search || "";
    const role = req.query.role;
    const blocked = req.query.blocked;

    const query = {
      ...(search && {
        $or: [
          { name: { $regex: search, $options: "i" } },
          { email: { $regex: search, $options: "i" } },
        ],
      }),
      ...(role && { role }),
      ...(blocked && { isBlocked: blocked === "true" }),
    };

    const users = await User.find(query)
      .select("-password")
      .skip((page - 1) * limit)
      .limit(limit);

    const total = await User.countDocuments(query);

    res.json({
      total,
      page,
      pages: Math.ceil(total / limit),
      users,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createUser = async (req, res) => {
  console.log("admin create user form hitting", req.body);

  try {
    const { password, ...rest } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    console.log('hased password',hashedPassword)

    const user = await User.create({
      ...rest,
      password: hashedPassword,
    });

    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    }).select("-password");

    if (!user) return res.status(404).json({ message: "User not found" });

    res.json(user);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);

    if (!user) return res.status(404).json({ message: "User not found" });

    res.json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.toggleBlockUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) return res.status(404).json({ message: "User not found" });

    user.isBlocked = !user.isBlocked;
    await user.save();

    res.json({
      message: user.isBlocked ? "User blocked" : "User unblocked",
      isBlocked: user.isBlocked,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.impersonateUser = async (req, res) => {
  try {
    const targetUser = await User.findById(req.params.userId);

    if (!targetUser) return res.status(404).json({ message: "User not found" });

    const token = jwt.sign(
      {
        id: targetUser._id,
        impersonatedBy: req.user._id,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1h" },
    );

    await ImpersonationLog.create({
      admin: req.user._id,
      user: targetUser._id,
      ipAddress: req.ip,
    });

    res.json({ token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.switchBack = async (req, res) => {
  try {
    if (!req.user.impersonatedBy)
      return res.status(400).json({ message: "Not impersonating" });

    const admin = await User.findById(req.user.impersonatedBy);

    const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    await ImpersonationLog.findOneAndUpdate(
      {
        admin: admin._id,
        user: req.user._id,
        endedAt: null,
      },
      { endedAt: new Date() },
    );

    res.json({ token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
