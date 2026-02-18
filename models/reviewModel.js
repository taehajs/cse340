const pool = require("../database")

async function addReview(vehicle_id, user_id, rating, comment) {
  try {
    const sql = `
      INSERT INTO reviews (vehicle_id, user_id, rating, comment)
      VALUES ($1, $2, $3, $4)
      RETURNING *`
    const result = await pool.query(sql, [vehicle_id, user_id, rating, comment])
    return result.rows[0]

  } catch (err) {
    throw err

  }
  
}

async function getReviewsByVehicle(vehicle_id) {
  try {
    const sql = `
      SELECT r.*, u.user_firstname, u.user_lastname
      FROM reviews r
      JOIN users u ON r.user_id = u.user_id
      WHERE r.vehicle_id = $1
      ORDER BY r.created_at DESC`

    const result = await pool.query(sql, [vehicle_id])
    return result.rows
  } catch (err) {
    throw err
  }
}

module.exports = { addReview, getReviewsByVehicle }
