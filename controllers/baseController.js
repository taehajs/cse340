const classificationModel = require("../models/classification-model");
const utilities = require("../utilities/");

async function buildHome(req, res, next) {
  try {
    const classifications = await classificationModel.getClassifications();
    const nav = await utilities.getNav(); 
    res.render("index", { 
      title: "Home", 
      nav 
    });
  } catch (error) {
    next(error);
  }
}

module.exports = { buildHome };
