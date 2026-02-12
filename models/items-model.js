const pool = require("../database");

async function toggleFavorite(itemId, isFavorite) {
    const sql = `UPDATE items SET is_favorite = $1 WHERE item_id = $2`;
    return pool.query(sql, [isFavorite, itemId]);
}

async function getFavoriteItems() {
    const sql = `SELECT * FROM items WHERE is_favorite = TRUE ORDER BY name`;
    return pool.query(sql);
}

module.exports = { toggleFavorite, getFavoriteItems };