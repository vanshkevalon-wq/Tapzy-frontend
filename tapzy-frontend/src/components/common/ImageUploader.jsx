import { useRef, useState } from 'react'

export default function ImageUploader({ onUpload, preview = '', label = 'Main Image' }) {
  const inputRef = useRef(null)
  const [dragging, setDragging] = useState(false)
  const [localPreview, setLocalPreview] = useState(preview)

  const handleFile = (file) => {
    if (!file || !file.type.startsWith('image/')) return
    setLocalPreview(URL.createObjectURL(file))
    onUpload?.(file)
  }

  const handleDrop = (e) => {
    e.preventDefault()
    setDragging(false)
    handleFile(e.dataTransfer.files[0])
  }

  return (
    <div>
      <p className="text-xs text-gray-500 mb-1.5">{label}</p>
      <div
        className={`relative border-2 border-dashed rounded-xl transition-all cursor-pointer overflow-hidden
          ${dragging ? 'border-primary-500 bg-primary-50/50' : 'border-primary-200 hover:border-primary-400 hover:bg-primary-50/30'}`}
        onClick={() => inputRef.current?.click()}
        onDragOver={(e) => { e.preventDefault(); setDragging(true) }}
        onDragLeave={() => setDragging(false)}
        onDrop={handleDrop}
      >
        {localPreview ? (
          <div className="relative group">
            <img src={localPreview} alt="Preview" className="w-full h-48 object-cover" />
            <div className="absolute inset-0 bg-plum/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <span className="text-white text-sm font-medium">Click to change</span>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-40 gap-2 text-gray-400">
            <span className="icon text-5xl text-primary-300">add_photo_alternate</span>
            <p className="text-sm">Drag & drop or <span className="text-primary-500 font-medium">browse</span></p>
            <p className="text-xs">PNG, JPG, WEBP — max 5 MB</p>
          </div>
        )}
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          className="sr-only"
          onChange={(e) => handleFile(e.target.files[0])}
        />
      </div>
    </div>
  )
}

export function MultiImageUploader({ onUpload, existingImages = [], onRemoveExisting }) {
  const inputRef = useRef(null)
  const [localFiles, setLocalFiles] = useState([])

  const handleFiles = (fileList) => {
    const files = Array.from(fileList).filter((f) => f.type.startsWith('image/'))
    const previews = files.map((f) => ({ file: f, preview: URL.createObjectURL(f) }))
    setLocalFiles((prev) => [...prev, ...previews])
    onUpload?.(files)
  }

  const removeLocal = (idx) => {
    setLocalFiles((prev) => prev.filter((_, i) => i !== idx))
  }

  return (
    <div>
      <p className="text-xs text-gray-500 mb-1.5">Similar / Gallery Images</p>

      {/* Existing images */}
      {existingImages.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-2">
          {existingImages.map((img, idx) => (
            <div key={idx} className="relative group w-20 h-20">
              <img src={img.url} alt="" className="w-full h-full object-cover rounded-lg" />
              {onRemoveExisting && (
                <button
                  type="button"
                  onClick={() => onRemoveExisting(img.publicId)}
                  className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-red-500 text-white rounded-full text-xs flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  ×
                </button>
              )}
            </div>
          ))}
        </div>
      )}

      {/* New files preview */}
      {localFiles.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-2">
          {localFiles.map((item, idx) => (
            <div key={idx} className="relative group w-20 h-20">
              <img src={item.preview} alt="" className="w-full h-full object-cover rounded-lg" />
              <button
                type="button"
                onClick={() => removeLocal(idx)}
                className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-red-500 text-white rounded-full text-xs flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
              >
                ×
              </button>
            </div>
          ))}
        </div>
      )}

      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        className="w-full border-2 border-dashed border-primary-200 rounded-xl py-3 text-sm text-primary-500 hover:border-primary-400 hover:bg-primary-50/30 transition-all"
      >
        + Add Images
      </button>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        multiple
        className="sr-only"
        onChange={(e) => handleFiles(e.target.files)}
      />
    </div>
  )
}
