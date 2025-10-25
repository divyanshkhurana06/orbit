/**
 * Groups and Circles Data
 * Move all hardcoded values here for easy management
 */

export const GROUPS = [
    {
        id: 1,
        name: 'Travel Squad',
        icon: '✈️',
        members: 8,
        color: '#10b981',
        image: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800&h=600&fit=crop',
        description: 'Planning our next adventure together',
        walletAddress: '0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb'
    },
    {
        id: 2,
        name: 'Dev Team',
        icon: '💻',
        members: 12,
        color: '#3b82f6',
        image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=600&fit=crop',
        description: 'Building the future, one commit at a time',
        walletAddress: '0x8ba1f109551bD432803012645Ac136ddd64DBA72'
    },
    {
        id: 3,
        name: 'College Club',
        icon: '🎓',
        members: 45,
        color: '#f59e0b',
        image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&h=600&fit=crop',
        description: 'Student community for events and networking',
        walletAddress: '0xdD2FD4581271e230360230F9337D5c0430Bf44C0'
    },
    {
        id: 4,
        name: 'Fitness Gang',
        icon: '💪',
        members: 6,
        color: '#ef4444',
        image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&h=600&fit=crop',
        description: 'Getting stronger together every day',
        walletAddress: '0xcd3B766CCDd6AE721141F452C550Ca635964ce71'
    },
    {
        id: 5,
        name: 'Food Lovers',
        icon: '🍕',
        members: 15,
        color: '#8b5cf6',
        image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&h=600&fit=crop',
        description: 'Exploring culinary adventures around the city',
        walletAddress: '0x2546BcD3c84621e976D8185a91A922aE77ECEc30'
    },
    {
        id: 6,
        name: 'Startup Team',
        icon: '🚀',
        members: 9,
        color: '#06b6d4',
        image: 'https://images.unsplash.com/photo-1553877522-43269d4ea984?w=800&h=600&fit=crop',
        description: 'Disrupting industries and changing the world',
        walletAddress: '0xbDA5747bFD65F08deb54cb465eB87D40e51B197E'
    },
];

export const CIRCLES = [
    {
        id: 1,
        name: 'Trip Planning',
        icon: '🗺️',
        type: 'travel',
        description: 'Plan trips, book tickets, and coordinate itineraries'
    },
    {
        id: 2,
        name: 'Photos',
        icon: '📸',
        type: 'media',
        description: 'Share and organize group photos and memories'
    },
    {
        id: 3,
        name: 'Expenses',
        icon: '💰',
        type: 'payments',
        description: 'Track and split group expenses easily'
    },
    {
        id: 4,
        name: 'Memes',
        icon: '😂',
        type: 'fun',
        description: 'Share funny moments and inside jokes'
    },
    {
        id: 5,
        name: 'Events',
        icon: '📅',
        type: 'events',
        description: 'Schedule and manage group events'
    },
    {
        id: 6,
        name: 'Resources',
        icon: '📚',
        type: 'docs',
        description: 'Share documents, links, and resources'
    }
];

export const SAMPLE_POSTS = [
    {
        id: 1,
        author: 'Alice',
        authorAddress: '0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb',
        content: 'Just booked the flight tickets! 🎉',
        timestamp: Date.now() - 7200000, // 2 hours ago
        likes: 12,
        comments: 3,
        circleId: 1,
        groupId: 1
    },
    {
        id: 2,
        author: 'Bob',
        authorAddress: '0x8ba1f109551bD432803012645Ac136ddd64DBA72',
        content: 'Who wants to split the hotel cost?',
        timestamp: Date.now() - 18000000, // 5 hours ago
        likes: 8,
        comments: 5,
        circleId: 3,
        groupId: 1
    },
    {
        id: 3,
        author: 'Charlie',
        authorAddress: '0xdD2FD4581271e230360230F9337D5c0430Bf44C0',
        content: 'Found an amazing restaurant! Check out the menu link in resources.',
        timestamp: Date.now() - 86400000, // 1 day ago
        likes: 15,
        comments: 7,
        circleId: 1,
        groupId: 1
    }
];

export const MEMBER_LOCATIONS = [
    {
        name: 'Alice',
        address: '0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb',
        lat: 51.505,
        lng: -0.09,
        status: 'online'
    },
    {
        name: 'Bob',
        address: '0x8ba1f109551bD432803012645Ac136ddd64DBA72',
        lat: 51.51,
        lng: -0.1,
        status: 'online'
    },
    {
        name: 'Charlie',
        address: '0xdD2FD4581271e230360230F9337D5c0430Bf44C0',
        lat: 51.495,
        lng: -0.08,
        status: 'away'
    }
];

export const STACK_GALLERY_ITEMS = [
    {
        id: 1,
        icon: '🏖️',
        label: 'Beach Day',
        image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&h=600&fit=crop'
    },
    {
        id: 2,
        icon: '🏔️',
        label: 'Mountain Trek',
        image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop'
    },
    {
        id: 3,
        icon: '🎭',
        label: 'Cultural Tour',
        image: 'https://images.unsplash.com/photo-1533929736458-ca588d08c8be?w=800&h=600&fit=crop'
    },
    {
        id: 4,
        icon: '🍜',
        label: 'Food Tour',
        image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&h=600&fit=crop'
    }
];

