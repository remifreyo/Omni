import ArticleCard from '../components/ArticleCard'
import Carousel from '../components/Carousel'

const Home = () => {
  return (
    <div className="w-full">
      <div className="carousel-container">
        <Carousel />
      </div>
      <div className="articleCard-container">
        <ArticleCard />
      </div>
    </div>
  )
}

export default Home
