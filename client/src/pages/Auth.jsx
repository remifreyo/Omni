import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { signin, signup } from '../actions/auth'
import { useNavigate } from 'react-router-dom'
import { Card, Input, Button, Typography } from '@material-tailwind/react'
import { CLEAR_AUTH_ERROR } from '../constants/actionTypes'

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
  const authError = useSelector((state) => state.auth.error)
  const [errors, setErrors] = useState({}) // Add an error state

  const switchMode = () => {
    setIsSignup(!isSignup)
    setErrors({})
    dispatch({ type: CLEAR_AUTH_ERROR })
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (isSignup && formData.password !== formData.confirmPassword) {
      setErrors({ password: "Passwords don't match" })
    } else {
      setErrors({}) // Clear any previous errors

      if (isSignup) {
        dispatch(signup(formData, navigate))
      } else {
        dispatch(signin(formData, navigate))
      }
    }
  }

  return (
    <Card color="transparent" shadow={false} className="mt-48 bg-white p-24">
      <Typography variant="h4" color="blue-gray">
        {isSignup ? 'Sign Up' : 'Sign In'}
      </Typography>
      <Typography color="gray" className="mt-1 font-normal">
        {isSignup
          ? 'Enter your information to register.'
          : 'Enter your email and password to sign in'}
      </Typography>
      <form
        className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96"
        onSubmit={handleSubmit}
      >
        <div className="mb-4 flex flex-col gap-6">
          {isSignup && (
            <>
              <Input
                name="firstName"
                placeholder="First Name"
                label="First Name"
                onChange={handleChange}
                required
                type="text"
              />
              <Input
                name="lastName"
                placeholder="Last Name"
                label="Last Name"
                onChange={handleChange}
                required
                type="text"
              />
            </>
          )}
          <Input
            name="email"
            placeholder="Email Address"
            label="Email Address"
            onChange={handleChange}
            required
            type="email"
          />
          <Input
            name="password"
            placeholder="Password"
            label="Password"
            onChange={handleChange}
            required
            type="password"
          />
          {isSignup && (
            <Input
              name="confirmPassword"
              placeholder="Confirm Password"
              label="Confirm Password"
              onChange={handleChange}
              required
              type="password"
            />
          )}
          {/* Display error messages */}
          {errors.password && (
            <Typography color="red">{errors.password}</Typography>
          )}
          {authError && <Typography color="red">{authError}</Typography>}
        </div>
        <Button className="mt-6" fullWidth type="submit">
          {isSignup ? 'Sign Up' : 'Sign In'}
        </Button>
        <Button
          variant="outlined"
          className="mt-6 text-center font-normal"
          color="gray"
          fullWidth
          onClick={switchMode}
        >
          {isSignup
            ? 'Already Have An Account? Sign In'
            : "Don't Have An Account? Sign Up"}
        </Button>
      </form>
    </Card>
  )
}

export default Auth
