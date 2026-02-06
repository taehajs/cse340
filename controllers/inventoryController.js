const invModel = require("../models/inventory-model")
const classificationModel = require("../models/classification-model")
const utilities = require("../utilities")

async function showManagement(req, res, next) {
  try {
    const classifications = await classificationModel.getClassifications()
    const nav = utilities.buildNav(classifications)
    res.render("inventory/management", {
      title: "Inventory Management",
      nav,
      message: req.session.message
    })
  } catch (err) {
    console.log("error in showManagement", err)
    next(err)
  }
}


exports.showAddClassification = async function (req, res) {
  const classifications = await classificationModel.getClassifications()
  const nav = utilities.buildNav(classifications)
  res.render("inventory/add-classification", {
    title: "Add Classification",
    nav,
    message: req.session.message
  })
}


exports.addClassification = async function (req, res) {
  const { classification_name } = req.body
  if (!classification_name || classification_name.length < 3) {
    req.session.message = "Invalid classification name"
    return res.redirect("/inventory/add-classification")
  }
  const result = await classificationModel.insertClassification(classification_name)
  req.session.message = result ? "Classification added" : "Insert failed"
  res.redirect("/inventory/management")
}


exports.showAddVehicle = async function (req, res) {
  const classifications = await classificationModel.getClassifications()
  const nav = utilities.buildNav(classifications)
  res.render("inventory/add-vehicle", {
    title: "Add Vehicle",
    nav,
    message: req.session.message,
    data: req.body
  })
}


exports.addVehicle = async function (req, res) {
  const { inv_make, inv_model, inv_year, inv_price, classification_id } = req.body
  if (!inv_make || !inv_model || !inv_year || !inv_price || !classification_id) {
    req.session.message = "All fields required"
    const classifications = await classificationModel.getClassifications()
    const nav = utilities.buildNav(classifications)
    return res.render("inventory/add-vehicle", {
      title: "Add Vehicle",
      nav,
      message: req.session.message,
      data: req.body
    })
  }
  const result = await invModel.insertVehicle(inv_make, inv_model, inv_year, inv_price, classification_id)
  req.session.message = result ? "Vehicle added" : "Insert failed"
  res.redirect("/inventory/management")
}



async function buildByClassificationId(req, res, next) {
  try {
    const classificationId = req.params.classificationId
    const data = await invModel.getInventoryByClassificationId(classificationId)
    const classifications = await classificationModel.getClassifications()
    const nav = utilities.buildNav(classifications)

    if (!data || data.length === 0) {
      console.log("no vehicles for this id:", classificationId)
      return res.render("inventory/classification", {
        title: "No vehicles",
        nav,
        grid: "<p>Nothing found...</p>"
      })
    }

    const grid = utilities.buildClassificationGrid(data)
    res.render("inventory/classification", {
      title: data[0].classification_name + " cars",
      nav,
      grid
    })
  } catch (err) {
    console.log("error in buildByClassificationId", err)
    next(err)
  }
}




async function buildById(req, res, next) {
  try {
    const invId = req.params.invId
    const data = await invModel.getVehicleById(invId)
    const classifications = await classificationModel.getClassifications()
    const nav = utilities.buildNav(classifications)

    if (!data) {
      console.log("vehicle not found:", invId)
      return res.render("inventory/detail", {
        title: "Not found",
        nav,
        vehicle: {}
      })
    }

    res.render("inventory/detail", {
      title: data.inv_make + " " + data.inv_model,
      nav,
      vehicle: data
    })
  } catch (err) {
    console.log("error in buildById", err)
    next(err)
  }
  
}

function triggerError(req, res, next) {
  try {
    throw new Error("test error!!")
  } catch (err) {
    console.log("triggerError:", err.message)
    next(err)
  }
}




module.exports = {
  showManagement,
  showAddClassification,
  addClassification,
  showAddVehicle,
  addVehicle,
  buildByClassificationId,
  buildById,
  triggerError
}

