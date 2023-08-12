import { Link } from 'react-router-dom'
import { Button } from '@material-tailwind/react'

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
          <Button className="bg-primary hover:bg-teritiary">Read More</Button>
        </div>
      </div>
    </Link>
  )
}

export default CarouselItem
