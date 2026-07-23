const multer      = require('multer')
const streamifier = require('streamifier')
const cloudinary  = require('../config/cloudinary')

// Memory storage — we stream buffers directly to Cloudinary
const multerInstance = multer({
  storage: multer.memoryStorage(),
  limits:  { fileSize: 5 * 1024 * 1024 }, // 5 MB per file
  fileFilter: (_req, file, cb) => {
    if (file.mimetype.startsWith('image/')) cb(null, true)
    else cb(new Error('Only image files are allowed'), false)
  },
})

/**
 * Stream a single file buffer to Cloudinary.
 * @returns Promise<{ url, publicId }>
 */
const streamToCloudinary = (buffer, folder = 'tapzy/products') =>
  new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        folder,
        allowed_formats: ['jpg', 'jpeg', 'png', 'webp'],
        transformation: [{ width: 1000, height: 1000, crop: 'limit', quality: 'auto' }],
      },
      (error, result) => {
        if (error) return reject(error)
        resolve({ url: result.secure_url, publicId: result.public_id })
      }
    )
    streamifier.createReadStream(buffer).pipe(stream)
  })

/**
 * Middleware: multer.single('image') + Cloudinary upload.
 * After this runs, req.cloudinary = { url, publicId }
 */
const uploadSingle = [
  multerInstance.single('image'),
  async (req, res, next) => {
    if (!req.file) return next()
    try {
      req.cloudinary = await streamToCloudinary(req.file.buffer)
      // Legacy compat
      req.file.path = req.cloudinary.url
      next()
    } catch (err) {
      next(err)
    }
  },
]

/**
 * Middleware: multer.fields([{name:'mainImage'},{name:'similarImages'}]) + Cloudinary upload.
 * After this runs:
 *   req.mainImage     = { url, publicId } | null
 *   req.similarImages = [{ url, publicId }]
 */
const uploadProductImages = [
  multerInstance.fields([
    { name: 'mainImage', maxCount: 1 },
    { name: 'similarImages', maxCount: 10 },
  ]),
  async (req, res, next) => {
    try {
      req.mainImage     = null
      req.similarImages = []

      if (req.files?.mainImage?.[0]) {
        req.mainImage = await streamToCloudinary(req.files.mainImage[0].buffer)
      }

      if (req.files?.similarImages?.length) {
        req.similarImages = await Promise.all(
          req.files.similarImages.map((f) => streamToCloudinary(f.buffer))
        )
      }

      next()
    } catch (err) {
      console.error('[Upload] Cloudinary error:', err.message)
      next(err)
    }
  },
]

/**
 * Middleware: multer.array('images', 4) + Cloudinary upload.
 * After this runs:
 *   req.customCardImages = [{ url, publicId }]
 */
const uploadCustomCardImages = [
  multerInstance.array('images', 4),
  async (req, res, next) => {
    try {
      req.customCardImages = []
      if (req.files?.length) {
        req.customCardImages = await Promise.all(
          req.files.map((f) => streamToCloudinary(f.buffer, 'tapzy/custom-cards'))
        )
      }
      next()
    } catch (err) {
      console.error('[Upload] Cloudinary error:', err.message)
      next(err)
    }
  },
]

module.exports = { uploadSingle, uploadProductImages, uploadCustomCardImages, streamToCloudinary }
