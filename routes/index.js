const express = require("express")
const router = express.Router()

const invModel = require("../models/inventory-model")

const classificationModel = require("../models/classification-model")

const utilities = require("../utilities")


const { requireAuth } = require("../middleware/authMiddleware")

router.get("/", async (req, res, next) => {
  try {
    const classifications = await classificationModel.getClassifications()
    const inventory = await invModel.getAllInventory()
    const nav = utilities.buildNav(classifications)
    res.render("home", {
      title: "Home",
      nav,
      classifications,
      inventory,
      user: req.user || null,


      message: req.session.message || null
    })
  } catch (err) {
    next(err)
  }
})

module.exports = router
