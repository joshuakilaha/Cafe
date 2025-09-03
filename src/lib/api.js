import axios from 'axios'
import { mockCreateReservation, mockSubscribe } from './mocks'


const baseURL = import.meta.env.VITE_API_BASE_URL || ''
const useMocks = (import.meta.env.VITE_USE_MOCKS || 'false') === 'true'
const client = axios.create({ baseURL })


export async function subscribeEmail(email){
if (useMocks) return mockSubscribe(email)
const { data } = await client.post('/api/newsletter', { email })
return data
}


export async function createReservation(payload){
if (useMocks) return mockCreateReservation(payload)
const { data } = await client.post('/api/reservations', payload)
return data
}