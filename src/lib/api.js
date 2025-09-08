import axios from 'axios'

const baseURL = import.meta.env.VITE_API_BASE_URL || ''
const useMocks = (import.meta.env.VITE_USE_MOCKS || 'false') === 'true'


const client = axios.create({ baseURL })

// ------- CUSTOMERS -------
export async function getCustomers() {
  const { data } = await client.get('/customers')
  return data
}

export async function createCustomer({ name, email, phone, newsletter = false }) {
  // MODEL expects phone_number and newsletter_signup
  const payload = {
    name,
    email,
    phone_number: phone || '',
    newsletter_signup: !!newsletter,
  }
  const { data } = await client.post('/customers', payload, {
    headers: { 'Content-Type': 'application/json' },
  })
  return data  // expect created customer object incl. id
}

export async function updateCustomer(customerId, fields) {
  const payload = {
    ...(fields.name && { name: fields.name }),
    ...(fields.email && { email: fields.email }),
    ...(fields.phone && { phone_number: fields.phone }),
    ...(fields.newsletter !== undefined && { newsletter_signup: !!fields.newsletter }),
  }
  const { data } = await client.put(`/customers/${customerId}`, payload, {
    headers: { 'Content-Type': 'application/json' },
  })
  return data
}

export async function deleteCustomer(customerId) {
  const { data } = await client.delete(`/customers/${customerId}`)
  return data
}

// Newsletter: create a minimal customer record with newsletter_signup
export async function subscribeEmail(email) {
  const res = await createCustomer({ name: email.split('@')[0], email, phone: '', newsletter: true })
  return { message: 'Thanks for subscribing!', customer: res }
}

// ------- RESERVATIONS -------
export async function getReservations() {
  const { data } = await client.get('/reservations')
  return data
}

export async function getReservationById(reservationId) {
  const { data } = await client.get(`/reservations/reservation/${reservationId}`)
  return data
}

export async function getReservationsForCustomer(customerId) {
  const { data } = await client.get(`/reservations/${customerId}`)
  return data
}

export async function updateReservation(reservationId, fields) {
  const { data } = await client.put(`/reservations/reservation/${reservationId}`, fields, {
    headers: { 'Content-Type': 'application/json' },
  })
  return data
}

export async function deleteReservation(reservationId) {
  const { data } = await client.delete(`/reservations/reservation/${reservationId}`)
  return data
}

//create customer, then reserve
export async function createReservationFromForm({ timeSlot, name, email, phone }) {
  //create customer
  const customer = await createCustomer({ name, email, phone, newsletter: false })

  //create reservation
  const payload = {
    customer_id: String(customer.id ?? customer.customer_id ?? customer._id ?? customer.uuid),
    time_slot: timeSlot, // datetime-local value like "2025-09-08T19:30"
  }
  if (!payload.customer_id) {
    throw new Error('Customer ID missing from createCustomer response.')
  }
  const { data } = await client.post('/reservations/reserve', payload, {
    headers: { 'Content-Type': 'application/json' },
  })
  return { customer, reservation: data }
}
