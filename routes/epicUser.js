const express = require("express");
const { uploadSingle } = require("multermate");

const controller = require("../controllers/epicUser");
const isAuth = require("../middleware/isAuth");

const router = express.Router();

// Route for user login
router.post("/v1/login", controller.login);

// Update user
router.put(
  "/v1/updateUser",
  isAuth,
  uploadSingle("image"),
  controller.updateUser
);

router.get("/v1/users", controller.getUsers);

router.get("/v1/users/me", isAuth, controller.getUser);

router.delete("/v1/users/:id", controller.deleteUser);

module.exports = router;
