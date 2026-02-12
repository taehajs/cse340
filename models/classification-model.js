const pool = require("../database");

async function getClassifications() {
  const result = await pool.query(
    "SELECT * FROM classification ORDER BY classification_name"
  );
  return result.rows;
}

async function insertClassification(name) {
  const result = await pool.query(
    "INSERT INTO classification (classification_name) VALUES ($1)",
    [name]
  );
  return result.rowCount > 0;
}

module.exports = { getClassifications, insertClassification };
