const router = require("express").Router();
const { protect, isAdmin } = require("../middleware/auth.middleware");
const { getUsers, blockUser } = require("../controllers/admin.controller");
const { getUser } = require("../controllers/auth.controller");
const {
  updateUser,
  changePassword,
  getUserById,
} = require("../controllers/user.controller");
const upload = require("../middleware/upload");

router.get("/users", protect, isAdmin, getUsers);
router.get("/user/:id", protect, isAdmin, getUserById);
router.get("/me", protect, getUser);
router.put("/update/:id", protect, upload.single("profilePicture"), updateUser);
router.put("/change-password", protect, changePassword);

module.exports = router;
