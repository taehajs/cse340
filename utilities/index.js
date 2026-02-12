const classificationModel = require("../models/classification-model");

async function buildNav() {
  const data = await classificationModel.getClassifications();
  let list = "<ul>";

  list += '<li><a href="/" title="Home page">Home</a></li>';
  data.forEach((row) => {
    list += `<li><a href="/inventory/type/${row.classification_id}" title="See our inventory of ${row.classification_name} vehicles">${row.classification_name}</a></li>`;
  });
  list += "</ul>";
  return list;
}

function buildVehicleDetail(vehicle) {
  const price = vehicle.inv_price.toLocaleString("en-US", { style: "currency", currency: "USD" });
  const mileage = vehicle.inv_miles.toLocaleString("en-US");

  return `
    <section class="vehicle-detail">
      <div class="vehicle-image">
        <img src="${vehicle.inv_image}" alt="Image of ${vehicle.inv_make} ${vehicle.inv_model}">
      </div>
      <div class="vehicle-info">
        <h1>${vehicle.inv_year} ${vehicle.inv_make} ${vehicle.inv_model}</h1>
        <p><strong>Price:</strong> ${price}</p>
        <p><strong>Mileage:</strong> ${mileage} miles</p>
        <p><strong>Description:</strong> ${vehicle.inv_description}</p>
      </div>
    </section>
  `;
}


async function buildClassificationGrid(vehicleData) {
  if (!vehicleData || vehicleData.length === 0) return "<p>No vehicles found.</p>";

  let grid = '<ul class="classification-grid">';
  vehicleData.forEach((vehicle) => {
    grid += `<li>
      <a href="/inventory/detail/${vehicle.inv_id}" title="View details of ${vehicle.inv_make} ${vehicle.inv_model}">
        ${vehicle.inv_year} ${vehicle.inv_make} ${vehicle.inv_model}
      </a>
    </li>`;
  });
  grid += "</ul>";
  return grid;
}

module.exports = { buildNav, buildVehicleDetail, buildClassificationGrid };
