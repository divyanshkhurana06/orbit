'use client'

import { useState } from 'react'
import { appData } from '@/lib/appData'

interface CreateGroupPageProps {
  onCreate: (formData: any) => void
  onCancel: () => void
}

export default function CreateGroupPage({ onCreate, onCancel }: CreateGroupPageProps) {
  const [formData, setFormData] = useState({
    name: '',
    icon: '🌟',
    description: '',
    color: '#10b981',
    image: ''
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.name.trim()) {
      alert('Please enter a group name')
      return
    }
    onCreate(formData)
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-6 py-12">
      <div className="w-full max-w-3xl glass-strong p-12 rounded-3xl animate-fadeIn">
        {/* Preview */}
        <div className="text-center mb-10">
          <div
            className="w-32 h-32 rounded-3xl flex items-center justify-center text-6xl mb-4 mx-auto animate-float"
            style={{ background: formData.color }}
          >
            {formData.icon}
          </div>
          <h1 className="text-4xl font-black">Create New Group</h1>
          <p className="text-gray-400 mt-2">Customize your group and start collaborating</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name */}
          <div>
            <label className="block text-sm font-semibold mb-2">
              Group Name <span className="text-red-400">*</span>
            </label>
            <input
              type="text"
              placeholder="Enter group name..."
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-4 py-3 rounded-xl border border-white/10 bg-white/5 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-semibold mb-2">Description</label>
            <textarea
              placeholder="What's this group about?"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-4 py-3 rounded-xl border border-white/10 bg-white/5 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[100px] resize-none"
            />
          </div>

          {/* Icon Picker */}
          <div>
            <label className="block text-sm font-semibold mb-3">Choose Icon</label>
            <div className="grid grid-cols-10 gap-2">
              {appData.groupIcons.map((icon) => (
                <button
                  key={icon}
                  type="button"
                  onClick={() => setFormData({ ...formData, icon })}
                  className={`w-full aspect-square text-2xl rounded-xl transition-all ${
                    formData.icon === icon
                      ? 'bg-blue-500 scale-110'
                      : 'bg-white/5 hover:bg-white/10'
                  }`}
                >
                  {icon}
                </button>
              ))}
            </div>
          </div>

          {/* Color Picker */}
          <div>
            <label className="block text-sm font-semibold mb-3">Choose Color</label>
            <div className="grid grid-cols-10 gap-2">
              {appData.groupColors.map((color) => (
                <button
                  key={color}
                  type="button"
                  onClick={() => setFormData({ ...formData, color })}
                  className={`w-full aspect-square rounded-xl transition-all ${
                    formData.color === color ? 'ring-4 ring-white scale-110' : ''
                  }`}
                  style={{ background: color }}
                />
              ))}
            </div>
          </div>

          {/* Image URL */}
          <div>
            <label className="block text-sm font-semibold mb-2">
              Cover Image URL (optional)
            </label>
            <input
              type="url"
              placeholder="https://..."
              value={formData.image}
              onChange={(e) => setFormData({ ...formData, image: e.target.value })}
              className="w-full px-4 py-3 rounded-xl border border-white/10 bg-white/5 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <p className="text-xs text-gray-400 mt-2">Leave blank for a random image</p>
          </div>

          {/* Buttons */}
          <div className="flex gap-4 pt-4">
            <button
              type="submit"
              className="flex-1 px-6 py-4 bg-blue-500 hover:bg-blue-600 rounded-xl font-bold text-lg transition-all hover:scale-105"
            >
              <i className="fas fa-check mr-2"></i>
              Create Group
            </button>
            <button
              type="button"
              onClick={onCancel}
              className="flex-1 px-6 py-4 bg-white/5 hover:bg-white/10 rounded-xl font-bold text-lg transition-all"
            >
              <i className="fas fa-times mr-2"></i>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

