const express = require("express");

const userController = require("../controllers/user");
const isAuth = require("../middleware/isAuth");

const router = express.Router();

// Route for user registration
router.post("/v1/register", isAuth, userController.register);

// Route for user login
router.post("/v1/login", userController.login);

module.exports = router;
