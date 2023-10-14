import ArticleCard from '../components/ArticleCard'
import Carousel from '../components/Carousel'

const Home = ({ removeHTMLTags }) => {
  return (
    <div className="w-full">
      <div className="carousel-container">
        <Carousel removeHTMLTags={removeHTMLTags} />
      </div>
      <div className="articleCard-container">
        <ArticleCard />
      </div>
    </div>
  )
}

export default Home
