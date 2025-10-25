'use client'

import { useEffect, useRef, useState } from 'react'
import { Group } from '@/types'

interface CircularGalleryProps {
  groups: Group[]
  onGroupClick: (group: Group) => void
}

export default function CircularGallery({ groups, onGroupClick }: CircularGalleryProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const [startX, setStartX] = useState(0)
  const [rotation, setRotation] = useState(0)

  const radius = 300
  const itemCount = groups.length
  const angleStep = (2 * Math.PI) / itemCount

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true)
    setStartX(e.clientX)
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return
    const delta = e.clientX - startX
    setRotation(rotation + delta * 0.003)
    setStartX(e.clientX)
  }

  const handleMouseUp = () => {
    setIsDragging(false)
    // Snap to nearest item
    const newIndex = Math.round(-rotation / angleStep) % itemCount
    const snappedRotation = -newIndex * angleStep
    setRotation(snappedRotation)
    setCurrentIndex((newIndex + itemCount) % itemCount)
  }

  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault()
    const delta = e.deltaY > 0 ? 1 : -1
    const newIndex = (currentIndex + delta + itemCount) % itemCount
    setCurrentIndex(newIndex)
    setRotation(-newIndex * angleStep)
  }

  return (
    <div 
      ref={containerRef}
      className="relative w-full h-[600px] overflow-hidden cursor-grab active:cursor-grabbing"
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onWheel={handleWheel}
      style={{ perspective: '1000px' }}
    >
      <div 
        className="absolute inset-0 flex items-center justify-center"
        style={{
          transformStyle: 'preserve-3d',
          transition: isDragging ? 'none' : 'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)'
        }}
      >
        {groups.map((group, index) => {
          const angle = index * angleStep + rotation
          const x = Math.sin(angle) * radius
          const z = Math.cos(angle) * radius
          const scale = (z + radius) / (radius * 2) * 0.8 + 0.2
          const opacity = (z + radius) / (radius * 2) * 0.7 + 0.3
          const isFront = Math.abs(angle % (2 * Math.PI)) < Math.PI / 2

          return (
            <div
              key={group.id}
              className="absolute"
              style={{
                transform: `translateX(${x}px) translateZ(${z}px) scale(${scale})`,
                opacity: opacity,
                zIndex: Math.round(z),
                transition: isDragging ? 'none' : 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
                pointerEvents: isFront ? 'auto' : 'none'
              }}
              onClick={() => isFront && onGroupClick(group)}
            >
              <div className="relative group">
                {/* Orb glow effect */}
                <div 
                  className="absolute inset-0 rounded-3xl blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10"
                  style={{
                    background: `radial-gradient(circle at 50% 50%, ${group.color}88, transparent 70%)`
                  }}
                />
                
                {/* Card */}
                <div 
                  className="glass-strong p-8 rounded-3xl w-64 h-80 flex flex-col items-center justify-center hover:scale-105 transition-all duration-300"
                  style={{
                    border: isFront ? `2px solid ${group.color}` : '1px solid rgba(255,255,255,0.1)'
                  }}
                >
                  <div 
                    className="w-24 h-24 rounded-2xl flex items-center justify-center text-5xl mb-4"
                    style={{ background: group.color }}
                  >
                    {group.icon}
                  </div>
                  <h3 className="text-2xl font-bold mb-2 text-center">{group.name}</h3>
                  <p className="text-gray-400 text-sm text-center line-clamp-2 mb-4">
                    {group.description}
                  </p>
                  <div className="flex gap-4 text-center">
                    <div>
                      <div className="text-xl font-bold">{group.members}</div>
                      <div className="text-xs text-gray-400">Members</div>
                    </div>
                    <div>
                      <div className="text-xl font-bold text-green-400">${group.totalExpenses}</div>
                      <div className="text-xs text-gray-400">Pool</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Navigation hints */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-gray-400 text-sm flex gap-4">
        <span><i className="fas fa-mouse-pointer mr-2"></i>Drag to rotate</span>
        <span><i className="fas fa-computer-mouse mr-2"></i>Scroll to navigate</span>
      </div>

      {/* Indicators */}
      <div className="absolute bottom-20 left-1/2 -translate-x-1/2 flex gap-2">
        {groups.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              setCurrentIndex(index)
              setRotation(-index * angleStep)
            }}
            className={`w-2 h-2 rounded-full transition-all ${
              index === currentIndex ? 'bg-blue-500 w-6' : 'bg-white/30'
            }`}
          />
        ))}
      </div>
    </div>
  )
}

