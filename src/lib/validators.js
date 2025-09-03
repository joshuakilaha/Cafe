export const isEmail = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)
export const isPhone = (v) => !v || /^[0-9+()\-\s]{6,}$/.test(v)
export const isFutureDateTime = (v) => {
const d = new Date(v)
return !isNaN(d) && d.getTime() > Date.now()
}