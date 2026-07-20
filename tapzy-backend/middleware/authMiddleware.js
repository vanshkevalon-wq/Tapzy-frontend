const jwt   = require('jsonwebtoken')
const Admin = require('../models/Admin')

/**
 * Protect routes — requires valid Bearer JWT.
 * Attaches req.admin on success.
 */
const protect = async (req, res, next) => {
  const authHeader = req.headers.authorization

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Not authorised — no token' })
  }

  const token = authHeader.split(' ')[1]

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    req.admin = await Admin.findById(decoded.id).select('-password')
    if (!req.admin) {
      return res.status(401).json({ message: 'Not authorised — admin not found' })
    }
    next()
  } catch {
    return res.status(401).json({ message: 'Not authorised — invalid token' })
  }
}

module.exports = { protect }
