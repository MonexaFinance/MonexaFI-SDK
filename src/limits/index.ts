import type { MockResponse, Limits, Fee, KYCStatus, MonexaConfig } from '../types';

export class LimitsService {
  private config: MonexaConfig;

  constructor(config: MonexaConfig = {}) {
    this.config = config;
  }

  async getLimits(): Promise<MockResponse<Limits>> {
    return {
      status: 'success',
      mock: true,
      data: {
        dailyLimit: 1000,
        monthlyLimit: 10000,
        perTransactionLimit: 500,
        remainingDaily: 750,
        remainingMonthly: 8500,
      },
    };
  }

  async getFees(): Promise<MockResponse<Fee[]>> {
    return {
      status: 'success',
      mock: true,
      data: [
        {
          type: 'issuance',
          percentage: 3.5,
          fixed: 0,
          currency: 'USD',
        },
        {
          type: 'conversion',
          percentage: 1.0,
          fixed: 0,
          currency: 'USD',
        },
        {
          type: 'network',
          percentage: 0,
          fixed: 0.00001,
          currency: 'SOL',
        },
      ],
    };
  }

  async getKYCStatus(): Promise<MockResponse<KYCStatus>> {
    return {
      status: 'success',
      mock: true,
      data: {
        level: 1,
        verified: true,
        requiredDocuments: [],
        limits: {
          dailyLimit: 1000,
          monthlyLimit: 10000,
          perTransactionLimit: 500,
          remainingDaily: 750,
          remainingMonthly: 8500,
        },
      },
    };
  }

  async getKYCRequirements(level: number): Promise<MockResponse<{ documents: string[]; description: string }>> {
    const requirements: Record<number, { documents: string[]; description: string }> = {
      1: {
        documents: ['Email verification'],
        description: 'Basic verification for up to $1,000/day',
      },
      2: {
        documents: ['Government ID', 'Selfie'],
        description: 'Enhanced verification for up to $5,000/day',
      },
      3: {
        documents: ['Government ID', 'Selfie', 'Proof of address', 'Source of funds'],
        description: 'Full verification for up to $25,000/day',
      },
    };

    return {
      status: 'success',
      mock: true,
      data: requirements[level] || requirements[1],
    };
  }

  async calculateFee(amount: number, type: 'issuance' | 'conversion' = 'issuance'): Promise<MockResponse<{ fee: number; total: number }>> {
    const feePercentages = {
      issuance: 3.5,
      conversion: 1.0,
    };

    const feePercentage = feePercentages[type];
    const fee = amount * (feePercentage / 100);

    return {
      status: 'success',
      mock: true,
      data: {
        fee,
        total: amount + fee,
      },
    };
  }

  async getRestrictedCountries(): Promise<MockResponse<string[]>> {
    return {
      status: 'success',
      mock: true,
      data: [
        'North Korea',
        'Iran',
        'Syria',
        'Cuba',
        'Russia',
        'Belarus',
        'Venezuela',
      ],
    };
  }

  async getSupportedCountries(): Promise<MockResponse<{ code: string; name: string }[]>> {
    return {
      status: 'success',
      mock: true,
      data: [
        { code: 'US', name: 'United States' },
        { code: 'GB', name: 'United Kingdom' },
        { code: 'DE', name: 'Germany' },
        { code: 'FR', name: 'France' },
        { code: 'CA', name: 'Canada' },
        { code: 'AU', name: 'Australia' },
        { code: 'JP', name: 'Japan' },
        { code: 'SG', name: 'Singapore' },
      ],
    };
  }
}

export const createLimitsService = (config?: MonexaConfig) => new LimitsService(config);
