const express = require('express')
const {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
  deleteSimilarImage,
} = require('../controllers/productController')
const { protect } = require('../middleware/authMiddleware')
const { uploadProductImages } = require('../middleware/uploadMiddleware')

const router = express.Router()

router.get('/',       getProducts)
router.get('/:id',    getProduct)

router.post('/',      protect, uploadProductImages, createProduct)
router.put('/:id',    protect, uploadProductImages, updateProduct)
router.delete('/:id', protect, deleteProduct)
router.delete('/:id/similar-image/:publicId', protect, deleteSimilarImage)

module.exports = router
