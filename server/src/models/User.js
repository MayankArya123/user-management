const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
      index: true,
    },
    phone: String,
    bio: { type: String },
    profilePicture: { type: String },
    isBlocked: {
      type: Boolean,
      default: false,
      index: true,
    },
    provider: { type: String, default: "local" },
  },
  { timestamps: true },
);

module.exports = mongoose.model("User", userSchema);
