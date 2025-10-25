import React from 'react';
import { STACK_GALLERY_ITEMS } from '../constants/groups';

/**
 * StackGallery Component
 * Card-stack style gallery for photos
 */
export default function StackGallery({ items = STACK_GALLERY_ITEMS, currentIndex, onPrev, onNext }) {
    return (
        <div className="stack-gallery">
            <div className="stack-container">
                {items.map((img, index) => {
                    const offset = index - currentIndex;
                    return (
                        <div
                            key={img.id}
                            className="stack-item placeholder"
                            style={{
                                zIndex: items.length - Math.abs(offset),
                                transform: `translateX(${offset * 30}px) translateY(${offset * 30}px) rotate(${offset * 5}deg)`,
                                opacity: Math.abs(offset) > 2 ? 0 : 1 - Math.abs(offset) * 0.2,
                            }}
                        >
                            {img.image ? (
                                <img src={img.image} alt={img.label} />
                            ) : (
                                <div style={{ textAlign: 'center' }}>
                                    <div style={{ fontSize: '80px' }}>{img.icon}</div>
                                    <div style={{ 
                                        marginTop: '15px', 
                                        fontSize: '20px', 
                                        fontWeight: 600 
                                    }}>
                                        {img.label}
                                    </div>
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
            <div className="stack-controls">
                <button 
                    className="btn btn-secondary"
                    onClick={onPrev}
                    disabled={currentIndex === 0}
                >
                    <i className="fas fa-chevron-left"></i> Previous
                </button>
                <button 
                    className="btn btn-secondary"
                    onClick={onNext}
                    disabled={currentIndex === items.length - 1}
                >
                    Next <i className="fas fa-chevron-right"></i>
                </button>
            </div>
        </div>
    );
}

