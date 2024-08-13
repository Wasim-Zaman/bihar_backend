const express = require("express");
const { uploadSingle } = require("multermate");

const userController = require("../controllers/user");
const isAuth = require("../middleware/isAuth");

const router = express.Router();

// Route for user registration
router.post("/v1/register", isAuth, userController.register);

// Route for user login
router.post("/v1/login", userController.login);

// Update user
router.put(
  "/v1/update",
  isAuth,
  uploadSingle({ filename: "image" }),
  userController.updateUser
);

router.get("/v1/users", userController.getUsers);

router.get("/v1/users/me", isAuth, userController.getUser);

router.delete("/v1/users/:id", userController.deleteUser);

module.exports = router;
