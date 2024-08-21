const express = require("express");

const { getAllCounts } = require("../controllers/counts");
const isAdmin = require("../middleware/isAdmin");

const router = express.Router();

router.get("/v1/all", isAdmin, getAllCounts);

module.exports = router;
