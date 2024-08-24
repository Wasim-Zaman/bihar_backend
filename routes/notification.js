const express = require("express");

const controller = require("../controllers/notification");
const isAdmin = require("../middleware/isAdmin");

const router = express.Router();

// Create a new notification
router.post("/v1/notifications", isAdmin, controller.createNotification);

// Get all notifications
router.get("/v1/notifications", controller.getAllNotifications);

// Get a notification by ID
router.get("/v1/notifications/:id", controller.getNotificationById);

// Delete a notification by ID
router.delete(
  "/v1/notifications/:id",
  isAdmin,
  controller.deleteNotificationById
);

module.exports = router;
