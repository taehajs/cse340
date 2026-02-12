const itemsModel = require("../models/items-model");

async function toggleFavorite(req, res) {
    try {
        const { itemId } = req.body;
        const { isFavorite } = req.body; 
        await itemsModel.toggleFavorite(itemId, isFavorite);
        res.redirect("/favorites");
    } catch (error) {
        console.error(error);
        res.status(500).send("Error updating favorite");
    }
}

async function getFavorites(req, res) {
    try {
        const result = await itemsModel.getFavoriteItems();
        res.render("favorites/favorites-list", { favorites: result.rows });
    } catch (error) {
        console.error(error);
        res.status(500).send("Error fetching favorites");
    }
}

module.exports = { toggleFavorite, getFavorites };