const classificationModel = require("../models/classification-model")

async function buildNav() {
  const data = await classificationModel.getClassifications()

  let list = "<ul>"
  list += '<li><a href="/" title="Home page">Home</a></li>'

  data.forEach((row) => {
    list += `
      <li>
        <a href="/inv/type/${row.classification_id}" 
           title="See our inventory of ${row.classification_name} vehicles">
           ${row.classification_name}
        </a>
      </li>
    `
  })

  list += "</ul>"
  return list
}

function buildVehicleDetail(vehicle) {
  const price = vehicle.inv_price.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
  })

  const mileage = vehicle.inv_miles.toLocaleString("en-US")

  return `
    <section class="vehicle-detail">
      <div class="vehicle-image">
        <img src="${vehicle.inv_image}" 
             alt="Image of ${vehicle.inv_make} ${vehicle.inv_model}">
      </div>

      <div class="vehicle-info">
        <h1>${vehicle.inv_year} ${vehicle.inv_make} ${vehicle.inv_model}</h1>
        <p><strong>Price:</strong> ${price}</p>
        <p><strong>Mileage:</strong> ${mileage} miles</p>
        <p><strong>Description:</strong> ${vehicle.inv_description}</p>
      </div>
    </section>
  `
}

async function buildClassificationGrid(data) {
  let grid = '<ul class="classification-grid">'
  data.forEach((row) => {
    grid += `
      <li>
        <a href="/inv/type/${row.classification_id}" 
           title="See our inventory of ${row.classification_name} vehicles">
           ${row.classification_name}
        </a>
      </li>
    `
  })
  grid += "</ul>"
  return grid
}

module.exports = {
  buildNav,
  buildVehicleDetail,
  buildClassificationGrid,
}
