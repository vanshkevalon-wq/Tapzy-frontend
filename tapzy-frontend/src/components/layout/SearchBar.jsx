import { useState, useEffect, useRef, useCallback } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import api from '../../services/api'

// Debounce hook
function useDebounce(value, delay) {
  const [debounced, setDebounced] = useState(value)
  useEffect(() => {
    const t = setTimeout(() => setDebounced(value), delay)
    return () => clearTimeout(t)
  }, [value, delay])
  return debounced
}

export default function SearchBar({ open, onClose }) {
  const [query, setQuery]     = useState('')
  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(false)
  const [focused, setFocused] = useState(false)
  const inputRef              = useRef(null)
  const containerRef          = useRef(null)
  const navigate              = useNavigate()
  const debouncedQuery        = useDebounce(query, 320)

  // Focus input when opened
  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 80)
    } else {
      setQuery('')
      setResults([])
    }
  }, [open])

  // Fetch results
  useEffect(() => {
    if (!debouncedQuery.trim()) {
      setResults([])
      return
    }
    setLoading(true)
    api.get(`/products?search=${encodeURIComponent(debouncedQuery.trim())}`)
      .then(({ data }) => setResults(data.slice(0, 6))) // max 6 in dropdown
      .catch(() => setResults([]))
      .finally(() => setLoading(false))
  }, [debouncedQuery])

  // Close on outside click
  useEffect(() => {
    function handleClick(e) {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        onClose()
      }
    }
    if (open) document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [open, onClose])

  // Close on Escape
  useEffect(() => {
    function handleKey(e) {
      if (e.key === 'Escape') onClose()
    }
    if (open) document.addEventListener('keydown', handleKey)
    return () => document.removeEventListener('keydown', handleKey)
  }, [open, onClose])

  function handleSubmit(e) {
    e.preventDefault()
    if (!query.trim()) return
    navigate(`/products?search=${encodeURIComponent(query.trim())}`)
    onClose()
  }

  const showDropdown = open && (loading || results.length > 0 || (query.trim().length > 0 && !loading))

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          key="searchbar"
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.2 }}
          className="border-t border-white/10 bg-plum/98 backdrop-blur-xl px-4 py-3"
        >
          <div ref={containerRef} className="max-w-2xl mx-auto relative">
            {/* Input row */}
            <form onSubmit={handleSubmit} className="flex items-center gap-2">
              <div className="flex-1 flex items-center gap-2.5 bg-white/10 border border-white/20 rounded-2xl px-4 py-2.5 focus-within:border-primary-400 focus-within:bg-white/15 transition-all">
                <span className="icon text-white/50 text-[20px] leading-none shrink-0">search</span>
                <input
                  ref={inputRef}
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onFocus={() => setFocused(true)}
                  onBlur={() => setFocused(false)}
                  placeholder="Search products…"
                  className="flex-1 bg-transparent text-white placeholder-white/40 text-sm font-medium outline-none"
                  autoComplete="off"
                />
                {query && (
                  <button
                    type="button"
                    onClick={() => { setQuery(''); setResults([]); inputRef.current?.focus() }}
                    className="text-white/40 hover:text-white/80 transition-colors"
                  >
                    <span className="icon text-[18px] leading-none">close</span>
                  </button>
                )}
              </div>
              <button
                type="button"
                onClick={onClose}
                className="flex items-center justify-center w-10 h-10 rounded-xl text-white/50 hover:text-white hover:bg-white/10 transition-all shrink-0"
                aria-label="Close search"
              >
                <span className="icon text-[20px] leading-none">close</span>
              </button>
            </form>

            {/* Dropdown results */}
            <AnimatePresence>
              {showDropdown && (
                <motion.div
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 6 }}
                  transition={{ duration: 0.18 }}
                  className="absolute top-full left-0 right-10 mt-2 bg-white rounded-2xl shadow-[0_16px_48px_rgba(0,0,0,0.25)] border border-primary-100 overflow-hidden z-50"
                >
                  {/* Loading */}
                  {loading && (
                    <div className="flex items-center justify-center gap-2 py-6 text-plum/40">
                      <span className="icon animate-spin text-primary-400 text-xl">progress_activity</span>
                      <span className="text-sm font-medium">Searching…</span>
                    </div>
                  )}

                  {/* No results */}
                  {!loading && query.trim() && results.length === 0 && (
                    <div className="flex flex-col items-center gap-2 py-8 text-center px-4">
                      <span className="icon text-3xl text-plum/20">search_off</span>
                      <p className="text-sm font-semibold text-plum/60">No products found for</p>
                      <p className="text-sm font-bold text-primary-600">"{query}"</p>
                    </div>
                  )}

                  {/* Results */}
                  {!loading && results.length > 0 && (
                    <>
                      <div className="px-4 pt-3 pb-1.5 flex items-center justify-between">
                        <span className="text-[11px] font-bold text-plum/30 uppercase tracking-wider">
                          {results.length} result{results.length > 1 ? 's' : ''}
                        </span>
                        <button
                          onClick={handleSubmit}
                          className="text-[11px] font-bold text-primary-500 hover:text-primary-700 transition-colors"
                        >
                          View all →
                        </button>
                      </div>

                      <ul>
                        {results.map((product, i) => {
                          const imgUrl =
                            product.mainImage?.url ||
                            product.image ||
                            'https://placehold.co/80x80/f9f0ff/A64BDF?text=T'
                          return (
                            <li key={product._id}>
                              <Link
                                to={`/products/${product._id}`}
                                onClick={onClose}
                                className={`flex items-center gap-3 px-4 py-3 hover:bg-primary-50 transition-colors group ${
                                  i < results.length - 1 ? 'border-b border-primary-50' : ''
                                }`}
                              >
                                {/* Thumbnail */}
                                <div className="w-12 h-12 rounded-xl overflow-hidden bg-primary-50 border border-primary-100 shrink-0">
                                  <img
                                    src={imgUrl}
                                    alt={product.name}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                                  />
                                </div>
                                {/* Info */}
                                <div className="flex-1 min-w-0">
                                  <p className="text-sm font-bold text-plum truncate group-hover:text-primary-700 transition-colors">
                                    {product.name}
                                  </p>
                                  {product.category && (
                                    <p className="text-[11px] text-primary-500 font-semibold mt-0.5">
                                      {product.category}
                                    </p>
                                  )}
                                </div>
                                {/* Price */}
                                <span className="text-sm font-extrabold bg-brand-gradient bg-clip-text text-transparent shrink-0">
                                  ₹{Number(product.price).toLocaleString('en-IN')}
                                </span>
                              </Link>
                            </li>
                          )
                        })}
                      </ul>

                      {/* Footer — see all */}
                      <div className="px-4 py-3 border-t border-primary-50 bg-primary-50/40">
                        <button
                          onClick={handleSubmit}
                          className="w-full flex items-center justify-center gap-2 py-2 rounded-xl text-sm font-bold text-primary-600 hover:text-primary-700 hover:bg-primary-100 transition-colors"
                        >
                          <span className="icon text-base">search</span>
                          See all results for "{query}"
                        </button>
                      </div>
                    </>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
