import React, { useState } from 'react';
import { CONFIG } from '../config';
import yellowSDK from '../integrations/yellow';
import availSDK from '../integrations/avail';

/**
 * PaymentModal Component
 * Modal for payment features (Yellow & Avail integration)
 */
export default function PaymentModal({ isOpen, onClose }) {
    const [paymentAmount, setPaymentAmount] = useState('');
    const [splitAmount, setSplitAmount] = useState('');
    const [splitPeople, setSplitPeople] = useState('');
    const [selectedChain, setSelectedChain] = useState('ethereum');

    const handleInstantPayment = async () => {
        try {
            // Yellow SDK integration
            await yellowSDK.sendInstantPayment(
                CONFIG.CONTRACTS.ORBIT_TREASURY,
                parseFloat(paymentAmount),
                'Instant payment from Orbit'
            );
            alert('Payment sent successfully!');
        } catch (error) {
            console.error('Payment failed:', error);
            alert('Payment failed. Please try again.');
        }
    };

    const handleSplitPayment = async () => {
        try {
            const people = parseInt(splitPeople);
            const total = parseFloat(splitAmount);
            const recipients = Array(people).fill(CONFIG.CONTRACTS.ORBIT_TREASURY);
            
            await yellowSDK.splitPayment(total, recipients, 'Group split payment');
            alert(`Split payment created: $${(total / people).toFixed(2)} per person`);
        } catch (error) {
            console.error('Split failed:', error);
            alert('Split payment failed. Please try again.');
        }
    };

    const handleCrossChain = async () => {
        try {
            await availSDK.bridgeAndExecute({
                fromChain: selectedChain,
                toChain: 'polygon',
                amount: parseFloat(paymentAmount),
                userAddress: CONFIG.CONTRACTS.ORBIT_TREASURY,
                action: 'transfer',
                actionParams: { recipient: CONFIG.CONTRACTS.ORBIT_TREASURY }
            });
            alert('Cross-chain transfer initiated!');
        } catch (error) {
            console.error('Bridge failed:', error);
            alert('Cross-chain transfer failed. Please try again.');
        }
    };

    if (!isOpen) return null;

    return (
        <div className="modal" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <span className="close-btn" onClick={onClose}>&times;</span>
                <h2 style={{ fontSize: '28px', fontWeight: 800, marginBottom: '10px' }}>
                    Payment Features
                </h2>
                <p style={{ color: 'var(--text-secondary)', marginBottom: '30px' }}>
                    Powered by Yellow Network, Avail Nexus, and Blockscout
                </p>
                
                <div className="payment-grid">
                    {/* Yellow SDK - Instant Payment */}
                    <div className="payment-card">
                        <h3>
                            <i className="fas fa-bolt"></i> Yellow SDK - Instant Payments
                        </h3>
                        <p style={{ 
                            color: 'var(--text-secondary)', 
                            fontSize: '14px', 
                            marginBottom: '16px' 
                        }}>
                            Off-chain transactions with on-chain settlement
                        </p>
                        <input 
                            type="number" 
                            className="payment-input" 
                            placeholder="Amount (USDC)"
                            value={paymentAmount}
                            onChange={(e) => setPaymentAmount(e.target.value)}
                        />
                        <button 
                            className="btn btn-primary" 
                            style={{ width: '100%', marginTop: '12px' }}
                            onClick={handleInstantPayment}
                        >
                            Send Payment
                        </button>
                    </div>

                    {/* Split Payment */}
                    <div className="payment-card">
                        <h3>
                            <i className="fas fa-users"></i> Split Payment
                        </h3>
                        <p style={{ 
                            color: 'var(--text-secondary)', 
                            fontSize: '14px', 
                            marginBottom: '16px' 
                        }}>
                            Split bills with group members
                        </p>
                        <input 
                            type="number" 
                            className="payment-input" 
                            placeholder="Total Amount"
                            value={splitAmount}
                            onChange={(e) => setSplitAmount(e.target.value)}
                        />
                        <input 
                            type="number" 
                            className="payment-input" 
                            placeholder="Number of People"
                            value={splitPeople}
                            onChange={(e) => setSplitPeople(e.target.value)}
                        />
                        <button 
                            className="btn btn-primary" 
                            style={{ width: '100%', marginTop: '12px' }}
                            onClick={handleSplitPayment}
                        >
                            Create Split
                        </button>
                    </div>

                    {/* Avail Nexus - Cross-Chain */}
                    <div className="payment-card">
                        <h3>
                            <i className="fas fa-link"></i> Avail Nexus - Cross-Chain
                        </h3>
                        <p style={{ 
                            color: 'var(--text-secondary)', 
                            fontSize: '14px', 
                            marginBottom: '16px' 
                        }}>
                            Unified liquidity across chains
                        </p>
                        <select 
                            className="payment-input"
                            value={selectedChain}
                            onChange={(e) => setSelectedChain(e.target.value)}
                        >
                            {Object.keys(CONFIG.CHAINS).map(chain => (
                                <option key={chain} value={chain.toLowerCase()}>
                                    {CONFIG.CHAINS[chain].name}
                                </option>
                            ))}
                        </select>
                        <button 
                            className="btn btn-primary" 
                            style={{ width: '100%', marginTop: '12px' }}
                            onClick={handleCrossChain}
                        >
                            Bridge & Execute
                        </button>
                    </div>

                    {/* Shared Wallet */}
                    <div className="payment-card">
                        <h3>
                            <i className="fas fa-wallet"></i> Shared Wallet
                        </h3>
                        <p style={{ 
                            color: 'var(--text-secondary)', 
                            fontSize: '14px', 
                            marginBottom: '16px' 
                        }}>
                            Group treasury management
                        </p>
                        <div style={{ 
                            padding: '16px', 
                            background: 'rgba(10, 14, 26, 0.8)', 
                            borderRadius: '10px', 
                            marginTop: '12px', 
                            textAlign: 'center' 
                        }}>
                            <div style={{ fontSize: '24px', fontWeight: 700 }}>
                                1,245 USDC
                            </div>
                            <div style={{ 
                                fontSize: '12px', 
                                color: 'var(--text-secondary)', 
                                marginTop: '4px' 
                            }}>
                                Available Balance
                            </div>
                        </div>
                        <button 
                            className="btn btn-secondary" 
                            style={{ width: '100%', marginTop: '12px' }}
                        >
                            View Transactions
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

