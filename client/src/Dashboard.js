import Sidebar from './features/sidebar/sidebar'
import Mobile from './features/sidebar/mobile'
import {
  BrowserRouter as Router,
  Link,
  Switch,
  Route,
} from "react-router-dom"

import Remove from './features/remove'
import Search from './features/search'
import Update from './features/update'

export default function Dashboard() {
  return (
    <Router>
      <div className="h-screen flex overflow-hidden bg-white">
        <Sidebar />
        <div className="flex flex-col min-w-0 flex-1 overflow-hidden">
          <Mobile />
          <div className="flex-1 relative z-0 flex overflow-hidden">
            <main className="flex-1 relative z-0 overflow-y-auto focus:outline-none xl:order-last">
              <div className="absolute inset-0 py-6 px-4 sm:px-6 lg:px-8">
                <div className="h-full border-2 border-gray-200 border-dashed rounded-lg">
                  <Switch>
                    <Route path='/search'>
                      <Search />
                    </Route>
                    <Route path='/remove'>
                      <Remove />
                    </Route>
                    <Route path='/update'>
                      <Update />
                    </Route>
                    <Route path='/'>
                      <div className="flex h-screen justify-center items-center">
                        <div className="m25 text-center relative z-0 inline-flex shadow-sm rounded-md">
                          <button
                            type="button"
                            className="relative inline-flex items-center px-4 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
                          >
                            Search
                          </button>
                          <button
                            type="button"
                            className="-ml-px relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
                          >
                            Update
                          </button>
                          <button
                            type="button"
                            className="-ml-px relative inline-flex items-center px-4 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </Route>
                  </Switch>
                </div>
              </div>
            </main>
          </div>
        </div>
      </div>
    </Router>
  )
}
