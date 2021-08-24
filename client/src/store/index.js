import { configureStore } from '@reduxjs/toolkit'
import removeReducer from '../features/remove/removeSlice'
import sidebarReducer from '../features/sidebar/sidebarSlice'
import searchReducer from '../features/search/searchSlice'
import updateReducer from '../features/update/updateSlice'

export const store = configureStore({
  reducer: {
    remove: removeReducer,
    sidebar: sidebarReducer,
    search: searchReducer,
    update: updateReducer,
  },
})
