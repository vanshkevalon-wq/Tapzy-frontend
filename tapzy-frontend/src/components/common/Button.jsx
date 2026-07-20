/**
 * Reusable Button — supports gradient, outline, ghost, danger variants
 */
export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  disabled = false,
  type = 'button',
  onClick,
  ...props
}) {
  const base =
    'inline-flex items-center justify-center font-semibold rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed active:scale-95'

  const variants = {
    primary:
      'bg-brand-gradient text-white shadow-glow-sm hover:shadow-glow hover:scale-[1.02] focus:ring-primary-500',
    secondary:
      'bg-primary-50 text-primary-600 hover:bg-primary-100 focus:ring-primary-400',
    outline:
      'border-2 border-primary-500 text-primary-600 hover:bg-primary-50 focus:ring-primary-400',
    ghost:
      'text-plum/70 hover:bg-primary-50 hover:text-primary-600 focus:ring-primary-400',
    danger:
      'bg-red-500 text-white hover:bg-red-600 focus:ring-red-400',
    white:
      'bg-white text-primary-600 shadow-card hover:shadow-card-hover hover:scale-[1.02] focus:ring-primary-400',
  }

  const sizes = {
    sm: 'px-3 py-1.5 text-sm gap-1.5',
    md: 'px-5 py-2.5 text-sm gap-2',
    lg: 'px-7 py-3.5 text-base gap-2',
    xl: 'px-8 py-4 text-lg gap-2',
  }

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`${base} ${variants[variant] || variants.primary} ${sizes[size] || sizes.md} ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}
