const express = require("express");
const router = new express.Router();
const invController = require("../controllers/inventoryController");

router.get("/type/:classificationId", invController.buildByClassification);
router.get("/detail/:invId", invController.getVehicleDetail);

module.exports = router;