import type { MockResponse, WalletInfo, MonexaConfig } from '../types';

export class WalletService {
  private config: MonexaConfig;

  constructor(config: MonexaConfig = {}) {
    this.config = {
      network: 'mainnet-beta',
      ...config,
    };
  }

  async connect(): Promise<MockResponse<WalletInfo>> {
    return {
      status: 'success',
      mock: true,
      data: {
        address: 'J2kA82woXLgCGxgxYK28HxYHJuEoSpRVKuWXRwrmc9AF',
        network: this.config.network || 'mainnet-beta',
        connected: true,
        balance: 2.5,
      },
    };
  }

  async disconnect(): Promise<MockResponse> {
    return {
      status: 'success',
      mock: true,
      message: 'Wallet disconnected successfully',
    };
  }

  async getBalance(address?: string): Promise<MockResponse<{ balance: number; currency: string }>> {
    return {
      status: 'success',
      mock: true,
      data: {
        balance: 2.5,
        currency: 'SOL',
      },
    };
  }

  async signMessage(message: string): Promise<MockResponse<{ signature: string }>> {
    return {
      status: 'success',
      mock: true,
      data: {
        signature: 'mock_signature_' + Buffer.from(message).toString('base64').slice(0, 20),
      },
    };
  }

  async getWalletInfo(): Promise<MockResponse<WalletInfo>> {
    return {
      status: 'success',
      mock: true,
      data: {
        address: 'J2kA82woXLgCGxgxYK28HxYHJuEoSpRVKuWXRwrmc9AF',
        network: this.config.network || 'mainnet-beta',
        connected: true,
        balance: 2.5,
      },
    };
  }

  isPhantomInstalled(): boolean {
    if (typeof window !== 'undefined') {
      return !!(window as any).phantom?.solana;
    }
    return false;
  }

  isSolflareInstalled(): boolean {
    if (typeof window !== 'undefined') {
      return !!(window as any).solflare;
    }
    return false;
  }

  getSupportedWallets(): string[] {
    return ['Phantom', 'Solflare', 'Backpack', 'Coinbase Wallet'];
  }
}

export const createWalletService = (config?: MonexaConfig) => new WalletService(config);
