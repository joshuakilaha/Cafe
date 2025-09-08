import Section from '../components/Section'
import styles from './Home.module.css'
import HomeMenuPreview from '../components/HomeMenuPreview'


export default function Home() {
    return (
        <>
<section 
  className="hero" 
  style={{
    backgroundImage: "url('https://images.unsplash.com/photo-1592861956120-e524fc739696?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
    backgroundSize: "cover",
    backgroundPosition: "center center",
    backgroundRepeat: "no-repeat",
    minHeight: "100vh",
    color: "#fff"
  }}
>
  <div className="container hero-inner" style={{ position: 'relative', zIndex: 2 }}>
    <span className="badge">Since 2010</span>
    <h1 style={{ marginTop: '1rem' }}>Café Fausse</h1>
    <p style={{ maxWidth: '60ch', marginTop: '.75rem' }}>
      Fine dining — traditional Italian flavors, modern innovation.
    </p>
    <div style={{ display: 'flex', gap: '.5rem', marginTop: '1rem' }}>
      <a className="btn btn-primary" href="/reservations">Reserve a Table</a>
      <a className="btn btn-secondary" href="/menu">View Menu</a>
    </div>
  </div>
</section>

<Section title="Featured Menu" subtitle="A taste of what we serve.">
  <HomeMenuPreview />
</Section>

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