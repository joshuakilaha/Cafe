import { Link, NavLink } from 'react-router-dom'
import { useState } from 'react'
import styles from './Navbar.module.css'

const nav = [
  { to: '/', label: 'Home' },
  { to: '/menu', label: 'Menu' },
  { to: '/reservations', label: 'Reservations' },
  { to: '/about', label: 'About Us' },
  { to: '/gallery', label: 'Gallery' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <header className="header">
      <div className={`container ${styles.wrap} flex between`}>
        {/* Logo */}
        <Link to="/" className={styles.brand}>
          Café Fausse
        </Link>

        {/* Desktop Nav */}
        <nav className={`${styles.nav} hide-sm`}>
          {nav.map((n) => (
            <NavLink
              key={n.to}
              to={n.to}
              className={({ isActive }) =>
                isActive ? `${styles.item} ${styles.itemActive}` : styles.item
              }
            >
              {n.label}
            </NavLink>
          ))}
        </nav>

        {/* Mobile toggle */}
        <button
          className={styles.menuBtn}
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          Menu
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className={`${styles.mobile} container`}>
          <nav className="stack" onClick={() => setOpen(false)}>
            {nav.map((n) => (
              <NavLink
                key={n.to}
                to={n.to}
                className={({ isActive }) =>
                  isActive ? `${styles.item} ${styles.itemActive}` : styles.item
                }
              >
                {n.label}
              </NavLink>
            ))}
          </nav>
        </div>
      )}
    </header>
  )
}
