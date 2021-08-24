import axios from 'axios'
import config from './config'
import { setProgress, setSearch, setTerm } from '../features/search/searchSlice'

export default async function search(dispatch, query) {
  dispatch(setProgress(true))
  dispatch(setTerm(query))
  try {
    const query_url = config.url + query
    const resp = await axios.get(query_url)
    dispatch(setProgress(false))
    dispatch(setSearch(resp.data.result))
  } catch (e) {
    dispatch(setProgress(false))
    console.log(e)
  }
}