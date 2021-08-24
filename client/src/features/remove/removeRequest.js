import axios from 'axios'
import config from '../../config'
import { addResult, setProgress, setTerm } from './removeSlice'

export default async function removeRequest(dispatch, query) {
  dispatch(setProgress(true))
  dispatch(setTerm(query))
  try {
    const query_url = config.url + query
    const resp = await axios.delete(query_url)
    dispatch(setProgress(false))
    const { result } = resp.data
    if (result && result.length) {
      dispatch(addResult({
        word: result[0].word,
        term: query,
        removed: true
      }))
    } else {
      dispatch(addResult({
        word: query,
        removed: false
      }))
    }
  } catch (e) {
    dispatch(addResult({
      word: query,
      removed: false,
      error: true,
    }))
    dispatch(setProgress(false))
    console.log(e)
  }
}