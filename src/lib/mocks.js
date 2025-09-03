const sleep = (ms) => new Promise(r => setTimeout(r, ms))


export async function mockSubscribe(email){
await sleep(600)
if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
throw { response: { data: { message: 'Invalid email format' } } }
}
return { message: 'Thanks for subscribing!' }
}


export async function mockCreateReservation({ timeSlot, guests, name, email, phone }){
await sleep(800)
const isFull = new Date(timeSlot).getMinutes() % 3 === 0 // pseudo-capacity simulation
if (isFull) return { status: 'error', message: 'Selected time slot is fully booked.' }
const table = Math.floor(Math.random()*30)+1
return { status: 'ok', message: 'Reservation confirmed!', tableNumber: table }
}