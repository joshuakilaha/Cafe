import { useState } from 'react'
import Section from '../components/Section'
import Lightbox from '../components/Lightbox'


const images = [
    { src: 'https://images.unsplash.com/photo-1528605248644-14dd04022da1?q=80&w=1600&auto=format&fit=crop', alt: 'Dining room ambiance' },
    { src: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=1600&auto=format&fit=crop', alt: 'Signature dish' },
    { src: 'https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=1600&auto=format&fit=crop', alt: 'Wine pairing' },
    { src: 'https://images.unsplash.com/photo-1528605248644-1dcdd04022da?q=80&w=1600&auto=format&fit=crop', alt: 'Fresh ingredients' },
]


export default function Gallery() {
    const [lightbox, setLightbox] = useState(null)
    return (
        <Section title="Gallery" subtitle="A glimpse behind the pass and onto the plate.">
            <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1rem' }}>
                {images.map((img) => (
                    <button key={img.src} onClick={() => setLightbox(img)} style={{ background: 'transparent', border: 0, padding: 0, cursor: 'zoom-in' }}>
                        <img src={img.src} alt={img.alt} />
                    </button>
                ))}
            </div>


            <div className="grid grid-2" style={{ gap: '1rem', marginTop: '2rem' }}>
                <div className="card card-pad">
                    <h3 style={{ color: 'var(--brand-red)', fontFamily: 'var(--font-display)' }}>Awards</h3>
                    <ul className="muted">
                        <li>Culinary Excellence Award – 2022</li>
                        <li>Restaurant of the Year – 2023</li>
                        <li>Best Fine Dining Experience – Foodie Magazine, 2023</li>
                    </ul>
                </div>
                <div className="card card-pad">
                    <h3 style={{ color: 'var(--brand-red)', fontFamily: 'var(--font-display)' }}>Reviews</h3>
                    <blockquote className="muted">“Exceptional ambiance and unforgettable flavors.” – Gourmet Review</blockquote>
                    <blockquote className="muted" style={{ marginTop: '.5rem' }}>“A must-visit restaurant for food enthusiasts.” – The Daily Bite</blockquote>
                </div>
            </div>


            {lightbox && <Lightbox src={lightbox.src} alt={lightbox.alt} onClose={() => setLightbox(null)} />}
        </Section>
    )
}