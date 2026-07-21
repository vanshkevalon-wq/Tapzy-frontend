import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import api from '../../services/api'
import Sidebar from '../../components/admin/Sidebar'

export default function Users() {
  const [users, setUsers]   = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError]   = useState(null)
  const [search, setSearch] = useState('')

  useEffect(() => {
    api.get('/users')
      .then(({ data }) => setUsers(data.users))
      .catch(() => setError('Failed to load users.'))
      .finally(() => setLoading(false))
  }, [])

  const filtered = users.filter((u) => {
    const q = search.toLowerCase()
    return (
      u.firstName?.toLowerCase().includes(q) ||
      u.lastName?.toLowerCase().includes(q) ||
      u.email?.toLowerCase().includes(q)
    )
  })

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar />

      <main className="flex-1 p-6 lg:p-8 overflow-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Registered Users</h1>
            <p className="text-sm text-gray-400 mt-0.5">
              {loading ? '...' : `${users.length} total users`}
            </p>
          </div>

          {/* Search */}
          <div className="relative w-full sm:w-72">
            <span className="icon absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xl leading-none">search</span>
            <input
              type="text"
              placeholder="Search by name or email…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 bg-white text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-400 transition"
            />
          </div>
        </div>

        {/* States */}
        {loading && (
          <div className="flex items-center justify-center py-20">
            <span className="icon animate-spin text-4xl text-purple-500 leading-none">progress_activity</span>
          </div>
        )}

        {error && (
          <div className="flex items-center gap-2 px-4 py-3 rounded-xl bg-red-50 text-red-600 text-sm font-medium">
            <span className="icon text-xl leading-none">error</span>
            {error}
          </div>
        )}

        {!loading && !error && filtered.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20 gap-3 text-gray-400">
            <span className="icon text-5xl leading-none">group_off</span>
            <p className="text-sm font-medium">
              {search ? 'No users match your search.' : 'No registered users yet.'}
            </p>
          </div>
        )}

        {/* Table */}
        {!loading && !error && filtered.length > 0 && (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-100">
                <thead className="bg-gray-50">
                  <tr>
                    {['#', 'Name', 'Email', 'Joined'].map((h) => (
                      <th
                        key={h}
                        className="px-5 py-3.5 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider"
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {filtered.map((user, idx) => (
                    <tr key={user._id} className="hover:bg-purple-50/40 transition-colors">
                      <td className="px-5 py-4 text-sm text-gray-400 font-medium">{idx + 1}</td>
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-purple-500 to-purple-800 flex items-center justify-center shrink-0">
                            <span className="text-sm font-bold text-white">
                              {user.firstName?.[0]?.toUpperCase()}
                            </span>
                          </div>
                          <span className="text-sm font-semibold text-gray-800">
                            {user.firstName} {user.lastName}
                          </span>
                        </div>
                      </td>
                      <td className="px-5 py-4 text-sm text-gray-500">{user.email}</td>
                      <td className="px-5 py-4 text-sm text-gray-400">
                        {new Date(user.createdAt).toLocaleDateString('en-US', {
                          year: 'numeric', month: 'short', day: 'numeric',
                        })}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
