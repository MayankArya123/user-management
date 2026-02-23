const mongoose = require("mongoose");

const activityLogSchema = new mongoose.Schema(
  {
    action: {
      type: String,
      required: true,
      enum: [
        "USER_LOGIN",
        "USER_LOGOUT",
        "USER_BLOCKED",
        "USER_UNBLOCKED",
        "USER_UPDATED",
        "USER_DELETED",
        "IMPERSONATION_STARTED",
        "IMPERSONATION_ENDED",
      ],
    },

    performedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    targetUser: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    ipAddress: String,

    userAgent: String,

    metadata: {
      type: Object,
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("ActivityLog", activityLogSchema);
