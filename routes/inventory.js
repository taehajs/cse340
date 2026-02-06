const express = require("express");
const router = express.Router();
const invController = require("../controllers/inventoryController");

router.get("/", invController.showManagement);

router.get("/type/:classificationId", invController.buildByClassificationId);

router.get("/detail/:invId", invController.buildById);

router.get("/trigger-error", invController.triggerError);

router.get("/management", invController.showManagement);  
router.get("/add-classification", invController.showAddClassification);
router.post("/add-classification", invController.addClassification);
router.get("/add-vehicle", invController.showAddVehicle);
router.post("/add-vehicle", invController.addVehicle);

module.exports = router;