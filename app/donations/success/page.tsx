'use client';

/**
 * Donation Success Page
 *
 * Thank you page displayed after successful donation.
 */

import React, { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import {
  Box,
  Container,
  Card,
  CardContent,
  Typography,
  Button,
  Alert,
} from '@mui/material';
import {
  CheckCircle as CheckCircleIcon,
  Email as EmailIcon,
  Home as HomeIcon,
} from '@mui/icons-material';
import Link from 'next/link';

function SuccessContent() {
  const searchParams = useSearchParams();
  const [paymentIntentId, setPaymentIntentId] = useState<string>('');
  const [amount, setAmount] = useState<string>('');

  useEffect(() => {
    const intentId = searchParams.get('payment_intent');
    const donationAmount = searchParams.get('amount');

    if (intentId) setPaymentIntentId(intentId);
    if (donationAmount) setAmount(donationAmount);
  }, [searchParams]);

  return (
    <Container maxWidth="sm">
      <Box sx={{ py: 8 }}>
        <Card>
          <CardContent sx={{ p: 6, textAlign: 'center' }}>
            {/* Success Icon */}
            <CheckCircleIcon
              sx={{
                fontSize: 96,
                color: 'success.main',
                mb: 3,
              }}
            />

            {/* Success Message */}
            <Typography variant="h3" gutterBottom fontWeight="bold">
              Thank You!
            </Typography>
            <Typography variant="h6" color="text.secondary" gutterBottom>
              Your donation has been received
            </Typography>

            {/* Amount Display */}
            {amount && (
              <Box
                sx={{
                  my: 4,
                  p: 3,
                  bgcolor: 'success.light',
                  borderRadius: 2,
                }}
              >
                <Typography variant="body2" color="success.dark" gutterBottom>
                  Donation Amount
                </Typography>
                <Typography variant="h4" color="success.dark" fontWeight="bold">
                  ${parseFloat(amount).toFixed(2)}
                </Typography>
              </Box>
            )}

            {/* Receipt Info */}
            <Alert
              icon={<EmailIcon />}
              severity="info"
              sx={{ mb: 4, textAlign: 'left' }}
            >
              <Typography variant="body2">
                A receipt has been sent to your email address. You can use this for your tax
                records.
              </Typography>
              {paymentIntentId && (
                <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
                  Transaction ID: {paymentIntentId}
                </Typography>
              )}
            </Alert>

            {/* Impact Message */}
            <Box
              sx={{
                mb: 4,
                p: 3,
                bgcolor: 'grey.50',
                borderRadius: 2,
                textAlign: 'left',
              }}
            >
              <Typography variant="h6" gutterBottom>
                Your Impact
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Your generous donation will directly support our mission work, helping to provide
                humanitarian aid, spread the gospel, and transform lives around the world. We'll
                send you updates on how your contribution is making a difference.
              </Typography>
            </Box>

            {/* Action Buttons */}
            <Box sx={{ display: 'flex', gap: 2, flexDirection: 'column' }}>
              <Button
                component={Link}
                href="/"
                variant="contained"
                size="large"
                startIcon={<HomeIcon />}
              >
                Return to Home
              </Button>
              <Button
                component={Link}
                href="/donations"
                variant="outlined"
                size="large"
              >
                Make Another Donation
              </Button>
            </Box>

            {/* Tax Deductible Notice */}
            <Typography
              variant="caption"
              color="text.secondary"
              sx={{ mt: 4, display: 'block' }}
            >
              Mission Engadi is a 501(c)(3) tax-exempt organization.
              <br />
              Your donation is tax-deductible to the extent allowed by law.
            </Typography>
          </CardContent>
        </Card>
      </Box>
    </Container>
  );
}

export default function SuccessPage() {
  return (
    <Suspense fallback={
      <Container maxWidth="sm">
        <Box sx={{ py: 8, textAlign: 'center' }}>
          <Typography>Loading...</Typography>
        </Box>
      </Container>
    }>
      <SuccessContent />
    </Suspense>
  );
}
