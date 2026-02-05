const invModel = require("../../models/inventory-model");
const classificationModel = require("../../models/classification-model");
const utilities = require("../../utilities");


async function buildByClassificationId(req, res, next) {
  try {
    const classificationId = req.params.classificationId;
    const data = await invModel.getInventoryByClassificationId(classificationId);
    const grid = utilities.buildClassificationGrid(data);
    const classifications = await classificationModel.getClassifications();
    const nav = utilities.buildNav(classifications);
    res.render("inventory/classification", {
      title: data[0].classification_name + " vehicles",
      nav,
      grid
    });

  } catch (error)  { 
    next(error);
  }
}

module.exports = { buildByClassificationId };