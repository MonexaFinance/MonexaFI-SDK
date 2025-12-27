export interface MockResponse<T = unknown> {
  status: 'success' | 'error';
  mock: boolean;
  data?: T;
  message?: string;
}

export interface WalletInfo {
  address: string;
  network: 'mainnet-beta' | 'devnet' | 'testnet';
  connected: boolean;
  balance?: number;
}

export interface VirtualCard {
  id: string;
  number: string;
  expiry: string;
  cvv: string;
  holderName: string;
  balance: number;
  currency: string;
  status: 'active' | 'frozen' | 'expired';
  createdAt: string;
}

export interface CardCreateParams {
  amount: number;
  currency?: string;
  holderName: string;
  email: string;
  country: string;
}

export interface Payment {
  id: string;
  transactionSignature: string;
  amount: number;
  currency: string;
  status: 'pending' | 'confirming' | 'confirmed' | 'failed';
  createdAt: string;
  confirmedAt?: string;
}

export interface PaymentInitParams {
  amount: number;
  currency?: string;
  merchantWallet: string;
  memo?: string;
}

export interface PriceQuote {
  fromCurrency: string;
  toCurrency: string;
  rate: number;
  amount: number;
  convertedAmount: number;
  expiresAt: string;
}

export interface ConversionParams {
  from: string;
  to: string;
  amount: number;
}

export interface Limits {
  dailyLimit: number;
  monthlyLimit: number;
  perTransactionLimit: number;
  remainingDaily: number;
  remainingMonthly: number;
}

export interface Fee {
  type: 'issuance' | 'conversion' | 'network';
  percentage: number;
  fixed: number;
  currency: string;
}

export interface KYCStatus {
  level: 0 | 1 | 2 | 3;
  verified: boolean;
  requiredDocuments: string[];
  limits: Limits;
}

export interface MonexaConfig {
  apiKey?: string;
  network?: 'mainnet-beta' | 'devnet' | 'testnet';
  rpcUrl?: string;
  merchantWallet?: string;
}
