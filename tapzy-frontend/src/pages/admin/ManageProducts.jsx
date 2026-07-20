import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Sidebar from '../../components/admin/Sidebar'
import ProductTable from '../../components/admin/ProductTable'
import ProductForm from '../../components/admin/ProductForm'
import Modal from '../../components/common/Modal'
import Button from '../../components/common/Button'
import api from '../../services/api'
import { PageLoader } from '../../components/common/Loader'

export default function ManageProducts() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [formOpen, setFormOpen] = useState(false)
  const [editTarget, setEditTarget] = useState(null)
  const [saving, setSaving] = useState(false)

  const fetchProducts = () => {
    setLoading(true)
    api
      .get('/products')
      .then(({ data }) => setProducts(data))
      .catch((err) => {
        console.error('Failed to fetch products:', err)
        alert('Failed to load products')
      })
      .finally(() => setLoading(false))
  }

  useEffect(() => { fetchProducts() }, [])

  const handleSubmit = async ({ mainImageFile, similarFiles, ...fields }) => {
    setSaving(true)
    try {
      const fd = new FormData()
      
      // Append text fields
      fd.append('name', fields.name)
      fd.append('price', fields.price)
      fd.append('category', fields.category || '')
      fd.append('description', fields.description || '')

      // Append main image if provided
      if (mainImageFile) {
        fd.append('mainImage', mainImageFile)
      }

      // Append similar images if provided
      if (similarFiles && similarFiles.length > 0) {
        similarFiles.forEach((file) => {
          fd.append('similarImages', file)
        })
      }

      if (editTarget) {
        await api.put(`/products/${editTarget._id}`, fd)
      } else {
        await api.post('/products', fd)
      }

      setFormOpen(false)
      setEditTarget(null)
      fetchProducts()
    } catch (err) {
      console.error('Failed to save product:', err)
      const msg = err.response?.data?.message || err.message || 'Failed to save product'
      alert(`Error: ${msg}`)
    } finally {
      setSaving(false)
    }
  }

  const handleEdit = (product) => {
    setEditTarget(product)
    setFormOpen(true)
  }

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this product? This will also remove all associated images from Cloudinary.')) return
    try {
      await api.delete(`/products/${id}`)
      fetchProducts()
    } catch (err) {
      console.error('Failed to delete product:', err)
      alert('Failed to delete product')
    }
  }

  const handleRemoveSimilarImage = async (productId, publicId) => {
    if (!window.confirm('Remove this image?')) return
    try {
      await api.delete(`/products/${productId}/similar-image/${encodeURIComponent(publicId)}`)
      // Update local state
      setProducts((prev) =>
        prev.map((p) =>
          p._id === productId
            ? { ...p, similarImages: p.similarImages.filter((img) => img.publicId !== publicId) }
            : p
        )
      )
      // If editing this product, update editTarget
      if (editTarget?._id === productId) {
        setEditTarget((prev) => ({
          ...prev,
          similarImages: prev.similarImages.filter((img) => img.publicId !== publicId),
        }))
      }
    } catch (err) {
      console.error('Failed to remove image:', err)
      alert('Failed to remove image')
    }
  }

  return (
    <div className="flex h-screen w-screen max-w-full overflow-hidden bg-offwhite">
      <Sidebar />
      {/* Content column */}
      <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
        {/* Mobile top-bar spacer */}
        <div className="md:hidden h-14 flex-shrink-0" />
        <main className="flex-1 overflow-y-auto admin-scroll">
          <div className="p-4 md:p-8 lg:p-10 max-w-7xl mx-auto w-full">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
                <div>
                  <h1 className="text-2xl sm:text-3xl font-bold text-plum">Manage Products</h1>
                  <p className="text-plum/60 text-sm mt-1">
                    {products.length} {products.length === 1 ? 'product' : 'products'}
                  </p>
                </div>
                <Button onClick={() => { setEditTarget(null); setFormOpen(true) }} variant="primary" size="md">
                  + Add Product
                </Button>
              </div>

              {loading ? (
                <PageLoader />
              ) : products.length === 0 ? (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-20">
                  <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary-100 text-primary-500 mb-4">
                    <span className="icon text-5xl">inventory_2</span>
                  </div>
                  <h3 className="text-xl font-semibold text-plum mb-2">No products yet</h3>
                  <p className="text-plum/60 mb-6">Get started by adding your first product</p>
                  <Button onClick={() => { setEditTarget(null); setFormOpen(true) }} variant="primary">
                    Add Your First Product
                  </Button>
                </motion.div>
              ) : (
                <ProductTable products={products} onEdit={handleEdit} onDelete={handleDelete} />
              )}

              <Modal
                isOpen={formOpen}
                onClose={() => { setFormOpen(false); setEditTarget(null) }}
                title={editTarget ? 'Edit Product' : 'Add Product'}
              >
                <ProductForm
                  initialData={editTarget}
                  onSubmit={handleSubmit}
                  onCancel={() => { setFormOpen(false); setEditTarget(null) }}
                  onRemoveExisting={editTarget ? (publicId) => handleRemoveSimilarImage(editTarget._id, publicId) : undefined}
                  loading={saving}
                />
              </Modal>
            </motion.div>
          </div>
        </main>
      </div>
    </div>
  )
}
