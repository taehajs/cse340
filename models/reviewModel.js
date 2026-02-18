const pool = require('../database')

async function getReviewsByVehicle(inv_id) {
  try {

    const sql = `
      SELECT * 
      FROM reviews 
      WHERE inv_id = $1 
      ORDER BY review_date DESC
    `
    const result = await pool.query(sql, [inv_id])
    return result.rows

  } catch (err) {
    throw err
  }
}

async function addReview(inv_id, review_author, review_text) {
  try {
    
    const sql = `
      INSERT INTO reviews (inv_id, review_author, review_text, review_date)
      VALUES ($1, $2, $3, NOW())
      RETURNING *
    `
    const result = await pool.query(sql, [inv_id, review_author, review_text])
    return result.rows[0]
  } catch (err) {
    throw err
  }
}

module.exports = { getReviewsByVehicle, addReview }
