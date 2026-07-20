const express = require('express')
const {
  submitContact,
  getSubmissions,
  markRead,
  deleteSubmission,
} = require('../controllers/contactController')
const { protect } = require('../middleware/authMiddleware')

const router = express.Router()

router.post('/',           submitContact)
router.get('/',            protect, getSubmissions)
router.patch('/:id/read',  protect, markRead)
router.delete('/:id',      protect, deleteSubmission)

module.exports = router
