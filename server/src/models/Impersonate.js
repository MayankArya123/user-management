const mongoose = require("mongoose");

const impersonationSchema = new mongoose.Schema(
  {
    admin: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    startedAt: { type: Date, default: Date.now },
    endedAt: Date,
    ipAddress: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("ImpersonationLog", impersonationSchema);