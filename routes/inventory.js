const express = require("express");
const router = express.Router();
const invController = require("../controllers/inventoryController");

router.get("/", invController.showHome);
router.get("/inventory/management", invController.showManagement);

router.get("/inventory/add-classification", invController.showAddClassification);
router.post("/inventory/add-classification", invController.addClassification);

router.get("/inventory/add-vehicle", invController.showAddVehicle);
router.post("/inventory/add-vehicle", invController.addVehicle);

router.get("/inventory/type/:classificationId", invController.buildByClassificationId);
router.get("/inventory/detail/:invId", invController.buildById);

module.exports = router;
