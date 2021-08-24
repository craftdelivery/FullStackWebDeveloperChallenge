import Sidebar from './features/sidebar/sidebar'
import Mobile from './features/sidebar/mobile'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom"

export default function Dashboard() {
  return (
    <div className="h-screen flex overflow-hidden bg-white">
      <Sidebar />
      <Mobile />
      <div className="flex flex-col min-w-0 flex-1 overflow-hidden">
        <div className="flex-1 relative z-0 flex overflow-hidden">
          <main className="flex-1 relative z-0 overflow-y-auto focus:outline-none xl:order-last">
            <div className="absolute inset-0 py-6 px-4 sm:px-6 lg:px-8">
              <div className="h-full border-2 border-gray-200 border-dashed rounded-lg">
                <Router>
                  <Switch>
                    
                  </Switch>
                </Router>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  )
}
