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
  deleteUser
} = require("../controllers/admin.controller");
const { getUser } = require("../controllers/auth.controller");

router.get("/users", protect, isAdmin, getUsers);
router.post("/users", protect, isAdmin, createUser);
router.put("/users/:id", protect, isAdmin, updateUser);
router.delete("/users/:id", protect, isAdmin, deleteUser);
router.patch("/users/:id/block", protect, isAdmin, toggleBlockUser);
router.post("/impersonate/:userId", protect, isAdmin, impersonateUser);
router.post("/switch-back", protect, isAdmin, switchBack);

module.exports = router;
