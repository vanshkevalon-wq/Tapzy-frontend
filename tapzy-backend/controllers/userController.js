const jwt  = require('jsonwebtoken')
const User = require('../models/User')

/** Generate a signed JWT for a user id */
const signToken = (id) =>
  jwt.sign({ id, role: 'user' }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || '7d',
  })

/**
 * POST /api/users/register
 * Body: { firstName, lastName, email, password }
 */
const register = async (req, res, next) => {
  try {
    const { firstName, lastName, email, password } = req.body

    if (!firstName || !email || !password) {
      return res.status(400).json({ message: 'First name, email and password are required.' })
    }

    if (password.length < 6) {
      return res.status(400).json({ message: 'Password must be at least 6 characters.' })
    }

    const exists = await User.findOne({ email })
    if (exists) {
      return res.status(409).json({ message: 'An account with this email already exists.' })
    }

    const user = await User.create({ firstName, lastName, email, password })
    const token = signToken(user._id)

    res.status(201).json({ token, user })
  } catch (err) {
    next(err)
  }
}

/**
 * POST /api/users/login
 * Body: { email, password }
 */
const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body

    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required.' })
    }

    const user = await User.findOne({ email })
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ message: 'Invalid email or password.' })
    }

    const token = signToken(user._id)
    res.json({ token, user })
  } catch (err) {
    next(err)
  }
}

/**
 * GET /api/users/me  (protected — user token)
 */
const getMe = async (req, res) => {
  res.json({ user: req.user })
}

/**
 * GET /api/users  (admin-only — lists all registered users)
 */
const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find().sort({ createdAt: -1 }).select('-password')
    res.json({ users, total: users.length })
  } catch (err) {
    next(err)
  }
}

module.exports = { register, loginUser, getMe, getAllUsers }
