const express = require("express")
const router = express.Router()
const { requireAuth } = require("../middleware/authMiddleware")

const reviewController = require("../controllers/reviewController")


router.get("/:vehicleId", reviewController.showVehicleReviews)




router.post("/:vehicleId", requireAuth, reviewController.submitReview)

module.exports = router
