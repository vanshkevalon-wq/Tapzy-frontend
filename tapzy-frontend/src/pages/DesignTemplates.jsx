import { motion } from 'framer-motion'

export default function DesignTemplates() {
  return (
    <main className="bg-offwhite min-h-screen">
      <div className="h-1.5 w-full bg-brand-gradient" />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="w-20 h-20 rounded-3xl bg-primary-100 flex items-center justify-center mx-auto mb-6">
            <span className="icon text-4xl text-primary-500">brush</span>
          </div>
          <h1 className="text-4xl font-extrabold text-plum mb-4">Editable Design Templates</h1>
          <p className="text-plum/50 text-lg max-w-xl mx-auto">
            Browse and customise professionally designed NFC card templates. Coming soon.
          </p>
        </motion.div>
      </div>
    </main>
  )
}
