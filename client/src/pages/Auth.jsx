import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { signin, signup } from '../actions/auth'
import { useNavigate } from 'react-router-dom'

const Auth = () => {
  const initialState = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: ''
  }
  const [isSignup, setIsSignup] = useState(false)
  const [formData, setFormData] = useState(initialState)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    if (isSignup) {
      dispatch(signup(formData, navigate))
    } else {
      dispatch(signin(formData, navigate))
    }
  }
  const switchMode = () => {
    setIsSignup(!isSignup)
  }
  return (
    <div className="auth">
      <div className="auth-form">
        <p>{isSignup ? 'Sign Up' : 'Sign In'}</p>
        <form onSubmit={handleSubmit}>
          {isSignup && (
            <>
              <input
                name="firstName"
                placeholder="First Name *"
                label="First Name"
                onChange={handleChange}
                required
                type="text"
              />
              <input
                name="lastName"
                placeholder="Last Name *"
                label="Last Name"
                onChange={handleChange}
                required
                type="text"
              />
            </>
          )}
          <input
            name="email"
            placeholder="Email Address *"
            label="Email Address"
            onChange={handleChange}
            required
            type="email"
          />
          <input
            name="password"
            placeholder="Password *"
            label="Password"
            onChange={handleChange}
            required
            type="password"
          />
          {isSignup && (
            <input
              name="confirmPassword"
              placeholder="Confirm Password *"
              label="confirmPassword"
              onChange={handleChange}
              required
              type="password"
            />
          )}
          <button type="submit">{isSignup ? 'Sign Up' : 'Sign In'} </button>
          <button onClick={switchMode}>
            {isSignup
              ? 'Already Have An Account? Sign In'
              : "Don't Have An Account? Sign Up"}
          </button>
        </form>
      </div>
    </div>
  )
}

export default Auth
