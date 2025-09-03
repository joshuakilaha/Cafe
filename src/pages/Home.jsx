import Section from '../components/Section'
import styles from './Home.module.css'


export default function Home() {
    return (
        <>
            <section className="hero">
                <div className="container hero-inner">
                    <span className="badge">Since 2010</span>
                    <h1 style={{ marginTop: '1rem' }}>Café Fausse</h1>
                    <p style={{ maxWidth: '60ch', marginTop: '.75rem' }}>Fine dining — traditional Italian flavors, modern innovation.</p>
                    <div style={{ display: 'flex', gap: '.5rem', marginTop: '1rem' }}>
                        <a className="btn btn-primary" href="/reservations">Reserve a Table</a>
                        <a className="btn btn-secondary" href="/menu">View Menu</a>
                    </div>
                </div>
            </section>


            <Section title="Visit Us" subtitle="We look forward to hosting you.">
                <div className={`${styles.cards}`}>
                    <div className="card card-pad stack">
                        <h3>Address</h3>
                        <p className="muted">1234 Culinary Ave, Suite 100, Washington, DC 20002</p>
                    </div>
                    <div className="card card-pad stack">
                        <h3>Contact</h3>
                        <p className="muted">(202) 555-4567</p>
                    </div>
                    <div className="card card-pad stack">
                        <h3>Hours</h3>
                        <p className="muted">Mon–Sat: 5:00–11:00 PM<br />Sun: 5:00–9:00 PM</p>
                    </div>
                </div>
            </Section>
        </>
    )
}