const router = require("express").Router();
const { protect, isAdmin } = require("../middleware/auth.middleware");
const {
  getUsers,
  blockUser,
  createUser,
  updateUser,
  toggleBlockUser,
  impersonateUser,
  switchBack,
  deleteUser,
} = require("../controllers/admin.controller");
const { getUser } = require("../controllers/auth.controller");
const activityLogger = require("../middleware/activityLogger");

router.get("/users", protect, isAdmin, getUsers);
router.post("/users", protect, isAdmin, createUser);
router.put(
  "/users/:id",
  protect,
  isAdmin,
  activityLogger("USER_UPDATED"),
  updateUser,
);
router.delete(
  "/users/:id",
  protect,
  isAdmin,
  activityLogger("USER_DELETED"),
  deleteUser,
);
router.patch("/users/block/:id", protect, isAdmin, toggleBlockUser);
router.post(
  "/impersonate/:id",
  protect,
  isAdmin,
  activityLogger("IMPERSONATION_STARTED"),
  impersonateUser,
);
router.post(
  "/switch-back/:id",
  protect,
  isAdmin,
  activityLogger("IMPERSONATION_ENDED"),
  switchBack,
);

module.exports = router;
