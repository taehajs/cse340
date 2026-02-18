const express = require("express")
const router = express.Router()
const { checkAuth, checkAdmin } = require("../middleware/auth")

router.get("/management", checkAuth, checkAdmin, (req, res) => {
  res.render("inventory/management")
})

router.get("/add-vehicle", checkAuth, checkAdmin, (req, res) => {
  res.render("inventory/add-vehicle")
})

module.exports = router
