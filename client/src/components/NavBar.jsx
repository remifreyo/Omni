import { Link, NavLink } from 'react-router-dom'

const NavBar = () => {
  return (
    <nav className="nav">
      <Link to="/">
        <h3>OMNI</h3>
      </Link>
      <div>
        <NavLink to="/">Home </NavLink>
        <NavLink to="/categories">Categories</NavLink>
        <NavLink to="/">Signup/Login</NavLink>
        <NavLink to="/new">New Article</NavLink>
      </div>
    </nav>
  )
}

export default NavBar
