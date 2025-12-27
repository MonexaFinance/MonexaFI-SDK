import type { MockResponse, VirtualCard, CardCreateParams, MonexaConfig } from '../types';

export class CardService {
  private config: MonexaConfig;

  constructor(config: MonexaConfig = {}) {
    this.config = config;
  }

  async create(params: CardCreateParams): Promise<MockResponse<VirtualCard>> {
    const cardNumber = this.generateCardNumber();
    const expiry = this.generateExpiry();
    const cvv = this.generateCVV();

    return {
      status: 'success',
      mock: true,
      data: {
        id: 'card_' + this.generateId(),
        number: cardNumber,
        expiry,
        cvv,
        holderName: params.holderName.toUpperCase(),
        balance: params.amount,
        currency: params.currency || 'USD',
        status: 'active',
        createdAt: new Date().toISOString(),
      },
    };
  }

  async get(cardId: string): Promise<MockResponse<VirtualCard>> {
    return {
      status: 'success',
      mock: true,
      data: {
        id: cardId,
        number: '5392 •••• •••• 4829',
        expiry: '12/28',
        cvv: '•••',
        holderName: 'MONEXA USER',
        balance: 100,
        currency: 'USD',
        status: 'active',
        createdAt: new Date().toISOString(),
      },
    };
  }

  async list(): Promise<MockResponse<VirtualCard[]>> {
    return {
      status: 'success',
      mock: true,
      data: [
        {
          id: 'card_mock_001',
          number: '5392 •••• •••• 4829',
          expiry: '12/28',
          cvv: '•••',
          holderName: 'MONEXA USER',
          balance: 100,
          currency: 'USD',
          status: 'active',
          createdAt: new Date().toISOString(),
        },
      ],
    };
  }

  async freeze(cardId: string): Promise<MockResponse<VirtualCard>> {
    return {
      status: 'success',
      mock: true,
      data: {
        id: cardId,
        number: '5392 •••• •••• 4829',
        expiry: '12/28',
        cvv: '•••',
        holderName: 'MONEXA USER',
        balance: 100,
        currency: 'USD',
        status: 'frozen',
        createdAt: new Date().toISOString(),
      },
    };
  }

  async unfreeze(cardId: string): Promise<MockResponse<VirtualCard>> {
    return {
      status: 'success',
      mock: true,
      data: {
        id: cardId,
        number: '5392 •••• •••• 4829',
        expiry: '12/28',
        cvv: '•••',
        holderName: 'MONEXA USER',
        balance: 100,
        currency: 'USD',
        status: 'active',
        createdAt: new Date().toISOString(),
      },
    };
  }

  async getTransactions(cardId: string): Promise<MockResponse<any[]>> {
    return {
      status: 'success',
      mock: true,
      data: [
        {
          id: 'tx_001',
          cardId,
          amount: -25.99,
          merchant: 'Amazon',
          category: 'Shopping',
          date: new Date().toISOString(),
        },
      ],
    };
  }

  private generateCardNumber(): string {
    const first4 = '5392';
    const middle = Array.from({ length: 8 }, () => Math.floor(Math.random() * 10)).join('');
    const last4 = Array.from({ length: 4 }, () => Math.floor(Math.random() * 10)).join('');
    return `${first4} ${middle.slice(0, 4)} ${middle.slice(4)} ${last4}`;
  }

  private generateExpiry(): string {
    const month = String(Math.floor(Math.random() * 12) + 1).padStart(2, '0');
    const year = String(new Date().getFullYear() + 3).slice(-2);
    return `${month}/${year}`;
  }

  private generateCVV(): string {
    return String(Math.floor(Math.random() * 900) + 100);
  }

  private generateId(): string {
    return Math.random().toString(36).substring(2, 15);
  }
}

export const createCardService = (config?: MonexaConfig) => new CardService(config);
