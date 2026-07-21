import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

export default function PolicyLayout({ icon, title, subtitle, lastUpdated, children }) {
  return (
    <main className="bg-offwhite min-h-screen">
      {/* Hero */}
      <section className="bg-plum text-white py-14 px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="flex items-center gap-3 mb-4">
              <span className="icon text-3xl text-primary-300">{icon}</span>
              <span className="text-xs font-semibold text-primary-300 uppercase tracking-widest">
                Policy
              </span>
            </div>
            <h1 className="text-4xl lg:text-5xl font-extrabold mb-3">{title}</h1>
            {subtitle && (
              <p className="text-white/70 text-lg max-w-2xl leading-relaxed">{subtitle}</p>
            )}
            {lastUpdated && (
              <p className="mt-4 text-white/40 text-sm flex items-center gap-1.5">
                <span className="icon text-base">calendar_today</span>
                Last updated: {lastUpdated}
              </p>
            )}
          </motion.div>
        </div>
      </section>

      {/* Body */}
      <section className="py-12 px-4">
        <div className="max-w-4xl mx-auto space-y-6">{children}</div>
      </section>

      {/* Bottom CTA */}
      <section className="py-10 px-4 bg-white border-t border-primary-50">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-plum/60 text-sm">
            Have questions about this policy?
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 px-6 py-3 bg-brand-gradient text-white font-bold rounded-xl hover:opacity-90 transition-opacity"
          >
            <span className="icon text-base">mail</span>
            Contact Us
          </Link>
        </div>
      </section>
    </main>
  )
}

/** Reusable section card */
export function PolicySection({ title, children }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="bg-white rounded-2xl shadow-card p-8"
    >
      {title && (
        <h2 className="text-xl font-bold text-plum mb-4 pb-3 border-b border-primary-50">
          {title}
        </h2>
      )}
      <div className="text-plum/70 leading-relaxed space-y-3">{children}</div>
    </motion.div>
  )
}

/** Bullet list */
export function PolicyList({ items }) {
  return (
    <ul className="space-y-2.5 mt-2">
      {items.map((item, i) => (
        <li key={i} className="flex items-start gap-3">
          <span className="mt-1.5 w-2 h-2 rounded-full bg-primary-400 flex-shrink-0" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  )
}

/** Numbered list */
export function PolicyNumberedList({ items }) {
  return (
    <ol className="space-y-3 mt-2">
      {items.map((item, i) => (
        <li key={i} className="flex items-start gap-3">
          <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary-100 text-primary-600 text-xs font-bold flex items-center justify-center">
            {i + 1}
          </span>
          <span>{item}</span>
        </li>
      ))}
    </ol>
  )
}

/** Highlight info box */
export function PolicyHighlight({ icon, text }) {
  return (
    <div className="flex items-start gap-3 bg-primary-50 border border-primary-100 rounded-xl p-4">
      <span className="icon text-xl text-primary-500 flex-shrink-0">{icon || 'info'}</span>
      <p className="text-plum/80 text-sm leading-relaxed">{text}</p>
    </div>
  )
}

/** Table */
export function PolicyTable({ headers, rows }) {
  return (
    <div className="overflow-x-auto rounded-xl border border-primary-100 mt-2">
      <table className="w-full text-sm">
        <thead>
          <tr className="bg-primary-50">
            {headers.map((h) => (
              <th key={h} className="px-5 py-3 text-left font-semibold text-plum">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} className="border-t border-primary-50 hover:bg-offwhite transition-colors">
              {row.map((cell, j) => (
                <td key={j} className="px-5 py-3 text-plum/70">
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
