import { WalletService, createWalletService } from './wallet';
import { CardService, createCardService } from './cards';
import { PaymentService, createPaymentService } from './payments';
import { PricingService, createPricingService } from './pricing';
import { LimitsService, createLimitsService } from './limits';
import type { MonexaConfig } from './types';

export class MonexaFinanceSDK {
  public wallet: WalletService;
  public cards: CardService;
  public payments: PaymentService;
  public pricing: PricingService;
  public limits: LimitsService;

  private config: MonexaConfig;

  constructor(config: MonexaConfig = {}) {
    this.config = {
      network: 'mainnet-beta',
      ...config,
    };

    this.wallet = new WalletService(this.config);
    this.cards = new CardService(this.config);
    this.payments = new PaymentService(this.config);
    this.pricing = new PricingService(this.config);
    this.limits = new LimitsService(this.config);
  }

  getConfig(): MonexaConfig {
    return { ...this.config };
  }

  setConfig(config: Partial<MonexaConfig>): void {
    this.config = { ...this.config, ...config };
    this.wallet = new WalletService(this.config);
    this.cards = new CardService(this.config);
    this.payments = new PaymentService(this.config);
    this.pricing = new PricingService(this.config);
    this.limits = new LimitsService(this.config);
  }

  getVersion(): string {
    return '1.0.0';
  }

  isInitialized(): boolean {
    return true;
  }
}

export const createMonexaSDK = (config?: MonexaConfig) => new MonexaFinanceSDK(config);

export {
  WalletService,
  CardService,
  PaymentService,
  PricingService,
  LimitsService,
  createWalletService,
  createCardService,
  createPaymentService,
  createPricingService,
  createLimitsService,
};

export * from './types';

export default MonexaFinanceSDK;
