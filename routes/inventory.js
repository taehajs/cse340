const express = require("express")
const router = express.Router()
const inventoryController = require("../controllers/inventoryController")
const classificationController = require("../controllers/classificationController")


router.get("/add-classification", classificationController.buildClassificationForm)
router.post("/add-classification", classificationController.addClassification)


router.get("/add-vehicle", inventoryController.buildAddVehicleForm)
router.post("/add-vehicle", inventoryController.addVehicle)

module.exports = router
