import { useState } from 'react'
import { isEmail } from '../lib/validators'
import { subscribeEmail } from '../lib/api'


export default function NewsletterForm() {
    const [email, setEmail] = useState('')
    const [loading, setLoading] = useState(false)
    const [msg, setMsg] = useState(null)


    async function onSubmit(e) {
        e.preventDefault()
        setMsg(null)
        if (!isEmail(email)) { setMsg({ type: 'error', text: 'Please enter a valid email.' }); return }
        try {
            setLoading(true)
            const res = await subscribeEmail(email)
            setMsg({ type: 'ok', text: res.message || 'Subscribed!' })
            setEmail('')
        } catch (err) {
            setMsg({ type: 'error', text: err?.response?.data?.message || 'Subscription failed. Try again.' })
        } finally { setLoading(false) }
    }


    return (
        <form onSubmit={onSubmit} className="flex" style={{ gap: '.5rem' }}>
            <input className="input" type="email" placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} aria-label="Email address" />
            <button className="btn btn-secondary" disabled={loading}>{loading ? 'Submitting…' : 'Subscribe'}</button>
            {msg && <p className="muted" style={{ marginLeft: '.5rem', color: msg.type === 'ok' ? 'green' : 'crimson' }}>{msg.text}</p>}
        </form>
    )
}