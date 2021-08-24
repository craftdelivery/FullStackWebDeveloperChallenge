import { createSlice } from '@reduxjs/toolkit'

export const removeSlice = createSlice({
  name: 'remove',
  initialState: {
    results: [],
    inProgress: false,
    searchTerm: '',
  },
  reducers: {
    addResult: (state, action) => { state.results = [...state.results, action.payload] },
    setProgress: (state, action) => { state.inProgress = action.payload },
    setTerm: (state, action) => { state.searchTerm = action.payload },
  }
})

export const { addResult, clearSearch, setProgress, setTerm } = removeSlice.actions

export default removeSlice.reducer