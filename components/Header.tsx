'use client'

interface HeaderProps {
  currentPage: string
  onNavigate: (page: string) => void
}

export default function Header({ currentPage, onNavigate }: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 glass-strong animate-slideDown">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <div 
          onClick={() => onNavigate('home')} 
          className="cursor-pointer hover:opacity-80 transition-opacity"
        >
          <div className="flex items-center gap-3">
            <i className="fas fa-circle-notch text-3xl text-blue-400"></i>
            <div>
              <h1 className="text-2xl font-black">Orbit</h1>
              <p className="text-xs text-gray-400">Your world, perfectly organized</p>
            </div>
          </div>
        </div>

        <nav className="flex gap-3">
          <button
            onClick={() => onNavigate('groups')}
            className={`px-5 py-2.5 rounded-xl font-semibold transition-all ${
              currentPage === 'groups'
                ? 'bg-blue-500 text-white'
                : 'bg-white/5 hover:bg-white/10 text-white'
            }`}
          >
            <i className="fas fa-globe mr-2"></i>
            Groups
          </button>
          <button
            onClick={() => onNavigate('create')}
            className={`px-5 py-2.5 rounded-xl font-semibold transition-all ${
              currentPage === 'create'
                ? 'bg-blue-500 text-white'
                : 'bg-white/5 hover:bg-white/10 text-white'
            }`}
          >
            <i className="fas fa-plus mr-2"></i>
            Create
          </button>
        </nav>
      </div>
    </header>
  )
}

