const express = require("express");

const controller = require("../controllers/grievance");
const isAuth = require("../middleware/isAuth");
const { uploadSingle } = require("multermate");

const router = express.Router();

// Create a new grievance
router.post(
  "/v1/grievances",
  isAuth,
  uploadSingle({ filename: "attachment" }),
  controller.createGrievance
);

// Get a grievance by ID
router.get("/v1/grievances/:id", controller.getGrievanceById);

// Get all grievances
router.get("/v1/grievances/all", controller.getAllGrievances);

// Get paginated grievances with optional search query
router.get("/v1/grievances", controller.getGrievances);

// Update a grievance by ID
router.put(
  "/v1/grievances/:id",
  isAuth,
  uploadSingle("attachment"),
  controller.updateGrievance
);

// Delete a grievance by ID
router.delete("/v1/grievances/:id", isAuth, controller.deleteGrievance);

module.exports = router;
