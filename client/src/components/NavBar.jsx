import { useState, useEffect } from 'react'
import { Link, NavLink, useNavigate, useLocation } from 'react-router-dom'
import { useDispatch } from 'react-redux'

const NavBar = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')))
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(true)
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

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  return (
    <nav className="bg-white dark:bg-secondary fixed w-full z-20 top-0 left-0 border-b border-gray-200 dark:border-gray-600">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <Link to="/" className="flex items-center">
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
            OMNI
          </span>
        </Link>
        <div className="flex md:order-2">
          {!user ? (
            <NavLink to="/auth">
              <button
                type="button"
                className="text-white bg-primary hover:bg-teritiary focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center mr-3 md:mr-0 dark:bg-primary authButton"
              >
                Signup/Login
              </button>
            </NavLink>
          ) : (
            <button
              type="button"
              onClick={logout}
              className="text-white bg-primary hover:bg-teritiary focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center mr-3 md:mr-0 dark:bg-primary authButton"
            >
              Logout
            </button>
          )}
        </div>
        <div
          className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
          id="navbar-sticky"
        >
          <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white dark:bg-secondary md:dark:bg-secondary dark:border-gray-700">
            <NavLink to="/">
              <li>
                <p className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-primary md:p-0 md:dark:hover:text-primary dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700 mb-0">
                  Home
                </p>
              </li>
            </NavLink>

            <NavLink to="/categories">
              <li>
                <p className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-primary md:p-0 md:dark:hover:text-primary dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700 mb-0">
                  Categories
                </p>
              </li>
            </NavLink>

            {user ? (
              <NavLink to="/new">
                <li>
                  <p className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-primary md:p-0 md:dark:hover:text-primary dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700 mb-0">
                    New Article
                  </p>
                </li>
              </NavLink>
            ) : null}
          </ul>
        </div>
        <div className="md:hidden text-2xl mr-4 relative">
          <button
            className="block text-gray-900 hover:text-primary"
            onClick={toggleMobileMenu}
          >
            ☰
          </button>

          <div
            className={`fixed top-0 right-full w-3/5 h-full bg-gray-900 dark:bg-secondary z-30 text-white transform ${
              isMobileMenuOpen ? '' : 'translate-x-full'
            } transition-transform duration-300 ease-in-out`}
          >
            <button
              className="absolute top-4 right-4 text-white hover:text-primary"
              onClick={toggleMobileMenu}
            >
              &#10005;
            </button>
            <ul className="flex flex-col p-4">
              <li>
                <NavLink
                  to="/"
                  onClick={() => {
                    setIsMobileMenuOpen(false)
                    toggleMobileMenu()
                  }}
                  className="block py-2 pl-3 pr-4  hover:text-primary"
                >
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/categories"
                  onClick={() => {
                    setIsMobileMenuOpen(false)
                    toggleMobileMenu()
                  }}
                  className="block py-2 pl-3 pr-4 hover:text-primary"
                >
                  Categories
                </NavLink>
              </li>
              {user && (
                <li>
                  <NavLink
                    to="/new"
                    onClick={() => {
                      setIsMobileMenuOpen(false)
                      toggleMobileMenu()
                    }}
                    className="block py-2 pl-3 pr-4 hover:text-primary"
                  >
                    New Article
                  </NavLink>
                </li>
              )}
            </ul>
            <div className="flex md:order-2 justify-center">
              {!user ? (
                <NavLink
                  to="/auth"
                  onClick={() => {
                    setIsMobileMenuOpen(false)
                    toggleMobileMenu()
                  }}
                >
                  <button
                    type="button"
                    className="text-white bg-primary hover:bg-teritiary focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center mr-3 md:mr-0 dark:bg-primary"
                  >
                    Signup/Login
                  </button>
                </NavLink>
              ) : (
                <button
                  type="button"
                  onClick={() => {
                    logout()
                    setIsMobileMenuOpen(false)
                    toggleMobileMenu()
                  }}
                  className="text-white bg-primary hover.bg-teritiary focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center mr-3 md:mr-0 dark:bg-primary  hover:bg-teritiary"
                >
                  Logout
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default NavBar
