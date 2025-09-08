import { useEffect, useMemo, useState } from 'react'
import Section from '../components/Section'
import { getReservations, getReservationById, getReservationsForCustomer } from '../lib/api'

function useAsync(asyncFn, deps = []) {
  const [state, setState] = useState({ loading: true, error: null, data: null })
  useEffect(() => {
    let canceled = false
    ;(async () => {
      setState({ loading: true, error: null, data: null })
      try {
        const data = await asyncFn()
        if (!canceled) setState({ loading: false, error: null, data })
      } catch (err) {
        if (!canceled) setState({ loading: false, error: err, data: null })
      }
    })()
    return () => { canceled = true }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)
  return state
}

export default function Admin() {
  const [mode, setMode] = useState('all') // 'all' | 'byId' | 'byCustomer'
  const [query, setQuery] = useState('')
  const [refreshKey, setRefreshKey] = useState(0)

  const fetcher = useMemo(() => {
    if (mode === 'byId' && query) return () => getReservationById(query)
    if (mode === 'byCustomer' && query) return () => getReservationsForCustomer(query)
    return () => getReservations()
  }, [mode, query])

  const { loading, error, data } = useAsync(fetcher, [fetcher, refreshKey])

  const rows = useMemo(() => {
    // Normalize to array
    if (!data) return []
    return Array.isArray(data) ? data : [data]
  }, [data])

  return (
    <Section title="Admin – Reservations" subtitle="Pull reservations from the API.">
      <div className="card card-pad stack">
        {/* Controls */}
        <div className="grid" style={{ gap: '0.75rem', gridTemplateColumns: '1fr auto auto' }}>
          <div className="grid" style={{ gap: '0.5rem', gridTemplateColumns: 'auto 1fr' }}>
            <select className="input" value={mode} onChange={(e)=>setMode(e.target.value)}>
              <option value="all">All reservations</option>
              <option value="byId">Reservation by ID</option>
              <option value="byCustomer">By Customer ID</option>
            </select>
            <input
              className="input"
              placeholder={mode === 'byId' ? 'Enter reservation_id' :
                          mode === 'byCustomer' ? 'Enter customer_id' :
                          '—'}
              disabled={mode === 'all'}
              value={query}
              onChange={(e)=>setQuery(e.target.value)}
            />
          </div>
          <button className="btn btn-secondary" onClick={()=>setRefreshKey(k=>k+1)}>Refresh</button>
          <button className="btn" onClick={()=>{ setMode('all'); setQuery(''); setRefreshKey(k=>k+1) }}>Reset</button>
        </div>

        {/* Status */}
        {loading && <p className="muted">Loading…</p>}
        {error && <p style={{ color: 'crimson' }}>{error?.response?.data?.message || error.message || 'Failed to load'}</p>}
        {!loading && !error && rows.length === 0 && <p className="muted">No reservations found.</p>}

        {/* Table */}
        {!loading && !error && rows.length > 0 && (
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ textAlign: 'left' }}>
                  <Th>ID</Th>
                  <Th>Customer ID</Th>
                  <Th>Time Slot</Th>
                  <Th>Created</Th>
                </tr>
              </thead>
              <tbody>
                {rows.map((r) => (
                  <tr key={String(r.id ?? r.reservation_id)}>
                    <Td>{r.id ?? r.reservation_id ?? '—'}</Td>
                    <Td>{r.customer_id ?? '—'}</Td>
                    <Td>{r.time_slot ?? r.timeslot ?? r.time ?? '—'}</Td>
                    <Td>{formatDate(r.created_at || r.createdAt)}</Td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </Section>
  )
}

function Th({ children }) {
  return (
    <th style={{ borderBottom: '1px solid var(--border)', padding: '8px 10px', color: '#374151', fontWeight: 700 }}>
      {children}
    </th>
  )
}
function Td({ children }) {
  return (
    <td style={{ borderBottom: '1px solid var(--border)', padding: '8px 10px', color: '#111827' }}>
      {children}
    </td>
  )
}
function formatDate(v) {
  if (!v) return '—'
  try {
    const d = new Date(v)
    if (isNaN(d.getTime())) return String(v)
    return d.toLocaleString()
  } catch { return String(v) }
}
