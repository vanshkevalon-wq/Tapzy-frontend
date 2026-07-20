const express = require('express')
const { login, changePassword, getMe } = require('../controllers/authController')
const { protect } = require('../middleware/authMiddleware')

const router = express.Router()

router.post('/login',    login)
router.get('/me',        protect, getMe)
router.put('/password',  protect, changePassword)

module.exports = router
