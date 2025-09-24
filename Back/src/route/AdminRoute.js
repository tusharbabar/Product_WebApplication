const express = require("express");
const router = express.Router();
const AdminController = require("../controller/adminController");

// GET /admin/stats
router.get("/stats", AdminController.getStats);

module.exports = router;
