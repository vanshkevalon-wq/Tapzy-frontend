const Product   = require('../models/Product')
const cloudinary = require('../config/cloudinary')

/** DELETE a Cloudinary asset by publicId (silent fail) */
const destroyCloudinaryAsset = async (publicId) => {
  if (!publicId) return
  try {
    await cloudinary.uploader.destroy(publicId)
  } catch {
    // Non-fatal — log and move on
    console.warn(`[Cloudinary] Failed to delete asset: ${publicId}`)
  }
}

/**
 * GET /api/products
 * Public — all products, newest first.
 */
const getProducts = async (_req, res, next) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 })
    res.json(products)
  } catch (err) {
    next(err)
  }
}

/**
 * GET /api/products/:id
 * Public — single product + similar (same category, excluding self).
 */
const getProduct = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id)
    if (!product) return res.status(404).json({ message: 'Product not found.' })

    // Fetch similar products (same category, max 4)
    let similar = []
    if (product.category) {
      similar = await Product.find({
        _id:      { $ne: product._id },
        category: product.category,
      })
        .limit(4)
        .sort({ createdAt: -1 })
    }
    // Fallback: any other products
    if (!similar.length) {
      similar = await Product.find({ _id: { $ne: product._id } })
        .limit(4)
        .sort({ createdAt: -1 })
    }

    res.json({ product, similar })
  } catch (err) {
    next(err)
  }
}

/**
 * POST /api/products  (protected, multipart/form-data)
 * Fields: name, price, category, description
 * Files:  mainImage (single), similarImages (multiple)
 */
const createProduct = async (req, res, next) => {
  try {
    const { name, price, category, description } = req.body

    if (!name || price === undefined) {
      return res.status(400).json({ message: 'Name and price are required.' })
    }

    const product = await Product.create({
      name,
      price:         Number(price),
      category:      category || '',
      description:   description || '',
      mainImage:     req.mainImage || null,
      similarImages: req.similarImages || [],
      image:         req.mainImage?.url || '',
    })

    res.status(201).json(product)
  } catch (err) {
    next(err)
  }
}

/**
 * PUT /api/products/:id  (protected, multipart/form-data)
 * Replaces mainImage / appends similarImages if new files provided.
 */
const updateProduct = async (req, res, next) => {
  try {
    const existing = await Product.findById(req.params.id)
    if (!existing) return res.status(404).json({ message: 'Product not found.' })

    const { name, price, category, description } = req.body

    // If new mainImage uploaded, delete old one
    let mainImage = existing.mainImage
    if (req.mainImage) {
      await destroyCloudinaryAsset(existing.mainImage?.publicId)
      mainImage = req.mainImage
    }

    // Append new similarImages to existing list
    let similarImages = existing.similarImages || []
    if (req.similarImages?.length) {
      similarImages = [...similarImages, ...req.similarImages]
    }

    const updated = await Product.findByIdAndUpdate(
      req.params.id,
      {
        name:          name          ?? existing.name,
        price:         price != null  ? Number(price) : existing.price,
        category:      category      ?? existing.category,
        description:   description   ?? existing.description,
        mainImage,
        similarImages,
        image:         mainImage?.url || existing.image,
      },
      { new: true, runValidators: true }
    )

    res.json(updated)
  } catch (err) {
    next(err)
  }
}

/**
 * DELETE /api/products/:id  (protected)
 * Also removes all associated Cloudinary assets.
 */
const deleteProduct = async (req, res, next) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id)
    if (!product) return res.status(404).json({ message: 'Product not found.' })

    // Clean up Cloudinary assets
    await destroyCloudinaryAsset(product.mainImage?.publicId)
    await Promise.all(
      (product.similarImages || []).map((img) => destroyCloudinaryAsset(img.publicId))
    )

    res.json({ message: 'Product deleted.' })
  } catch (err) {
    next(err)
  }
}

/**
 * DELETE /api/products/:id/similar-image/:publicId  (protected)
 * Remove a single similar image from a product.
 */
const deleteSimilarImage = async (req, res, next) => {
  try {
    const { id, publicId } = req.params
    const decodedPublicId = decodeURIComponent(publicId)

    const product = await Product.findById(id)
    if (!product) return res.status(404).json({ message: 'Product not found.' })

    await destroyCloudinaryAsset(decodedPublicId)

    product.similarImages = product.similarImages.filter(
      (img) => img.publicId !== decodedPublicId
    )
    await product.save()

    res.json(product)
  } catch (err) {
    next(err)
  }
}

module.exports = {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
  deleteSimilarImage,
}
