const express = require("express")
const router = express.Router()
const pool = require("../database")
const bcrypt = require("bcryptjs"  )

const jwt = require("jsonwebtoken")



router.get("/register", (req, res) => res.render("auth/register"))
router.post("/register", async (req, res) => {
  const { user_firstname, user_lastname, user_email, user_password } = req.body
  const hash = await bcrypt.hash(user_password, 10)
  await pool.query(
    "INSERT INTO users (user_firstname,user_lastname,user_email,user_password,user_level) VALUES ($1,$2,$3,$4,$5)",
    [user_firstname, user_lastname, user_email, hash, "Customer"]
  )
  res.redirect("/login")
})


router.get("/login", (req, res) => res.render("auth/login"))
router.post("/login", async (req, res) => {

  const { user_email, user_password } = req.body
  const user = await pool.query("SELECT * FROM users WHERE user_email=$1", [user_email]).then(d => d.rows[0])
  if (user && await bcrypt.compare(user_password, user.user_password)) {
    const token = jwt.sign(
      { id: user.user_id, email: user.user_email, role: user.user_level },
      process.env.JWT_SECRET,
      
      { expiresIn: "1h" }
    )
    res.cookie("jwt", token, { httpOnly: true })
    return res.redirect("/account")
  }
  res.redirect("/login")
})


router.get("/logout", (req, res) => {
  res.clearCookie("jwt")
  res.redirect("/")
})

module.exports = router
