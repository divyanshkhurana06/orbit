'use client'

import { useState } from 'react'
import { Group } from '@/types'
import OrbBackground from './OrbBackground'
import CircularGallery from './CircularGallery'

interface GroupsPageProps {
  groups: Group[]
  onGroupClick: (group: Group) => void
  onCreateClick: () => void
}

export default function GroupsPage({ groups, onGroupClick, onCreateClick }: GroupsPageProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [viewMode, setViewMode] = useState<'circular' | 'grid'>('circular')

  const filteredGroups = groups.filter(group =>
    group.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="min-h-screen pb-20">
      <OrbBackground />
      
      {/* Header Section */}
      <div className="border-b border-white/10 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6 py-10">
          <h1 className="text-4xl font-black mb-6">
            <i className="fas fa-globe mr-3"></i>
            Your Groups
          </h1>
          
          <div className="flex gap-3 flex-wrap">
            <input
              type="text"
              placeholder="Search groups..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="px-4 py-3 rounded-xl border border-white/10 bg-white/5 text-white placeholder-gray-400 w-64 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={() => setViewMode('circular')}
              className={`px-4 py-3 rounded-xl font-semibold transition-all ${
                viewMode === 'circular' ? 'bg-blue-500' : 'bg-white/5 hover:bg-white/10'
              }`}
            >
              <i className="fas fa-circle-notch mr-2"></i>
              Circular
            </button>
            <button
              onClick={() => setViewMode('grid')}
              className={`px-4 py-3 rounded-xl font-semibold transition-all ${
                viewMode === 'grid' ? 'bg-blue-500' : 'bg-white/5 hover:bg-white/10'
              }`}
            >
              <i className="fas fa-th mr-2"></i>
              Grid
            </button>
            <button
              onClick={onCreateClick}
              className="px-6 py-3 bg-blue-500 hover:bg-blue-600 rounded-xl font-semibold transition-all hover:scale-105 ml-auto"
            >
              <i className="fas fa-plus mr-2"></i>
              New Group
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        {filteredGroups.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-8xl mb-6 animate-float">🔍</div>
            <h2 className="text-3xl font-bold mb-4">No groups found</h2>
            <p className="text-gray-400 mb-8">Get started by creating your first group!</p>
            <button
              onClick={onCreateClick}
              className="px-8 py-4 bg-blue-500 hover:bg-blue-600 rounded-2xl font-bold text-lg transition-all hover:scale-105"
            >
              <i className="fas fa-plus mr-2"></i>
              Create Your First Group
            </button>
          </div>
        ) : viewMode === 'circular' ? (
          <CircularGallery groups={filteredGroups} onGroupClick={onGroupClick} />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredGroups.map((group, index) => (
              <div
                key={group.id}
                onClick={() => onGroupClick(group)}
                className="relative group cursor-pointer"
                style={{ 
                  animation: 'fadeIn 0.5s ease-out',
                  animationDelay: `${index * 0.1}s`,
                  animationFillMode: 'both'
                }}
              >
                {/* Orb Effect */}
                <div 
                  className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10 blur-2xl"
                  style={{
                    background: `radial-gradient(circle at 50% 50%, ${group.color}88, transparent 70%)`
                  }}
                />
                
                {/* Card */}
                <div className="glass-strong p-8 rounded-3xl hover:scale-105 transition-all duration-300">
                  {/* Icon with color background */}
                  <div 
                    className="w-20 h-20 rounded-2xl flex items-center justify-center text-4xl mb-4 mx-auto"
                    style={{ background: group.color }}
                  >
                    {group.icon}
                  </div>
                  
                  <h3 className="text-2xl font-bold mb-2 text-center">{group.name}</h3>
                  <p className="text-gray-400 text-sm mb-4 text-center line-clamp-2">
                    {group.description}
                  </p>
                  
                  <div className="flex justify-around items-center pt-4 border-t border-white/10">
                    <div className="text-center">
                      <div className="text-2xl font-bold">{group.members}</div>
                      <div className="text-xs text-gray-400">Members</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-400">${group.totalExpenses}</div>
                      <div className="text-xs text-gray-400">Pool</div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
