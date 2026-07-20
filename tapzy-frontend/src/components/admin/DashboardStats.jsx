const cards = [
  {
    key: 'products',
    label: 'Total Products',
    icon: <span className="icon text-2xl">inventory_2</span>,
    gradient: 'from-primary-500 to-primary-600',
    bg: 'bg-primary-50',
    text: 'text-primary-600',
  },
  {
    key: 'contacts',
    label: 'Total Messages',
    icon: <span className="icon text-2xl">mail</span>,
    gradient: 'from-lavender-400 to-lavender-500',
    bg: 'bg-lavender-50',
    text: 'text-lavender-500',
  },
  {
    key: 'unread',
    label: 'Unread Messages',
    icon: <span className="icon text-2xl">notifications_unread</span>,
    gradient: 'from-yellow-400 to-orange-400',
    bg: 'bg-yellow-50',
    text: 'text-yellow-600',
  },
  {
    key: 'categories',
    label: 'Categories',
    icon: <span className="icon text-2xl">label</span>,
    gradient: 'from-primary-400 to-lavender-400',
    bg: 'bg-primary-50',
    text: 'text-primary-500',
  },
]

export default function DashboardStats({ stats = {} }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {cards.map(({ key, label, icon, bg, text }) => (
        <div key={key} className="bg-white rounded-2xl shadow-card border border-gray-50 p-6 flex items-center gap-4 hover:shadow-card-hover transition-shadow">
          <div className={`w-12 h-12 rounded-xl ${bg} ${text} flex items-center justify-center flex-shrink-0`}>
            {icon}
          </div>
          <div>
            <p className="text-2xl font-extrabold text-plum">{stats[key] ?? '—'}</p>
            <p className="text-xs text-plum/50 font-medium mt-0.5">{label}</p>
          </div>
        </div>
      ))}
    </div>
  )
}
