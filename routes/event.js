const express = require("express");

const controller = require("../controllers/event");
const isAuth = require("../middleware/isAuth"); // Replacing 'isAdmin' with 'isAuth' for authentication
const { uploadSingle } = require("multermate");

const router = express.Router();

// Create a new event
router.post(
  "/v1/events",
  isAuth, // Requiring user authentication instead of admin authentication
  uploadSingle({ filename: "document" }),
  controller.createEvent
);

// Get an event by ID
router.get("/v1/events/:id", controller.getEventById);

// Get paginated events with optional search query
router.get("/v1/events", controller.getEvents);

// Update an event by ID
router.put(
  "/v1/events/:id",
  isAuth, // Requiring user authentication instead of admin authentication
  uploadSingle("document"),
  controller.updateEventById
);

// Delete an event by ID
router.delete("/v1/events/:id", isAuth, controller.deleteEventById);

// Update event status based on mobile number
router.patch("/v1/events/status/:id", controller.updateStatus);

// Get events by mobile number with status 2
router.get(
  "/v1/events/status2/:mobileNumber",
  controller.getEventsByMobileNumberWithStatus2
);

module.exports = router;
