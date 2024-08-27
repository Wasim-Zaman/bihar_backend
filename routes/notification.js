const express = require("express");

const controller = require("../controllers/notification");
const isAdmin = require("../middleware/isAdmin");
const isAuth = require("../middleware/isAuth");

const router = express.Router();

// Create a new notification
router.post("/v1/notifications", isAdmin, controller.createNotification);

// Get all notifications with optional pagination and search query
router.get("/v1/notifications", isAuth, controller.getNotifications);

// Get a notification by ID
router.get("/v1/notifications/:id", controller.getNotificationById);

// Delete a notification by ID
router.delete(
  "/v1/notifications/:id",
  isAdmin,
  controller.deleteNotificationById
);

module.exports = router;
