import styles from './Menu.gallery.module.css'

export default function MenuCard({ item }) {
  const price = typeof item.price === 'number' ? item.price.toFixed(2) : item.price
  return (
    <article className={styles.card}>
      <div className={styles.imgWrap}>
        <img
          className={styles.img}
          src={item.image}
          alt={item.name}
          loading="lazy"
        />
      </div>
      <div className={styles.body}>
        <h4 className={styles.title}>{item.name}</h4>
        <div className={styles.price}>$ {price}</div>
      </div>
    </article>
  )
}
