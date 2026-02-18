const pool = require("../database/index")


exports.insertVehicle = async (make, model, year, price, classification_id) => {
  try {
    const sql = `
      INSERT INTO inventory (inv_make, inv_model, inv_year, inv_price, classification_id)
      VALUES ($1, $2, $3, $4, $5)
    `
    const result = await pool.query(sql, [make, model, year, price, classification_id])
    return result.rowCount > 0
  } catch (error) {
    
    console.error(error)
    return false
  }
}


exports.getVehiclesByMaxPrice = async (maxPrice) => {
  try {
    const sql = `
      SELECT * FROM inventory
      WHERE inv_price <= $1
      ORDER BY inv_price
    `
    const data = await pool.query(sql, [maxPrice])
    return data.rows
  } catch (error) {
    console.error(error)
    return []
  }
}
