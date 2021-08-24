import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import updateRequest from './updateRequest'
import { setTerm } from './updateSlice'
import styles from '../styles'
import {
  XIcon,
} from '@heroicons/react/solid'

export default function Remove() {
  const dispatch = useDispatch()
  const [val, setVal] = useState('')

  const { results, inProgress, searchTerm } = useSelector(s => s.update)
  
  useEffect(() => {
    if(searchTerm && searchTerm.length) {
      setVal(searchTerm)
    }
  }, [searchTerm])

  const btn_class = val.length ? styles.active : styles.inactive

  const submit = () => {
    updateRequest(dispatch, val)
  }

  const clear = () => {
    setVal('')
    dispatch(setTerm(''))
  }

  return (
    <div className="bg-white shadow sm:rounded-lg">
      <div className="px-4 py-5 sm:p-6">
        <h3 className="ml-6 text-lg leading-6 font-medium text-gray-900">
          Update
        </h3>
        <div className="ml-6 mt-2 max-w-xl text-sm text-gray-500">
          <p>
            Please enter a single word to update
          </p>
        </div>
        <div className="mt-5 sm:flex sm:items-center">
          <div className="w-full sm:max-w-xs">
            <label htmlFor="update" className="sr-only">
              Update
            </label>
            <input
              type="text"
              name="update"
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
              inProgress ? 'Updating...' : 'Go'
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
        {
          results.map(result => {
            return (
              <div className="ml-6">
                {result.word} was {result.added ? '' : 'Not '} Added {result.term ? ` For Query ${result.term}`: null}
                {
                  result.error ? ' - Error' : null
                }
                {
                  result.conflict ? ': Word already in database' : null
                }
              </div>
            )
          })
        }
      </div>
    </div>
  )
}