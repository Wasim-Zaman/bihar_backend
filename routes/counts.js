const express = require("express");

const { getAllCounts, getCountsByStatus } = require("../controllers/counts");
const isAdmin = require("../middleware/isAdmin");

const router = express.Router();

router.get("/v1/all", isAdmin, getAllCounts);
router.get("/v1/counts-by-status", isAdmin, getCountsByStatus);

module.exports = router;
