const express = require("express")
const router = express.Router()
const pool = require("../database")
const bcrypt = require("bcryptjs")
const { body, validationResult } = require("express-validator")
const { generateToken } = require("../utilities/jwtUtils")

router.get("/register", (req, res) => res.render("auth/register"))
router.post(
  "/register",
  body("user_email").isEmail(),
  body("user_password").isLength({ min: 6 }),
  async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      req.flash("error", "Invalid data")
      return res.redirect("/register")
    }
    const { user_firstname, user_lastname, user_email, user_password } = req.body
    const hash = await bcrypt.hash(user_password, 10)
    await pool.query(
      "INSERT INTO users (user_firstname,user_lastname,user_email,user_password) VALUES ($1,$2,$3,$4)",
      [user_firstname, user_lastname, user_email, hash]
    )
    res.redirect("/login")
  }
)

router.get("/login", (req, res) => res.render("auth/login"))
router.post("/login", async (req, res) => {
  const { user_email, user_password } = req.body
  const user = await pool
    .query("SELECT * FROM users WHERE user_email=$1", [user_email])
    .then((d) => d.rows[0])

  if (user && (await bcrypt.compare(user_password, user.user_password))) {
    const token = generateToken(user)
    res.cookie("jwt", token, { httpOnly: true })
    return res.redirect("/account")
  }
  req.flash("error", "Invalid credentials")
  res.redirect("/login")
})

router.get("/logout", (req, res) => {
    
  res.clearCookie("jwt")
  res.redirect("/")
})

module.exports = router
