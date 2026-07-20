/**
 * Seeds 4 demo products (one per category) with images uploaded to Cloudinary.
 * Run once:  node scripts/seedProducts.js
 */
require('dotenv').config({ path: require('path').join(__dirname, '../.env') })

const mongoose  = require('mongoose')
const cloudinary = require('../config/cloudinary')
const Product   = require('../models/Product')

/* ─── Public image URLs to upload into Cloudinary ─────────────────────────── */
const PRODUCTS = [
  {
    name:        'Tapzy PVC NFC Card',
    category:    'PVC Card',
    price:       499,
    description: 'A sleek, lightweight PVC NFC business card that shares your full profile — social links, contact details, portfolio and more — with a single tap. No app needed. Standard CR80 size, full-colour printing, ISO 14443-A NFC chip included.',
    imageUrl:    'https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=600&q=80',
    folder:      'tapzy/products',
  },
  {
    name:        'Tapzy Social NFC Card',
    category:    'Social Card',
    price:       599,
    description: 'Boost your social presence with a single tap. Available for Instagram, Google Reviews, and YouTube. Crafted with premium PVC quality for longevity — just tap and watch your followers grow.',
    imageUrl:    'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=600&q=80',
    folder:      'tapzy/products',
  },
  {
    name:        'Tapzy Smart NFC Standee',
    category:    'NFC Standee',
    price:       1299,
    description: 'The perfect counter-top solution for restaurants, gyms, salons, and retail stores. Customers simply tap or scan to access your Google Reviews, social pages, menu, and more. Acrylic body with custom branding ready.',
    imageUrl:    'https://images.unsplash.com/photo-1621111848501-8d3634f82336?w=600&q=80',
    folder:      'tapzy/products',
  },
  {
    name:        'Tapzy Metal NFC Card',
    category:    'Metal Card',
    price:       1499,
    description: 'Make a lasting impression with our premium stainless-steel NFC business card. Laser engraved, ultra-durable, and packed with the same instant-tap technology. For professionals who refuse to blend in.',
    imageUrl:    'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=600&q=80',
    folder:      'tapzy/products',
  },
]

async function uploadImage(imageUrl, folder, name) {
  console.log(`  ↑ Uploading image for "${name}"...`)
  const result = await cloudinary.uploader.upload(imageUrl, {
    folder,
    use_filename: false,
    unique_filename: true,
    overwrite: false,
    transformation: [{ width: 800, height: 800, crop: 'fill', quality: 'auto' }],
  })
  return { url: result.secure_url, publicId: result.public_id }
}

;(async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI)
    console.log('✅ Connected to MongoDB\n')

    for (const p of PRODUCTS) {
      // Skip if a product with this exact name already exists
      const existing = await Product.findOne({ name: p.name })
      if (existing) {
        console.log(`⏭  Skipping "${p.name}" — already exists`)
        continue
      }

      const mainImage = await uploadImage(p.imageUrl, p.folder, p.name)
      console.log(`  ✓ Cloudinary → ${mainImage.url}`)

      await Product.create({
        name:        p.name,
        category:    p.category,
        price:       p.price,
        description: p.description,
        mainImage,
        image:       mainImage.url,
        similarImages: [],
      })
      console.log(`  ✅ Created product: "${p.name}" (${p.category}) @ ₹${p.price}\n`)
    }

    console.log('🎉 Seeding complete!')
  } catch (err) {
    console.error('❌ Seed failed:', err.message)
    process.exit(1)
  } finally {
    await mongoose.disconnect()
    process.exit(0)
  }
})()
