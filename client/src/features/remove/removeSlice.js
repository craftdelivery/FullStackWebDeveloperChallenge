import { createSlice } from '@reduxjs/toolkit'

export const removeSlice = createSlice({
  name: 'remove',
  initialState: {
    result: null,
    inProgress: false,
    searchTerm: '',
  },
  reducers: {
    clearSearch: (state) => { state.results = null },
    setProgress: (state, action) => { state.inProgress = action.payload },
    setSearch: (state, action) => { state.result = action.payload },
    setTerm: (state, action) => { state.searchTerm = action.payload },
  }
})

export const { clearSearch, setProgress, setSearch, setTerm } = removeSlice.actions

export default removeSlice.reducer