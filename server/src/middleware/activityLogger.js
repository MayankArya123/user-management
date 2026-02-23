const ActivityLog = require("../models/ActivityLogModel");

const activityLogger = (action) => {
  return async (req, res, next) => {
    res.on("finish", async () => {
      if (res.statusCode < 400) {
        await ActivityLog.create({
          action,
          performedBy: req.user?._id,
          ipAddress: req.ip,
        });
      }
    });

    next();
  };
};

module.exports = activityLogger;
