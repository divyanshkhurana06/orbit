'use client'

import { useEffect, useState } from 'react'

interface HomePageProps {
  onNavigate: (page: string) => void
  userData: { groups: any[] }
}

export default function HomePage({ onNavigate, userData }: HomePageProps) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <div className={`min-h-screen flex flex-col items-center justify-center text-center px-6 ${isVisible ? 'animate-fadeIn' : 'opacity-0'}`}>
      <div className="max-w-4xl">
        <div className="text-8xl mb-8 animate-float">🌐</div>
        
        <h1 className="text-6xl md:text-7xl font-black mb-6 bg-gradient-to-r from-white to-blue-300 bg-clip-text text-transparent">
          Welcome to Orbit
        </h1>
        
        <p className="text-xl md:text-2xl text-gray-400 mb-12 max-w-2xl mx-auto leading-relaxed">
          Your world, perfectly organized. Create groups, manage circles, and collaborate seamlessly with Web3 integration.
        </p>

        <div className="flex gap-6 justify-center flex-wrap mb-16">
          <button
            onClick={() => onNavigate('groups')}
            className="px-8 py-4 bg-blue-500 hover:bg-blue-600 rounded-2xl font-bold text-lg transition-all hover:scale-105 shadow-lg shadow-blue-500/50"
          >
            <i className="fas fa-rocket mr-2"></i>
            Explore Groups
          </button>
          <button
            onClick={() => onNavigate('create')}
            className="px-8 py-4 glass hover:bg-white/10 rounded-2xl font-bold text-lg transition-all hover:scale-105"
          >
            <i className="fas fa-plus-circle mr-2"></i>
            Create Group
          </button>
        </div>

        <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          <div className="glass p-8 rounded-2xl hover:scale-105 transition-transform">
            <div className="text-4xl mb-4">⚡</div>
            <h3 className="text-xl font-bold mb-2">Instant Payments</h3>
            <p className="text-gray-400 text-sm">
              Split bills and send payments with Yellow Network
            </p>
          </div>
          <div className="glass p-8 rounded-2xl hover:scale-105 transition-transform">
            <div className="text-4xl mb-4">🔗</div>
            <h3 className="text-xl font-bold mb-2">Cross-Chain</h3>
            <p className="text-gray-400 text-sm">
              Unified treasury across chains with Avail Nexus
            </p>
          </div>
          <div className="glass p-8 rounded-2xl hover:scale-105 transition-transform">
            <div className="text-4xl mb-4">🧠</div>
            <h3 className="text-xl font-bold mb-2">AI Analytics</h3>
            <p className="text-gray-400 text-sm">
              Smart insights powered by Blockscout MCP
            </p>
          </div>
        </div>

        {userData.groups.length > 0 && (
          <div className="mt-12 glass p-6 rounded-2xl inline-block">
            <p className="text-gray-400 mb-2">You have</p>
            <p className="text-4xl font-black text-blue-400">{userData.groups.length}</p>
            <p className="text-gray-400 mt-2">active groups</p>
          </div>
        )}
      </div>
    </div>
  )
}

