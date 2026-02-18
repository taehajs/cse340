const express = require("express");
const router = new express.Router();
const baseController = require("../controllers/baseController");

router.get("/", baseController.buildHome);

module.exports = router;
