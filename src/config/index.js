/**
 * Application Configuration
 * Centralized config for all SDK integrations
 */

export const CONFIG = {
    // API Configuration
    API: {
        YELLOW_API_KEY: process.env.YELLOW_API_KEY || '',
        YELLOW_NETWORK: process.env.YELLOW_NETWORK || 'testnet',
        
        AVAIL_API_KEY: process.env.AVAIL_NEXUS_API_KEY || '',
        AVAIL_CHAIN_ID: parseInt(process.env.AVAIL_CHAIN_ID || '1'),
        
        BLOCKSCOUT_API_KEY: process.env.BLOCKSCOUT_API_KEY || '',
        BLOCKSCOUT_NETWORK: process.env.BLOCKSCOUT_NETWORK || 'ethereum',
        BLOCKSCOUT_MCP_ENDPOINT: process.env.BLOCKSCOUT_MCP_ENDPOINT || 'https://mcp.blockscout.com',
    },

    // Feature Flags
    FEATURES: {
        ENABLE_LOCATION_SHARING: process.env.ENABLE_LOCATION_SHARING !== 'false',
        ENABLE_PAYMENTS: process.env.ENABLE_PAYMENTS !== 'false',
        ENABLE_CROSS_CHAIN: process.env.ENABLE_CROSS_CHAIN !== 'false',
        ENABLE_AI_SUMMARIES: process.env.ENABLE_AI_SUMMARIES !== 'false',
    },

    // Chain Configuration
    CHAINS: {
        ETHEREUM: {
            id: 1,
            name: 'Ethereum',
            rpc: 'https://eth.llamarpc.com',
            explorer: 'https://etherscan.io',
            currency: 'ETH'
        },
        POLYGON: {
            id: 137,
            name: 'Polygon',
            rpc: 'https://polygon-rpc.com',
            explorer: 'https://polygonscan.com',
            currency: 'MATIC'
        },
        ARBITRUM: {
            id: 42161,
            name: 'Arbitrum',
            rpc: 'https://arb1.arbitrum.io/rpc',
            explorer: 'https://arbiscan.io',
            currency: 'ETH'
        },
        OPTIMISM: {
            id: 10,
            name: 'Optimism',
            rpc: 'https://mainnet.optimism.io',
            explorer: 'https://optimistic.etherscan.io',
            currency: 'ETH'
        },
        BASE: {
            id: 8453,
            name: 'Base',
            rpc: 'https://mainnet.base.org',
            explorer: 'https://basescan.org',
            currency: 'ETH'
        }
    },

    // Smart Contract Addresses
    CONTRACTS: {
        ORBIT_TREASURY: '0x0000000000000000000000000000000000000001',
        GROUP_FACTORY: '0x0000000000000000000000000000000000000002',
        PAYMENT_SPLITTER: '0x0000000000000000000000000000000000000003',
        NFT_COLLECTIBLES: '0x0000000000000000000000000000000000000004',
    },

    // UI Configuration
    UI: {
        ANIMATION_DURATION: 300,
        TOAST_DURATION: 3000,
        MAX_FILE_SIZE: 10 * 1024 * 1024, // 10MB
        SUPPORTED_IMAGE_TYPES: ['image/jpeg', 'image/png', 'image/gif', 'image/webp'],
    },

    // App Metadata
    APP: {
        NAME: 'Orbit',
        VERSION: '1.0.0',
        TAGLINE: 'Your world, perfectly organized',
        DESCRIPTION: 'A next-gen social platform with organized circles',
        URL: 'https://orbit.app',
        CONTACT: 'team@orbitapp.io',
    }
};

export default CONFIG;

