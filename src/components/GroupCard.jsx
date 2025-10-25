import React from 'react';

/**
 * GroupCard Component
 * Individual group card in grid view
 */
export default function GroupCard({ group, onClick }) {
    return (
        <div className="group-card" onClick={() => onClick(group)}>
            <div className="group-icon" style={{ background: group.color }}>
                {group.icon}
            </div>
            <div className="group-name">{group.name}</div>
            <div className="group-members">
                <i className="fas fa-users"></i>
                {group.members} members
            </div>
            {group.description && (
                <p style={{
                    fontSize: '13px',
                    color: 'var(--text-secondary)',
                    marginTop: '8px',
                    lineHeight: 1.5
                }}>
                    {group.description}
                </p>
            )}
        </div>
    );
}

