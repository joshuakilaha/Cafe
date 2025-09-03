import { useEffect } from 'react'
export default function Lightbox({ src, alt, onClose }) {
    useEffect(() => {
        const onKey = (e) => { if (e.key === 'Escape') onClose() }
        window.addEventListener('keydown', onKey)
        return () => window.removeEventListener('keydown', onKey)
    }, [onClose])
    return (
        <div onClick={onClose} style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,.7)', display: 'grid', placeItems: 'center', padding: '1rem' }}>
            <img src={src} alt={alt} style={{ maxHeight: '90vh', maxWidth: '90vw', borderRadius: '16px', boxShadow: '0 20px 60px rgba(0,0,0,.45)' }} onClick={(e) => e.stopPropagation()} />
        </div>
    )
}