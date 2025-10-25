import React from 'react';
import { CONFIG } from '../config';

/**
 * Header Component
 * Top navigation bar with logo and action buttons
 */
export default function Header({ onLocationClick, onPaymentClick, onCreateGroup }) {
    return (
        <div className="header">
            <div>
                <div className="logo">
                    <i className="fas fa-circle-notch"></i>
                    {CONFIG.APP.NAME}
                </div>
                <div className="tagline">{CONFIG.APP.TAGLINE}</div>
            </div>
            <div className="nav-buttons">
                {CONFIG.FEATURES.ENABLE_LOCATION_SHARING && (
                    <button className="btn btn-secondary" onClick={onLocationClick}>
                        <i className="fas fa-map-marker-alt"></i> Locations
                    </button>
                )}
                {CONFIG.FEATURES.ENABLE_PAYMENTS && (
                    <button className="btn btn-secondary" onClick={onPaymentClick}>
                        <i className="fas fa-wallet"></i> Payments
                    </button>
                )}
                <button className="btn btn-primary" onClick={onCreateGroup}>
                    <i className="fas fa-plus"></i> Create Group
                </button>
            </div>
        </div>
    );
}

