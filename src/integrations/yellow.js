/**
 * Yellow Network SDK Integration
 * 
 * Yellow Network enables instant, gasless transactions through state channels
 * with on-chain settlement when the session ends.
 * 
 * Features:
 * - Session-based payment allowances
 * - Off-chain instant transfers
 * - Split payment functionality
 * - Micro-tipping support
 * - On-chain settlement
 */

import { YellowSDK } from '@yellow-network/sdk';

class YellowIntegration {
  constructor(config = {}) {
    this.sdk = new YellowSDK({
      network: config.network || 'testnet',
      apiKey: config.apiKey || process.env.YELLOW_API_KEY,
    });
    
    this.activeSession = null;
    this.sessionBalance = 0;
  }

  /**
   * Initialize a payment session with allowance
   * This creates an off-chain state channel for instant transactions
   */
  async createSession(walletAddress, allowanceUSDC = 100, durationSeconds = 3600) {
    try {
      console.log('Creating Yellow Network session...');
      
      const session = await this.sdk.createSession({
        userAddress: walletAddress,
        allowance: allowanceUSDC.toString(),
        duration: durationSeconds,
        token: 'USDC',
      });

      this.activeSession = session;
      this.sessionBalance = allowanceUSDC;

      console.log('Session created:', session.sessionId);
      
      return {
        success: true,
        sessionId: session.sessionId,
        balance: allowanceUSDC,
        expiresAt: new Date(Date.now() + durationSeconds * 1000),
      };
    } catch (error) {
      console.error('Failed to create session:', error);
      return {
        success: false,
        error: error.message,
      };
    }
  }

  /**
   * Send instant payment to another user
   * Happens off-chain through state channel
   */
  async sendInstantPayment(recipientAddress, amountUSDC, note = '') {
    if (!this.activeSession) {
      throw new Error('No active session. Please create a session first.');
    }

    if (amountUSDC > this.sessionBalance) {
      throw new Error('Insufficient session balance');
    }

    try {
      console.log(`Sending ${amountUSDC} USDC to ${recipientAddress}...`);
      
      const transaction = await this.sdk.transfer({
        sessionId: this.activeSession.sessionId,
        to: recipientAddress,
        amount: amountUSDC.toString(),
        token: 'USDC',
        metadata: { note },
      });

      this.sessionBalance -= amountUSDC;

      console.log('Payment sent:', transaction.txId);

      return {
        success: true,
        txId: transaction.txId,
        amount: amountUSDC,
        recipient: recipientAddress,
        remainingBalance: this.sessionBalance,
        timestamp: new Date(),
      };
    } catch (error) {
      console.error('Payment failed:', error);
      throw error;
    }
  }

  /**
   * Split payment among multiple recipients
   * Perfect for splitting restaurant bills, trip expenses, etc.
   */
  async splitPayment(totalAmount, recipients, description = '') {
    if (!this.activeSession) {
      throw new Error('No active session. Please create a session first.');
    }

    const amountPerPerson = totalAmount / recipients.length;
    const results = [];

    console.log(`Splitting ${totalAmount} USDC among ${recipients.length} people...`);

    try {
      const splitTx = await this.sdk.splitPayment({
        sessionId: this.activeSession.sessionId,
        total: totalAmount.toString(),
        recipients: recipients.map(addr => ({
          address: addr,
          share: (1 / recipients.length).toString(),
        })),
        token: 'USDC',
        metadata: { description },
      });

      this.sessionBalance -= totalAmount;

      return {
        success: true,
        splitId: splitTx.splitId,
        totalAmount,
        amountPerPerson,
        recipients: recipients.length,
        remainingBalance: this.sessionBalance,
        details: recipients.map((addr, i) => ({
          recipient: addr,
          amount: amountPerPerson,
          status: 'completed',
        })),
      };
    } catch (error) {
      console.error('Split payment failed:', error);
      throw error;
    }
  }

  /**
   * Micro-tipping for social interactions
   * Send small amounts (as low as $0.01) without gas fees
   */
  async tipPost(postId, recipientAddress, tipAmountUSDC = 0.01) {
    if (!this.activeSession) {
      // Create a temporary session for quick tipping
      await this.createSession(recipientAddress, 10, 300); // 5 min session
    }

    try {
      const tip = await this.sendInstantPayment(
        recipientAddress, 
        tipAmountUSDC,
        `Tip for post ${postId}`
      );

      console.log(`Tipped ${tipAmountUSDC} USDC for post ${postId}`);

      return {
        success: true,
        postId,
        amount: tipAmountUSDC,
        recipient: recipientAddress,
        txId: tip.txId,
      };
    } catch (error) {
      console.error('Tipping failed:', error);
      throw error;
    }
  }

  /**
   * Collect contributions for events/trips
   * Each member contributes their share
   */
  async collectContributions(eventName, targetAmount, contributors) {
    const amountPerPerson = targetAmount / contributors.length;
    const collections = [];

    console.log(`Collecting ${targetAmount} USDC for ${eventName}...`);

    for (const contributor of contributors) {
      try {
        // In production, each user would initiate their own payment
        // This is a simulation of the collection process
        const collection = {
          contributor: contributor.address,
          amount: amountPerPerson,
          status: 'pending',
          timestamp: new Date(),
        };

        collections.push(collection);
      } catch (error) {
        console.error(`Collection failed for ${contributor.address}:`, error);
        collections.push({
          contributor: contributor.address,
          amount: amountPerPerson,
          status: 'failed',
          error: error.message,
        });
      }
    }

    return {
      eventName,
      targetAmount,
      collected: collections.filter(c => c.status === 'pending').length * amountPerPerson,
      pending: collections.filter(c => c.status === 'pending').length,
      failed: collections.filter(c => c.status === 'failed').length,
      collections,
    };
  }

  /**
   * End session and settle on-chain
   * All off-chain transactions are batched and settled
   */
  async endSession() {
    if (!this.activeSession) {
      throw new Error('No active session to end');
    }

    try {
      console.log('Ending session and settling on-chain...');
      
      const settlement = await this.sdk.closeSession({
        sessionId: this.activeSession.sessionId,
      });

      const sessionData = this.activeSession;
      this.activeSession = null;
      this.sessionBalance = 0;

      console.log('Session settled:', settlement.txHash);

      return {
        success: true,
        txHash: settlement.txHash,
        totalTransactions: settlement.transactionCount,
        finalBalance: this.sessionBalance,
        settled: true,
      };
    } catch (error) {
      console.error('Session settlement failed:', error);
      throw error;
    }
  }

  /**
   * Get current session status
   */
  getSessionStatus() {
    if (!this.activeSession) {
      return {
        active: false,
        message: 'No active session',
      };
    }

    return {
      active: true,
      sessionId: this.activeSession.sessionId,
      balance: this.sessionBalance,
      expiresAt: this.activeSession.expiresAt,
    };
  }

  /**
   * Pay-per-use feature (for premium circles)
   * Charge small amounts for accessing premium content
   */
  async payPerUse(featureId, costUSDC, description) {
    try {
      const payment = await this.sendInstantPayment(
        'ORBIT_TREASURY_ADDRESS', // Platform treasury
        costUSDC,
        `Pay-per-use: ${description}`
      );

      return {
        success: true,
        featureId,
        cost: costUSDC,
        txId: payment.txId,
        accessGranted: true,
      };
    } catch (error) {
      console.error('Pay-per-use failed:', error);
      return {
        success: false,
        featureId,
        accessGranted: false,
        error: error.message,
      };
    }
  }

  /**
   * Get transaction history
   */
  async getTransactionHistory(limit = 50) {
    if (!this.activeSession) {
      return [];
    }

    try {
      const history = await this.sdk.getSessionTransactions({
        sessionId: this.activeSession.sessionId,
        limit,
      });

      return history.map(tx => ({
        id: tx.txId,
        type: tx.type,
        amount: parseFloat(tx.amount),
        recipient: tx.to,
        timestamp: new Date(tx.timestamp),
        status: tx.status,
        note: tx.metadata?.note || '',
      }));
    } catch (error) {
      console.error('Failed to fetch transaction history:', error);
      return [];
    }
  }
}

// Export singleton instance
export default new YellowIntegration({
  network: process.env.YELLOW_NETWORK || 'testnet',
  apiKey: process.env.YELLOW_API_KEY,
});

// Also export the class for custom instances
export { YellowIntegration };

/**
 * Usage Examples:
 * 
 * // Initialize session
 * await yellowSDK.createSession(userWallet, 100, 3600);
 * 
 * // Send instant payment
 * await yellowSDK.sendInstantPayment(recipientAddress, 5, 'Coffee money');
 * 
 * // Split a bill
 * await yellowSDK.splitPayment(50, [addr1, addr2, addr3, addr4], 'Dinner');
 * 
 * // Tip a post
 * await yellowSDK.tipPost('post-123', creatorAddress, 0.05);
 * 
 * // Collect for event
 * await yellowSDK.collectContributions('Beach Trip', 200, contributors);
 * 
 * // End session (settle on-chain)
 * await yellowSDK.endSession();
 */

