const express = require("express");

const controller = require("../controllers/constituency");
const isAuth = require("../middleware/isAuth"); // Assuming you want authentication

const router = express.Router();

// Create a new constituency
router.post("/v1/constituencies", controller.createConstituency);

// Get paginated constituencies with optional search query

router.get("/v1/constituencies", controller.getConstituencies);

router.get("/v1/constituencies/all", controller.getAllConstituencies);

// Get a constituency by ID
router.get("/v1/constituencies/:id", controller.getConstituencyById);

// Update a constituency by ID
router.put("/v1/constituencies/:id", controller.updateConstituencyById);

// Delete a constituency by ID
router.delete("/v1/constituencies/:id", controller.deleteConstituencyById);

module.exports = router;
