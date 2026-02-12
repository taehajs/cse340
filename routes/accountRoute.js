const express = require("express")
const router = express.Router()
const accountModel = require("../models/account-model")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const { requireAuth } = require("../middleware/authMiddleware")


router.get("/login", (req, res) => res.render("account/login"))
router.post("/login", async (req, res) => {

  const { email, password } = req.body
  const account = await accountModel.getAccountByEmail(email)
  if (!account) return res.render("account/login", { message: "Invalid login." })

  const match = await bcrypt.compare(password, account.password)
  if (!match) return res.render("account/login", { message: "Invalid login." })

  const token = jwt.sign({ id: account.account_id, role: account.role, email: account.email }, process.env.JWT_SECRET, { expiresIn: "1h" })
  res.cookie("jwt", token, { httpOnly: true })
  res.redirect("/")
})

router.get("/logout", (req, res) => {
  res.clearCookie("jwt")
  res.redirect("/")
})

router.get("/profile", requireAuth, async (req, res) => {
  const account = await accountModel.getAccountById(req.user.id)
  res.render("account/profile", { user: account })
})

router.post("/profile", requireAuth, async (req, res) => {
  const { firstName, lastName, email, password } = req.body
  let hashedPassword
  if (password) hashedPassword = await bcrypt.hash(password, 10)
  await accountModel.updateAccount(req.user.id, firstName, lastName, email, hashedPassword)
  res.redirect("/account/profile")

  
})

module.exports = router
