const router = require("express").Router();
const { protect, isAdmin } = require("../middleware/auth.middleware");
const { getUsers, blockUser } = require("../controllers/admin.controller");

router.get("/users", protect, isAdmin, getUsers);
router.patch("/users/:id/block", protect, isAdmin, blockUser);

module.exports = router;