import React from 'react'
import ReactDOM from 'react-dom'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import articlesReducer from './reducers/articles.jsx'
import authReducer from './reducers/auth.jsx'

const store = configureStore({
  reducer: {
    articles: articlesReducer,
    auth: authReducer
  }
})

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
)
