import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const ArticleCard = () => {
  const items = useSelector((state) => state.articles).slice(5, 20)
  console.log(items)
  return (
    <div className="article-card">
      {items.map((item) => {
        return (
          <Link to={`${item._id}`}>
            <div className="idv-card">
              <img src={item.image} /> <div>{item.title}</div>
            </div>
          </Link>
        )
      })}
    </div>
  )
}

export default ArticleCard
