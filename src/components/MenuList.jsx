import menu from '../data/menu'
import card from './Card.module.css'


export default function MenuList() {
    return (
        <div className="grid grid-1" style={{ gap: '1rem' }}>
            {Object.entries(menu).map(([category, items]) => (
                <div key={category} className={`${card.card} ${card.pad}`}>
                    <h3 style={{ color: 'var(--brand-red)', fontFamily: 'var(--font-display)', marginBottom: '.5rem' }}>{category}</h3>
                    <ul className="stack">
                        {items.map(it => (
                            <li key={it.name} className="flex between" style={{ alignItems: 'flex-start' }}>
                                <div className="stack" style={{ gap: '.25rem' }}>
                                    <div style={{ fontWeight: 600 }}>{it.name}</div>
                                    <p className="muted" style={{ margin: 0 }}>{it.desc}</p>
                                </div>
                                <div style={{ fontWeight: 700 }}>${it.price}</div>
                            </li>
                        ))}
                    </ul>
                </div>
            ))}
        </div>
    )
}