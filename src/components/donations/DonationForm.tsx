'use client';

/**
 * DonationForm Component
 *
 * Main donation form that handles amount input, partner selection,
 * and initializes Stripe Elements for payment processing.
 */

import React, { useState } from 'react';
import { Elements } from '@stripe/react-stripe-js';
import {
  Box,
  Card,
  CardContent,
  TextField,
  Typography,
  Button,
  Alert,
  CircularProgress,
  InputAdornment,
  Grid,
  Chip,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
} from '@mui/material';
import { Favorite as FavoriteIcon } from '@mui/icons-material';
import { getStripe, stripeConfig, validateDonationAmount } from '@/src/config/stripe';
import { CheckoutForm } from './CheckoutForm';
import axios from 'axios';

// Predefined donation amounts
const SUGGESTED_AMOUNTS = [25, 50, 100, 250, 500];

interface DonationFormProps {
  partnerId?: string;
  projectId?: string;
  defaultAmount?: number;
}

export const DonationForm: React.FC<DonationFormProps> = ({
  partnerId,
  projectId,
  defaultAmount = 50,
}) => {
  // Form state
  const [amount, setAmount] = useState<number>(defaultAmount);
  const [customAmount, setCustomAmount] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [donationType, setDonationType] = useState<'one-time' | 'monthly'>('one-time');

  // Payment state
  const [clientSecret, setClientSecret] = useState<string>('');
  const [paymentIntentId, setPaymentIntentId] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>('');
  const [showCheckout, setShowCheckout] = useState(false);

  // Handle suggested amount selection
  const handleAmountSelect = (value: number) => {
    setAmount(value);
    setCustomAmount('');
  };

  // Handle custom amount input
  const handleCustomAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setCustomAmount(value);

    const numValue = parseFloat(value);
    if (!isNaN(numValue)) {
      setAmount(numValue);
    }
  };

  // Validate and create payment intent
  const handleContinueToPayment = async () => {
    setError('');

    // Validate email
    if (!email || !email.includes('@')) {
      setError('Please enter a valid email address');
      return;
    }

    // Validate amount
    const validation = validateDonationAmount(amount);
    if (!validation.valid) {
      setError(validation.error || 'Invalid amount');
      return;
    }

    setIsLoading(true);

    try {
      // Create payment intent on backend
      const response = await axios.post(
        `${stripeConfig.apiBaseUrl}${stripeConfig.createPaymentIntentUrl}`,
        {
          amount,
          currency: stripeConfig.currency,
          customer_email: email,
          partner_id: partnerId || '123e4567-e89b-12d3-a456-426614174000', // Default test UUID
          project_id: projectId,
          metadata: {
            donation_type: donationType,
          },
        }
      );

      const { client_secret, payment_intent_id } = response.data;

      console.log('Payment intent created:', { payment_intent_id, has_client_secret: !!client_secret });

      if (!client_secret) {
        throw new Error('Failed to create payment intent - no client secret returned');
      }

      setClientSecret(client_secret);
      setPaymentIntentId(payment_intent_id);
      setShowCheckout(true);
    } catch (err: any) {
      console.error('Payment intent creation error:', err);
      setError(
        err.response?.data?.detail ||
        err.message ||
        'Failed to initialize payment. Please try again.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  // Handle payment success
  const handlePaymentSuccess = (paymentIntentId: string) => {
    console.log('Payment successful:', paymentIntentId);
    // Additional success handling can be added here
  };

  // Handle payment error
  const handlePaymentError = (error: string) => {
    setError(error);
    setShowCheckout(false);
    setClientSecret('');
  };

  // Stripe Elements options
  const stripeOptions = {
    clientSecret,
    appearance: stripeConfig.appearance,
  };

  // Debug logging
  console.log('Stripe Elements Options:', {
    hasClientSecret: !!clientSecret,
    clientSecretPrefix: clientSecret?.substring(0, 10),
    showCheckout,
  });

  return (
    <Card sx={{ maxWidth: 600, mx: 'auto', mt: 4 }}>
      <CardContent sx={{ p: 4 }}>
        {/* Header */}
        <Box sx={{ textAlign: 'center', mb: 4 }}>
          <FavoriteIcon sx={{ fontSize: 48, color: 'primary.main', mb: 2 }} />
          <Typography variant="h4" gutterBottom fontWeight="bold">
            Make a Donation
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Your generous contribution supports our mission work around the world
          </Typography>
        </Box>

        {!showCheckout ? (
          <>
            {/* Donation Type */}
            <FormControl component="fieldset" sx={{ mb: 3, width: '100%' }}>
              <FormLabel component="legend">Donation Type</FormLabel>
              <RadioGroup
                row
                value={donationType}
                onChange={(e) => setDonationType(e.target.value as 'one-time' | 'monthly')}
              >
                <FormControlLabel value="one-time" control={<Radio />} label="One-Time" />
                <FormControlLabel value="monthly" control={<Radio />} label="Monthly" disabled />
              </RadioGroup>
              {donationType === 'monthly' && (
                <Typography variant="caption" color="text.secondary">
                  Recurring donations coming soon!
                </Typography>
              )}
            </FormControl>

            {/* Suggested Amounts */}
            <Box sx={{ mb: 3 }}>
              <Typography variant="subtitle1" gutterBottom fontWeight="medium">
                Select Amount
              </Typography>
              <Grid container spacing={1}>
                {SUGGESTED_AMOUNTS.map((suggestedAmount) => (
                  <Grid item xs={4} sm={2.4} key={suggestedAmount}>
                    <Chip
                      label={`$${suggestedAmount}`}
                      onClick={() => handleAmountSelect(suggestedAmount)}
                      color={amount === suggestedAmount && !customAmount ? 'primary' : 'default'}
                      sx={{
                        width: '100%',
                        height: 48,
                        fontSize: '1rem',
                        fontWeight: amount === suggestedAmount && !customAmount ? 600 : 400,
                        cursor: 'pointer',
                      }}
                    />
                  </Grid>
                ))}
              </Grid>
            </Box>

            {/* Custom Amount */}
            <TextField
              fullWidth
              label="Custom Amount"
              type="number"
              value={customAmount}
              onChange={handleCustomAmountChange}
              placeholder="Enter custom amount"
              slotProps={{
                input: {
                  startAdornment: <InputAdornment position="start">$</InputAdornment>,
                }
              }}
              helperText={`Minimum: $${stripeConfig.minAmount.toFixed(2)} • Maximum: $${stripeConfig.maxAmount.toFixed(2)}`}
              sx={{ mb: 3 }}
            />

            {/* Email */}
            <TextField
              fullWidth
              label="Email Address"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              required
              helperText="We'll send your receipt to this email"
              sx={{ mb: 3 }}
            />

            {/* Error Message */}
            {error && (
              <Alert severity="error" sx={{ mb: 3 }}>
                {error}
              </Alert>
            )}

            {/* Continue Button */}
            <Button
              fullWidth
              variant="contained"
              size="large"
              onClick={handleContinueToPayment}
              disabled={isLoading || !amount || !email}
              sx={{ py: 1.5, fontSize: '1.1rem', fontWeight: 600 }}
            >
              {isLoading ? (
                <>
                  <CircularProgress size={20} color="inherit" sx={{ mr: 1 }} />
                  Loading...
                </>
              ) : (
                `Continue to Payment`
              )}
            </Button>
          </>
        ) : (
          <>
            {/* Back Button */}
            <Button
              onClick={() => {
                setShowCheckout(false);
                setClientSecret('');
                setError('');
              }}
              sx={{ mb: 2 }}
            >
              ← Back to Amount
            </Button>

            {/* Stripe Checkout Form */}
            {clientSecret && stripeConfig.publishableKey ? (
                <Elements stripe={getStripe()} options={stripeOptions}>
                  <CheckoutForm
                    amount={amount}
                    customerEmail={email}
                    onSuccess={handlePaymentSuccess}
                    onError={handlePaymentError}
                  />
                </Elements>
            ) : null}
          </>
        )}

        {/* Tax Info */}
        <Typography
          variant="caption"
          color="text.secondary"
          align="center"
          sx={{ mt: 3, display: 'block' }}
        >
          Mission Engadi is a 501(c)(3) tax-exempt organization. Your donation is tax-deductible.
        </Typography>
      </CardContent>
    </Card>
  );
};
