const mongoose = require('mongoose')

const customCardSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    mobile: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    designation: {
      type: String,
      required: true,
    },
    images: [
      {
        url: { type: String, required: true },
        publicId: { type: String, required: true },
        label: { type: String }, // e.g., 'Upload your logo', 'Upload your image'
      }
    ],
    status: {
      type: String,
      enum: ['Pending', 'Reviewed', 'Approved', 'Rejected'],
      default: 'Pending',
    },
  },
  { timestamps: true }
)

module.exports = mongoose.model('CustomCard', customCardSchema)
