import CarouselItem from './CarouselItem'
import { useState } from 'react'
import { useSelector } from 'react-redux'

const Carousel = () => {
  const [activeIndex, setActiveIndex] = useState(0)
  const items = useSelector((state) => state.articles).slice(0, 5)
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
