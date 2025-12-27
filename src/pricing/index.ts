import type { MockResponse, PriceQuote, ConversionParams, MonexaConfig } from '../types';

export class PricingService {
  private config: MonexaConfig;

  constructor(config: MonexaConfig = {}) {
    this.config = config;
  }

  async getQuote(params: ConversionParams): Promise<MockResponse<PriceQuote>> {
    const mockRates: Record<string, number> = {
      'SOL-USD': 185.50,
      'SOL-EUR': 171.20,
      'SOL-GBP': 147.80,
      'ETH-USD': 3250.00,
      'BTC-USD': 98500.00,
    };

    const rateKey = `${params.from}-${params.to}`;
    const rate = mockRates[rateKey] || 1;

    return {
      status: 'success',
      mock: true,
      data: {
        fromCurrency: params.from,
        toCurrency: params.to,
        rate,
        amount: params.amount,
        convertedAmount: params.amount * rate,
        expiresAt: new Date(Date.now() + 30000).toISOString(),
      },
    };
  }

  async getSolPrice(currency: string = 'USD'): Promise<MockResponse<{ price: number; currency: string }>> {
    const prices: Record<string, number> = {
      USD: 185.50,
      EUR: 171.20,
      GBP: 147.80,
    };

    return {
      status: 'success',
      mock: true,
      data: {
        price: prices[currency] || 185.50,
        currency,
      },
    };
  }

  async convertToFiat(solAmount: number, currency: string = 'USD'): Promise<MockResponse<{ fiatAmount: number; rate: number }>> {
    const rate = 185.50;
    return {
      status: 'success',
      mock: true,
      data: {
        fiatAmount: solAmount * rate,
        rate,
      },
    };
  }

  async convertToSol(fiatAmount: number, currency: string = 'USD'): Promise<MockResponse<{ solAmount: number; rate: number }>> {
    const rate = 185.50;
    return {
      status: 'success',
      mock: true,
      data: {
        solAmount: fiatAmount / rate,
        rate,
      },
    };
  }

  async getSupportedCurrencies(): Promise<MockResponse<string[]>> {
    return {
      status: 'success',
      mock: true,
      data: ['USD', 'EUR', 'GBP', 'CAD', 'AUD', 'JPY'],
    };
  }

  async getHistoricalRates(from: string, to: string, days: number = 7): Promise<MockResponse<{ date: string; rate: number }[]>> {
    const baseRate = 185.50;
    const data = [];
    
    for (let i = days; i >= 0; i--) {
      const date = new Date(Date.now() - i * 86400000).toISOString().split('T')[0];
      const variance = (Math.random() - 0.5) * 10;
      data.push({
        date,
        rate: baseRate + variance,
      });
    }

    return {
      status: 'success',
      mock: true,
      data,
    };
  }
}

export const createPricingService = (config?: MonexaConfig) => new PricingService(config);
