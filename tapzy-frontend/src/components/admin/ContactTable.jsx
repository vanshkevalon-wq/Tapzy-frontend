import { useState } from 'react'

function StatusBadge({ status }) {
  const isRead = status === 'read'
  return (
    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold ${
      isRead ? 'bg-gray-100 text-gray-500' : 'bg-yellow-50 text-yellow-600 border border-yellow-200'
    }`}>
      {isRead ? 'Read' : 'Unread'}
    </span>
  )
}

export default function ContactTable({ submissions = [], onMarkRead, onDelete }) {
  const [expanded, setExpanded] = useState(null)

  if (!submissions.length) {
    return (
      <div className="text-center py-20">
        <div className="w-16 h-16 rounded-2xl bg-primary-50 flex items-center justify-center mx-auto mb-3">
          <span className="icon text-4xl text-primary-300">mail</span>
        </div>
        <p className="text-plum/40 font-medium">No submissions yet.</p>
      </div>
    )
  }

  const toggle = (id) => setExpanded((prev) => (prev === id ? null : id))

  return (
    <>
      {/* ── Mobile: card list ── */}
      <div className="md:hidden space-y-3">
        {submissions.map((s) => (
          <div key={s._id} className={`bg-white rounded-2xl border shadow-sm overflow-hidden transition-colors ${
            s.status === 'unread' ? 'border-yellow-200' : 'border-gray-100'
          }`}>
            {/* header row */}
            <button
              onClick={() => toggle(s._id)}
              className="w-full flex items-start gap-3 p-4 text-left"
            >
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-0.5">
                  {s.status === 'unread' && (
                    <span className="w-1.5 h-1.5 rounded-full bg-primary-500 flex-shrink-0" />
                  )}
                  <p className="font-bold text-plum text-sm truncate">{s.name}</p>
                </div>
                <p className="text-xs text-plum/50 truncate">{s.email}</p>
                {s.phone && <p className="text-xs text-plum/40">{s.phone}</p>}
                <p className="text-[10px] text-plum/30 mt-1">
                  {s.createdAt ? new Date(s.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }) : '—'}
                </p>
              </div>
              <div className="flex flex-col items-end gap-2 flex-shrink-0">
                <StatusBadge status={s.status} />
                <span className={`icon text-base text-plum/30 transition-transform ${expanded === s._id ? 'rotate-180' : ''}`}>
                  expand_more
                </span>
              </div>
            </button>

            {/* expanded message */}
            {expanded === s._id && (
              <div className="px-4 pb-4 border-t border-gray-50">
                <p className="text-xs font-semibold text-plum/40 uppercase tracking-wide mt-3 mb-1.5">Message</p>
                <p className="text-sm text-plum/70 leading-relaxed mb-4">{s.message}</p>
                <div className="flex gap-2">
                  {s.status === 'unread' && (
                    <button
                      onClick={() => onMarkRead?.(s._id)}
                      className="flex-1 py-2 rounded-xl text-xs font-bold border border-primary-200 text-primary-600 hover:bg-primary-50 transition-colors"
                    >
                      Mark Read
                    </button>
                  )}
                  {onDelete && (
                    <button
                      onClick={() => onDelete?.(s._id)}
                      className="flex-1 py-2 rounded-xl text-xs font-bold border border-red-200 text-red-500 hover:bg-red-50 transition-colors"
                    >
                      Delete
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* ── Desktop: full table ── */}
      <div className="hidden md:block overflow-x-auto rounded-2xl border border-gray-100">
        <table className="min-w-full divide-y divide-gray-50 text-sm">
          <thead className="bg-gray-50">
            <tr>
              {['Name', 'Email', 'Phone', 'Date', 'Status', 'Actions'].map((h) => (
                <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-plum/40 uppercase tracking-wider">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-50">
            {submissions.map((s) => (
              <>
                <tr
                  key={s._id}
                  className={`cursor-pointer transition-colors ${
                    expanded === s._id ? 'bg-primary-50/50' : 'hover:bg-gray-50'
                  }`}
                  onClick={() => toggle(s._id)}
                >
                  <td className="px-4 py-3 font-semibold text-plum">
                    {s.status === 'unread' && (
                      <span className="w-1.5 h-1.5 rounded-full bg-primary-500 inline-block mr-2 mb-0.5" />
                    )}
                    {s.name}
                  </td>
                  <td className="px-4 py-3 text-plum/60">{s.email}</td>
                  <td className="px-4 py-3 text-plum/60">{s.phone || '—'}</td>
                  <td className="px-4 py-3 text-plum/40 text-xs">
                    {s.createdAt
                      ? new Date(s.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })
                      : '—'}
                  </td>
                  <td className="px-4 py-3"><StatusBadge status={s.status} /></td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3" onClick={(e) => e.stopPropagation()}>
                      {s.status === 'unread' && (
                        <button
                          onClick={() => onMarkRead?.(s._id)}
                          className="text-xs text-primary-500 font-semibold hover:underline whitespace-nowrap"
                        >
                          Mark read
                        </button>
                      )}
                      {onDelete && (
                        <button
                          onClick={() => onDelete?.(s._id)}
                          className="text-xs text-red-400 font-semibold hover:underline"
                        >
                          Delete
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
                {expanded === s._id && (
                  <tr key={`${s._id}-msg`} className="bg-primary-50/30">
                    <td colSpan={6} className="px-6 py-4">
                      <p className="text-xs font-semibold text-plum/40 uppercase tracking-wide mb-1.5">Message</p>
                      <p className="text-sm text-plum/70 leading-relaxed">{s.message}</p>
                    </td>
                  </tr>
                )}
              </>
            ))}
          </tbody>
        </table>
      </div>
    </>
  )
}
