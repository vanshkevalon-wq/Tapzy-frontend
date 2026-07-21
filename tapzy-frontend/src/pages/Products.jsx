import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import ProductCard from '../components/products/ProductCard'
import { SkeletonCard } from '../components/common/Loader'
import api from '../services/api'

const sortOptions = [
  { value: 'newest', label: 'Newest First' },
  { value: 'price-asc', label: 'Price: Low → High' },
  { value: 'price-desc', label: 'Price: High → Low' },
]

export default function Products() {
  const [products, setProducts] = useState([])
  const [loading, setLoading]   = useState(true)
  const [error, setError]       = useState('')
  const [sort, setSort]         = useState('newest')
  const [searchParams] = useSearchParams()

  // Pre-select category from URL ?category=X
  const [category, setCategory] = useState(() => searchParams.get('category') || 'All')
  // Pre-fill search from URL ?search=X (e.g. from navbar search)
  const [search, setSearch]     = useState(() => searchParams.get('search') || '')

  // Keep category + search in sync if URL params change
  useEffect(() => {
    const cat = searchParams.get('category')
    if (cat) setCategory(cat)
    const q = searchParams.get('search')
    if (q !== null) setSearch(q)
  }, [searchParams])

  useEffect(() => {
    api.get('/products')
      .then(({ data }) => setProducts(data))
      .catch(() => setError('Failed to load products. Please try again.'))
      .finally(() => setLoading(false))
  }, [])

  const categories = ['All', ...new Set(products.map((p) => p.category).filter(Boolean))]

  const filtered = products
    .filter((p) => {
      const matchSearch = p.name.toLowerCase().includes(search.toLowerCase())
      const matchCat    = category === 'All' || p.category === category
      return matchSearch && matchCat
    })
    .sort((a, b) => {
      if (sort === 'price-asc')  return a.price - b.price
      if (sort === 'price-desc') return b.price - a.price
      if (sort === 'newest')     return new Date(b.createdAt) - new Date(a.createdAt)
      return 0
    })

  return (
    <main className="bg-offwhite min-h-screen">
      {/* ── Hero Banner ── */}
      <div className="relative overflow-hidden bg-brand-gradient py-20 px-4">
        {/* Decorative rings */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute -top-20 -right-20 w-72 h-72 rounded-full border border-white/10" />
          <div className="absolute -bottom-24 -left-10 w-64 h-64 rounded-full border border-white/10" />
          <div className="absolute top-6 right-1/3 w-2.5 h-2.5 rounded-full bg-white/30" />
          <div className="absolute bottom-8 left-1/4 w-2 h-2 rounded-full bg-white/20" />
          <div className="absolute inset-0 bg-hero-mesh opacity-25" />
        </div>
        <div className="relative max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55 }}
          >
            <span className="inline-flex items-center gap-2 bg-white/15 border border-white/20 text-white/90 text-xs font-semibold px-4 py-1.5 rounded-full mb-6 tracking-wide">
              <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
              Premium NFC Collection
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white mb-4 leading-tight">
              Find Your Perfect Card
            </h1>
            <p className="text-white/70 text-base sm:text-lg max-w-xl mx-auto leading-relaxed">
              Every card is NFC-powered, built to last, and customised for the professional who refuses to blend in.
            </p>
          </motion.div>
        </div>
      </div>

      {/* ── Content ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

        {/* Filters row */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="flex flex-col sm:flex-row gap-3 mb-6"
        >
          {/* Search */}
          <div className="relative flex-1">
            <span className="icon absolute left-3.5 top-1/2 -translate-y-1/2 text-plum/30" style={{ fontSize: '18px' }}>search</span>
            <input
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search cards..."
              className="w-full pl-10 pr-4 py-3 rounded-2xl border border-primary-100 bg-white text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary-400 placeholder:text-plum/30 text-plum transition-all"
            />
            {search && (
              <button
                onClick={() => setSearch('')}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-plum/30 hover:text-plum/60 transition-colors"
              >
                <span className="icon text-base">close</span>
              </button>
            )}
          </div>

          {/* Sort */}
          <div className="relative">
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="appearance-none pl-4 pr-10 py-3 rounded-2xl border border-primary-100 bg-white text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-primary-400 text-plum cursor-pointer transition-all"
            >
              {sortOptions.map((o) => (
                <option key={o.value} value={o.value}>{o.label}</option>
              ))}
            </select>
            <span className="icon absolute right-3.5 top-1/2 -translate-y-1/2 text-plum/40 pointer-events-none text-base">expand_more</span>
          </div>
        </motion.div>

        {/* Category pills */}
        {categories.length > 1 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="flex flex-wrap gap-2 mb-8"
          >
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={`px-5 py-2 rounded-xl text-sm font-semibold transition-all duration-200 ${
                  category === cat
                    ? 'bg-primary-500 text-white shadow-glow-sm scale-[1.03]'
                    : 'bg-white text-plum/60 border border-primary-100 hover:border-primary-300 hover:text-primary-600 hover:scale-[1.02]'
                }`}
              >
                {cat}
              </button>
            ))}
          </motion.div>
        )}

        {/* Result count */}
        {!loading && !error && (
          <p className="text-xs text-plum/40 font-medium mb-6">
            Showing <span className="text-primary-500 font-bold">{filtered.length}</span> {filtered.length === 1 ? 'product' : 'products'}
            {search && <> for "<span className="text-plum/60">{search}</span>"</>}
          </p>
        )}

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 rounded-2xl px-5 py-4 mb-8 text-sm font-medium">
            {error}
          </div>
        )}

        {/* Grid */}
        {loading ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {Array.from({ length: 8 }).map((_, i) => <SkeletonCard key={i} />)}
          </div>
        ) : filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <div className="w-20 h-20 rounded-3xl bg-primary-50 flex items-center justify-center mb-5 text-4xl">
              🔍
            </div>
            <p className="text-plum font-bold text-lg mb-1">No products found</p>
            <p className="text-plum/40 text-sm">Try adjusting your search or filters</p>
            <button
              onClick={() => { setSearch(''); setCategory('All') }}
              className="mt-5 px-5 py-2.5 rounded-xl text-sm font-semibold text-primary-600 border-2 border-primary-200 hover:bg-primary-50 transition-all"
            >
              Clear Filters
            </button>
          </div>
        ) : (
          <AnimatePresence mode="popLayout">
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
              {filtered.map((p, i) => (
                <motion.div
                  key={p._id}
                  layout
                  initial={{ opacity: 0, scale: 0.94 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.94 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <ProductCard product={p} />
                </motion.div>
              ))}
            </div>
          </AnimatePresence>
        )}
      </div>

      {/* ── Bottom CTA Strip ── */}
      {!loading && filtered.length > 0 && (
        <div className="mt-8 py-14 px-4 bg-white border-t border-primary-50">
          <div className="max-w-2xl mx-auto text-center">
            <p className="text-plum/50 text-sm mb-2 font-medium">Can't find what you're looking for?</p>
            <h3 className="text-2xl font-extrabold text-plum mb-5">Need a custom order?</h3>
            <a
              href="/contact"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-2xl font-bold text-white bg-brand-gradient shadow-glow-sm hover:shadow-glow hover:scale-[1.02] transition-all"
            >
              Contact Us
              <span className="icon text-base">arrow_forward</span>
            </a>
          </div>
        </div>
      )}
    </main>
  )
}
