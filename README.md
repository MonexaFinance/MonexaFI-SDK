# Monexa Finance SDK

Official TypeScript SDK for **Monexa Finance** — the smarter way to spend your crypto.

Convert your digital assets to virtual cards instantly. Use anywhere Mastercard and Visa are accepted, worldwide.

## Features

- **Wallet Connection** — Connect to popular Solana wallets (Phantom, Solflare, Backpack, Coinbase)
- **Pricing & Conversion** — Real-time SOL to fiat conversion rates
- **Virtual Cards** — Create, manage, and freeze virtual payment cards
- **Payments** — Initiate and track crypto payments
- **Limits & Fees** — Query transaction limits, fees, and KYC status

## Installation

```bash
npm install monexa-finance-sdk
# or
yarn add monexa-finance-sdk
# or
pnpm add monexa-finance-sdk
```

## Quick Start

```typescript
import { createMonexaSDK } from 'monexa-finance-sdk';

// Initialize the SDK
const monexa = createMonexaSDK({
  network: 'mainnet-beta',
  merchantWallet: 'YOUR_MERCHANT_WALLET_ADDRESS',
});

// Connect wallet
const wallet = await monexa.wallet.connect();
console.log('Connected:', wallet.data?.address);

// Get SOL price
const price = await monexa.pricing.getSolPrice('USD');
console.log('SOL Price:', price.data?.price);

// Create a virtual card
const card = await monexa.cards.create({
  amount: 100,
  currency: 'USD',
  holderName: 'John Doe',
  email: 'john@example.com',
  country: 'US',
});
console.log('Card created:', card.data?.number);
```

## API Reference

### MonexaFinanceSDK

Main SDK class that provides access to all services.

```typescript
const monexa = createMonexaSDK(config?: MonexaConfig);
```

#### Configuration Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `apiKey` | string | - | Your Monexa API key (when available) |
| `network` | string | `mainnet-beta` | Solana network (`mainnet-beta`, `devnet`, `testnet`) |
| `rpcUrl` | string | - | Custom RPC endpoint URL |
| `merchantWallet` | string | - | Merchant wallet address for payments |

### Wallet Service

```typescript
// Connect wallet
await monexa.wallet.connect();

// Disconnect wallet
await monexa.wallet.disconnect();

// Get balance
await monexa.wallet.getBalance(address?);

// Sign message
await monexa.wallet.signMessage(message);

// Get wallet info
await monexa.wallet.getWalletInfo();

// Check wallet availability
monexa.wallet.isPhantomInstalled();
monexa.wallet.isSolflareInstalled();
monexa.wallet.getSupportedWallets();
```

### Card Service

```typescript
// Create virtual card
await monexa.cards.create({
  amount: 100,
  currency: 'USD',
  holderName: 'John Doe',
  email: 'john@example.com',
  country: 'US',
});

// Get card details
await monexa.cards.get(cardId);

// List all cards
await monexa.cards.list();

// Freeze/unfreeze card
await monexa.cards.freeze(cardId);
await monexa.cards.unfreeze(cardId);

// Get card transactions
await monexa.cards.getTransactions(cardId);
```

### Payment Service

```typescript
// Initiate payment
await monexa.payments.initiate({
  amount: 0.5,
  currency: 'SOL',
  merchantWallet: 'WALLET_ADDRESS',
  memo: 'Card purchase',
});

// Confirm payment with signature
await monexa.payments.confirm(paymentId, transactionSignature);

// Get payment status
await monexa.payments.getStatus(paymentId);

// Get payment history
await monexa.payments.getHistory(limit?);

// Cancel payment
await monexa.payments.cancel(paymentId);

// Verify transaction
await monexa.payments.verifyTransaction(signature);
```

### Pricing Service

```typescript
// Get price quote
await monexa.pricing.getQuote({
  from: 'SOL',
  to: 'USD',
  amount: 1,
});

// Get SOL price
await monexa.pricing.getSolPrice(currency?);

// Convert to fiat
await monexa.pricing.convertToFiat(solAmount, currency?);

// Convert to SOL
await monexa.pricing.convertToSol(fiatAmount, currency?);

// Get supported currencies
await monexa.pricing.getSupportedCurrencies();

// Get historical rates
await monexa.pricing.getHistoricalRates(from, to, days?);
```

### Limits Service

```typescript
// Get user limits
await monexa.limits.getLimits();

// Get fee structure
await monexa.limits.getFees();

// Get KYC status
await monexa.limits.getKYCStatus();

// Get KYC requirements
await monexa.limits.getKYCRequirements(level);

// Calculate fee
await monexa.limits.calculateFee(amount, type?);

// Get restricted countries
await monexa.limits.getRestrictedCountries();

// Get supported countries
await monexa.limits.getSupportedCountries();
```

## Response Format

All methods return a standardized response:

```typescript
interface MockResponse<T> {
  status: 'success' | 'error';
  mock: boolean;  // true for mocked responses
  data?: T;
  message?: string;
}
```

## Important Notes

> **⚠️ MOCK API**: This SDK currently returns mock data for all operations. The `mock: true` field in responses indicates that the data is simulated. Real API integration will be available in a future release.

## Browser Support

The SDK is compatible with:
- Modern browsers (Chrome, Firefox, Safari, Edge)
- Node.js 16+
- React Native (with appropriate polyfills)

## TypeScript Support

Full TypeScript support with type definitions included. All types are exported from the main package:

```typescript
import type {
  MonexaConfig,
  WalletInfo,
  VirtualCard,
  Payment,
  PriceQuote,
  Limits,
  Fee,
  KYCStatus,
} from 'monexa-finance-sdk';
```

## Examples

See the [examples/usage.ts](./examples/usage.ts) file for comprehensive usage examples.

## License

MIT License - see [LICENSE](./LICENSE) for details.

## Links

- Website: [https://monexa.finance](https://monexa.finance)
- Documentation: [https://monexa.finance/docs](https://monexa.finance/docs)
- Support: support@monexa.finance

---

Built with ❤️ by Monexa Finance
