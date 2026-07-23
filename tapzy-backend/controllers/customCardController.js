const CustomCard = require('../models/CustomCard')

// @desc    Create a new custom card request
// @route   POST /api/custom-cards
// @access  Public
const createCustomCard = async (req, res, next) => {
  try {
    const { name, mobile, email, designation } = req.body
    
    // Get the Cloudinary image objects from the middleware
    const images = req.customCardImages || []

    const customCard = await CustomCard.create({
      name,
      mobile,
      email,
      designation,
      images,
    })

    res.status(201).json(customCard)
  } catch (error) {
    res.status(400)
    next(error)
  }
}

// @desc    Get all custom card requests
// @route   GET /api/custom-cards
// @access  Private/Admin
const getCustomCards = async (req, res, next) => {
  try {
    const customCards = await CustomCard.find({}).sort({ createdAt: -1 })
    res.json(customCards)
  } catch (error) {
    res.status(400)
    next(error)
  }
}

// @desc    Update custom card status
// @route   PUT /api/custom-cards/:id/status
// @access  Private/Admin
const updateCustomCardStatus = async (req, res, next) => {
  try {
    const { status } = req.body
    const customCard = await CustomCard.findById(req.params.id)

    if (customCard) {
      customCard.status = status
      const updatedCard = await customCard.save()
      res.json(updatedCard)
    } else {
      res.status(404)
      throw new Error('Custom Card Request not found')
    }
  } catch (error) {
    next(error)
  }
}

module.exports = {
  createCustomCard,
  getCustomCards,
  updateCustomCardStatus
}
