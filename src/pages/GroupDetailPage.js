/**
 * Group Detail Page - View group details and circles
 */

window.GroupDetailPage = function({ group, circles, posts, onBack }) {
    const { useState } = React;
    const [selectedCircle, setSelectedCircle] = useState(null);
    const [showPaymentModal, setShowPaymentModal] = useState(false);

    if (!group) return null;

    return (
        <div className="group-detail-page" style={{
            minHeight: '100vh',
            paddingBottom: '60px',
            animation: 'slideIn 0.5s cubic-bezier(0.16, 1, 0.3, 1)'
        }}>
            {/* Back Button */}
            <div style={{ padding: '20px 30px' }}>
                <button 
                    className="btn btn-secondary"
                    onClick={onBack}
                    style={{
                        animation: 'fadeIn 0.5s ease-out'
                    }}
                >
                    <i className="fas fa-arrow-left"></i> Back to Groups
                </button>
            </div>

            {/* Group Hero */}
            <div style={{
                backgroundImage: `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.8)), url(${group.image})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                padding: '80px 30px',
                textAlign: 'center',
                animation: 'fadeIn 0.6s ease-out'
            }}>
                <div style={{
                    fontSize: '80px',
                    marginBottom: '16px',
                    background: group.color,
                    width: '120px',
                    height: '120px',
                    borderRadius: '30px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 20px',
                    animation: 'scaleIn 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) 0.2s backwards'
                }}>
                    {group.icon}
                </div>
                <h1 style={{
                    fontSize: '48px',
                    fontWeight: 900,
                    marginBottom: '12px',
                    animation: 'slideUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) 0.3s backwards'
                }}>
                    {group.name}
                </h1>
                <p style={{
                    fontSize: '18px',
                    color: 'var(--text-secondary)',
                    marginBottom: '24px',
                    animation: 'slideUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) 0.4s backwards'
                }}>
                    {group.description}
                </p>
                <div style={{
                    display: 'flex',
                    gap: '30px',
                    justifyContent: 'center',
                    flexWrap: 'wrap',
                    animation: 'slideUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) 0.5s backwards'
                }}>
                    <div>
                        <div style={{ fontSize: '24px', fontWeight: 700 }}>
                            {group.members}
                        </div>
                        <div style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
                            Members
                        </div>
                    </div>
                    <div>
                        <div style={{ fontSize: '24px', fontWeight: 700 }}>
                            ${group.totalExpenses.toFixed(2)}
                        </div>
                        <div style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
                            Total Expenses
                        </div>
                    </div>
                    <div>
                        <div style={{ fontSize: '24px', fontWeight: 700 }}>
                            {group.created}
                        </div>
                        <div style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
                            Created
                        </div>
                    </div>
                </div>
            </div>

            {/* Content */}
            <div style={{
                maxWidth: '1200px',
                margin: '40px auto',
                padding: '0 30px'
            }}>
                {/* Circles */}
                <div style={{ marginBottom: '40px' }}>
                    <h2 style={{
                        fontSize: '28px',
                        fontWeight: 800,
                        marginBottom: '24px',
                        animation: 'slideUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) 0.6s backwards'
                    }}>
                        <i className="fas fa-circle-notch"></i> Circles
                    </h2>
                    <div className="circles-grid" style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
                        gap: '16px'
                    }}>
                        {circles.map((circle, index) => (
                            <div 
                                key={circle.id}
                                className="circle-card"
                                onClick={() => setSelectedCircle(circle)}
                                style={{
                                    animation: `slideUp 0.4s cubic-bezier(0.16, 1, 0.3, 1) ${0.7 + index * 0.05}s backwards`,
                                    cursor: 'pointer',
                                    transition: 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
                                    borderColor: selectedCircle?.id === circle.id ? group.color : 'rgba(255,255,255,0.1)'
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.transform = 'translateY(-5px) scale(1.05)';
                                    e.currentTarget.style.borderColor = group.color;
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.transform = 'translateY(0) scale(1)';
                                    e.currentTarget.style.borderColor = selectedCircle?.id === circle.id ? group.color : 'rgba(255,255,255,0.1)';
                                }}
                            >
                                <div style={{ fontSize: '32px', marginBottom: '8px' }}>
                                    {circle.icon}
                                </div>
                                <div style={{ fontWeight: 600, marginBottom: '4px' }}>
                                    {circle.name}
                                </div>
                                <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>
                                    {circle.posts} posts
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Posts */}
                {selectedCircle && (
                    <div style={{
                        animation: 'fadeIn 0.5s ease-out'
                    }}>
                        <div style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            marginBottom: '24px'
                        }}>
                            <h2 style={{
                                fontSize: '28px',
                                fontWeight: 800
                            }}>
                                {selectedCircle.icon} {selectedCircle.name}
                            </h2>
                            <button 
                                className="btn btn-primary"
                                onClick={() => setShowPaymentModal(true)}
                            >
                                <i className="fas fa-plus"></i> New Post
                            </button>
                        </div>
                        
                        <div className="posts-feed">
                            {posts.map((post, index) => (
                                <div 
                                    key={post.id} 
                                    className="post-card"
                                    style={{
                                        animation: `slideUp 0.4s cubic-bezier(0.16, 1, 0.3, 1) ${index * 0.05}s backwards`
                                    }}
                                >
                                    <div className="post-header">
                                        <div className="post-avatar">
                                            {post.authorAvatar || post.author[0]}
                                        </div>
                                        <div>
                                            <div style={{ fontWeight: 600 }}>{post.author}</div>
                                            <div style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
                                                {window.AppData.formatTimestamp(post.timestamp)}
                                            </div>
                                        </div>
                                    </div>
                                    <p style={{ lineHeight: 1.6 }}>{post.content}</p>
                                    <div className="post-actions">
                                        <div className="post-action">
                                            <i className="fas fa-heart"></i> {post.likes}
                                        </div>
                                        <div className="post-action">
                                            <i className="fas fa-comment"></i> {post.comments}
                                        </div>
                                        <div className="post-action">
                                            <i className="fas fa-share"></i> Share
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

console.log('✅ GroupDetailPage loaded');

