const express = require("express")
const router = express.Router()
const { requireAuth, checkRole } = require("../middleware/authMiddleware")

router.get("/management", requireAuth, checkRole("Admin"), (req, res) => {
  res.render("inventory/management", { user: req.user })
})

router.get("/add-vehicle", requireAuth, checkRole("Employee", "Admin"), (req, res) => {
    
  res.render("inventory/add-vehicle", { user: req.user })

})

module.exports = router
