'use client'

import { useEffect, useRef } from 'react'

export default function OrbBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d', { alpha: false })
    if (!ctx) return

    let animationFrameId: number
    let time = 0

    const resize = () => {
      const dpr = window.devicePixelRatio || 1
      canvas.width = window.innerWidth * dpr
      canvas.height = window.innerHeight * dpr
      canvas.style.width = `${window.innerWidth}px`
      canvas.style.height = `${window.innerHeight}px`
      ctx.scale(dpr, dpr)
    }

    resize()
    window.addEventListener('resize', resize)

    const createOrb = (x: number, y: number, radius: number, color1: string, color2: string) => {
      const gradient = ctx.createRadialGradient(x, y, 0, x, y, radius)
      gradient.addColorStop(0, color1)
      gradient.addColorStop(0.4, color2)
      gradient.addColorStop(1, 'rgba(0, 0, 0, 0)')
      
      ctx.fillStyle = gradient
      ctx.beginPath()
      ctx.arc(x, y, radius, 0, Math.PI * 2)
      ctx.fill()
    }

    const animate = () => {
      time += 0.003
      
      // Dark gradient background
      const bgGradient = ctx.createLinearGradient(0, 0, 0, canvas.height)
      bgGradient.addColorStop(0, '#0a0e1a')
      bgGradient.addColorStop(1, '#1a1f35')
      ctx.fillStyle = bgGradient
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      const centerX = window.innerWidth / 2
      const centerY = window.innerHeight / 2

      // Large primary orb (blue)
      const orb1X = centerX + Math.cos(time * 0.5) * 250
      const orb1Y = centerY + Math.sin(time * 0.3) * 200
      createOrb(orb1X, orb1Y, 400, 'rgba(59, 130, 246, 0.3)', 'rgba(37, 99, 235, 0.15)')

      // Secondary orb (cyan)
      const orb2X = centerX + Math.cos(time * 0.7 + Math.PI) * 300
      const orb2Y = centerY + Math.sin(time * 0.5 + Math.PI) * 250
      createOrb(orb2X, orb2Y, 350, 'rgba(6, 182, 212, 0.25)', 'rgba(8, 145, 178, 0.12)')

      // Tertiary orb (purple)
      const orb3X = centerX + Math.cos(time * 0.4 + Math.PI * 0.5) * 200
      const orb3Y = centerY + Math.sin(time * 0.6 + Math.PI * 0.5) * 150
      createOrb(orb3X, orb3Y, 300, 'rgba(139, 92, 246, 0.2)', 'rgba(124, 58, 237, 0.1)')

      // Small accent orb (green)
      const orb4X = centerX + Math.cos(time * 0.9) * 180
      const orb4Y = centerY + Math.sin(time * 0.8) * 180
      createOrb(orb4X, orb4Y, 200, 'rgba(16, 185, 129, 0.18)', 'rgba(5, 150, 105, 0.08)')

      animationFrameId = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener('resize', resize)
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 -z-10 pointer-events-none"
    />
  )
}
