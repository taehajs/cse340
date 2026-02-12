const pool = require("../database");

async function insertVehicle(make, model, year, price, classification_id) {
  const result = await pool.query(`
    INSERT INTO inventory
    (inv_make, inv_model, inv_year, inv_price, classification_id)
    VALUES ($1,$2,$3,$4,$5)
  `, [make, model, parseInt(year), parseFloat(price), classification_id]);
  return result.rowCount > 0;
}

async function getInventoryByClassificationId(classification_id) {
  const result = await pool.query(
    "SELECT * FROM inventory WHERE classification_id = $1",
    [classification_id]
  );
  return result.rows;
}

async function getVehicleById(invId) {
  const result = await pool.query(
    "SELECT * FROM inventory WHERE inv_id = $1",
    [invId]
  );
  return result.rows[0];
}

module.exports = { insertVehicle, getInventoryByClassificationId, getVehicleById };
