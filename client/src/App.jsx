import './App.css'
import Home from './pages/Home'
import NavBar from './components/NavBar'
import { Routes, Route, useLocation } from 'react-router-dom'
import Search from './components/Search'
import { getArticles } from './actions/articles'
import Categories from './pages/Categories'
import { useDispatch } from 'react-redux'
import { useEffect } from 'react'
import NewArticle from './pages/NewArticle'
import EditArticle from './pages/EditArticle'
import Article from './pages/Article'

const App = () => {
  const location = useLocation()
  const dispatch = useDispatch()
  const id = location.pathname.slice(1, 25)
  useEffect(() => {
    dispatch(getArticles())
  }, [dispatch])
  return (
    <div className="App">
      <header>
        <NavBar />
      </header>
      <main>
        {location.pathname != '/new' ? <Search /> : null}
        {location.pathname === `/${id}/edit` ? <EditArticle /> : null}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/new" element={<NewArticle />} />
          <Route path="/:id" element={<Article />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
