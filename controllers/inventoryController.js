const invModel = require("../models/inventory-model");
const classificationModel = require("../models/classification-model");
const utilities = require("../utilities");



async function buildByClassificationId(req, res, next) {
  try {
    const classificationId = req.params.classificationId;
    const data = await invModel.getInventoryByClassificationId(classificationId);
    const classifications = await classificationModel.getClassifications();
    const nav = utilities.buildNav(classifications);

    if (!data || data.length === 0) {
      console.log("no vehicles for this id:", classificationId);
      return res.render("inventory/classification", {
        title: "No vehicles",
        nav,
        grid: "<p>Nothing found...</p>"
      });
    }


    const grid = utilities.buildClassificationGrid(data);
    res.render("inventory/classification", {
      title: data[0].classification_name + " cars",
      nav,
      grid
    });
  } catch (err) {
    console.log("error in buildByClassificationId", err);
    next(err);
  }
}


async function buildById(req, res, next) {
  try {
    const invId = req.params.invId;
    const data = await invModel.getVehicleById(invId);
    const classifications = await classificationModel.getClassifications();
    const nav = utilities.buildNav(classifications);

    if (!data) {
      console.log("vehicle not found:", invId);
      return res.render("inventory/detail", {
        title: "Not found",
        nav,
        vehicle: {}
      });
    }



    res.render("inventory/detail", {
      title: data.inv_make + " " + data.inv_model,
      nav,
      vehicle: data
    });
  } catch (err) {
    console.log("error in buildById", err);
    next(err);
  }
}


function triggerError(req, res, next) {
  try {
    throw new Error("test error!!");
  } catch (err) {
    console.log("triggerError:", err.message);
    next(err);
  }
}

module.exports = { buildByClassificationId, buildById, triggerError };