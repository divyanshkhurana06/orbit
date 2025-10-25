import React from 'react';
import { formatTimestamp } from '../utils/helpers';

/**
 * PostCard Component
 * Individual post in the feed
 */
export default function PostCard({ post, onTip, onLike, onComment }) {
    return (
        <div className="post-card">
            <div className="post-header">
                <div className="post-avatar">
                    {post.author[0].toUpperCase()}
                </div>
                <div>
                    <div style={{ fontWeight: 600 }}>{post.author}</div>
                    <div style={{ 
                        fontSize: '13px', 
                        color: 'var(--text-secondary)' 
                    }}>
                        {formatTimestamp(post.timestamp)}
                    </div>
                </div>
            </div>
            <p style={{ lineHeight: 1.6, marginTop: '8px' }}>{post.content}</p>
            <div className="post-actions">
                <div 
                    className="post-action" 
                    onClick={() => onLike && onLike(post.id)}
                >
                    <i className="fas fa-heart"></i> {post.likes}
                </div>
                <div 
                    className="post-action"
                    onClick={() => onComment && onComment(post.id)}
                >
                    <i className="fas fa-comment"></i> {post.comments}
                </div>
                <div 
                    className="post-action" 
                    onClick={() => onTip && onTip(post)}
                >
                    <i className="fas fa-coins"></i> Tip
                </div>
                <div className="post-action">
                    <i className="fas fa-share"></i> Share
                </div>
            </div>
        </div>
    );
}

