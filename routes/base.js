const express = require("express")
const router = express.Router()
const { requireAuth } = require("../middleware/authMiddleware")

router.get("/", (req, res) => {
  res.render("index", { user: req.user || null })
})

router.get("/account", requireAuth, (req, res) => {
  res.render("account", { user: req.user })
})

module.exports = router
