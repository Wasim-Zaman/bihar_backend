const express = require("express");

const controller = require("../controllers/grievance");
const isAuth = require("../middleware/isAuth");
const { uploadSingle, uploadMultiple } = require("multermate");

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
  uploadMultiple({ fields: [{ name: "attachments" }] }),
  controller.createAdminGrievance
);

router.get("/v1/admin/grievances", isAuth, controller.getAdminGrievances);

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

// Delete a grievance by ID
router.delete("/v1/grievances/:id", isAuth, controller.deleteGrievance);

module.exports = router;
