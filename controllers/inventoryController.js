const invModel = require("../models/inventory-model");
const classModel = require("../models/classification-model");
const utilities = require("../utilities");

async function showHome(req, res) {
  const nav = await utilities.buildNav();
  res.render("home", { nav });
}

async function showManagement(req, res) {
  const nav = await utilities.buildNav();
  const message = req.session.message;
  delete req.session.message;
  res.render("inventory/management", { title: "Inventory Management", nav, message });
}

async function showAddClassification(req, res) {
  const nav = await utilities.buildNav();
  res.render("inventory/add-classification", { nav, message: req.session.message });
}

async function addClassification(req, res) {
  const { classification_name } = req.body;
  if (!classification_name || classification_name.length < 3) {
    req.session.message = "Invalid classification name";
    return res.redirect("/inventory/add-classification");
  }
  await classModel.insertClassification(classification_name);
  req.session.message = "Classification added";
  res.redirect("/inventory/management");
}

async function showAddVehicle(req, res) {
  const nav = await utilities.buildNav();
  res.render("inventory/add-vehicle", { nav, message: req.session.message, data: req.body });
}

async function addVehicle(req, res) {
  const { inv_make, inv_model, inv_year, inv_price, classification_id } = req.body;
  if (!inv_make || !inv_model || !inv_year || !inv_price || !classification_id) {
    req.session.message = "All fields required";
    return res.redirect("/inventory/add-vehicle");
  }
  await invModel.insertVehicle(inv_make, inv_model, inv_year, inv_price, classification_id);
  req.session.message = "Vehicle added";
  res.redirect("/inventory/management");
}

async function buildByClassificationId(req, res) {
  const classificationId = parseInt(req.params.classificationId);
  const inventory = await invModel.getInventoryByClassificationId(classificationId);
  const nav = await utilities.buildNav();
  if (!inventory.length) {
    return res.render("inventory/classification", { title: "No vehicles", nav, grid: "<p>No vehicles found.</p>" });
  }
  const grid = await utilities.buildClassificationGrid(inventory);
  res.render("inventory/classification", { title: "Vehicles", nav, grid });
}

async function buildById(req, res) {
  const invId = parseInt(req.params.invId);
  const vehicle = await invModel.getVehicleById(invId);
  const nav = await utilities.buildNav();
  if (!vehicle) return res.render("inventory/detail", { title: "Not Found", nav, vehicle: {} });
  res.render("inventory/detail", { title: `${vehicle.inv_make} ${vehicle.inv_model}`, nav, vehicle });
}

module.exports = {
  showHome, showManagement,
  showAddClassification, addClassification,
  showAddVehicle, addVehicle,
  buildByClassificationId, buildById
};
