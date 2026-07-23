import { useState, useEffect } from 'react'
import ImageUploader, { MultiImageUploader } from '../common/ImageUploader'

const EMPTY = { 
  name: '', price: '', category: '', description: '',
  specMaterial: 'Metal', specTechnology: 'NFC', specCompatibility: 'All NFC-enabled devices',
  specDimensions: '163 x 255 mm', specWaterproof: 'Yes'
}

export default function ProductForm({ initialData = null, onSubmit, onCancel, onRemoveExisting, loading = false }) {
  const [form, setForm]             = useState(EMPTY)
  const [mainImageFile, setMainImageFile] = useState(null)
  const [similarFiles, setSimilarFiles]   = useState([])
  const [errors, setErrors]         = useState({})

  useEffect(() => {
    if (initialData) {
      setForm({
        name:        initialData.name || '',
        price:       initialData.price ?? '',
        category:    initialData.category || '',
        description: initialData.description || '',
        specMaterial: initialData.specifications?.material || 'Metal',
        specTechnology: initialData.specifications?.technology || 'NFC',
        specCompatibility: initialData.specifications?.compatibility || 'All NFC-enabled devices',
        specDimensions: initialData.specifications?.dimensions || '163 x 255 mm',
        specWaterproof: initialData.specifications?.waterproof || 'Yes',
      })
    } else {
      setForm(EMPTY)
      setMainImageFile(null)
      setSimilarFiles([])
    }
  }, [initialData])

  const validate = () => {
    const e = {}
    if (!form.name.trim()) e.name = 'Name is required'
    if (!form.price || isNaN(Number(form.price))) e.price = 'Valid price is required'
    return e
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
    setErrors((prev) => ({ ...prev, [name]: undefined }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length) { setErrors(errs); return }
    onSubmit?.({ 
      ...form, 
      specifications: {
        material: form.specMaterial,
        technology: form.specTechnology,
        compatibility: form.specCompatibility,
        dimensions: form.specDimensions,
        waterproof: form.specWaterproof
      },
      mainImageFile, 
      similarFiles 
    })
  }

  const inputClass = (hasError) =>
    `w-full px-4 py-2.5 rounded-xl border text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-primary-400 ${
      hasError ? 'border-red-300 bg-red-50' : 'border-gray-200 focus:border-primary-300'
    }`

  return (
    <form onSubmit={handleSubmit} className="space-y-5" noValidate>
      <div>
        <label className="block text-xs font-semibold text-plum/60 uppercase tracking-wide mb-1.5" htmlFor="name">Product Name</label>
        <input id="name" name="name" type="text" value={form.name} onChange={handleChange} placeholder="e.g. Premium NFC Card" className={inputClass(errors.name)} />
        {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name}</p>}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-plum/60 uppercase tracking-wide mb-1.5" htmlFor="price">Price (₹)</label>
          <input id="price" name="price" type="number" value={form.price} onChange={handleChange} placeholder="999" className={inputClass(errors.price)} />
          {errors.price && <p className="text-xs text-red-500 mt-1">{errors.price}</p>}
        </div>
        <div>
          <label className="block text-xs font-semibold text-plum/60 uppercase tracking-wide mb-1.5" htmlFor="category">Category</label>
          <input id="category" name="category" type="text" value={form.category} onChange={handleChange} placeholder="e.g. Premium" className={inputClass(false)} />
        </div>
      </div>

      <div>
        <label className="block text-xs font-semibold text-plum/60 uppercase tracking-wide mb-1.5" htmlFor="description">Description</label>
        <textarea
          id="description" name="description" rows={3}
          value={form.description} onChange={handleChange}
          placeholder="Product description..."
          className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-primary-300 resize-none"
        />
      </div>

      {/* Specifications */}
      <div className="space-y-4 pt-4 border-t border-gray-100">
        <h4 className="text-sm font-bold text-plum">Product Specifications</h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-plum/60 uppercase tracking-wide mb-1.5" htmlFor="specMaterial">Material</label>
            <input id="specMaterial" name="specMaterial" type="text" value={form.specMaterial} onChange={handleChange} className={inputClass(false)} />
          </div>
          <div>
            <label className="block text-xs font-semibold text-plum/60 uppercase tracking-wide mb-1.5" htmlFor="specTechnology">Technology</label>
            <input id="specTechnology" name="specTechnology" type="text" value={form.specTechnology} onChange={handleChange} className={inputClass(false)} />
          </div>
          <div>
            <label className="block text-xs font-semibold text-plum/60 uppercase tracking-wide mb-1.5" htmlFor="specCompatibility">Compatibility</label>
            <input id="specCompatibility" name="specCompatibility" type="text" value={form.specCompatibility} onChange={handleChange} className={inputClass(false)} />
          </div>
          <div>
            <label className="block text-xs font-semibold text-plum/60 uppercase tracking-wide mb-1.5" htmlFor="specDimensions">Dimensions</label>
            <input id="specDimensions" name="specDimensions" type="text" value={form.specDimensions} onChange={handleChange} className={inputClass(false)} />
          </div>
          <div>
            <label className="block text-xs font-semibold text-plum/60 uppercase tracking-wide mb-1.5" htmlFor="specWaterproof">Waterproof</label>
            <input id="specWaterproof" name="specWaterproof" type="text" value={form.specWaterproof} onChange={handleChange} className={inputClass(false)} />
          </div>
        </div>
      </div>

      <ImageUploader
        label="Main Image"
        onUpload={setMainImageFile}
        preview={initialData?.mainImage?.url || initialData?.image || ''}
      />

      <MultiImageUploader
        onUpload={(files) => setSimilarFiles(files)}
        existingImages={initialData?.similarImages || []}
        onRemoveExisting={onRemoveExisting}
      />

      <div className="flex gap-3 pt-2">
        <button
          type="submit"
          disabled={loading}
          className="flex-1 py-3 rounded-xl font-bold text-white bg-brand-gradient shadow-glow-sm hover:shadow-glow transition-all disabled:opacity-50"
        >
          {loading ? 'Saving...' : initialData ? 'Update Product' : 'Add Product'}
        </button>
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="flex-1 py-3 rounded-xl font-semibold text-plum/60 border border-gray-200 hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  )
}
