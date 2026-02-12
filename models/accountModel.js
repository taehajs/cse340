const pool = require("../database")

async function getAccountByEmail(email) {
  const sql = "SELECT * FROM accounts WHERE email = $1"
  const result = await pool.query(sql, [email])
  return result.rows[0]
}

async function getAccountById(id) {
  const sql = "SELECT * FROM accounts WHERE account_id = $1"
  const result = await pool.query(sql, [id])
  return result.rows[0]
}

async function updateAccount(id, firstName, lastName, email, password) {
  const fields = []
  const values = []
  let idx = 1

  if (firstName) { fields.push(`first_name=$${idx++}`); values.push(firstName) }
  if (lastName) { fields.push(`last_name=$${idx++}`); values.push(lastName) }
  if (email) { fields.push(`email=$${idx++}`); values.push(email) }
  if (password) { fields.push(`password=$${idx++}`); values.push(password) }

  if (fields.length === 0) return

  const sql = `UPDATE accounts SET ${fields.join(", ")} WHERE account_id=$${idx}`
  values.push(id)
  
  await pool.query(sql, values)
}

module.exports = { getAccountByEmail, getAccountById, updateAccount }
