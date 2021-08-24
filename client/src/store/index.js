import { configureStore } from '@reduxjs/toolkit'
import sidebarReducer from '../features/sidebar/sidebarSlice'
import searchReducer from '../features/search/searchSlice'

export const store = configureStore({
  reducer: {
    sidebar: sidebarReducer,
    search: searchReducer,
  },
})
