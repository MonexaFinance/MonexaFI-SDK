import { MonexaFinanceSDK, createMonexaSDK } from '../src';

async function main() {
  console.log('=== Monexa Finance SDK Usage Examples ===\n');

  const monexa = createMonexaSDK({
    network: 'mainnet-beta',
    merchantWallet: 'J2kA82woXLgCGxgxYK28HxYHJuEoSpRVKuWXRwrmc9AF',
  });

  console.log(`SDK Version: ${monexa.getVersion()}`);
  console.log(`Initialized: ${monexa.isInitialized()}\n`);

  console.log('--- Wallet Operations ---');
  const walletInfo = await monexa.wallet.connect();
  console.log('Connect wallet:', JSON.stringify(walletInfo, null, 2));

  const balance = await monexa.wallet.getBalance();
  console.log('Get balance:', JSON.stringify(balance, null, 2));

  console.log('Supported wallets:', monexa.wallet.getSupportedWallets());

  console.log('\n--- Pricing Operations ---');
  const quote = await monexa.pricing.getQuote({
    from: 'SOL',
    to: 'USD',
    amount: 1,
  });
  console.log('Price quote:', JSON.stringify(quote, null, 2));

  const solPrice = await monexa.pricing.getSolPrice('USD');
  console.log('SOL price:', JSON.stringify(solPrice, null, 2));

  console.log('\n--- Limits & Fees ---');
  const limits = await monexa.limits.getLimits();
  console.log('User limits:', JSON.stringify(limits, null, 2));

  const fees = await monexa.limits.getFees();
  console.log('Fee structure:', JSON.stringify(fees, null, 2));

  const kycStatus = await monexa.limits.getKYCStatus();
  console.log('KYC status:', JSON.stringify(kycStatus, null, 2));

  console.log('\n--- Payment Operations ---');
  const payment = await monexa.payments.initiate({
    amount: 0.5,
    currency: 'SOL',
    merchantWallet: monexa.payments.getMerchantWallet(),
    memo: 'Virtual card purchase',
  });
  console.log('Initiate payment:', JSON.stringify(payment, null, 2));

  if (payment.data) {
    const paymentStatus = await monexa.payments.getStatus(payment.data.id);
    console.log('Payment status:', JSON.stringify(paymentStatus, null, 2));
  }

  console.log('\n--- Card Operations ---');
  const card = await monexa.cards.create({
    amount: 100,
    currency: 'USD',
    holderName: 'John Doe',
    email: 'john@example.com',
    country: 'US',
  });
  console.log('Create card:', JSON.stringify(card, null, 2));

  if (card.data) {
    const cardDetails = await monexa.cards.get(card.data.id);
    console.log('Get card:', JSON.stringify(cardDetails, null, 2));

    const transactions = await monexa.cards.getTransactions(card.data.id);
    console.log('Card transactions:', JSON.stringify(transactions, null, 2));
  }

  const allCards = await monexa.cards.list();
  console.log('List all cards:', JSON.stringify(allCards, null, 2));

  console.log('\n=== All examples completed successfully ===');
  console.log('Note: All responses are mocked. Connect to real API for production use.');
}

main().catch(console.error);
