import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import search from '../../rest/search'
import { clearSearch, setTerm } from './searchSlice'
import Reslts from './results'

const active = "mt-3 w-full inline-flex items-center justify-center px-4 py-2 border border-transparent shadow-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
const inactive = "mt-3 w-full inline-flex items-center justify-center px-4 py-2 border border-transparent shadow-sm font-medium rounded-md text-white bg-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
const reset = "bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"

export default function Search() {
  const dispatch = useDispatch()
  const [val, setVal] = useState('')

  const { results, inProgress, searchTerm } = useSelector(s => s.search)
  
  useEffect(() => {
    if(searchTerm && searchTerm.length) {
      setVal(searchTerm)
    }
  }, [searchTerm])

  const classes = val.length ? active : inactive

  const submit = () => {
    search(dispatch, val)
  }

  const clear = () => {
    setVal('')
    dispatch(setTerm(''))
    dispatch(clearSearch())
  }

  return (
    <div className="bg-white shadow sm:rounded-lg">
      <div className="px-4 py-5 sm:p-6">
        <h3 className="text-lg leading-6 font-medium text-gray-900">
          Search
          {
            val.length ? (
              <button
                className={`m-7 ${reset}`}
                onClick={clear}
              >
                Clear
              </button>
            ) : null
          }
        </h3>
        <div className="mt-2 max-w-xl text-sm text-gray-500">
          <p>
            Please enter a single word to search
          </p>
        </div>
        <div className="mt-5 sm:flex sm:items-center">
          <div className="w-full sm:max-w-xs">
            <label htmlFor="search" className="sr-only">
              Search
            </label>
            <input
              type="text"
              name="search"
              className="p-2 h-7 shadow-md focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
              placeholder=""
              onChange={(e) => setVal(e.target.value)}
              value={val}
            />
          </div>
          <button
            onClick={submit}
            disabled={!val.length || inProgress}
            className={classes}
          >
            {
              inProgress ? 'Searching...' : 'Go'
            }
          </button>
        </div>
      </div>
      {
        results.length ? (
          <div>
            <Reslts results={results} />
          </div>
        ) : null
      }
      {
        searchTerm.length && !results.length ? (
          <b>
            No Similar matches for {val}
          </b>
        ) : null
      }
    </div>
  )
}