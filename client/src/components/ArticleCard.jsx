import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const ArticleCard = () => {
  const items = useSelector((state) => state.articles).slice(5, 20)
  return (
    <div className="article-card">
      {items.map((item) => {
        return (
          <Link to={`${item._id}`}>
            <div className="idv-card">
              <img src={item.image} /> <h3>{item.title}</h3>
              <div>
                {new Date(item.createdAt).toLocaleString('en-us', {
                  dateStyle: 'medium',
                  timeStyle: 'short'
                })}
              </div>
            </div>
          </Link>
        )
      })}
    </div>
  )
}

export default ArticleCard
