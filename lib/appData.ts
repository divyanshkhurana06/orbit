import { Group, Circle, Post, MemberLocation } from '@/types'

export const appData = {
  groups: [
    {
      id: 1,
      name: 'Travel Squad',
      icon: '✈️',
      members: 1,
      color: '#10b981',
      image: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800&h=600&fit=crop',
      description: 'Planning our next adventure together',
      walletAddress: '0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb',
      created: new Date().toISOString().split('T')[0],
      totalExpenses: 0
    },
    {
      id: 2,
      name: 'Dev Team',
      icon: '💻',
      members: 1,
      color: '#3b82f6',
      image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=600&fit=crop',
      description: 'Building the future together',
      walletAddress: '0x8ba1f109551bD432803012645Ac136ddd64DBA7',
      created: new Date().toISOString().split('T')[0],
      totalExpenses: 0
    }
  ] as Group[],

  circles: [
    { id: 1, name: 'General', icon: '💬', type: 'chat' },
    { id: 2, name: 'Plans', icon: '📅', type: 'planning' },
    { id: 3, name: 'Media', icon: '📸', type: 'media' },
    { id: 4, name: 'Expenses', icon: '💰', type: 'finance' }
  ] as Circle[],

  posts: [
    {
      id: 1,
      author: 'Alice',
      authorAvatar: '👩',
      content: 'Hey everyone! Just joined this group. Excited to collaborate! 🚀',
      likes: 12,
      comments: 3,
      timestamp: new Date(Date.now() - 3600000).toISOString()
    },
    {
      id: 2,
      author: 'Bob',
      authorAvatar: '👨',
      content: 'Who\'s up for a meetup this weekend? 🍕',
      likes: 8,
      comments: 5,
      timestamp: new Date(Date.now() - 7200000).toISOString()
    }
  ] as Post[],

  memberLocations: [
    { name: 'Alice', avatar: '👩', location: 'New York, USA', lat: 40.7128, lng: -74.0060 },
    { name: 'Bob', avatar: '👨', location: 'London, UK', lat: 51.5074, lng: -0.1278 },
    { name: 'Charlie', avatar: '🧑', location: 'Tokyo, Japan', lat: 35.6762, lng: 139.6503 },
    { name: 'Diana', avatar: '👩', location: 'Sydney, Australia', lat: -33.8688, lng: 151.2093 }
  ] as MemberLocation[],

  groupIcons: ['✈️', '💻', '🎓', '💪', '🍕', '🚀', '🎮', '🎨', '📚', '🏃', '🎵', '🎬', '⚽', '🏋️', '🧘', '🍜', '☕', '🏖️', '🏔️', '🌟'],
  
  groupColors: ['#10b981', '#3b82f6', '#f59e0b', '#ef4444', '#8b5cf6', '#06b6d4', '#ec4899', '#14b8a6', '#f97316', '#6366f1'],

  sampleImages: [
    'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800&h=600&fit=crop'
  ],

  generateWalletAddress: (): string => {
    const chars = '0123456789abcdef'
    let address = '0x'
    for (let i = 0; i < 40; i++) {
      address += chars[Math.floor(Math.random() * chars.length)]
    }
    return address
  }
}

