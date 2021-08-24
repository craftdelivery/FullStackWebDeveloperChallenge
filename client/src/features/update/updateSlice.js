import { createSlice } from '@reduxjs/toolkit'

export const updateSlice = createSlice({
  name: 'update',
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

export const { addResult, clearSearch, setProgress, setTerm } = updateSlice.actions

export default updateSlice.reducer