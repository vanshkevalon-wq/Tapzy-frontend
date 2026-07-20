import { motion } from 'framer-motion'
import ProductCard from './ProductCard'

export default function SimilarProducts({ products = [] }) {
  if (!products.length) return null

  return (
    <section className="mt-16 pt-12 border-t border-primary-100">
      <div className="flex items-end justify-between mb-8">
        <div>
          <span className="text-xs font-bold text-primary-500 uppercase tracking-widest">More Picks</span>
          <h2 className="text-2xl font-extrabold text-plum mt-1">You may also like</h2>
        </div>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5">
        {products.slice(0, 4).map((product, i) => (
          <motion.div
            key={product._id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08 }}
          >
            <ProductCard product={product} />
          </motion.div>
        ))}
      </div>
    </section>
  )
}
