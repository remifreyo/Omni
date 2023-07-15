import { Link } from 'react-router-dom'

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
      <Link to={`${item._id}`}>
        <button>Read More</button>
      </Link>
    </div>
  )
}

export default CarouselItem
