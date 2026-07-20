const mongoose = require('mongoose')

const imageSchema = new mongoose.Schema(
  {
    url:      { type: String, required: true },
    publicId: { type: String, required: true },
  },
  { _id: false }
)

const productSchema = new mongoose.Schema(
  {
    name:          { type: String, required: true, trim: true },
    price:         { type: Number, required: true, min: 0 },
    category:      { type: String, trim: true, default: '' },
    description:   { type: String, trim: true, default: '' },
    mainImage:     { type: imageSchema, default: null },
    similarImages: { type: [imageSchema], default: [] },
    // Legacy single-image URL field kept for backwards compat
    image:         { type: String, default: '' },
  },
  { timestamps: true }
)

// Virtual for easy image access
productSchema.virtual('imageUrl').get(function () {
  return this.mainImage?.url || this.image || ''
})

module.exports = mongoose.model('Product', productSchema)
