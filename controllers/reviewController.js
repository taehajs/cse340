const reviewModel = require("../models/reviewModel")

async function showVehicleReviews(req, res) {

  const vehicle_id = req.params.vehicleId
  try {


    const reviews = await reviewModel.getReviewsByVehicle(vehicle_id)
    res.render("reviews/list", { vehicle_id, reviews, user: req.user })
  } catch (err) {

    res.status(500).render("error", { title: "Error", message: err.message })
  }
}

async function submitReview(req, res) {
  const vehicle_id = req.params.vehicleId
  
  const user_id = req.user.id
  const { rating, comment } = req.body

  try {

    await reviewModel.addReview(vehicle_id, user_id, rating, comment)
    res.redirect(`/reviews/${vehicle_id}`)
  } catch (err) {
    res.status(500).render("error", { title: "Error", message: err.message })
  }
}

module.exports = { showVehicleReviews, submitReview }
