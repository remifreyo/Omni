import * as api from './api'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

// Define the asynchronous action
export const fetchArticleById = createAsyncThunk(
  'articles/fetchArticleById',
  async (id) => {
    const response = await api.fetchArticle(id)
    return response
  }
)

// Create an articles slice
const articlesSlice = createSlice({
  name: 'articles',
  initialState: { article: null, comments: [] },
  reducers: {
    // Define any other synchronous actions here if needed
  },
  extraReducers: (builder) => {
    builder.addCase(fetchArticleById.fulfilled, (state, action) => {
      state.article = action.payload // Assuming the API response includes an article property
      state.comments = action.payload.comments // Assuming the API response includes a comments property
    })
  }
})

export const {
  /* any synchronous actions you define */
} = articlesSlice.actions
export default articlesSlice.reducer
