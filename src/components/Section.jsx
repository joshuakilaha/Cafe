export default function Section({ id, title, subtitle, children }) {
    return (
        <section id={id} className="section container">
            {title && (
                <div style={{ maxWidth: '60ch', marginBottom: '1rem' }}>
                    <h2>{title}</h2>
                    {subtitle && <p className="muted" style={{ marginTop: '.25rem' }}>{subtitle}</p>}
                </div>
            )}
            {children}
        </section>
    )
}