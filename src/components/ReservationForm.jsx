import { useState } from 'react'
import { isEmail, isPhone, isFutureDateTime } from '../lib/validators'
import { createReservation } from '../lib/api'
import card from './Card.module.css'

export default function ReservationForm() {
  const [form, setForm] = useState({ timeSlot:'', guests:2, name:'', email:'', phone:'' })
  const [errors, setErrors] = useState({})
  const [submitting, setSubmitting] = useState(false)
  const [result, setResult] = useState(null)

  const setField = (k,v) => setForm(f => ({...f, [k]: v}))

  function validate(){
    const e = {}
    if (!isFutureDateTime(form.timeSlot)) e.timeSlot = 'Pick a future date & time.'
    if (!form.guests || form.guests < 1 || form.guests > 12) e.guests = 'Guests must be 1–12.'
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
      const payload = { ...form, guests: Number(form.guests), phone: form.phone.trim() || undefined }
      const res = await createReservation(payload)
      setResult(res)
      if (res.status === 'ok') setForm({ timeSlot:'', guests:2, name:'', email:'', phone:'' })
    } catch (err) {
      setResult({ status:'error', message: err?.response?.data?.message || 'Reservation failed.' })
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
        {errors.timeSlot && <p style={{color:'crimson'}}>{errors.timeSlot}</p>}
      </div>

      <div>
        <label className="muted" htmlFor="guests">Number of Guests</label>
        <input id="guests" type="number" min="1" max="12" className="input"
          value={form.guests} onChange={e=>setField('guests', e.target.value)} />
        {errors.guests && <p style={{color:'crimson'}}>{errors.guests}</p>}
      </div>

      <div className="grid" style={{gap:'1rem', gridTemplateColumns:'repeat(auto-fit, minmax(220px, 1fr))'}}>
        <div>
          <label className="muted" htmlFor="name">Customer Name</label>
          <input id="name" className="input"
            value={form.name} onChange={e=>setField('name', e.target.value)} />
          {errors.name && <p style={{color:'crimson'}}>{errors.name}</p>}
        </div>
        <div>
          <label className="muted" htmlFor="email">Email Address</label>
          <input id="email" type="email" className="input"
            value={form.email} onChange={e=>setField('email', e.target.value)} />
          {errors.email && <p style={{color:'crimson'}}>{errors.email}</p>}
        </div>
      </div>

      <div>
        <label className="muted" htmlFor="phone">Phone Number (optional)</label>
        <input id="phone" className="input"
          value={form.phone} onChange={e=>setField('phone', e.target.value)} />
        {errors.phone && <p style={{color:'crimson'}}>{errors.phone}</p>}
      </div>

      <button className="btn btn-primary" disabled={submitting}>
        {submitting ? 'Booking…' : 'Book Table'}
      </button>

      {result && (
        <div style={{color: result.status==='ok' ? 'green' : 'crimson', marginTop:'.5rem'}}>
          {result.message}
          {result.tableNumber && <span style={{marginLeft:'.5rem'}}>Assigned Table: <b>{result.tableNumber}</b></span>}
        </div>
      )}
    </form>
  )
}
