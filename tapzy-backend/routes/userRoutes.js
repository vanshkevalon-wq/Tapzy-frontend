const express = require('express')
const { register, loginUser, getMe, getAllUsers } = require('../controllers/userController')
const { protect }      = require('../middleware/authMiddleware')
const { protectUser }  = require('../middleware/userAuthMiddleware')

const router = express.Router()

router.post('/register', register)
router.post('/login',    loginUser)
router.get('/me',        protectUser, getMe)
router.get('/',          protect, getAllUsers)   // admin-only

module.exports = router
