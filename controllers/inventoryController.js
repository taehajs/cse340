const pool = require("../database");


async function buildByClassification(req, res, next) {
  try {
    const classificationId = req.params.classificationId;

    const result = await pool.query(
      "SELECT * FROM inventory WHERE classification_id = $1",
      [classificationId]
    );

    res.render("inventory/classification", {
      title: "Vehicle List",
      inventory: result.rows,
      nav: null,
      user: null
    });

  } catch (error) {
    next(error);
  }
}



async function getVehicleDetail(req, res, next) {
  try {
    const invId = req.params.invId;

    const result = await pool.query(
      "SELECT * FROM inventory WHERE inv_id = $1",
      [invId]
    );

    res.render("inventory/detail", {
      title: "Vehicle Detail",
      vehicle: result.rows[0],
      nav: null,
      user: null
    });

  } catch (error) {
    next(error);
  }
}


module.exports = {
  buildByClassification,
  getVehicleDetail
};
