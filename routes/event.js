const express = require("express");
const { uploadSingle, uploadMultiple } = require("multermate");

const controller = require("../controllers/event");
const isAuth = require("../middleware/isAuth");
const isAdmin = require("../middleware/isAdmin");
const isActive = require("../middleware/isActive");

const router = express.Router();

// Create a new event
router.post(
  "/v1/events",
  isAuth,
  //   isActive,
  uploadSingle({ filename: "document" }),
  controller.createEvent
);

router.post(
  "/v2/events",
  isAuth,
  //   isActive,
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
  isAuth,
  //   isActive,
  uploadSingle({ filename: "document" }),
  controller.updateEventById
);

router.put(
  "/v2/events/:id",
  isAuth,
  //   isActive,
  uploadMultiple({
    fields: [{ name: "documents" }],
  }),
  controller.updateEventByIdV2
);

router.put(
  "/v2/adminEvent/:id",
  isAdmin,
  uploadMultiple({
    fields: [{ name: "documents" }],
  }),
  controller.updateEventByIdV2
);

// Delete an event by ID
router.delete("/v1/events/:id", isAdmin, controller.deleteEventById);

router.patch("/v1/events/status/:id", controller.updateStatus);

router.get("/v1/user-events", isAuth, controller.getUserEvents);

router.get("/v1/date-events", isAuth, controller.getAdminSideEventsByDate);

router.get(
  "/v1/admin/requested",
  isAdmin,
  controller.getAdminSideRequestedEvents
);

router.get("/v1/admin/list", isAdmin, controller.getAdminSideEventsList);

router.get(
  "/v1/admin/list/accepted",
  isAdmin,
  controller.getAdminSideEventsListAccepted
);

router.get("/send-notification", controller.sendNotification);

module.exports = router;
