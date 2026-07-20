const jwt   = require('jsonwebtoken')
const Admin = require('../models/Admin')

/** Generate a signed JWT for an admin id */
const signToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || '7d',
  })

/**
 * POST /api/auth/login
 * Body: { email, password }
 * Returns: { token, admin }
 */
const login = async (req, res, next) => {
  try {
    const { email, password } = req.body

    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required.' })
    }

    const admin = await Admin.findOne({ email })
    if (!admin || !(await admin.comparePassword(password))) {
      return res.status(401).json({ message: 'Invalid credentials.' })
    }

    const token = signToken(admin._id)
    res.json({ token, admin })
  } catch (err) {
    next(err)
  }
}

/**
 * PUT /api/auth/password  (protected)
 * Body: { currentPassword, newPassword }
 */
const changePassword = async (req, res, next) => {
  try {
    const { currentPassword, newPassword } = req.body

    if (!currentPassword || !newPassword) {
      return res.status(400).json({ message: 'Both currentPassword and newPassword are required.' })
    }

    if (newPassword.length < 8) {
      return res.status(400).json({ message: 'New password must be at least 8 characters.' })
    }

    // req.admin is attached by the protect middleware
    const admin = await Admin.findById(req.admin._id)
    if (!(await admin.comparePassword(currentPassword))) {
      return res.status(401).json({ message: 'Current password is incorrect.' })
    }

    admin.password = newPassword // pre-save hook will hash it
    await admin.save()

    res.json({ message: 'Password updated successfully.' })
  } catch (err) {
    next(err)
  }
}

/**
 * GET /api/auth/me  (protected)
 * Returns the currently authenticated admin.
 */
const getMe = async (req, res) => {
  res.json({ admin: req.admin })
}

module.exports = { login, changePassword, getMe }
