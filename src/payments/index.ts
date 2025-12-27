import type { MockResponse, Payment, PaymentInitParams, MonexaConfig } from '../types';

export class PaymentService {
  private config: MonexaConfig;

  constructor(config: MonexaConfig = {}) {
    this.config = config;
  }

  async initiate(params: PaymentInitParams): Promise<MockResponse<Payment>> {
    const paymentId = 'pay_' + this.generateId();

    return {
      status: 'success',
      mock: true,
      data: {
        id: paymentId,
        transactionSignature: '',
        amount: params.amount,
        currency: params.currency || 'SOL',
        status: 'pending',
        createdAt: new Date().toISOString(),
      },
    };
  }

  async confirm(paymentId: string, transactionSignature: string): Promise<MockResponse<Payment>> {
    return {
      status: 'success',
      mock: true,
      data: {
        id: paymentId,
        transactionSignature,
        amount: 0.5,
        currency: 'SOL',
        status: 'confirming',
        createdAt: new Date().toISOString(),
      },
    };
  }

  async getStatus(paymentId: string): Promise<MockResponse<Payment>> {
    return {
      status: 'success',
      mock: true,
      data: {
        id: paymentId,
        transactionSignature: 'mock_sig_' + paymentId,
        amount: 0.5,
        currency: 'SOL',
        status: 'confirmed',
        createdAt: new Date(Date.now() - 60000).toISOString(),
        confirmedAt: new Date().toISOString(),
      },
    };
  }

  async getHistory(limit: number = 10): Promise<MockResponse<Payment[]>> {
    return {
      status: 'success',
      mock: true,
      data: [
        {
          id: 'pay_mock_001',
          transactionSignature: 'mock_sig_001',
          amount: 0.5,
          currency: 'SOL',
          status: 'confirmed',
          createdAt: new Date(Date.now() - 86400000).toISOString(),
          confirmedAt: new Date(Date.now() - 86400000 + 30000).toISOString(),
        },
        {
          id: 'pay_mock_002',
          transactionSignature: 'mock_sig_002',
          amount: 1.2,
          currency: 'SOL',
          status: 'confirmed',
          createdAt: new Date(Date.now() - 172800000).toISOString(),
          confirmedAt: new Date(Date.now() - 172800000 + 25000).toISOString(),
        },
      ],
    };
  }

  async cancel(paymentId: string): Promise<MockResponse> {
    return {
      status: 'success',
      mock: true,
      message: `Payment ${paymentId} cancelled successfully`,
    };
  }

  async verifyTransaction(signature: string): Promise<MockResponse<{ verified: boolean; slot: number }>> {
    return {
      status: 'success',
      mock: true,
      data: {
        verified: true,
        slot: 123456789,
      },
    };
  }

  getMerchantWallet(): string {
    return this.config.merchantWallet || 'J2kA82woXLgCGxgxYK28HxYHJuEoSpRVKuWXRwrmc9AF';
  }

  private generateId(): string {
    return Math.random().toString(36).substring(2, 15);
  }
}

export const createPaymentService = (config?: MonexaConfig) => new PaymentService(config);
