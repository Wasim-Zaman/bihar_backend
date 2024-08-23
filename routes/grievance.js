const express = require("express");
const { uploadSingle, uploadMultiple } = require("multermate");

const controller = require("../controllers/grievance");
const isAuth = require("../middleware/isAuth");
const isAdmin = require("../middleware/isAdmin");

const router = express.Router();

// Create a new grievance
router.post(
  "/v1/grievances",
  isAuth,
  uploadSingle({ filename: "attachment" }),
  controller.createGrievance
);

router.post(
  "/v2/grievances",
  isAuth,
  uploadMultiple({
    fields: [{ name: "attachments" }],
  }),
  controller.createGrievanceV2
);

router.post(
  "/v1/admin/grievances",
  isAdmin,
  uploadMultiple({ fields: [{ name: "attachments" }] }),
  controller.createAdminGrievance
);

router.get("/v1/admin/grievances", isAuth, controller.getAdminGrievances);

router.get("/v1/grievances/by-tab", isAuth, controller.getGrievancesByTabName);

// Get a grievance by ID
router.get("/v1/grievances/:id", controller.getGrievanceById);

// Get paginated grievances with optional search query
router.get("/v1/grievances", controller.getGrievances);

// Update a grievance by ID
router.put(
  "/v1/grievances/:id",
  isAuth,
  uploadSingle("attachment"),
  controller.updateGrievance
);

router.put(
  "/v2/grievances/:id",
  isAuth,
  uploadMultiple({
    fields: [{ name: "attachments" }],
  }),
  controller.updateGrievanceV2
);

router.put(
  "/v2/admin/grievances/:id",
  isAdmin,
  uploadMultiple({
    fields: [{ name: "attachments" }],
  }),
  controller.updateGrievanceV2
);

// Delete a grievance by ID
router.delete("/v1/grievances/:id", isAdmin, controller.deleteGrievance);

module.exports = router;
