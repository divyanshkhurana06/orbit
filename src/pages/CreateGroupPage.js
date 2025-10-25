/**
 * Create Group Page - Beautiful form for creating new groups
 */

window.CreateGroupPage = function({ onCreate, onCancel }) {
    const { useState } = React;
    const [formData, setFormData] = useState({
        name: '',
        icon: '🌟',
        description: '',
        color: '#10b981',
        image: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.name.trim()) {
            alert('Please enter a group name');
            return;
        }
        
        setIsSubmitting(true);
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 500));
        onCreate(formData);
    };

    return (
        <div className="create-group-page" style={{
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '40px 20px',
            animation: 'fadeIn 0.5s ease-out'
        }}>
            <div style={{
                width: '100%',
                maxWidth: '700px',
                background: 'rgba(30, 41, 59, 0.6)',
                backdropFilter: 'blur(20px)',
                borderRadius: '24px',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                padding: '40px',
                boxShadow: '0 20px 60px rgba(0, 0, 0, 0.5)',
                animation: 'slideUp 0.6s cubic-bezier(0.16, 1, 0.3, 1)'
            }}>
                {/* Header */}
                <div style={{ textAlign: 'center', marginBottom: '40px' }}>
                    <div style={{ fontSize: '64px', marginBottom: '16px' }}>
                        {formData.icon}
                    </div>
                    <h1 style={{
                        fontSize: '36px',
                        fontWeight: 900,
                        marginBottom: '8px'
                    }}>
                        Create New Group
                    </h1>
                    <p style={{ color: 'var(--text-secondary)' }}>
                        Build your community and start collaborating
                    </p>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '24px'
                }}>
                    {/* Group Name */}
                    <div>
                        <label style={{
                            display: 'block',
                            marginBottom: '8px',
                            fontWeight: 600,
                            fontSize: '14px'
                        }}>
                            Group Name *
                        </label>
                        <input 
                            type="text" 
                            className="payment-input" 
                            placeholder="e.g., Gaming Squad, Book Club, Dev Team" 
                            value={formData.name}
                            onChange={(e) => setFormData({...formData, name: e.target.value})}
                            style={{ width: '100%', fontSize: '16px' }}
                            required
                        />
                    </div>

                    {/* Description */}
                    <div>
                        <label style={{
                            display: 'block',
                            marginBottom: '8px',
                            fontWeight: 600,
                            fontSize: '14px'
                        }}>
                            Description
                        </label>
                        <textarea 
                            className="payment-input" 
                            placeholder="What's this group about?" 
                            value={formData.description}
                            onChange={(e) => setFormData({...formData, description: e.target.value})}
                            style={{
                                width: '100%',
                                minHeight: '100px',
                                resize: 'vertical',
                                fontSize: '16px'
                            }}
                        />
                    </div>

                    {/* Icon Selection */}
                    <div>
                        <label style={{
                            display: 'block',
                            marginBottom: '12px',
                            fontWeight: 600,
                            fontSize: '14px'
                        }}>
                            Choose an Icon
                        </label>
                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fill, minmax(55px, 1fr))',
                            gap: '10px'
                        }}>
                            {window.AppData.groupIcons.map(icon => (
                                <button 
                                    key={icon}
                                    type="button"
                                    onClick={() => setFormData({...formData, icon})}
                                    style={{
                                        width: '100%',
                                        height: '55px',
                                        fontSize: '28px',
                                        border: formData.icon === icon ? '2px solid #3b82f6' : '1px solid rgba(255,255,255,0.1)',
                                        borderRadius: '12px',
                                        background: formData.icon === icon ? 'rgba(59, 130, 246, 0.2)' : 'rgba(255,255,255,0.05)',
                                        cursor: 'pointer',
                                        transition: 'all 0.2s',
                                        transform: formData.icon === icon ? 'scale(1.1)' : 'scale(1)'
                                    }}
                                    onMouseEnter={(e) => e.target.style.transform = 'scale(1.1)'}
                                    onMouseLeave={(e) => e.target.style.transform = formData.icon === icon ? 'scale(1.1)' : 'scale(1)'}
                                >
                                    {icon}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Color Selection */}
                    <div>
                        <label style={{
                            display: 'block',
                            marginBottom: '12px',
                            fontWeight: 600,
                            fontSize: '14px'
                        }}>
                            Choose a Color
                        </label>
                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fill, minmax(55px, 1fr))',
                            gap: '10px'
                        }}>
                            {window.AppData.groupColors.map(color => (
                                <button 
                                    key={color}
                                    type="button"
                                    onClick={() => setFormData({...formData, color})}
                                    style={{
                                        width: '100%',
                                        height: '55px',
                                        background: color,
                                        border: formData.color === color ? '3px solid white' : 'none',
                                        borderRadius: '12px',
                                        cursor: 'pointer',
                                        transition: 'all 0.2s',
                                        transform: formData.color === color ? 'scale(1.1)' : 'scale(1)',
                                        boxShadow: formData.color === color ? `0 0 20px ${color}` : 'none'
                                    }}
                                    onMouseEnter={(e) => e.target.style.transform = 'scale(1.1)'}
                                    onMouseLeave={(e) => e.target.style.transform = formData.color === color ? 'scale(1.1)' : 'scale(1)'}
                                />
                            ))}
                        </div>
                    </div>

                    {/* Cover Image */}
                    <div>
                        <label style={{
                            display: 'block',
                            marginBottom: '8px',
                            fontWeight: 600,
                            fontSize: '14px'
                        }}>
                            Cover Image URL (Optional)
                        </label>
                        <input 
                            type="url" 
                            className="payment-input" 
                            placeholder="https://..." 
                            value={formData.image}
                            onChange={(e) => setFormData({...formData, image: e.target.value})}
                            style={{ width: '100%', fontSize: '16px' }}
                        />
                        <p style={{
                            fontSize: '12px',
                            color: 'var(--text-secondary)',
                            marginTop: '6px'
                        }}>
                            Leave blank for a beautiful random image
                        </p>
                    </div>

                    {/* Buttons */}
                    <div style={{
                        display: 'flex',
                        gap: '12px',
                        marginTop: '20px'
                    }}>
                        <button 
                            type="submit"
                            className="btn btn-primary"
                            disabled={isSubmitting}
                            style={{
                                flex: 1,
                                fontSize: '16px',
                                padding: '16px',
                                background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)',
                                border: 'none',
                                opacity: isSubmitting ? 0.7 : 1,
                                cursor: isSubmitting ? 'not-allowed' : 'pointer'
                            }}
                        >
                            {isSubmitting ? (
                                <>
                                    <i className="fas fa-spinner fa-spin"></i> Creating...
                                </>
                            ) : (
                                <>
                                    <i className="fas fa-check"></i> Create Group
                                </>
                            )}
                        </button>
                        <button 
                            type="button"
                            className="btn btn-secondary"
                            onClick={onCancel}
                            style={{
                                flex: 1,
                                fontSize: '16px',
                                padding: '16px'
                            }}
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

console.log('✅ CreateGroupPage loaded');

