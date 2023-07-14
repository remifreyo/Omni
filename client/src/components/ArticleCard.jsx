import { useSelector } from 'react-redux'

const ArticleCard = () => {
  const items = useSelector((state) => state.articles).slice(5, 20)
  return (
    <div className="article-card">
      {items.map((item) => {
        return (
          <div className="idv-card">
            <img src={item.image} /> <div>{item.title}</div>
          </div>
        )
      })}
    </div>
  )
}

export default ArticleCard
