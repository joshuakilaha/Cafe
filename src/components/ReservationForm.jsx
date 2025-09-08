import { useState } from 'react'
import { isEmail, isPhone, isFutureDateTime } from '../lib/validators'
import { createReservationFromForm } from '../lib/api'
import card from './Card.module.css'

export default function ReservationForm(){
  const [form, setForm] = useState({ timeSlot:'', guests:2, name:'', email:'', phone:'' })
  const [errors, setErrors] = useState({})
  const [submitting, setSubmitting] = useState(false)
  const [result, setResult] = useState(null)

  const setField = (k,v) => setForm(f => ({...f, [k]: v}))

  function validate(){
    const e = {}
    if (!isFutureDateTime(form.timeSlot)) e.timeSlot = 'Pick a future date & time.'
    if (!form.guests || form.guests < 1 || form.guests > 12) e.guests = 'Guests must be 1–12.' // kept for UI, backend ignores
    if (!form.name.trim()) e.name = 'Name is required.'
    if (!isEmail(form.email)) e.email = 'Enter a valid email.'
    if (!isPhone(form.phone)) e.phone = 'Enter a valid phone or leave blank.'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  async function onSubmit(e){
    e.preventDefault()
    setResult(null)
    if (!validate()) return
    try {
      setSubmitting(true)
      const res = await createReservationFromForm({
        timeSlot: form.timeSlot,
        name: form.name.trim(),
        email: form.email.trim(),
        phone: form.phone.trim(),
      })
      // Build a friendly message using returned data
      const r = res?.reservation
      const rid = r?.id ?? r?.reservation_id ?? r?._id ?? r?.uuid
      setResult({
        status: 'ok',
        message: `Reservation confirmed${rid ? ` (ID: ${rid})` : ''}!`,
      })
      setForm({ timeSlot:'', guests:2, name:'', email:'', phone:'' })
    } catch (err) {
      const apiMsg =
        err?.response?.data?.message ||
        err?.message ||
        'Reservation failed. Please try another time slot.'
      setResult({ status:'error', message: apiMsg })
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <form onSubmit={onSubmit} className={`${card.card} ${card.pad} stack`}>
      <div>
        <label className="muted" htmlFor="timeSlot">Time Slot</label>
        <input id="timeSlot" type="datetime-local" className="input"
          value={form.timeSlot} onChange={e=>setField('timeSlot', e.target.value)} />
        {errors.timeSlot && <p style={{color:'crimson', marginTop:'.25rem'}}>{errors.timeSlot}</p>}
      </div>

      <div>
        <label className="muted" htmlFor="guests">Number of Guests</label>
        <input id="guests" type="number" min="1" max="12" className="input"
          value={form.guests} onChange={e=>setField('guests', e.target.value)} />
        {errors.guests && <p style={{color:'crimson', marginTop:'.25rem'}}>{errors.guests}</p>}
      </div>

      <div className="grid" style={{gap:'1rem', gridTemplateColumns:'repeat(auto-fit, minmax(220px, 1fr))'}}>
        <div>
          <label className="muted" htmlFor="name">Customer Name</label>
          <input id="name" className="input"
            value={form.name} onChange={e=>setField('name', e.target.value)} />
          {errors.name && <p style={{color:'crimson', marginTop:'.25rem'}}>{errors.name}</p>}
        </div>
        <div>
          <label className="muted" htmlFor="email">Email Address</label>
          <input id="email" type="email" className="input"
            value={form.email} onChange={e=>setField('email', e.target.value)} />
          {errors.email && <p style={{color:'crimson', marginTop:'.25rem'}}>{errors.email}</p>}
        </div>
      </div>

      <div>
        <label className="muted" htmlFor="phone">Phone Number (optional)</label>
        <input id="phone" className="input"
          value={form.phone} onChange={e=>setField('phone', e.target.value)} />
        {errors.phone && <p style={{color:'crimson', marginTop:'.25rem'}}>{errors.phone}</p>}
      </div>

      <button className="btn btn-primary" disabled={submitting}>
        {submitting ? 'Booking…' : 'Book Table'}
      </button>

      {result && (
        <div style={{marginTop:'.5rem', color: result.status==='ok' ? 'green' : 'crimson'}}>
          {result.message}
        </div>
      )}
    </form>
  )
}
