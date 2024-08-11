const express = require("express");

const controller = require("../controllers/event");
const isAuth = require("../middleware/isAuth"); // Replacing 'isAdmin' with 'isAuth' for authentication
const { uploadSingle, uploadMultiple } = require("multermate");

const router = express.Router();

// Create a new event
router.post(
  "/v1/events",
  isAuth,
  uploadSingle({ filename: "document" }),
  controller.createEvent
);

router.post(
  "/v2/events",
  isAuth,
  uploadMultiple({
    fields: [{ name: "documents" }],
  }),
  controller.createEventV2
);

// Get an event by ID
router.get("/v1/events/:id", controller.getEventById);

// Get paginated events with optional search query
router.get("/v1/events", controller.getEvents);

// Update an event by ID
router.put(
  "/v1/events/:id",
  //   isAdmin, // Requiring admin authentication instead of user authentication
  uploadSingle("document"),
  controller.updateEventById
);

router.put(
  "/v2/events/:id",
  //   isAdmin, // Requiring admin authentication instead of user authentication
  uploadSingle("document"),
  controller.updateEventByIdV2
);

// Delete an event by ID
router.delete(
  "/v1/events/:id",
  //   isAdmin, // Requiring admin authentication instead of user authentication
  controller.deleteEventById
);

// Update event status based on mobile number
router.patch("/v1/events/status/:id", controller.updateStatus);

router.get("/v1/user-events", isAuth, controller.getUserEvents);

router.get("/v1/date-events", isAuth, controller.getPaginatedEventsByDate);

module.exports = router;
