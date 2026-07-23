const express = require('express')
const router = express.Router()
const {
  createCustomCard,
  getCustomCards,
  updateCustomCardStatus
} = require('../controllers/customCardController')
const { protect } = require('../middleware/authMiddleware')
const { uploadCustomCardImages } = require('../middleware/uploadMiddleware')

router.route('/')
  .post(uploadCustomCardImages, createCustomCard)
  .get(protect, getCustomCards)

router.route('/:id/status')
  .put(protect, updateCustomCardStatus)

module.exports = router
