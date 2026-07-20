export default function ProductTable({ products = [], onEdit, onDelete }) {
  if (!products.length) {
    return (
      <div className="text-center py-20">
        <div className="w-16 h-16 rounded-2xl bg-primary-50 flex items-center justify-center mx-auto mb-3">
          <span className="icon text-4xl text-primary-300">inventory_2</span>
        </div>
        <p className="text-plum/40 font-medium">No products yet.</p>
      </div>
    )
  }

  return (
    <>
      {/* ── Mobile: card list ── */}
      <div className="md:hidden space-y-3">
        {products.map((p) => {
          const imgUrl = p.mainImage?.url || p.image || 'https://placehold.co/48x48/f9f0ff/A64BDF?text=?'
          return (
            <div key={p._id} className="bg-white rounded-2xl border border-gray-100 p-4 shadow-sm">
              <div className="flex items-center gap-3 mb-3">
                <img src={imgUrl} alt={p.name}
                  className="w-14 h-14 object-cover rounded-xl border border-primary-50 flex-shrink-0" />
                <div className="min-w-0 flex-1">
                  <p className="font-bold text-plum text-sm truncate">{p.name}</p>
                  {p.category && (
                    <span className="inline-block mt-1 bg-primary-50 text-primary-600 text-xs font-medium px-2 py-0.5 rounded-full">
                      {p.category}
                    </span>
                  )}
                  {p.similarImages?.length > 0 && (
                    <p className="text-xs text-plum/30 mt-0.5">{p.similarImages.length} gallery image{p.similarImages.length !== 1 ? 's' : ''}</p>
                  )}
                </div>
                <p className="font-extrabold text-primary-500 text-sm flex-shrink-0">₹{Number(p.price).toLocaleString('en-IN')}</p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => onEdit?.(p)}
                  className="flex-1 py-2 rounded-xl text-xs font-bold border border-primary-200 text-primary-600 hover:bg-primary-50 transition-colors"
                >
                  Edit
                </button>
                <button
                  onClick={() => onDelete?.(p._id)}
                  className="flex-1 py-2 rounded-xl text-xs font-bold border border-red-200 text-red-500 hover:bg-red-50 transition-colors"
                >
                  Delete
                </button>
              </div>
            </div>
          )
        })}
      </div>

      {/* ── Desktop: full table ── */}
      <div className="hidden md:block overflow-x-auto rounded-2xl border border-gray-100">
        <table className="min-w-full divide-y divide-gray-50 text-sm">
          <thead className="bg-gray-50">
            <tr>
              {['Image', 'Name', 'Category', 'Price', 'Actions'].map((h) => (
                <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-plum/40 uppercase tracking-wider">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-50">
            {products.map((p) => {
              const imgUrl = p.mainImage?.url || p.image || 'https://placehold.co/48x48/f9f0ff/A64BDF?text=?'
              return (
                <tr key={p._id} className="hover:bg-primary-50/30 transition-colors">
                  <td className="px-4 py-3">
                    <img src={imgUrl} alt={p.name}
                      className="w-11 h-11 object-cover rounded-xl border border-primary-50" />
                  </td>
                  <td className="px-4 py-3 font-semibold text-plum max-w-xs">
                    <p className="truncate">{p.name}</p>
                    {p.similarImages?.length > 0 && (
                      <p className="text-xs text-plum/30 mt-0.5">
                        {p.similarImages.length} gallery image{p.similarImages.length !== 1 ? 's' : ''}
                      </p>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    {p.category
                      ? <span className="inline-block bg-primary-50 text-primary-600 text-xs font-medium px-2.5 py-1 rounded-full">{p.category}</span>
                      : <span className="text-plum/30">—</span>
                    }
                  </td>
                  <td className="px-4 py-3 font-bold text-primary-500">₹{Number(p.price).toLocaleString('en-IN')}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => onEdit?.(p)}
                        className="px-3 py-1.5 rounded-lg text-xs font-semibold border border-primary-200 text-primary-600 hover:bg-primary-50 transition-colors"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => onDelete?.(p._id)}
                        className="px-3 py-1.5 rounded-lg text-xs font-semibold border border-red-200 text-red-500 hover:bg-red-50 transition-colors"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </>
  )
}
