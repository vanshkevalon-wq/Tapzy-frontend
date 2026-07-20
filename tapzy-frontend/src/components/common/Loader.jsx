export default function Loader({ size = 'md', className = '' }) {
  const sizes = {
    sm: 'w-4 h-4 border-2',
    md: 'w-8 h-8 border-3',
    lg: 'w-12 h-12 border-4',
  }

  return (
    <div
      role="status"
      aria-label="Loading"
      className={`${sizes[size]} rounded-full border-primary-100 border-t-primary-500 animate-spin ${className}`}
    />
  )
}

export function PageLoader() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[40vh] gap-4">
      <Loader size="lg" />
      <p className="text-plum/40 text-sm font-medium">Loading...</p>
    </div>
  )
}

export function SkeletonCard() {
  return (
    <div className="bg-white rounded-2xl overflow-hidden animate-pulse">
      <div className="aspect-square bg-primary-50" />
      <div className="p-4 space-y-2">
        <div className="h-4 bg-primary-50 rounded-lg w-3/4" />
        <div className="h-4 bg-primary-50 rounded-lg w-1/2" />
      </div>
    </div>
  )
}
