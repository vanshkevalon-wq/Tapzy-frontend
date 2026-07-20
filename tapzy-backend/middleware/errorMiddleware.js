/**
 * Catch-all error handler — must be registered last in Express.
 */
const errorHandler = (err, _req, res, _next) => {
  const status = err.status || err.statusCode || 500
  const message = err.message || 'Internal Server Error'

  // Always log the full error for debugging
  console.error('[Error]', status, message)
  console.error(err.stack || err)

  res.status(status).json({ message })
}

/**
 * 404 handler — register before errorHandler.
 */
const notFound = (req, res, next) => {
  const err = new Error(`Not found — ${req.originalUrl}`)
  err.status = 404
  next(err)
}

module.exports = { errorHandler, notFound }
