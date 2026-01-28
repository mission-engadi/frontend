'use client';

/**
 * CheckoutForm Component
 *
 * Stripe payment form with card element and payment processing.
 */

import React, { useState, FormEvent } from 'react';
import {
  PaymentElement,
  useStripe,
  useElements
} from '@stripe/react-stripe-js';
import {
  Box,
  Button,
  Alert,
  CircularProgress,
  Typography,
} from '@mui/material';
import { CheckCircle as CheckCircleIcon } from '@mui/icons-material';

interface CheckoutFormProps {
  amount: number;
  customerEmail: string;
  onSuccess?: (paymentIntentId: string) => void;
  onError?: (error: string) => void;
}

export const CheckoutForm: React.FC<CheckoutFormProps> = ({
  amount,
  customerEmail,
  onSuccess,
  onError,
}) => {
  const stripe = useStripe();
  const elements = useElements();

  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [successMessage, setSuccessMessage] = useState<string>('');
  const [isElementReady, setIsElementReady] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js hasn't loaded yet
      return;
    }

    setIsProcessing(true);
    setErrorMessage('');
    setSuccessMessage('');

    try {
      // Confirm the payment
      const { error, paymentIntent } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: `${window.location.origin}/donations/success`,
          receipt_email: customerEmail,
        },
        redirect: 'if_required', // Only redirect if required by payment method
      });

      if (error) {
        // Payment failed
        const message = error.message || 'An unexpected error occurred.';
        setErrorMessage(message);
        onError?.(message);
      } else if (paymentIntent && paymentIntent.status === 'succeeded') {
        // Payment succeeded
        setSuccessMessage('Payment successful! Thank you for your donation.');
        onSuccess?.(paymentIntent.id);

        // Redirect to success page after a short delay
        setTimeout(() => {
          window.location.href = `/donations/success?payment_intent=${paymentIntent.id}&amount=${amount}`;
        }, 1500);
      }
    } catch (err: any) {
      const message = err.message || 'An unexpected error occurred.';
      setErrorMessage(message);
      onError?.(message);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
      {/* Payment Element */}
      <Box sx={{ mb: 3 }}>
        <PaymentElement
          onReady={() => setIsElementReady(true)}
          onLoadError={(error) => {
            console.error('Payment Element load error:', error);
            console.error('Error details:', JSON.stringify(error, null, 2));
            setErrorMessage(
              error?.error?.message ||
              'Failed to load payment form. Please refresh and try again.'
            );
            onError?.('Failed to load payment form');
          }}
        />
        {!isElementReady && (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 3 }}>
            <CircularProgress size={24} />
          </Box>
        )}
      </Box>

      {/* Error Message */}
      {errorMessage && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {errorMessage}
        </Alert>
      )}

      {/* Success Message */}
      {successMessage && (
        <Alert severity="success" icon={<CheckCircleIcon />} sx={{ mb: 2 }}>
          {successMessage}
        </Alert>
      )}

      {/* Donation Summary */}
      <Box
        sx={{
          mb: 3,
          p: 2,
          bgcolor: 'grey.50',
          borderRadius: 1,
          border: '1px solid',
          borderColor: 'grey.200',
        }}
      >
        <Typography variant="body2" color="text.secondary" gutterBottom>
          Donation Amount
        </Typography>
        <Typography variant="h5" color="primary" fontWeight="bold">
          ${amount.toFixed(2)} USD
        </Typography>
        <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
          Receipt will be sent to: {customerEmail}
        </Typography>
      </Box>

      {/* Submit Button */}
      <Button
        type="submit"
        variant="contained"
        color="primary"
        size="large"
        fullWidth
        disabled={!stripe || !isElementReady || isProcessing || !!successMessage}
        sx={{
          py: 1.5,
          fontSize: '1.1rem',
          fontWeight: 600,
        }}
      >
        {isProcessing ? (
          <>
            <CircularProgress size={20} color="inherit" sx={{ mr: 1 }} />
            Processing...
          </>
        ) : successMessage ? (
          'Donation Complete!'
        ) : (
          `Donate $${amount.toFixed(2)}`
        )}
      </Button>

      {/* Security Notice */}
      <Typography
        variant="caption"
        color="text.secondary"
        align="center"
        sx={{ mt: 2, display: 'block' }}
      >
        🔒 Secure payment powered by Stripe. Your payment information is encrypted and never stored on our servers.
      </Typography>
    </Box>
  );
};
