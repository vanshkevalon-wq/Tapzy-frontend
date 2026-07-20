const mongoose = require('mongoose')
const bcrypt   = require('bcryptjs')

const adminSchema = new mongoose.Schema(
  {
    name:     { type: String, required: true, trim: true },
    email:    { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: { type: String, required: true, minlength: 8 },
  },
  { timestamps: true }
)

// Hash password before save
adminSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next()
  this.password = await bcrypt.hash(this.password, 12)
  next()
})

// Compare plain password with hash
adminSchema.methods.comparePassword = function (plain) {
  return bcrypt.compare(plain, this.password)
}

// Strip password from JSON output
adminSchema.methods.toJSON = function () {
  const obj = this.toObject()
  delete obj.password
  return obj
}

module.exports = mongoose.model('Admin', adminSchema)
