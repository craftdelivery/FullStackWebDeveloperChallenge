import { useDispatch } from 'react-redux'
import { open } from './sidebarSlice'
import { MenuIcon } from '@heroicons/react/outline'

export default function Mobile() {
  const dispatch = useDispatch()

  const setSidebarOpen = (sidebarState) => dispatch(open(sidebarState))
  
  return (
    <div className="lg:hidden min-w-full">
      <div className="flex items-center justify-between bg-gray-50 border-b border-gray-200 px-4 py-1.5">
        <div>
          <img
            className="h-8 w-auto"
            src="https://wellkeptwallet.com/wp-content/uploads/mistplay-logo-525x112.png"
            alt="Workflow"
          />
        </div>
        <div>
          <button
            type="button"
            className="-mr-3 h-12 w-12 inline-flex items-center justify-center rounded-md text-gray-500 hover:text-gray-900"
            onClick={() => setSidebarOpen(true)}
          >
            <span className="sr-only">Open sidebar</span>
            <MenuIcon className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
      </div>
    </div>
  )
}