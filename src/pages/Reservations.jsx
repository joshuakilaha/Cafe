import Section from '../components/Section'
import ReservationForm from '../components/ReservationForm'


export default function Reservations() {
    return (
        <Section title="Reservations" subtitle="Select a date and time. We’ll confirm availability instantly.">
            <ReservationForm />
        </Section>
    )
}