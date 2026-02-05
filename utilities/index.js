function buildVehicleDetail(vehicle) {
  const price = vehicle.price.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
  });
  const mileage = vehicle.miles.toLocaleString("en-US");

  return `
    <section class="vehicle-detail">
      <div class="vehicle-image">
        <img src="${vehicle.image}" alt="Image of ${vehicle.make} ${vehicle.model}">
      </div>


      <div class="vehicle-info">
        <h1>${vehicle.year} ${vehicle.make} ${vehicle.model}</h1>
        <p><strong>Price:</strong> ${price}</p>
        <p><strong>Mileage:</strong> ${mileage} miles</p>
        <p><strong>Description:</strong> ${vehicle.description}</p>
      </div>
    </section>
  `;
}


module.exports = { buildVehicleDetail };
