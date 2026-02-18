const pool = require("../database/index")

exports.insertClassification = async (name) => {
  try {
    const sql = "INSERT INTO classification (classification_name) VALUES ($1)"
    const result = await pool.query(sql, [name])
    return result.rowCount > 0
  } catch (error) {
    console.error(error)
    return false
  }
}

exports.getClassifications = async () => {
  try {
    const sql = "SELECT * FROM classification ORDER BY classification_name"
    const data = await pool.query(sql)
    return data.rows
  } catch (error) {
    throw error
    
  }
}
