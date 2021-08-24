import axios from 'axios'
import config from '../../config'
import { addResult, setProgress, setTerm } from './updateSlice'

export default async function updateRequest(dispatch, query) {
  dispatch(setProgress(true))
  dispatch(setTerm(query))
  try {
    const query_url = config.url + query
    const resp = await axios.put(query_url)
    dispatch(setProgress(false))
    const { result } = resp.data
    if (result && result.length) {
      dispatch(addResult({
        word: result[0].word,
        term: query,
        added: true
      }))
    } else {
      dispatch(addResult({
        word: query,
        added: false
      }))
    }
  } catch (e) {
    console.log(e.response.status)
    if (e.response && e.response.status === 409) {
      dispatch(addResult({
        word: query,
        added: false,
        error: true,
        conflict: true,
      }))
    } else {
      dispatch(addResult({
        word: query,
        added: false,
        error: true,
      }))
    }
    dispatch(setProgress(false))
    console.log(e)
  }
}