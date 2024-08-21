const express = require("express");
const { getAllCounts } = require("../controllers/counts");

const router = express.Router();

router.get("/v1/getAllCounts", getAllCounts);

module.exports = router;
