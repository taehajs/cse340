const invModel = require("../models/inventory-model");
const utilities = require("../utilities");

async function getVehicleDetail(req, res, next) {
  try {
    const invId = parseInt(req.params.invId);

    const vehicle = await invModel.getVehicleById(invId);

    if (!vehicle) {
      return next({ status: 404, message: "Vehicle not found" });
    }

    const nav = await utilities.buildNav();
    const html = utilities.buildVehicleDetail(vehicle);

    res.render("inventory/detail", {
      title: `${vehicle.inv_make} ${vehicle.inv_model}`,
      nav,
      content: html
    });

  } catch (error) {
    next(error);
  }
}

module.exports = {
  buildByClassification,
  getVehicleDetail
};
