import { Link } from 'react-router-dom'
import menu from '../data/menu'
import MenuCard from './MenuCard'
import styles from './Menu.gallery.module.css'

export default function HomeMenuPreview() {
  const sampleItems = Object.values(menu).flat().slice(0, 4)

  return (
    <section style={{ marginTop: '2rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', color: 'var(--brand-red)' }}>
          Featured Menu
        </h2>
        <Link to="/menu" className="btn btn-secondary">
          View More →
        </Link>
      </div>

      <div className={styles.grid}>
        {sampleItems.map((item) => (
          <MenuCard key={item.name} item={item} />
        ))}
      </div>
    </section>
  )
}
