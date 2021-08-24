import { createSlice } from '@reduxjs/toolkit'

export const sidebarSlice = createSlice({
  name: 'sidebar',
  initialState: {
    open: false,
  },
  reducers: {
     open: (state, action) => {
       state.open = action.payload
     },
  }
})

export const { open } = sidebarSlice.actions

export default sidebarSlice.reducer