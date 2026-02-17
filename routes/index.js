function buildVehicleDetailHTML(vehicle) {
  const price = vehicle.inv_price.toLocaleString("en-US", {
    style: "currency",
    currency: "USD"
  });
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

module.exports = {
  buildVehicleDetailHTML
};