import { useState } from 'react'
import Sidebar from './Sidebar'
import Header from './Header'

const Layout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="h-full flex bg-gray-900 text-white">
      {/* Mobile sidebar */}
      <div className={`fixed inset-0 z-40 flex md:hidden ${sidebarOpen ? 'visible' : 'invisible'}`}>
        <div
          className={`fixed inset-0 bg-gray-600 bg-opacity-75 transition-opacity duration-300 ${sidebarOpen ? 'opacity-50' : 'opacity-0'}`}
          onClick={() => setSidebarOpen(false)}
        />
        <div
          className={`relative flex-1 flex flex-col max-w-xs w-full transform transition-transform duration-300 ${
            sidebarOpen ? 'translate-x-0' : '-translate-x-full'
          } bg-gray-800`}
        >
          <Sidebar mobile onClose={() => setSidebarOpen(false)} />
        </div>
      </div>

      {/* Desktop sidebar */}
      <div className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0 bg-gray-800">
        <Sidebar />
      </div>

      {/* Main content */}
      <div className="md:pl-64 flex flex-col flex-1">
        <Header onMenuButtonClick={() => setSidebarOpen(true)} />
        <main className="flex-1 px-4 sm:px-6 md:px-8 py-6">
          <div className="pb-12 transition-opacity duration-400 opacity-100 translate-y-0">
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}

export default Layout
