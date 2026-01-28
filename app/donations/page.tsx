'use client';

/**
 * Donations Page
 *
 * Public donation page for accepting contributions.
 */

import React from 'react';
import { Box, Container } from '@mui/material';
import { DonationForm } from '@/src/components/donations/DonationForm';

export default function DonationsPage() {
  return (
    <Container maxWidth="md">
      <Box sx={{ py: 8 }}>
        <DonationForm />
      </Box>
    </Container>
  );
}
