import CarouselItem from './CarouselItem'
import { useState } from 'react'

const Carousel = () => {
  const [activeIndex, setActiveIndex] = useState(0)
  const items = [
    {
      id: 1,
      description:
        'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.',
      title: 'Drake Concert',
      url: 'images/drake.jpeg'
    },
    {
      id: 2,
      description:
        'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.',
      title: 'Random Headphones',
      url: 'images/music.jpeg'
    },
    {
      id: 3,
      description:
        'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.',
      title: 'Another Post',
      url: 'images/city.jpeg'
    },
    {
      id: 4,
      description:
        'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.',
      title: 'Is that a Snake?',
      url: 'images/snake.jpeg'
    }
  ]
  const updateIndex = (newIndex) => {
    if (newIndex < 0 || newIndex > items.length - 1) {
      newIndex = 0
    } else if (newIndex >= items.length) {
      newIndex = items.length - 1
    }

    setActiveIndex(newIndex)
  }
  return (
    <div className="carousel">
      <div
        className="inner"
        style={{ transform: `translate(-${activeIndex * 100}%)` }}
      >
        {items.map((item) => {
          return <CarouselItem key={item.id} item={item} />
        })}
      </div>
      <div className="carousel_btns">
        <button
          onClick={() => {
            updateIndex(activeIndex - 1)
          }}
          className="back_arrow"
        >
          <span className="material-symbols-outlined">arrow_back_ios</span>
        </button>

        {items.map((item, idx) => {
          return (
            <button
              onClick={() => {
                updateIndex(idx)
              }}
              className="carousel_indicators"
            >
              <span
                className={`material-symbols-outlined ${
                  idx === activeIndex ? 'indicator_active' : 'indicator'
                }`}
              >
                radio_button_unchecked
              </span>
            </button>
          )
        })}

        <button
          onClick={() => {
            updateIndex(activeIndex + 1)
          }}
          className="forward_arrow"
        >
          <span className="material-symbols-outlined">arrow_forward_ios</span>
        </button>
      </div>
    </div>
  )
}

export default Carousel
