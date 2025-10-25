/**
 * Groups Page - View all groups with gallery/grid modes
 */

window.GroupsPage = function({ groups, onGroupClick, onCreateClick }) {
    const { useState } = React;
    const [galleryView, setGalleryView] = useState('webgl');
    const [searchQuery, setSearchQuery] = useState('');

    const filteredGroups = groups.filter(group => 
        group.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        group.description.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="groups-page" style={{
            minHeight: '100vh',
            paddingBottom: '60px',
            animation: 'fadeIn 0.5s ease-out'
        }}>
            {/* Header */}
            <div style={{
                padding: '40px 30px',
                borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
                animation: 'slideDown 0.6s cubic-bezier(0.16, 1, 0.3, 1)'
            }}>
                <div style={{
                    maxWidth: '1400px',
                    margin: '0 auto',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    flexWrap: 'wrap',
                    gap: '20px'
                }}>
                    <div>
                        <h1 style={{
                            fontSize: '36px',
                            fontWeight: 900,
                            marginBottom: '8px'
                        }}>
                            <i className="fas fa-globe"></i> Your Groups
                        </h1>
                        <p style={{ color: 'var(--text-secondary)' }}>
                            {filteredGroups.length} {filteredGroups.length === 1 ? 'group' : 'groups'} found
                        </p>
                    </div>
                    
                    <div style={{ display: 'flex', gap: '12px', alignItems: 'center', flexWrap: 'wrap' }}>
                        <div style={{ position: 'relative' }}>
                            <i className="fas fa-search" style={{
                                position: 'absolute',
                                left: '16px',
                                top: '50%',
                                transform: 'translateY(-50%)',
                                color: 'var(--text-secondary)'
                            }}></i>
                            <input
                                type="text"
                                placeholder="Search groups..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                style={{
                                    padding: '12px 16px 12px 45px',
                                    borderRadius: '12px',
                                    border: '1px solid rgba(255, 255, 255, 0.1)',
                                    background: 'rgba(255, 255, 255, 0.05)',
                                    color: 'white',
                                    width: '250px',
                                    transition: 'all 0.3s'
                                }}
                                onFocus={(e) => {
                                    e.target.style.borderColor = '#3b82f6';
                                    e.target.style.background = 'rgba(59, 130, 246, 0.1)';
                                }}
                                onBlur={(e) => {
                                    e.target.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                                    e.target.style.background = 'rgba(255, 255, 255, 0.05)';
                                }}
                            />
                        </div>
                        
                        <div className="view-toggle">
                            <button 
                                className={`btn ${galleryView === 'webgl' ? 'btn-primary' : 'btn-secondary'}`}
                                onClick={() => setGalleryView('webgl')}
                            >
                                <i className="fas fa-circle-notch"></i> Gallery
                            </button>
                            <button 
                                className={`btn ${galleryView === 'grid' ? 'btn-primary' : 'btn-secondary'}`}
                                onClick={() => setGalleryView('grid')}
                            >
                                <i className="fas fa-th"></i> Grid
                            </button>
                        </div>
                        
                        <button 
                            className="btn btn-primary"
                            onClick={onCreateClick}
                            style={{
                                background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)',
                                border: 'none'
                            }}
                        >
                            <i className="fas fa-plus"></i> New Group
                        </button>
                    </div>
                </div>
            </div>

            {/* Content */}
            <div style={{
                maxWidth: '1400px',
                margin: '40px auto',
                padding: '0 30px'
            }}>
                {filteredGroups.length === 0 ? (
                    <div style={{
                        textAlign: 'center',
                        padding: '100px 20px',
                        animation: 'fadeIn 0.5s ease-out'
                    }}>
                        <div style={{ fontSize: '80px', marginBottom: '20px' }}>🔍</div>
                        <h2 style={{ fontSize: '32px', fontWeight: 700, marginBottom: '12px' }}>
                            No groups found
                        </h2>
                        <p style={{ color: 'var(--text-secondary)', marginBottom: '30px' }}>
                            {searchQuery ? 'Try a different search term' : 'Create your first group to get started'}
                        </p>
                        {!searchQuery && (
                            <button 
                                className="btn btn-primary"
                                onClick={onCreateClick}
                            >
                                <i className="fas fa-plus"></i> Create Group
                            </button>
                        )}
                    </div>
                ) : galleryView === 'webgl' ? (
                    <div className="webgl-gallery-container">
                        <CircularGallery items={filteredGroups} onItemClick={onGroupClick} />
                    </div>
                ) : (
                    <div className="groups-grid" style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                        gap: '24px',
                        animation: 'fadeIn 0.5s ease-out'
                    }}>
                        {filteredGroups.map((group, index) => (
                            <div 
                                key={group.id} 
                                className="group-card" 
                                onClick={() => onGroupClick(group)}
                                style={{
                                    animation: `slideUp 0.4s cubic-bezier(0.16, 1, 0.3, 1) ${index * 0.05}s backwards`,
                                    cursor: 'pointer',
                                    transition: 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)'
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.transform = 'translateY(-8px) scale(1.02)';
                                    e.currentTarget.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.4)';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.transform = 'translateY(0) scale(1)';
                                    e.currentTarget.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.3)';
                                }}
                            >
                                <div className="group-icon" style={{ background: group.color }}>
                                    {group.icon}
                                </div>
                                <div className="group-name">{group.name}</div>
                                <div className="group-stats">
                                    <span><i className="fas fa-users"></i> {group.members}</span>
                                    <span><i className="fas fa-calendar"></i> {group.created}</span>
                                </div>
                                <p style={{
                                    color: 'var(--text-secondary)',
                                    fontSize: '13px',
                                    marginTop: '12px',
                                    lineHeight: 1.5
                                }}>
                                    {group.description}
                                </p>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

console.log('✅ GroupsPage loaded');

