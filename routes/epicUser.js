const express = require("express");
const { uploadSingle } = require("multermate");

const controller = require("../controllers/epicUser");
const isAuth = require("../middleware/isAuth");
const isAdmin = require("../middleware/isAdmin");

const router = express.Router();

// Route for user login
router.post("/v1/login", controller.login);

router.post("/v1/register", isAuth, controller.register);

router.post("");

// Update user
router.put(
  "/v1/updateUser",
  uploadSingle({ filename: "image" }),
  controller.updateUser
);

router.get("/v1/users", controller.getUsers);

router.get("/v1/users/me", isAuth, controller.getUser);

router.delete("/v1/users/:id", isAdmin, controller.deleteUser);

router.put("/v1/users/status/:id", isAdmin, controller.updateStatus);

module.exports = router;
