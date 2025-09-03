import NewsletterForm from './NewsletterForm'


export default function Footer() {
    return (
        <footer className="footer">
            <div className="container section grid" style={{ gap: '2.5rem' }}>
                <div className="stack">
                    <div className="brand">Café Fausse</div>
                    <p className="muted">Fine dining blending traditional Italian flavors with modern innovation.</p>
                </div>
                <div className="stack">
                    <h3>Contact & Hours</h3>
                    <address className="muted" style={{ fontStyle: 'normal' }}>
                        1234 Culinary Ave, Suite 100<br />Washington, DC 20002<br />Phone: (202) 555-4567
                    </address>
                    <p className="muted">Hours: Mon–Sat 5:00–11:00 PM; Sun 5:00–9:00 PM</p>
                </div>
                <div className="stack">
                    <h3>Newsletter</h3>
                    <p className="muted">Get updates on seasonal menus and events.</p>
                    <NewsletterForm />
                </div>
            </div>
            <div className="container" style={{ padding: '1rem 0', borderTop: '1px solid var(--border)', textAlign: 'center', color: '#6b7280' }}>
                © {new Date().getFullYear()} Café Fausse. All rights reserved.
            </div>
        </footer>
    )
}