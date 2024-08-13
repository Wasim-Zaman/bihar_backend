const express = require("express");

const controller = require("../controllers/booth");
const isAuth = require("../middleware/isAuth"); // Assuming you want authentication

const router = express.Router();

// Create a new booth
router.post("/v1/booths", controller.createBooth);

// Get a booth by ID
router.get("/v1/booths/:id", controller.getBoothById);

// Get paginated booths with optional search query
router.get("/v1/booths", controller.getBooths);

router.get("/v1/booths/all", controller.getAllBooths);

// Update a booth by ID
router.put("/v1/booths/:id", controller.updateBoothById);

// Delete a booth by ID
router.delete("/v1/booths/:id", controller.deleteBoothById);

module.exports = router;
