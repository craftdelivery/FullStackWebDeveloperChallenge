import { createSlice } from '@reduxjs/toolkit'

export const searchSlice = createSlice({
  name: 'search',
  initialState: {
    results: [],
    inProgress: false,
    searchTerm: '',
  },
  reducers: {
    clearSearch: (state) => { state.results = [] },
    setProgress: (state, action) => { state.inProgress = action.payload },
    setSearch: (state, action) => { state.results = action.payload },
    setTerm: (state, action) => { state.searchTerm = action.payload },
  }
})

export const { clearSearch, setProgress, setSearch, setTerm } = searchSlice.actions

export default searchSlice.reducer