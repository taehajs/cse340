const pool = require("../database/");



async function getAccountById(id) {
  const result = await pool.query("SELECT * FROM account WHERE account_id = $1", [id]);
  return result.rows[0];
}

async function updateAccount(id, firstname, lastname, email) {
  const sql = "UPDATE account SET account_firstname=$1, account_lastname=$2, account_email=$3 WHERE account_id=$4 RETURNING *";
  const result = await pool.query(sql, [firstname, lastname, email, id]);
  return result.rowCount;
}

async function updatePassword(id, password) {
  const sql = "UPDATE account SET account_password=$1 WHERE account_id=$2 RETURNING *";
  const result = await pool.query(sql, [password, id]);
  return result.rowCount;
}


module.exports = { getAccountById, updateAccount, updatePassword };