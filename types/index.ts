export interface Group {
  id: number
  name: string
  icon: string
  members: number
  color: string
  image: string
  description: string
  walletAddress: string
  created: string
  totalExpenses: number
}

export interface Circle {
  id: number
  name: string
  icon: string
  type: string
}

export interface Post {
  id: number
  author: string
  authorAvatar: string
  content: string
  likes: number
  comments: number
  timestamp: string
}

export interface MemberLocation {
  name: string
  avatar: string
  location: string
  lat: number
  lng: number
}

export interface Photo {
  id: number
  url: string
  uploader: string
  timestamp: string
}

export interface WalletInfo {
  address: string
  chainId: string
  isDemo?: boolean
}

