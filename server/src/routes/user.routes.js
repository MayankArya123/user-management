const router = require("express").Router();
const { protect, isAdmin } = require("../middleware/auth.middleware");
const { getUsers, blockUser } = require("../controllers/admin.controller");
const { getUser } = require("../controllers/auth.controller");
const { updateUser } = require("../controllers/user.controller");
const upload = require("../middleware/upload");

router.get("/users", protect, isAdmin, getUsers);
router.get("/me", protect, getUser);
router.put("/update/:id", protect, upload.single("profilePicture"), updateUser);

module.exports = router;
