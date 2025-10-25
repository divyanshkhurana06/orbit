/**
 * Avail Nexus SDK Integration
 * 
 * Avail Nexus enables unified liquidity and cross-chain operations
 * allowing users to access any asset on any chain from one interface.
 * 
 * Features:
 * - Cross-chain swaps (XCS)
 * - Bridge & Execute functionality
 * - Unified USDC/USDT across chains
 * - Shared group wallets with multi-sig
 * - NFT minting for collectibles
 */

import { NexusSDK, NexusWidgets } from '@availproject/nexus-sdk';

class AvailIntegration {
  constructor(config = {}) {
    this.sdk = new NexusSDK({
      apiKey: config.apiKey || process.env.AVAIL_NEXUS_API_KEY,
      defaultChainId: config.chainId || 1, // Ethereum mainnet
    });

    this.widgets = new NexusWidgets();
    this.sharedWallets = new Map();
  }

  /**
   * Execute cross-chain swap
   * Trade tokens across different chains seamlessly
   */
  async crossChainSwap(params) {
    const {
      fromChain,
      toChain,
      fromToken,
      toToken,
      amount,
      slippage = 0.5,
    } = params;

    try {
      console.log(`Swapping ${amount} ${fromToken} on ${fromChain} to ${toToken} on ${toChain}...`);

      const quote = await this.sdk.getSwapQuote({
        sourceChain: fromChain,
        destinationChain: toChain,
        sourceToken: fromToken,
        destinationToken: toToken,
        amount: amount.toString(),
        slippageTolerance: slippage,
      });

      console.log('Quote received:', {
        inputAmount: quote.inputAmount,
        outputAmount: quote.outputAmount,
        exchangeRate: quote.exchangeRate,
        estimatedTime: quote.estimatedTime,
        fees: quote.fees,
      });

      const swap = await this.sdk.executeSwap({
        quoteId: quote.quoteId,
        userAddress: params.userAddress,
      });

      return {
        success: true,
        swapId: swap.swapId,
        fromChain,
        toChain,
        fromAmount: amount,
        toAmount: quote.outputAmount,
        exchangeRate: quote.exchangeRate,
        txHash: swap.txHash,
        status: 'pending',
        estimatedTime: quote.estimatedTime,
      };
    } catch (error) {
      console.error('Cross-chain swap failed:', error);
      throw error;
    }
  }

  /**
   * Bridge and Execute
   * Bridge funds and execute an action on the destination chain in one transaction
   */
  async bridgeAndExecute(params) {
    const {
      fromChain,
      toChain,
      amount,
      token = 'USDC',
      action,
      actionParams,
      userAddress,
    } = params;

    try {
      console.log(`Bridging ${amount} ${token} from ${fromChain} to ${toChain} and executing ${action}...`);

      const bridgeIntent = await this.sdk.createIntent({
        type: 'BRIDGE_AND_EXECUTE',
        sourceChain: fromChain,
        destinationChain: toChain,
        amount: amount.toString(),
        token,
        userAddress,
        execution: {
          action: action, // 'transfer', 'stake', 'swap', etc.
          params: actionParams,
        },
      });

      const result = await this.sdk.submitIntent(bridgeIntent);

      return {
        success: true,
        intentId: result.intentId,
        fromChain,
        toChain,
        amount,
        token,
        action,
        status: result.status,
        txHash: result.txHash,
        destinationTxHash: result.destinationTxHash,
      };
    } catch (error) {
      console.error('Bridge and execute failed:', error);
      throw error;
    }
  }

  /**
   * Create shared group wallet
   * Multi-signature wallet for group treasury management
   */
  async createSharedWallet(params) {
    const {
      groupId,
      owners,
      threshold,
      initialChain = 'ethereum',
      name,
    } = params;

    try {
      console.log(`Creating shared wallet for group ${groupId}...`);

      const wallet = await this.sdk.createMultiSigWallet({
        owners,
        threshold,
        chain: initialChain,
        metadata: {
          groupId,
          name,
          createdAt: new Date().toISOString(),
        },
      });

      this.sharedWallets.set(groupId, {
        address: wallet.address,
        owners,
        threshold,
        chain: initialChain,
        balance: 0,
      });

      console.log('Shared wallet created:', wallet.address);

      return {
        success: true,
        groupId,
        walletAddress: wallet.address,
        owners,
        threshold,
        chain: initialChain,
        deploymentTxHash: wallet.txHash,
      };
    } catch (error) {
      console.error('Failed to create shared wallet:', error);
      throw error;
    }
  }

  /**
   * Get unified balance across all chains
   * See total holdings aggregated from multiple chains
   */
  async getUnifiedBalance(address, token = 'USDC') {
    try {
      const chains = ['ethereum', 'polygon', 'arbitrum', 'optimism', 'base'];
      const balances = [];
      let totalBalance = 0;

      console.log(`Fetching unified ${token} balance for ${address}...`);

      for (const chain of chains) {
        try {
          const balance = await this.sdk.getBalance({
            address,
            token,
            chain,
          });

          const balanceValue = parseFloat(balance.formatted);
          totalBalance += balanceValue;

          balances.push({
            chain,
            balance: balanceValue,
            formattedBalance: balance.formatted,
            usdValue: balance.usdValue,
          });
        } catch (error) {
          console.warn(`Failed to fetch balance on ${chain}:`, error.message);
        }
      }

      return {
        address,
        token,
        totalBalance,
        chains: balances,
        lastUpdated: new Date(),
      };
    } catch (error) {
      console.error('Failed to get unified balance:', error);
      throw error;
    }
  }

  /**
   * Deposit to shared wallet from any chain
   * Members can contribute from their preferred chain
   */
  async depositToSharedWallet(params) {
    const {
      groupId,
      fromChain,
      amount,
      token = 'USDC',
      userAddress,
    } = params;

    const wallet = this.sharedWallets.get(groupId);
    if (!wallet) {
      throw new Error('Shared wallet not found for this group');
    }

    try {
      console.log(`Depositing ${amount} ${token} to group wallet from ${fromChain}...`);

      // If depositing from a different chain, bridge first
      if (fromChain !== wallet.chain) {
        const bridgeResult = await this.bridgeAndExecute({
          fromChain,
          toChain: wallet.chain,
          amount,
          token,
          userAddress,
          action: 'transfer',
          actionParams: {
            recipient: wallet.address,
          },
        });

        return {
          success: true,
          groupId,
          amount,
          token,
          fromChain,
          toChain: wallet.chain,
          bridged: true,
          intentId: bridgeResult.intentId,
        };
      } else {
        // Direct transfer on same chain
        const transfer = await this.sdk.transfer({
          from: userAddress,
          to: wallet.address,
          amount: amount.toString(),
          token,
          chain: fromChain,
        });

        return {
          success: true,
          groupId,
          amount,
          token,
          chain: fromChain,
          bridged: false,
          txHash: transfer.txHash,
        };
      }
    } catch (error) {
      console.error('Deposit to shared wallet failed:', error);
      throw error;
    }
  }

  /**
   * Distribute funds from shared wallet
   * Multi-sig transaction to pay multiple recipients
   */
  async distributeFromSharedWallet(params) {
    const {
      groupId,
      recipients,
      amounts,
      token = 'USDC',
      description,
      signers,
    } = params;

    const wallet = this.sharedWallets.get(groupId);
    if (!wallet) {
      throw new Error('Shared wallet not found for this group');
    }

    try {
      console.log(`Creating distribution transaction for group ${groupId}...`);

      // Create multi-sig transaction
      const transaction = await this.sdk.createMultiSigTransaction({
        walletAddress: wallet.address,
        transactions: recipients.map((recipient, i) => ({
          to: recipient,
          value: amounts[i].toString(),
          token,
          data: '0x',
        })),
        metadata: {
          description,
          groupId,
        },
      });

      // Collect signatures from threshold number of owners
      const signatures = [];
      for (const signer of signers) {
        const signature = await this.sdk.signMultiSigTransaction({
          transactionId: transaction.id,
          signer,
        });
        signatures.push(signature);

        if (signatures.length >= wallet.threshold) {
          break;
        }
      }

      // Execute if threshold met
      if (signatures.length >= wallet.threshold) {
        const execution = await this.sdk.executeMultiSigTransaction({
          transactionId: transaction.id,
          signatures,
        });

        return {
          success: true,
          groupId,
          transactionId: transaction.id,
          recipients: recipients.length,
          totalAmount: amounts.reduce((a, b) => a + b, 0),
          executed: true,
          txHash: execution.txHash,
        };
      } else {
        return {
          success: false,
          groupId,
          transactionId: transaction.id,
          message: 'Insufficient signatures',
          signaturesCollected: signatures.length,
          signaturesRequired: wallet.threshold,
        };
      }
    } catch (error) {
      console.error('Distribution failed:', error);
      throw error;
    }
  }

  /**
   * Mint NFT collectible for memorable posts
   * Turn group memories into NFTs
   */
  async mintMemoryNFT(params) {
    const {
      postId,
      title,
      description,
      imageUrl,
      groupId,
      creatorAddress,
      chain = 'polygon',
    } = params;

    try {
      console.log(`Minting NFT for post ${postId}...`);

      const nft = await this.sdk.mintNFT({
        chain,
        creator: creatorAddress,
        metadata: {
          name: title,
          description,
          image: imageUrl,
          attributes: [
            { trait_type: 'Post ID', value: postId },
            { trait_type: 'Group ID', value: groupId },
            { trait_type: 'Created At', value: new Date().toISOString() },
          ],
        },
      });

      return {
        success: true,
        postId,
        nftId: nft.tokenId,
        contractAddress: nft.contractAddress,
        chain,
        tokenURI: nft.tokenURI,
        txHash: nft.txHash,
        opensea: `https://opensea.io/assets/${chain}/${nft.contractAddress}/${nft.tokenId}`,
      };
    } catch (error) {
      console.error('NFT minting failed:', error);
      throw error;
    }
  }

  /**
   * Unified gas refuel
   * Top up gas on any chain using tokens from another chain
   */
  async refuelGas(params) {
    const {
      targetChain,
      sourceChain,
      amount,
      userAddress,
    } = params;

    try {
      console.log(`Refueling gas on ${targetChain} from ${sourceChain}...`);

      const refuel = await this.sdk.refuel({
        sourceChain,
        targetChain,
        amount: amount.toString(),
        recipient: userAddress,
      });

      return {
        success: true,
        targetChain,
        sourceChain,
        amount,
        txHash: refuel.txHash,
        estimatedTime: refuel.estimatedTime,
      };
    } catch (error) {
      console.error('Gas refuel failed:', error);
      throw error;
    }
  }

  /**
   * Get shared wallet status
   */
  async getSharedWalletStatus(groupId) {
    const wallet = this.sharedWallets.get(groupId);
    if (!wallet) {
      throw new Error('Shared wallet not found');
    }

    try {
      const balance = await this.sdk.getBalance({
        address: wallet.address,
        token: 'USDC',
        chain: wallet.chain,
      });

      const pendingTransactions = await this.sdk.getPendingMultiSigTransactions({
        walletAddress: wallet.address,
      });

      return {
        groupId,
        address: wallet.address,
        owners: wallet.owners,
        threshold: wallet.threshold,
        chain: wallet.chain,
        balance: parseFloat(balance.formatted),
        pendingTransactions: pendingTransactions.length,
        transactions: pendingTransactions,
      };
    } catch (error) {
      console.error('Failed to get wallet status:', error);
      throw error;
    }
  }

  /**
   * Track cross-chain intent status
   */
  async getIntentStatus(intentId) {
    try {
      const status = await this.sdk.getIntentStatus({
        intentId,
      });

      return {
        intentId,
        status: status.status, // 'pending', 'executing', 'completed', 'failed'
        sourceChain: status.sourceChain,
        destinationChain: status.destinationChain,
        sourceTxHash: status.sourceTxHash,
        destinationTxHash: status.destinationTxHash,
        progress: status.progress,
        estimatedCompletion: status.estimatedCompletion,
      };
    } catch (error) {
      console.error('Failed to get intent status:', error);
      throw error;
    }
  }
}

// Export singleton instance
export default new AvailIntegration({
  apiKey: process.env.AVAIL_NEXUS_API_KEY,
  chainId: parseInt(process.env.AVAIL_CHAIN_ID || '1'),
});

// Also export the class
export { AvailIntegration };

/**
 * Usage Examples:
 * 
 * // Cross-chain swap
 * await availSDK.crossChainSwap({
 *   fromChain: 'ethereum',
 *   toChain: 'polygon',
 *   fromToken: 'USDC',
 *   toToken: 'USDC',
 *   amount: 100,
 *   userAddress: address,
 * });
 * 
 * // Create shared wallet
 * await availSDK.createSharedWallet({
 *   groupId: 'travel-squad',
 *   owners: [addr1, addr2, addr3],
 *   threshold: 2,
 *   name: 'Travel Fund',
 * });
 * 
 * // Bridge and execute
 * await availSDK.bridgeAndExecute({
 *   fromChain: 'ethereum',
 *   toChain: 'polygon',
 *   amount: 50,
 *   userAddress: address,
 *   action: 'transfer',
 *   actionParams: { recipient: groupWallet },
 * });
 * 
 * // Mint memory NFT
 * await availSDK.mintMemoryNFT({
 *   postId: 'post-123',
 *   title: 'Epic Beach Day',
 *   imageUrl: 'ipfs://...',
 *   groupId: 'friends',
 *   creatorAddress: address,
 * });
 */

