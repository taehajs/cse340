const express = require("express")
const router = express.Router()
const invModel = require("../models/inventory-model")
const classificationModel = require("../models/classification-model")
const utilities = require("../utilities")


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


router.get("/classification/:id", async (req, res, next) => {
  try {
    const classifications = await classificationModel.getClassifications()
    const nav = utilities.buildNav(classifications)
    const classificationId = req.params.id
    const inventory = await invModel.getInventoryByClassificationId(classificationId)
    const classification = classifications.find(c => c.classification_id == classificationId)

    res.render("inventory/classification", {
      title: classification ? classification.classification_name : "Classification",
      nav,
      inventory,
      user: req.user || null
    })
    
  } catch (err) {
    next(err)
  }
})

module.exports = router
