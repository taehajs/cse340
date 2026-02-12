const invModel = require("../models/inventory-model")
const classificationModel = require("../models/classification-model")
const utilities = require("../utilities")

async function showManagement(req, res, next) {
  try {
    const nav = await utilities.buildNav()
    const message = req.session.message
    delete req.session.message
    res.render("inventory/management", { title: "Inventory Management", nav, message })
  } catch (err) { next(err) }
}

async function buildByClassificationId(req, res, next) {
  try {
    const classificationId = parseInt(req.params.classificationId)
    const data = await invModel.getInventoryByClassificationId(classificationId)
    const nav = await utilities.buildNav()

    if (!data || data.length === 0) {
      return res.render("inventory/classification", { title: "No vehicles", nav, grid: "<p>Nothing found...</p>" })
    }

    const grid = await utilities.buildClassificationGrid(data)
    res.render("inventory/classification", { title: data[0].classification_name + " cars", nav, grid })
  } catch (err) { next(err) }
}

async function buildById(req, res, next) {
  try {
    const invId = parseInt(req.params.invId)
    const data = await invModel.getVehicleById(invId)
    const nav = await utilities.buildNav()
    if (!data) return res.render("inventory/detail", { title: "Not found", nav, vehicle: {} })
    res.render("inventory/detail", { title: data.inv_make + " " + data.inv_model, nav, vehicle: data })
  } catch (err) { next(err) }
}

module.exports = { showManagement, buildByClassificationId, buildById }
