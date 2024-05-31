import { configureStore } from '@reduxjs/toolkit'

import anecdoresReducer from './reducers/anecdoteReducer'
import filterReducer from './reducers/filterReducer'

const store = configureStore({
  reducer: {
    anecdotes: anecdoresReducer,
    filter: filterReducer
  }
})

export default store