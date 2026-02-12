const pool = require("../database/index");

async function insertVehicle(make, model, year, price, classification_id) {
  try {
    const sql = `INSERT INTO inventory (inv_make, inv_model, inv_year, inv_price, classification_id) VALUES ($1,$2,$3,$4,$5)`;
    const data = await pool.query(sql, [make, model, parseInt(year), parseFloat(price), classification_id]);
    return data.rowCount > 0;
  } catch (err) {
    console.error(err);
    return false;
  }
  
}



async function getInventoryByClassificationId(classification_id) {
  try {
    const sql = `SELECT * FROM inventory WHERE classification_id=$1`;
    
    const data = await pool.query(sql, [classification_id]);
    return data.rows;
  } catch (err) {
    throw err;
  }
}

async function getVehicleById(invId) {
  try {
    const sql = `SELECT * FROM inventory WHERE inv_id=$1`;
    const data = await pool.query(sql, [invId]);
    return data.rows[0];
  } catch (err) {
    throw err;
  }
}

module.exports = { insertVehicle, getInventoryByClassificationId, getVehicleById };
