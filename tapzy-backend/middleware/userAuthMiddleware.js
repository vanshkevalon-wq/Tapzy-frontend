const jwt  = require('jsonwebtoken')
const User = require('../models/User')

/**
 * Protect user routes — requires valid Bearer JWT with role: 'user'.
 * Attaches req.user on success.
 */
const protectUser = async (req, res, next) => {
  const authHeader = req.headers.authorization

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Not authorised — no token' })
  }

  const token = authHeader.split(' ')[1]

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)

    if (decoded.role !== 'user') {
      return res.status(401).json({ message: 'Not authorised — invalid token type' })
    }

    req.user = await User.findById(decoded.id).select('-password')
    if (!req.user) {
      return res.status(401).json({ message: 'Not authorised — user not found' })
    }
    next()
  } catch {
    return res.status(401).json({ message: 'Not authorised — invalid token' })
  }
}

module.exports = { protectUser }
