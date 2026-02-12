const express = require("express");
const router = express.Router();
const favoritesController = require("../controllers/favoritesController");


router.post("/toggle", favoritesController.toggleFavorite);
router.get("/", favoritesController.getFavorites);


module.exports = router;