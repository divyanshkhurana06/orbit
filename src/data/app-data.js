/**
 * Application Data - Realistic Sample Data
 * This replaces all hardcoded values in the main application
 */

window.AppData = {
    // Initial groups (users can create more)
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
            description: 'Building the future, one commit at a time',
            walletAddress: '0x8ba1f109551bD432803012645Ac136ddd64DBA72',
            created: new Date().toISOString().split('T')[0],
            totalExpenses: 0
        }
    ],

    // Circles with detailed metadata
    circles: [
        { 
            id: 1, 
            name: 'Trip Planning', 
            icon: '🗺️', 
            type: 'travel',
            description: 'Plan trips, book tickets, and coordinate itineraries',
            posts: 24,
            lastActivity: Date.now() - 3600000 // 1 hour ago
        },
        { 
            id: 2, 
            name: 'Photos', 
            icon: '📸', 
            type: 'media',
            description: 'Share and organize group photos and memories',
            posts: 156,
            lastActivity: Date.now() - 7200000 // 2 hours ago
        },
        { 
            id: 3, 
            name: 'Expenses', 
            icon: '💰', 
            type: 'payments',
            description: 'Track and split group expenses easily',
            posts: 18,
            lastActivity: Date.now() - 10800000 // 3 hours ago
        },
        { 
            id: 4, 
            name: 'Memes', 
            icon: '😂', 
            type: 'fun',
            description: 'Share funny moments and inside jokes',
            posts: 89,
            lastActivity: Date.now() - 1800000 // 30 minutes ago
        },
        { 
            id: 5, 
            name: 'Events', 
            icon: '📅', 
            type: 'events',
            description: 'Schedule and manage group events',
            posts: 12,
            lastActivity: Date.now() - 86400000 // 1 day ago
        },
        { 
            id: 6, 
            name: 'Resources', 
            icon: '📚', 
            type: 'docs',
            description: 'Share documents, links, and resources',
            posts: 34,
            lastActivity: Date.now() - 172800000 // 2 days ago
        }
    ],

    // Posts with realistic content
    posts: [
        { 
            id: 1, 
            author: 'Sarah Chen', 
            authorAvatar: '👩‍💼',
            authorAddress: '0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb',
            content: 'Just booked the flight tickets for everyone! Total came to $2,450. Will send payment request via Yellow Network 🎉', 
            timestamp: Date.now() - 7200000, // 2 hours ago
            likes: 12, 
            comments: 3,
            circleId: 1,
            groupId: 1,
            txHash: '0x5f4a8fd7b3e9c2d1a0f6e4b8c3d2a1f9e8d7c6b5a4'
        },
        { 
            id: 2, 
            author: 'Mike Rodriguez', 
            authorAvatar: '👨‍💻',
            authorAddress: '0x8ba1f109551bD432803012645Ac136ddd64DBA72',
            content: 'Who wants to split the hotel cost? Found a great place near the beach for $800/night. Need 4 people!', 
            timestamp: Date.now() - 18000000, // 5 hours ago
            likes: 8, 
            comments: 5,
            circleId: 3,
            groupId: 1
        },
        { 
            id: 3, 
            author: 'Emily Watson', 
            authorAvatar: '👩‍🎨',
            authorAddress: '0xdD2FD4581271e230360230F9337D5c0430Bf44C0',
            content: 'Found an amazing restaurant with authentic local cuisine! Check out the menu link in resources. They have vegan options too 🌱', 
            timestamp: Date.now() - 86400000, // 1 day ago
            likes: 15, 
            comments: 7,
            circleId: 1,
            groupId: 1
        }
    ],

    // Member locations for map feature
    memberLocations: [
        {
            name: 'Sarah Chen',
            address: '0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb',
            lat: 37.7749,
            lng: -122.4194,
            location: 'San Francisco, CA',
            status: 'online',
            avatar: '👩‍💼'
        },
        {
            name: 'Mike Rodriguez',
            address: '0x8ba1f109551bD432803012645Ac136ddd64DBA72',
            lat: 40.7128,
            lng: -74.0060,
            location: 'New York, NY',
            status: 'online',
            avatar: '👨‍💻'
        },
        {
            name: 'Emily Watson',
            address: '0xdD2FD4581271e230360230F9337D5c0430Bf44C0',
            lat: 51.5074,
            lng: -0.1278,
            location: 'London, UK',
            status: 'away',
            avatar: '👩‍🎨'
        },
        {
            name: 'James Kim',
            address: '0xcd3B766CCDd6AE721141F452C550Ca635964ce71',
            lat: 35.6762,
            lng: 139.6503,
            location: 'Tokyo, Japan',
            status: 'online',
            avatar: '👨‍🔬'
        },
        {
            name: 'Priya Patel',
            address: '0x2546BcD3c84621e976D8185a91A922aE77ECEc30',
            lat: 19.0760,
            lng: 72.8777,
            location: 'Mumbai, India',
            status: 'offline',
            avatar: '👩‍⚕️'
        }
    ],

    // Stack gallery items
    stackGalleryItems: [
        {
            id: 1,
            icon: '🏖️',
            label: 'Beach Day - Bali',
            image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&h=600&fit=crop',
            date: '2024-03-15',
            likes: 42
        },
        {
            id: 2,
            icon: '🏔️',
            label: 'Mountain Trek - Swiss Alps',
            image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop',
            date: '2024-02-20',
            likes: 38
        },
        {
            id: 3,
            icon: '🎭',
            label: 'Cultural Tour - Kyoto',
            image: 'https://images.unsplash.com/photo-1533929736458-ca588d08c8be?w=800&h=600&fit=crop',
            date: '2024-01-10',
            likes: 56
        },
        {
            id: 4,
            icon: '🍜',
            label: 'Food Tour - Bangkok',
            image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&h=600&fit=crop',
            date: '2023-12-28',
            likes: 67
        }
    ],

    // Helper function to format timestamps
    formatTimestamp: function(timestamp) {
        const now = Date.now();
        const diff = now - timestamp;
        const minutes = Math.floor(diff / 60000);
        const hours = Math.floor(diff / 3600000);
        const days = Math.floor(diff / 86400000);
        
        if (minutes < 1) return 'Just now';
        if (minutes < 60) return `${minutes}m ago`;
        if (hours < 24) return `${hours}h ago`;
        if (days === 1) return 'Yesterday';
        return `${days}d ago`;
    },

    // Helper to generate random Ethereum address
    generateWalletAddress: function() {
        const chars = '0123456789abcdef';
        let address = '0x';
        for (let i = 0; i < 40; i++) {
            address += chars[Math.floor(Math.random() * chars.length)];
        }
        return address;
    },

    // Available group icons
    groupIcons: ['✈️', '💻', '🎓', '💪', '🍕', '🚀', '🎮', '🎨', '📚', '🏃', '🎵', '🎬', '⚽', '🏋️', '🧘', '🍜', '☕', '🏖️', '🏔️', '🌟'],

    // Available colors for groups
    groupColors: ['#10b981', '#3b82f6', '#f59e0b', '#ef4444', '#8b5cf6', '#06b6d4', '#ec4899', '#14b8a6', '#f97316', '#6366f1'],

    // Sample Unsplash images for new groups
    sampleImages: [
        'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1553877522-43269d4ea984?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1511578314322-379afb476865?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800&h=600&fit=crop'
    ]
};

console.log('✅ App data loaded successfully');

