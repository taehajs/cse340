const inventoryModel = require("../models/inventory-model")
const classificationModel = require("../models/classification-model")
const utilities = require("../utilities")

exports.buildAddVehicleForm = async (req, res, next) => {
  try {
    const classifications = await classificationModel.getClassifications()
    res.render("inventory/add-vehicle", {
      title: "Add Vehicle",
      nav: utilities.buildNav(classifications),
      classifications,
      message: req.flash("message"),
    })
  } catch (error) {
    next(error)
  }
}

exports.addVehicle = async (req, res, next) => {
  try {
    const { inv_make, inv_model, inv_year, inv_price, classification_id } = req.body

    if (!inv_make || !inv_model || !inv_year || !inv_price || !classification_id) {
      req.flash("message", "Please provide all fields")
      return res.redirect("/inv/add-vehicle")
    }

    const result = await inventoryModel.insertVehicle(inv_make, inv_model, inv_year, inv_price, classification_id)

    if (result) {
      req.flash("message", `${inv_make} ${inv_model} added successfully!`)
      res.redirect("/inv/management")
    } else {
      req.flash("message", "Failed to add vehicle")
      res.redirect("/inv/add-vehicle")
    }
  } catch (error) {
    next(error)
  }
}
