import Modal from '../common/Modal'
import Button from '../common/Button'

export default function ProductModal({ product, onClose }) {
  if (!product) return null

  const { name, price, image, category, description } = product

  return (
    <Modal isOpen={!!product} onClose={onClose} title={name} size="lg">
      <div className="flex flex-col sm:flex-row gap-6">
        <img
          src={image || 'https://placehold.co/400x400?text=No+Image'}
          alt={name}
          className="w-full sm:w-56 h-56 object-cover rounded-xl flex-shrink-0"
        />
        <div className="flex flex-col gap-3">
          {category && (
            <span className="text-xs font-medium text-primary-600 bg-primary-50 px-2 py-0.5 rounded-full w-fit">
              {category}
            </span>
          )}
          <p className="text-gray-600 text-sm leading-relaxed">
            {description || 'No description available.'}
          </p>
          <div className="mt-auto">
            <span className="text-2xl font-bold text-primary-600">
              ${Number(price).toFixed(2)}
            </span>
          </div>
          <Button size="lg" className="mt-2">Add to Cart</Button>
        </div>
      </div>
    </Modal>
  )
}
