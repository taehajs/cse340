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

// 여기에 추가 기능 함수들
async function triggerError(req, res, next) {
  try {
    throw new Error("Test error!!")
  } catch (err) {
    next(err)
  }
}

async function showAddClassification(req, res) {
  const nav = await utilities.buildNav()
  res.render("inventory/add-classification", { title: "Add Classification", nav, message: req.session.message })
}

async function addClassification(req, res) {
  const { classification_name } = req.body
  if (!classification_name || classification_name.length < 3) {
    req.session.message = "Invalid classification name"
    return res.redirect("/inventory/add-classification")
  }
  const result = await classificationModel.insertClassification(classification_name)
  req.session.message = result ? "Classification added" : "Insert failed"
  res.redirect("/inventory/management")
}

async function showAddVehicle(req, res) {
  const nav = await utilities.buildNav()
  res.render("inventory/add-vehicle", { title: "Add Vehicle", nav, message: req.session.message, data: req.body })
}

async function addVehicle(req, res) {
  const { inv_make, inv_model, inv_year, inv_price, classification_id } = req.body
  if (!inv_make || !inv_model || !inv_year || !inv_price || !classification_id) {
    req.session.message = "All fields required"
    const nav = await utilities.buildNav()
    return res.render("inventory/add-vehicle", { title: "Add Vehicle", nav, message: req.session.message, data: req.body })
  }
  const result = await invModel.insertVehicle(inv_make, inv_model, inv_year, inv_price, classification_id)
  req.session.message = result ? "Vehicle added" : "Insert failed"
  res.redirect("/inventory/management")
}

module.exports = {
  showManagement,
  buildByClassificationId,
  buildById,
  triggerError,
  showAddClassification,
  addClassification,
  showAddVehicle,
  addVehicle
}
