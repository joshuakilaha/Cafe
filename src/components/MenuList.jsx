import menu from '../data/menu'
import MenuCard from './MenuCard'
import styles from './Menu.gallery.module.css'

export default function MenuList() {
  return (
    <div className="stack" style={{ gap: '18px' }}>
      {Object.entries(menu).map(([category, items]) => (
        <section key={category}>
          <h3
            style={{
              fontFamily: 'var(--font-display)',
              color: 'var(--brand-red)',
              fontSize: '1.25rem',
              margin: '0 0 10px'
            }}
          >
            {category}
          </h3>

          <div className={styles.grid}>
            {items.map((it) => (
              <MenuCard key={it.name} item={it} />
            ))}
          </div>
        </section>
      ))}
    </div>
  )
}
