/**
 * Home Page - Beautiful landing with animations
 * Using React.createElement instead of JSX for browser compatibility
 */

window.HomePage = function({ onNavigate, userData }) {
    if (!window.React) {
        console.error('React not loaded!');
        return null;
    }
    const { useState, useEffect, createElement: h } = window.React;
    const [isVisible, setIsVisible] = useState(false);
    
    useEffect(() => {
        setIsVisible(true);
    }, []);

    return (
        <div className="home-page" style={{
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
            animation: 'fadeIn 0.8s cubic-bezier(0.16, 1, 0.3, 1)'
        }}>
            {/* Hero Section */}
            <div className="hero-section" style={{
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                textAlign: 'center',
                padding: '60px 20px',
                position: 'relative',
                overflow: 'hidden'
            }}>
                {/* Animated Background Circles */}
                <div className="animated-circles">
                    {[...Array(5)].map((_, i) => (
                        <div 
                            key={i}
                            className="floating-circle"
                            style={{
                                position: 'absolute',
                                width: `${150 + i * 100}px`,
                                height: `${150 + i * 100}px`,
                                borderRadius: '50%',
                                background: `radial-gradient(circle, rgba(59, 130, 246, ${0.1 - i * 0.02}) 0%, transparent 70%)`,
                                animation: `float${i} ${15 + i * 5}s ease-in-out infinite`,
                                zIndex: 0
                            }}
                        />
                    ))}
                </div>

                {/* Content */}
                <div style={{ position: 'relative', zIndex: 1, maxWidth: '800px' }}>
                    <div style={{
                        fontSize: '80px',
                        marginBottom: '20px',
                        animation: 'scaleIn 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) 0.2s backwards'
                    }}>
                        🌐
                    </div>
                    
                    <h1 style={{
                        fontSize: 'clamp(48px, 8vw, 72px)',
                        fontWeight: 900,
                        marginBottom: '20px',
                        background: 'linear-gradient(135deg, #fff 0%, #a0c4ff 100%)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        backgroundClip: 'text',
                        animation: 'slideUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.3s backwards'
                    }}>
                        Welcome to Orbit
                    </h1>
                    
                    <p style={{
                        fontSize: 'clamp(18px, 3vw, 24px)',
                        color: 'var(--text-secondary)',
                        marginBottom: '40px',
                        lineHeight: 1.6,
                        animation: 'slideUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.4s backwards'
                    }}>
                        Your world, perfectly organized. Create groups, manage circles, and collaborate seamlessly with Web3 integration.
                    </p>

                    <div style={{
                        display: 'flex',
                        gap: '20px',
                        justifyContent: 'center',
                        flexWrap: 'wrap',
                        animation: 'slideUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.5s backwards'
                    }}>
                        <button 
                            className="btn btn-primary"
                            onClick={() => onNavigate('groups')}
                            style={{
                                fontSize: '18px',
                                padding: '16px 40px',
                                background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)',
                                border: 'none',
                                transition: 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)'
                            }}
                        >
                            <i className="fas fa-rocket"></i> Explore Groups
                        </button>
                        <button 
                            className="btn btn-secondary"
                            onClick={() => onNavigate('create')}
                            style={{
                                fontSize: '18px',
                                padding: '16px 40px'
                            }}
                        >
                            <i className="fas fa-plus-circle"></i> Create Group
                        </button>
                    </div>
                </div>
            </div>

            {/* Features Section */}
            <div style={{
                padding: '80px 20px',
                background: 'rgba(30, 41, 59, 0.3)',
                borderTop: '1px solid rgba(255, 255, 255, 0.1)'
            }}>
                <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
                    <h2 style={{
                        fontSize: '42px',
                        fontWeight: 800,
                        textAlign: 'center',
                        marginBottom: '60px',
                        animation: isVisible ? 'fadeIn 0.8s ease-out 0.6s backwards' : 'none'
                    }}>
                        Powered by Web3
                    </h2>
                    
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                        gap: '30px'
                    }}>
                        {[
                            {
                                icon: '⚡',
                                title: 'Yellow Network',
                                description: 'Instant payments, split bills, and micro-tipping with off-chain transactions',
                                color: '#f59e0b'
                            },
                            {
                                icon: '🔗',
                                title: 'Avail Nexus',
                                description: 'Cross-chain liquidity, shared wallets, and seamless NFT minting',
                                color: '#3b82f6'
                            },
                            {
                                icon: '🔍',
                                title: 'Blockscout',
                                description: 'AI-powered analytics, transaction verification, and wallet insights',
                                color: '#10b981'
                            }
                        ].map((feature, index) => (
                            <div 
                                key={index}
                                className="feature-card"
                                style={{
                                    background: 'rgba(255, 255, 255, 0.05)',
                                    backdropFilter: 'blur(10px)',
                                    padding: '40px 30px',
                                    borderRadius: '20px',
                                    border: '1px solid rgba(255, 255, 255, 0.1)',
                                    transition: 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
                                    animation: isVisible ? `slideUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${0.7 + index * 0.1}s backwards` : 'none',
                                    cursor: 'pointer'
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.transform = 'translateY(-10px)';
                                    e.currentTarget.style.borderColor = feature.color;
                                    e.currentTarget.style.boxShadow = `0 20px 40px rgba(0, 0, 0, 0.3), 0 0 0 1px ${feature.color}`;
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.transform = 'translateY(0)';
                                    e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                                    e.currentTarget.style.boxShadow = 'none';
                                }}
                            >
                                <div style={{
                                    fontSize: '48px',
                                    marginBottom: '20px'
                                }}>
                                    {feature.icon}
                                </div>
                                <h3 style={{
                                    fontSize: '24px',
                                    fontWeight: 700,
                                    marginBottom: '12px',
                                    color: feature.color
                                }}>
                                    {feature.title}
                                </h3>
                                <p style={{
                                    color: 'var(--text-secondary)',
                                    lineHeight: 1.6
                                }}>
                                    {feature.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Stats Section */}
            <div style={{
                padding: '60px 20px',
                textAlign: 'center'
            }}>
                <div style={{
                    display: 'flex',
                    justifyContent: 'center',
                    gap: '60px',
                    flexWrap: 'wrap',
                    maxWidth: '900px',
                    margin: '0 auto'
                }}>
                    {[
                        { number: userData?.groups?.length || 0, label: 'Your Groups' },
                        { number: '100%', label: 'Decentralized' },
                        { number: '0x', label: 'Web3 Native' }
                    ].map((stat, index) => (
                        <div key={index} style={{
                            animation: isVisible ? `fadeIn 0.6s ease-out ${1 + index * 0.1}s backwards` : 'none'
                        }}>
                            <div style={{
                                fontSize: '48px',
                                fontWeight: 900,
                                background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                                backgroundClip: 'text',
                                marginBottom: '8px'
                            }}>
                                {stat.number}
                            </div>
                            <div style={{
                                color: 'var(--text-secondary)',
                                fontSize: '14px',
                                textTransform: 'uppercase',
                                letterSpacing: '1px'
                            }}>
                                {stat.label}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <style>{`
                @keyframes fadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
                
                @keyframes slideUp {
                    from {
                        opacity: 0;
                        transform: translateY(30px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
                
                @keyframes scaleIn {
                    from {
                        opacity: 0;
                        transform: scale(0.8);
                    }
                    to {
                        opacity: 1;
                        transform: scale(1);
                    }
                }
                
                @keyframes float0 {
                    0%, 100% { transform: translate(0, 0) rotate(0deg); }
                    25% { transform: translate(50px, -50px) rotate(90deg); }
                    50% { transform: translate(100px, 0) rotate(180deg); }
                    75% { transform: translate(50px, 50px) rotate(270deg); }
                }
                
                @keyframes float1 {
                    0%, 100% { transform: translate(0, 0) rotate(0deg); }
                    25% { transform: translate(-70px, 70px) rotate(-90deg); }
                    50% { transform: translate(-140px, 0) rotate(-180deg); }
                    75% { transform: translate(-70px, -70px) rotate(-270deg); }
                }
                
                @keyframes float2 {
                    0%, 100% { transform: translate(0, 0) scale(1); }
                    50% { transform: translate(80px, -80px) scale(1.2); }
                }
                
                @keyframes float3 {
                    0%, 100% { transform: translate(0, 0) scale(1); }
                    50% { transform: translate(-100px, 100px) scale(0.8); }
                }
                
                @keyframes float4 {
                    0%, 100% { transform: translate(0, 0) rotate(0deg) scale(1); }
                    33% { transform: translate(120px, -40px) rotate(120deg) scale(1.1); }
                    66% { transform: translate(-120px, 40px) rotate(240deg) scale(0.9); }
                }
            `}</style>
        </div>
    );
};

console.log('✅ HomePage loaded');

