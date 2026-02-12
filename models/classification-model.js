const pool = require("../database/index");

async function getClassifications() {
  try {
    const sql = "SELECT * FROM classification ORDER BY classification_name";
    const data = await pool.query(sql);
    return data.rows;
  } catch (error) {
    throw error;
  }
}

async function insertClassification(name) {
  try {
    const sql = "INSERT INTO classification (classification_name) VALUES ($1)";
    const data = await pool.query(sql, [name]);
    return data.rowCount > 0;

    
  } catch (err) {
    console.error(err);
    return false;
  }
}

module.exports = { getClassifications, insertClassification };
