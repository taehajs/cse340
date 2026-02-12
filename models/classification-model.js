const pool = require("../database")

async function getClassifications() {
  try {
    const sql = "SELECT * FROM classification ORDER BY classification_name"
    const data = await pool.query(sql)
    return data.rows
  } catch (error) {
    console.error("getClassifications error:", error)
    throw error
  }
}

module.exports = { getClassifications }


