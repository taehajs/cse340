const express = require("express")
const router = express.Router()
const utilities = require("../utilities")
const classificationModel = require("../models/classification-model")



router.get("/", async (req, res, next) => {
  try {
    const classifications = await classificationModel.getClassifications()
    const nav = utilities.buildNav(classifications)
    res.render("index", { title: "Home", nav })
  } catch (error) {
    next(error)
  }
})

module.exports = router