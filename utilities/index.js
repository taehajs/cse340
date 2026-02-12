const classificationModel = require("../models/classification-model");

async function buildNav() {
  const classifications = await classificationModel.getClassifications();
  let nav = '<ul><li><a href="/">Home</a></li>';
  classifications.forEach(c => {
    nav += `<li><a href="/inventory/type/${c.classification_id}">${c.classification_name}</a></li>`;
  });
  nav += '</ul>';
  return nav;
}

async function buildClassificationGrid(inventory) {
  let grid = '<ul class="vehicle-grid">';
  inventory.forEach(v => {
    grid += `
      <li>
        <a href="/inventory/detail/${v.inv_id}">
          ${v.inv_make} ${v.inv_model} (${v.inv_year})
        </a>
      </li>
    `;
  });
  grid += '</ul>';
  return grid;
}

module.exports = { buildNav, buildClassificationGrid };
