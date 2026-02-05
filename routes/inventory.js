const express = require("express");
const router = express.Router();
const invController = require("../controllers/inventoryController");

router.get("/", invController.buildByClassificationId);
router.get("/type/:classificationId", invController.buildByClassificationId);

router.get("/detail/:invId", invController.buildById);

router.get("trigger-error", invController.triggerError);


module.exports = router;