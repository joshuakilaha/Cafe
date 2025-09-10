import { useEffect, useMemo, useState } from 'react'
import Section from '../components/Section'
import {
  getReservations,
  getReservationById,
  getReservationsForCustomer,
  getCustomerById,
  deleteCustomer,
} from '../lib/api'

// Small async hook for loading/error state
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
  // modes: reservations(all/byId/byCustomer) and customers(byId)
  const [mode, setMode] = useState('all') // 'all' | 'byId' | 'byCustomer' | 'customerById'
  const [query, setQuery] = useState('')
  const [refreshKey, setRefreshKey] = useState(0)

  // action UI
  const [actionMsg, setActionMsg] = useState(null)
  const [deleting, setDeleting] = useState(false)

  // choose fetcher based on mode
  const fetcher = useMemo(() => {
    if (mode === 'byId' && query) return () => getReservationById(query)
    if (mode === 'byCustomer' && query) return () => getReservationsForCustomer(query)
    if (mode === 'customerById' && query) return () => getCustomerById(query)
    // defaults
    if (mode === 'customerById') return async () => null
    return () => getReservations()
  }, [mode, query])

  const { loading, error, data } = useAsync(fetcher, [fetcher, refreshKey])

  // Normalize reservations list (array)
  const reservationRows = useMemo(() => {
    if (!data || mode === 'customerById') return []
    return Array.isArray(data) ? data : [data]
  }, [data, mode])

  // Single customer (object) for customerById mode
  const customer = useMemo(() => (mode === 'customerById' ? (data || null) : null), [data, mode])

  // Handlers
  function onReset() {
    setMode('all')
    setQuery('')
    setActionMsg(null)
    setRefreshKey((k) => k + 1)
  }

  async function onDeleteCustomer() {
    if (!customer?.id) return
    const yes = window.confirm(`Delete customer ${customer.name || customer.id}? This cannot be undone.`)
    if (!yes) return
    try {
      setDeleting(true)
      setActionMsg(null)
      await deleteCustomer(customer.id)
      setActionMsg({ type: 'ok', text: 'Customer deleted.' })
      setQuery('')
      setRefreshKey((k) => k + 1)
    } catch (err) {
      setActionMsg({
        type: 'error',
        text: err?.response?.data?.message || err?.message || 'Delete failed.',
      })
    } finally {
      setDeleting(false)
    }
  }

  return (
    <Section title="Admin" subtitle="Reservations & Customers">
      <div className="card card-pad stack">

        {/* Controls */}
        <div className="grid" style={{ gap: '0.75rem', gridTemplateColumns: '1fr auto auto' }}>
          <div className="grid" style={{ gap: '0.5rem', gridTemplateColumns: 'auto 1fr' }}>
            <select
              className="input"
              value={mode}
              onChange={(e) => {
                setMode(e.target.value)
                setActionMsg(null)
              }}
            >
              <option value="all">All reservations</option>
              <option value="byId">Reservation by ID</option>
              <option value="byCustomer">Reservations by Customer ID</option>
              <option value="customerById">Customer by ID</option>
            </select>

            <input
              className="input"
              placeholder={
                mode === 'byId'
                  ? 'Enter reservation_id'
                  : mode === 'byCustomer'
                  ? 'Enter customer_id'
                  : mode === 'customerById'
                  ? 'Enter customer_id'
                  : '—'
              }
              disabled={mode === 'all'}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>

          <button className="btn btn-secondary" onClick={() => setRefreshKey((k) => k + 1)}>
            Refresh
          </button>
          <button className="btn" onClick={onReset}>Reset</button>
        </div>

        {/* Status / Action messages */}
        {actionMsg && (
          <p style={{ color: actionMsg.type === 'ok' ? 'green' : 'crimson', margin: 0 }}>
            {actionMsg.text}
          </p>
        )}
        {loading && <p className="muted">Loading…</p>}
        {error && (
          <p style={{ color: 'crimson' }}>
            {error?.response?.data?.message || error.message || 'Failed to load'}
          </p>
        )}

        {/* Customer details + Delete */}
        {!loading && !error && customer && (
          <div className="card card-pad" style={{ maxWidth: 720 }}>
            <div className="flex between" style={{ marginBottom: '.5rem', alignItems: 'center' }}>
              <h3 style={{ margin: 0 }}>Customer</h3>
              <button className="btn" onClick={onDeleteCustomer} disabled={deleting}>
                {deleting ? 'Deleting…' : 'Delete'}
              </button>
            </div>
            <div className="stack" style={{ gap: '.5rem' }}>
              <Row label="ID" value={customer.id || '—'} />
              <Row label="Name" value={customer.name || '—'} />
              <Row label="Email" value={customer.email || '—'} />
              <Row label="Phone Number" value={customer.phone_number || '—'} />
            </div>
          </div>
        )}

        {/* Reservations table */}
        {!loading && !error && mode !== 'customerById' && reservationRows.length === 0 && (
          <p className="muted">No reservations found.</p>
        )}

        {!loading && !error && mode !== 'customerById' && reservationRows.length > 0 && (
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
                {reservationRows.map((r) => (
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

/* ---------- tiny UI helpers ---------- */

function Row({ label, value }) {
  return (
    <div className="grid" style={{ gridTemplateColumns: '180px 1fr', gap: '1rem' }}>
      <div className="muted" style={{ fontWeight: 600 }}>{label}</div>
      <div>{value}</div>
    </div>
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
