import { useState, useEffect } from 'react'
import { Link, NavLink, useNavigate, useLocation } from 'react-router-dom'
import { useDispatch } from 'react-redux'

const NavBar = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')))
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation()
  const logout = () => {
    dispatch({ type: 'LOGOUT' })
    setUser(null)
    navigate('/')
  }
  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem('profile')))
  }, [location])
  return (
    <nav className="nav">
      <Link to="/">
        <h3>OMNI</h3>
      </Link>
      <div>
        <NavLink to="/">Home </NavLink>
        <NavLink to="/categories">Categories</NavLink>
        {!user ? (
          <NavLink to="/auth">Signup/Login</NavLink>
        ) : (
          <NavLink to="/new">New Article</NavLink>
        )}
        {!user ? null : <button onClick={logout}>Logout</button>}
      </div>
    </nav>
  )
}

export default NavBar
