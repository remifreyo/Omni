import { Link } from 'react-router-dom'

const CarouselItem = ({ item }) => {
  return (
    <Link to={`${item._id}`}>
      <div
        className="carousel_item"
        style={{ backgroundImage: `url(${item.image})` }}
      >
        <div className="carousel_info">
          <h3>{item.title}</h3>
          <p>
            {item.description.substring(0, 150)}
            {item.description.length > 150 ? '...' : null}
          </p>
          <button>Read More</button>
        </div>
      </div>
    </Link>
  )
}

export default CarouselItem
