const classificationModel = require("../models/classification-model")
const utilities = require("../utilities")

exports.buildClassificationForm = (req, res, next) => {
  res.render("inventory/add-classification", {
    title: "Add Classification",
    nav: utilities.buildNav([]),
    message: req.flash("message"),
  })
}

exports.addClassification = async (req, res, next) => {
  try {
    const { classification_name } = req.body
    if (!classification_name) {
      req.flash("message", "Please provide a classification name")
      return res.redirect("/inv/add-classification")
    }

    const result = await classificationModel.insertClassification(classification_name)

    if (result) {
      req.flash("message", `Classification '${classification_name}' added successfully!`)
      res.redirect("/inv/management")
    } else {
      req.flash("message", "Failed to add classification")
      res.redirect("/inv/add-classification")
    }
  } catch (error) {
    next(error)
  }
}
