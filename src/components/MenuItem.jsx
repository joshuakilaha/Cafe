export default function MenuItem({ item }) {
  return (
    <li className="item" style={{ all: 'unset', display: 'block' }}>
      <div className="thumbWrap">
        <img
          loading="lazy"
          src={item.image}
          alt={item.name}
          className="thumb"
        />
      </div>
      <div className="meta">
        <div className="name">{item.name}</div>
        <p className="desc">{item.desc}</p>
      </div>
      <div className="price">${item.price.toFixed(2)}</div>
    </li>
  )
}
