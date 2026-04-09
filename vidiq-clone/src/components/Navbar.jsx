import { Link, useLocation } from 'react-router-dom'

function Navbar() {
  const location = useLocation()

  const navItems = [
    { path: '/', label: 'Dashboard', icon: '📊' },
    { path: '/keywords', label: 'Keyword Tool', icon: '🔍' },
    { path: '/competitors', label: 'Competitors', icon: '🏆' },
    { path: '/seo', label: 'SEO Optimizer', icon: '⚡' },
  ]

  return (
    <nav className="bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-2">
            <span className="text-2xl font-bold">VidIQ Clone</span>
          </Link>
          
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`px-4 py-2 rounded-lg transition-all duration-200 flex items-center space-x-2 ${
                  location.pathname === item.path
                    ? 'bg-white/20 backdrop-blur-sm'
                    : 'hover:bg-white/10'
                }`}
              >
                <span>{item.icon}</span>
                <span>{item.label}</span>
              </Link>
            ))}
          </div>

          <div className="flex items-center space-x-4">
            <button className="bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg transition-all duration-200">
              Sign In
            </button>
            <button className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 px-4 py-2 rounded-lg font-semibold transition-all duration-200">
              Get Started
            </button>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
