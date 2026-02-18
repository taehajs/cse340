const reviewModel = require('../models/reviewModel')

exports.showReviews = async (req, res) => {
  const inv_id = parseInt(req.params.inv_id, 10)

  if (isNaN(inv_id)) {
    return res.status(400).render("error", { title: "Error", message: "Invalid vehicle ID" })
  }

  try {

    const reviews = await reviewModel.getReviewsByVehicle(inv_id)
    res.render('reviews/index', { title: "Vehicle Reviews", reviews, inv_id })
  } catch (err) {
    console.error(err)

    res.status(500).render('error', { title: "Error", message: "Internal Server Error" })
  }
}

exports.submitReview = async (req, res) => {
  const inv_id = parseInt(req.params.inv_id, 10)

  const review_author = req.user ? req.user.user_firstname : "Guest"

  const review_text = req.body.review_text

  if (!review_text || review_text.trim() === "") {
    return res.redirect(`/reviews/${inv_id}`)
  }

  try {
    await reviewModel.addReview(inv_id, review_author, review_text)
    
    res.redirect(`/reviews/${inv_id}`)
  } catch (err) {
    console.error(err)
    res.status(500).render('error', { title: "Error", message: "Internal Server Error" })
  }
}
