import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import removeRequest from './removeRequest'
import { clearSearch, setTerm } from './removeSlice'
import styles from '../styles'
import {
  XIcon,
} from '@heroicons/react/solid'

export default function Remove() {
  const dispatch = useDispatch()
  const [val, setVal] = useState('')

  const { result, inProgress, searchTerm } = useSelector(s => s.remove)
  
  useEffect(() => {
    if(searchTerm && searchTerm.length) {
      setVal(searchTerm)
    }
  }, [searchTerm])

  const btn_class = val.length ? styles.active : styles.inactive

  const submit = () => {
    removeRequest(dispatch, val)
  }

  const clear = () => {
    setVal('')
    dispatch(setTerm(''))
    dispatch(clearSearch())
  }

  return (
    <div className="bg-white shadow sm:rounded-lg">
      <div className="px-4 py-5 sm:p-6">
        <h3 className="ml-6 text-lg leading-6 font-medium text-gray-900">
          Remove
        </h3>
        <div className="ml-6 mt-2 max-w-xl text-sm text-gray-500">
          <p>
            Please enter a single word to remove
          </p>
        </div>
        <div className="mt-5 sm:flex sm:items-center">
          <div className="w-full sm:max-w-xs">
            <label htmlFor="remove" className="sr-only">
              Remove
            </label>
            <input
              type="text"
              name="remove"
              className={styles.input}
              placeholder=""
              onChange={(e) => setVal(e.target.value)}
              value={val}
            />
          </div>
          <button
            onClick={submit}
            disabled={!val.length || inProgress}
            className={btn_class}
          >
            {
              inProgress ? 'Removing...' : 'Go'
            }
          </button>
          <button
            className={styles.reset}
            onClick={clear}
            disabled={inProgress || !val.length}
          >
            <XIcon className="h-6" />
          </button>
        </div>
      </div>
    </div>
  )
}