const CarouselItem = ({ item }) => {
  return (
    <div
      className="carousel_item"
      style={{ backgroundImage: `url(${item.url})` }}
    >
      <h3>{item.title}</h3>
      <p>{item.description}</p>
      <a>
        <button>Read</button>
      </a>
    </div>
  )
}

export default CarouselItem
