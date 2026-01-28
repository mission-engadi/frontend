/**
 * Stripe Configuration
 *
 * This file contains Stripe-related configuration and utilities.
 */

import { loadStripe, Stripe } from '@stripe/stripe-js';

// Get Stripe publishable key from environment
const stripePublishableKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;

if (!stripePublishableKey) {
  console.warn('NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY is not defined. Stripe will not work.');
}

// Initialize Stripe
let stripePromise: Promise<Stripe | null>;

export const getStripe = () => {
  if (!stripePromise && stripePublishableKey) {
    console.log('Initializing Stripe with key:', stripePublishableKey?.substring(0, 20) + '...');
    stripePromise = loadStripe(stripePublishableKey);
  }
  if (!stripePublishableKey) {
    console.error('Stripe publishable key is missing!');
  }
  return stripePromise;
};

// Stripe configuration
export const stripeConfig = {
  // Publishable key (safe to expose in frontend)
  publishableKey: stripePublishableKey,

  // API endpoints
  apiBaseUrl: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api/v1',
  createPaymentIntentUrl: '/donations/create-payment-intent',

  // Payment options
  currency: 'usd',
  minAmount: 1.00,
  maxAmount: 100000.00,

  // Appearance customization
  appearance: {
    theme: 'stripe' as const,
    variables: {
      colorPrimary: '#1976d2',
      colorBackground: '#ffffff',
      colorText: '#30313d',
      colorDanger: '#df1b41',
      fontFamily: 'Roboto, sans-serif',
      spacingUnit: '4px',
      borderRadius: '4px',
    },
  },
};

// Helper function to format amount for Stripe (convert dollars to cents)
export const formatAmountForStripe = (amount: number): number => {
  return Math.round(amount * 100);
};

// Helper function to format amount for display (convert cents to dollars)
export const formatAmountForDisplay = (amount: number): string => {
  return (amount / 100).toFixed(2);
};

// Helper function to validate donation amount
export const validateDonationAmount = (amount: number): { valid: boolean; error?: string } => {
  if (isNaN(amount) || amount <= 0) {
    return { valid: false, error: 'Amount must be a positive number' };
  }

  if (amount < stripeConfig.minAmount) {
    return {
      valid: false,
      error: `Minimum donation amount is $${stripeConfig.minAmount.toFixed(2)}`
    };
  }

  if (amount > stripeConfig.maxAmount) {
    return {
      valid: false,
      error: `Maximum donation amount is $${stripeConfig.maxAmount.toLocaleString('en-US', { minimumFractionDigits: 2 })}`
    };
  }

  return { valid: true };
};
