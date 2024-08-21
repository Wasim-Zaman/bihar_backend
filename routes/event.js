const express = require("express");
const { uploadSingle, uploadMultiple } = require("multermate");

const controller = require("../controllers/event");
const isAuth = require("../middleware/isAuth");
const isAdmin = require("../middleware/isAdmin");

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

router.post(
  "/v1/adminEvent",
  isAdmin,
  uploadMultiple({ fields: [{ name: "documents" }] }),
  controller.createAdminEvent
),
  // Get an event by ID
  router.get("/v1/events/:id", controller.getEventById);

// Get paginated events with optional search query
router.get("/v1/events", controller.getEvents);

// Update an event by ID
router.put(
  "/v1/events/:id",
  //   isAdmin, // Requiring admin authentication instead of user authentication
  uploadSingle({ filename: "document" }),
  controller.updateEventById
);

router.put(
  "/v2/events/:id",
  //   isAdmin, // Requiring admin authentication instead of user authentication
  uploadMultiple({
    fields: [{ name: "documents" }],
  }),
  controller.updateEventByIdV2
);

// Delete an event by ID
router.delete("/v1/events/:id", isAdmin, controller.deleteEventById);

// Update event status based on mobile number
router.patch("/v1/events/status/:id", controller.updateStatus);

router.get("/v1/user-events", isAuth, controller.getUserEvents);

router.get("/v1/date-events", isAuth, controller.getPaginatedEventsByDate);

router.get("/send-notification", controller.sendNotification);

module.exports = router;
