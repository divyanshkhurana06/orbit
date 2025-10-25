'use client'

import { useState, useEffect, useRef } from 'react'
import { Group, Circle, Post } from '@/types'
import { appData } from '@/lib/appData'
import OrbBackground from './OrbBackground'

interface GroupDetailPageProps {
  group: Group
  circles: Circle[]
  posts: Post[]
  onBack: () => void
}

export default function GroupDetailPage({ group, circles, posts, onBack }: GroupDetailPageProps) {
  const [walletAddress, setWalletAddress] = useState<string | null>(null)
  const [showInviteModal, setShowInviteModal] = useState(false)
  const [showPaymentModal, setShowPaymentModal] = useState(false)
  const [photos, setPhotos] = useState<any[]>([])

  const connectWallet = async () => {
    if (typeof window !== 'undefined' && (window as any).ethereum) {
      try {
        const accounts = await (window as any).ethereum.request({ 
          method: 'eth_requestAccounts' 
        })
        setWalletAddress(accounts[0])
      } catch (error) {
        // Demo mode
        setWalletAddress(appData.generateWalletAddress())
      }
    } else {
      setWalletAddress(appData.generateWalletAddress())
    }
  }

  const generateInviteLink = () => {
    if (typeof window === 'undefined') return ''
    return `${window.location.origin}?join=${group.id}&name=${encodeURIComponent(group.name)}`
  }

  const copyInviteLink = async () => {
    const link = generateInviteLink()
    try {
      await navigator.clipboard.writeText(link)
      alert('Invite link copied! 🎉')
    } catch (err) {
      prompt('Copy this link:', link)
    }
  }

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setPhotos([...photos, {
          id: Date.now(),
          url: e.target?.result,
          uploader: walletAddress || 'Anonymous',
          timestamp: new Date().toISOString()
        }])
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <div className="min-h-screen pb-20">
      <OrbBackground />

      {/* Header */}
      <div className="border-b border-white/10 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6 py-6 flex justify-between items-center flex-wrap gap-4">
          <button onClick={onBack} className="px-4 py-2 bg-white/5 hover:bg-white/10 rounded-xl">
            <i className="fas fa-arrow-left mr-2"></i>
            Back
          </button>
          <div className="flex gap-3 flex-wrap">
            {!walletAddress ? (
              <button onClick={connectWallet} className="px-5 py-2 bg-blue-500 hover:bg-blue-600 rounded-xl font-semibold">
                <i className="fas fa-wallet mr-2"></i>
                Connect Wallet
              </button>
            ) : (
              <div className="px-4 py-2 bg-green-500/20 rounded-xl text-green-400 font-mono text-sm">
                <i className="fas fa-check-circle mr-2"></i>
                {walletAddress.slice(0, 6)}...{walletAddress.slice(-4)}
              </div>
            )}
            <button onClick={() => setShowInviteModal(true)} className="px-5 py-2 bg-blue-500 hover:bg-blue-600 rounded-xl font-semibold">
              <i className="fas fa-user-plus mr-2"></i>
              Invite
            </button>
          </div>
        </div>
      </div>

      {/* Group Hero */}
      <div 
        className="relative py-20 text-center"
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.8)), url(${group.image})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <div
          className="w-32 h-32 rounded-3xl flex items-center justify-center text-6xl mb-6 mx-auto animate-float"
          style={{ background: group.color }}
        >
          {group.icon}
        </div>
        <h1 className="text-5xl font-black mb-4">{group.name}</h1>
        <p className="text-xl text-gray-300 mb-8">{group.description}</p>
        
        <div className="flex gap-12 justify-center">
          <div>
            <div className="text-4xl font-black">{group.members}</div>
            <div className="text-sm text-gray-400">Members</div>
          </div>
          <div>
            <div className="text-4xl font-black">{circles.length}</div>
            <div className="text-sm text-gray-400">Circles</div>
          </div>
          <div>
            <div className="text-4xl font-black text-green-400">${group.totalExpenses}</div>
            <div className="text-sm text-gray-400">Pool</div>
          </div>
        </div>
      </div>

      {/* SDK Badges */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <div className="sdk-badge yellow cursor-pointer" onClick={() => setShowPaymentModal(true)}>
            <i className="fas fa-bolt text-3xl mb-2"></i>
            <div className="font-bold">Yellow Network</div>
            <div className="text-sm opacity-80">Instant payments</div>
          </div>
          <div className="sdk-badge avail cursor-pointer" onClick={() => setShowPaymentModal(true)}>
            <i className="fas fa-link text-3xl mb-2"></i>
            <div className="font-bold">Avail Nexus</div>
            <div className="text-sm opacity-80">Cross-chain pool</div>
          </div>
          <div className="sdk-badge blockscout">
            <i className="fas fa-brain text-3xl mb-2"></i>
            <div className="font-bold">Blockscout AI</div>
            <div className="text-sm opacity-80">Smart analytics</div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid md:grid-cols-3 gap-4 mb-12">
          <button onClick={() => setShowPaymentModal(true)} className="px-6 py-4 glass hover:bg-white/10 rounded-2xl font-semibold">
            <i className="fas fa-coins mr-2"></i>
            Split Payment
          </button>
          <label className="px-6 py-4 glass hover:bg-white/10 rounded-2xl font-semibold cursor-pointer text-center">
            <i className="fas fa-images mr-2"></i>
            Share Photo
            <input type="file" accept="image/*" onChange={handlePhotoUpload} className="hidden" />
          </label>
          <button className="px-6 py-4 glass hover:bg-white/10 rounded-2xl font-semibold">
            <i className="fas fa-map-marked-alt mr-2"></i>
            View Map
          </button>
        </div>

        {/* Photos */}
        {photos.length > 0 && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-6">Shared Photos</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {photos.map((photo) => (
                <div key={photo.id} className="aspect-square rounded-2xl overflow-hidden">
                  <img src={photo.url} alt="Shared" className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Circles as Orbs */}
        <h2 className="text-3xl font-bold mb-8 flex items-center gap-3">
          <i className="fas fa-circle-notch"></i>
          Circles
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {circles.map((circle, index) => (
            <div key={circle.id} className="relative group">
              <div 
                className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity blur-xl"
                style={{
                  background: `radial-gradient(circle, hsl(${index * 60}, 70%, 60%), transparent)`
                }}
              />
              <div className="glass-strong p-8 rounded-3xl text-center hover:scale-105 transition-all cursor-pointer relative">
                <div className="text-5xl mb-4">{circle.icon}</div>
                <div className="font-bold">{circle.name}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Invite Modal */}
      {showInviteModal && (
        <div className="modal" onClick={() => setShowInviteModal(false)}>
          <div className="modal-content max-w-md" onClick={(e) => e.stopPropagation()}>
            <span className="close-btn" onClick={() => setShowInviteModal(false)}>&times;</span>
            <h2 className="text-3xl font-bold mb-6 text-center">
              <i className="fas fa-user-plus mr-2"></i>
              Invite Members
            </h2>
            <p className="text-gray-400 mb-6 text-center">
              Share this link to invite people to {group.name}
            </p>
            <div className="p-4 bg-white/5 rounded-xl mb-6 break-all font-mono text-sm">
              {generateInviteLink()}
            </div>
            <button onClick={copyInviteLink} className="w-full px-6 py-4 bg-blue-500 hover:bg-blue-600 rounded-xl font-bold">
              <i className="fas fa-copy mr-2"></i>
              Copy Link
            </button>
          </div>
        </div>
      )}

      {/* Payment Modal */}
      {showPaymentModal && (
        <div className="modal" onClick={() => setShowPaymentModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <span className="close-btn" onClick={() => setShowPaymentModal(false)}>&times;</span>
            <h2 className="text-3xl font-bold mb-6">
              <i className="fas fa-coins mr-2"></i>
              Payment Features
            </h2>
            <div className="payment-grid">
              <div className="payment-card">
                <h3 className="font-bold text-lg mb-2">
                  <i className="fas fa-bolt mr-2"></i>
                  Yellow - Instant Pay
                </h3>
                <p className="text-sm text-gray-400 mb-4">Send instant payments</p>
                <input type="number" className="payment-input" placeholder="Amount (USDC)" />
                <button className="w-full mt-3 px-4 py-2 bg-yellow-500 text-black rounded-xl font-bold">
                  Send
                </button>
              </div>
              <div className="payment-card">
                <h3 className="font-bold text-lg mb-2">
                  <i className="fas fa-users mr-2"></i>
                  Split Payment
                </h3>
                <p className="text-sm text-gray-400 mb-4">Divide equally</p>
                <input type="number" className="payment-input" placeholder="Total Amount" />
                <button className="w-full mt-3 px-4 py-2 bg-blue-500 rounded-xl font-bold">
                  Split with {group.members}
                </button>
              </div>
              <div className="payment-card">
                <h3 className="font-bold text-lg mb-2">
                  <i className="fas fa-link mr-2"></i>
                  Avail - Cross-Chain
                </h3>
                <p className="text-sm text-gray-400 mb-4">Group treasury</p>
                <div className="p-4 bg-black/30 rounded-xl text-center my-4">
                  <div className="text-2xl font-bold">${group.totalExpenses} USDC</div>
                  <div className="text-xs text-gray-400">Pool Balance</div>
                </div>
                <button className="w-full px-4 py-2 bg-cyan-500 rounded-xl font-bold">
                  Add to Pool
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

