const Contact = require('../models/Contact')
const Product = require('../models/Product')

/**
 * POST /api/contact  (public)
 * Body: { name, email, phone, subject, message }
 */
const submitContact = async (req, res, next) => {
  try {
    const { name, email, phone, subject, message } = req.body

    if (!name || !email || !message) {
      return res.status(400).json({ message: 'Name, email, and message are required.' })
    }

    const submission = await Contact.create({ name, email, phone, subject, message })
    res.status(201).json({ success: true, message: 'Message received.', id: submission._id })
  } catch (err) {
    next(err)
  }
}

/**
 * GET /api/contact  (protected)
 * Returns all submissions, newest first.
 */
const getSubmissions = async (_req, res, next) => {
  try {
    const submissions = await Contact.find().sort({ createdAt: -1 })
    res.json(submissions)
  } catch (err) {
    next(err)
  }
}

/**
 * PATCH /api/contact/:id/read  (protected)
 */
const markRead = async (req, res, next) => {
  try {
    const submission = await Contact.findByIdAndUpdate(
      req.params.id,
      { read: true, status: 'read' },
      { new: true }
    )
    if (!submission) return res.status(404).json({ message: 'Submission not found.' })
    res.json(submission)
  } catch (err) {
    next(err)
  }
}

/**
 * DELETE /api/contact/:id  (protected)
 */
const deleteSubmission = async (req, res, next) => {
  try {
    const submission = await Contact.findByIdAndDelete(req.params.id)
    if (!submission) return res.status(404).json({ message: 'Submission not found.' })
    res.json({ message: 'Submission deleted.' })
  } catch (err) {
    next(err)
  }
}

/**
 * GET /api/admin/stats  (protected)
 */
const getStats = async (_req, res, next) => {
  try {
    const [products, contacts, unread, categoriesRaw] = await Promise.all([
      Product.countDocuments(),
      Contact.countDocuments(),
      Contact.countDocuments({ status: 'unread' }),
      Product.distinct('category'),
    ])

    res.json({
      products,
      contacts,
      unread,
      categories: categoriesRaw.filter(Boolean).length,
    })
  } catch (err) {
    next(err)
  }
}

module.exports = { submitContact, getSubmissions, markRead, deleteSubmission, getStats }
