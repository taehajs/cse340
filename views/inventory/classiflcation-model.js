const pool = require("../database/index")

async function getInventoryByClassificationId(classificationId) {
  try {
    const sql = "SELECT * FROM inventory WHERE classification_id = $1"
    const data = await pool.query(sql, [classificationId])
    return data.rows
  } catch (error) {
    throw error
  }
}

module.exports = { getInventoryByClassificationId }
