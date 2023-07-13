import './App.css'
import Home from './pages/Home'
import NavBar from './components/NavBar'
import { Routes, Route } from 'react-router-dom'
import Search from './components/Search'
import getArticles from './actions/articles'
import Categories from './pages/Categories'
import { useDispatch } from 'react-redux'
import { useEffect } from 'react'
import NewArticle from './pages/NewArticle'

const App = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getArticles())
  }, [dispatch])
  return (
    <div className="App">
      <header>
        <NavBar />
      </header>
      <main>
        <Search />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/new" element={<NewArticle />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
