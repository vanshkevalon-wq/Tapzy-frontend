/**
 * Run once to create the initial admin account:
 *   node scripts/seedAdmin.js
 */
require('dotenv').config({ path: require('path').join(__dirname, '../.env') })
const mongoose = require('mongoose')
const Admin    = require('../models/Admin')

;(async () => {
  await mongoose.connect(process.env.MONGO_URI)
  const existing = await Admin.findOne({ email: 'admin@tapzy.com' })
  if (existing) {
    console.log('Admin already exists:', existing.email)
  } else {
    await Admin.create({
      name:     'Tapzy Admin',
      email:    'admin@tapzy.com',
      password: 'Admin@12345',
    })
    console.log('Admin created  →  admin@tapzy.com  /  Admin@12345')
  }
  await mongoose.disconnect()
  process.exit(0)
})()
