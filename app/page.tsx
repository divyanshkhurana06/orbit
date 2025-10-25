'use client'

import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import HomePage from '@/components/HomePage'
import GroupsPage from '@/components/GroupsPage'
import CreateGroupPage from '@/components/CreateGroupPage'
import GroupDetailPage from '@/components/GroupDetailPage'
import Header from '@/components/Header'
import { Group } from '@/types'
import { appData } from '@/lib/appData'

export default function Home() {
  const searchParams = useSearchParams()
  const [currentPage, setCurrentPage] = useState('home')
  const [selectedGroup, setSelectedGroup] = useState<Group | null>(null)
  const [groups, setGroups] = useState<Group[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('orbitGroups')
      return saved ? JSON.parse(saved) : appData.groups
    }
    return appData.groups
  })

  // Save groups to localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('orbitGroups', JSON.stringify(groups))
    }
  }, [groups])

  // Handle invite links
  useEffect(() => {
    const joinId = searchParams.get('join')
    if (joinId) {
      const group = groups.find(g => g.id.toString() === joinId)
      if (group) {
        setSelectedGroup(group)
        setCurrentPage('group-detail')
      }
    }
  }, [searchParams, groups])

  const navigate = (page: string) => {
    setCurrentPage(page)
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  const handleGroupClick = (group: Group) => {
    setSelectedGroup(group)
    navigate('group-detail')
  }

  const handleCreateGroup = (formData: any) => {
    const newGroup: Group = {
      id: Date.now(),
      name: formData.name,
      icon: formData.icon,
      members: 1,
      color: formData.color,
      image: formData.image || appData.sampleImages[Math.floor(Math.random() * appData.sampleImages.length)],
      description: formData.description || `A new group for ${formData.name}`,
      walletAddress: appData.generateWalletAddress(),
      created: new Date().toISOString().split('T')[0],
      totalExpenses: 0
    }
    setGroups([...groups, newGroup])
    navigate('groups')
  }

  return (
    <div className="min-h-screen">
      {currentPage !== 'home' && (
        <Header 
          currentPage={currentPage}
          onNavigate={navigate}
        />
      )}

      {currentPage === 'home' && (
        <HomePage 
          onNavigate={navigate}
          userData={{ groups }}
        />
      )}
      
      {currentPage === 'groups' && (
        <GroupsPage 
          groups={groups}
          onGroupClick={handleGroupClick}
          onCreateClick={() => navigate('create')}
        />
      )}
      
      {currentPage === 'create' && (
        <CreateGroupPage 
          onCreate={handleCreateGroup}
          onCancel={() => navigate('groups')}
        />
      )}
      
      {currentPage === 'group-detail' && selectedGroup && (
        <GroupDetailPage 
          group={selectedGroup}
          circles={appData.circles}
          posts={appData.posts}
          onBack={() => navigate('groups')}
        />
      )}
    </div>
  )
}

