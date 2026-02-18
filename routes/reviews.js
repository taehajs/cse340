const express = require('express')
const router = express.Router()

const reviewController = require('../controllers/reviewController')
const { requireAuth } = require('../middleware/authMiddleware')



router.get('/:inv_id', reviewController.showReviews)


router.post('/:inv_id', requireAuth, reviewController.submitReview)



module.exports = router

