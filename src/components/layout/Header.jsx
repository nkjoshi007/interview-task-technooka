import { useState, useEffect } from 'react'

const Header = () => {
  const [scrolled, setScrolled] = useState(false)
  const pageTitle = 'Dashboard'  // Static title since no routing

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header
      className={`sticky top-0 z-30 flex h-16 bg-gray-800 text-white transition-shadow duration-200 ${
        scrolled ? 'shadow-lg shadow-gray-900/10' : ''
      }`}
    >
      <div className="flex-1 flex items-center justify-between px-4 sm:px-6 md:px-8">
        <h1 className="text-xl font-medium">{pageTitle}</h1>

        <div className="flex items-center space-x-4">
          {/* Notification Bell */}
          <button className="p-2 rounded-full hover:bg-gray-700">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
              />
            </svg>
          </button>

          {/* Profile menu */}
          <div className="relative">
            <button className="flex items-center max-w-xs rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500">
              <img
                className="h-8 w-8 rounded-full"
                src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                alt="User profile"
              />
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
