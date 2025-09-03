import Section from '../components/Section'


export default function About() {
    return (
        <Section title="About Café Fausse" subtitle="Unforgettable dining since 2010.">
            <div className="prose">
                <p>
                    Founded in 2010 by Chef Antonio Rossi and restaurateur Maria Lopez, Café Fausse blends
                    traditional Italian flavors with modern culinary innovation. Our mission is to provide an
                    unforgettable dining experience that reflects both quality and creativity.
                </p>
                <h3>Our Founders</h3>
                <p>
                    <b>Chef Antonio Rossi</b> honed his craft across kitchens in Rome and Milan. <b>Maria Lopez</b> leads the
                    hospitality experience, ensuring every guest is welcomed like family.
                </p>
                <h3>Our Commitment</h3>
                <p>
                    We source locally whenever possible and design our menus around seasonal availability. Excellence,
                    sustainability, and hospitality guide every decision we make.
                </p>
            </div>
        </Section>
    )
}