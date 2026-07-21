require('dotenv').config()

const express    = require('express')
const cors       = require('cors')
const connectDB  = require('./config/db')
const { uploadSingle }   = require('./middleware/uploadMiddleware')
const { protect }        = require('./middleware/authMiddleware')
const { notFound, errorHandler } = require('./middleware/errorMiddleware')
const { getStats }       = require('./controllers/contactController')

const authRoutes    = require('./routes/authRoutes')
const productRoutes = require('./routes/productRoutes')
const contactRoutes = require('./routes/contactRoutes')
const userRoutes    = require('./routes/userRoutes')

// ── Connect DB ─────────────────────────────────────────────────────────────────
connectDB()

const app = express()

// ── Middleware ─────────────────────────────────────────────────────────────────
const allowedOrigins = [
  'http://localhost:5173',
  'https://tapzy-frontend.onrender.com',
  ...(process.env.CLIENT_ORIGIN ? [process.env.CLIENT_ORIGIN] : []),
]

app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (mobile apps, curl, Postman)
    if (!origin) return callback(null, true)
    if (allowedOrigins.includes(origin)) return callback(null, true)
    callback(new Error(`CORS: origin ${origin} not allowed`))
  },
  credentials: true,
}))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// ── Health Check ──────────────────────────────────────────────────────────────
const healthPayload = {
  status:  'ok',
  message: 'Tapzy API is running',
  version: '1.0.0',
  routes: {
    auth:     '/api/auth',
    products: '/api/products',
    contact:  '/api/contact',
    upload:   '/api/upload',
    stats:    '/api/admin/stats',
  },
}

app.get('/',    (_req, res) => res.json(healthPayload))
app.get('/api', (_req, res) => res.json(healthPayload))

// ── API Routes ─────────────────────────────────────────────────────────────────
app.use('/api/auth',     authRoutes)
app.use('/api/products', productRoutes)
app.use('/api/contact',  contactRoutes)
app.use('/api/users',    userRoutes)

// Legacy single-image upload endpoint (kept for backwards compat)
// POST /api/upload  { image: File }  →  { url, publicId }
app.post('/api/upload', protect, ...uploadSingle, (req, res) => {
  if (!req.cloudinary) return res.status(400).json({ message: 'No image provided.' })
  res.json({ url: req.cloudinary.url, publicId: req.cloudinary.publicId })
})

// Dashboard stats
app.get('/api/admin/stats', protect, getStats)

// ── Error Handling ─────────────────────────────────────────────────────────────
app.use(notFound)
app.use(errorHandler)

// ── Start ──────────────────────────────────────────────────────────────────────
const PORT = process.env.PORT || 5000
app.listen(PORT, () =>
  console.log(`Tapzy API ▶  http://localhost:${PORT}  [${process.env.NODE_ENV || 'development'}]`)
)
