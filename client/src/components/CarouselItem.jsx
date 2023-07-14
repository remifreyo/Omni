const CarouselItem = ({ item }) => {
  return (
    <div
      className="carousel_item"
      style={{ backgroundImage: `url(${item.image})` }}
    >
      <h3>{item.title}</h3>
      <p>
        {item.description.substring(0, 125)}
        {item.description.length > 125 ? '...' : null}
      </p>
      <a>
        <button>Read</button>
      </a>
    </div>
  )
}

export default CarouselItem
