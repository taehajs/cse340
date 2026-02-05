const { pool } = require("pg")

const pool = new pool({
    connecionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false
    }
})

module.exports = pool

