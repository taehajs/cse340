const express = require("express")
const router = express.Router()

const { requireAuth, checkRole } = require("../middleware/authMiddleware")
const invController = require("../controllers/inventory-controller")


router.get("/management", requireAuth, checkRole("Admin"), (req, res) => {
  res.render("inventory/management", { user: req.user })
})


router.get("/add-vehicle", requireAuth, checkRole("Employee", "Admin"), invController.buildAddVehicleForm)


router.post("/add-vehicle", requireAuth, checkRole("Employee", "Admin"), invController.addVehicle)


router.get("/filter-price", requireAuth, checkRole("Employee", "Admin"), invController.showPriceFilter)

module.exports = router
