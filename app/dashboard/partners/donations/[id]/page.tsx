'use client';

import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Typography,
  Grid,
  Divider,
  IconButton,
} from '@mui/material';
import {
  ArrowLeft,
  Download,
  DollarSign,
  Calendar,
  CreditCard,
  User,
  FileText,
  Building,
  Mail,
  Phone,
} from 'lucide-react';
import { useRouter, useParams } from 'next/navigation';

// Mock donation data
const mockDonation = {
  id: 1,
  partner: 'Grace Community Church',
  partnerEmail: 'contact@gracechurch.org',
  partnerPhone: '+1-555-0123',
  amount: 5000,
  type: 'monthly',
  method: 'bank_transfer',
  status: 'completed',
  date: '2024-01-15',
  project: 'Water Initiative Kenya 2024',
  projectDescription: 'Providing clean water access to 5,000 families in rural Kenya',
  transactionId: 'TXN-2024-001-5000',
  reference: 'REF-GCC-JAN-2024',
  notes: 'Monthly recurring donation for Q1 2024. Tax receipt sent.',
  receiptNumber: 'RCP-2024-001',
  taxDeductible: true,
};

const statusColors: Record<string, { bg: string; text: string }> = {
  completed: { bg: '#10b981', text: '#fff' },
  pending: { bg: '#f59e0b', text: '#fff' },
  failed: { bg: '#ef4444', text: '#fff' },
};

export default function DonationDetailPage() {
  const router = useRouter();
  const params = useParams();
  const donationId = params?.id;

  const donation = mockDonation;

  const handleDownloadReceipt = () => {
    console.log('Downloading receipt for donation:', donationId);
    
    // In real implementation, this would generate and download a PDF receipt
    const receiptInfo = `Receipt #${donation.receiptNumber}\n${donation.partner} - $${donation.amount.toLocaleString()}\n${donation.project}\nDate: ${new Date(donation.date).toLocaleDateString()}`;
    
    alert(`Generating PDF receipt...

${receiptInfo}

In production, this will automatically download as:
${donation.receiptNumber}.pdf`);
  };

  return (
    <Box>
      {/* Header */}
      <Box sx={{ mb: 3 }}>
        <Button
          startIcon={<ArrowLeft size={20} />}
          onClick={() => router.push('/dashboard/partners/donations')}
          sx={{ mb: 2, textTransform: 'none' }}
        >
          Back to Donations
        </Button>

        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1 }}>
              <Typography variant="h4" fontWeight={600}>
                Donation Details
              </Typography>
              <Chip
                label={donation.status}
                size="small"
                sx={{
                  bgcolor: statusColors[donation.status]?.bg,
                  color: statusColors[donation.status]?.text,
                  textTransform: 'capitalize',
                  fontWeight: 600,
                }}
              />
            </Box>
            <Typography variant="body2" color="text.secondary">
              Transaction #{donation.transactionId}
            </Typography>
          </Box>

          <Button
            variant="contained"
            startIcon={<Download size={20} />}
            onClick={handleDownloadReceipt}
            sx={{ textTransform: 'none' }}
          >
            Download Receipt
          </Button>
        </Box>
      </Box>

      <Grid container spacing={3}>
        {/* Main Content */}
        <Grid item xs={12} md={8}>
          {/* Donation Amount */}
          <Card sx={{ mb: 3 }}>
            <CardContent sx={{ p: 3 }}>
              <Box sx={{ textAlign: 'center', py: 3 }}>
                <DollarSign size={48} color="#10b981" style={{ margin: '0 auto' }} />
                <Typography variant="h2" fontWeight={700} color="success.main" sx={{ mt: 2 }} suppressHydrationWarning>
                  ${donation.amount.toLocaleString()}
                </Typography>
                <Typography variant="body1" color="text.secondary" sx={{ mt: 1 }}>
                  {donation.type.charAt(0).toUpperCase() + donation.type.slice(1)} Donation
                </Typography>
              </Box>
            </CardContent>
          </Card>

          {/* Partner Information */}
          <Card sx={{ mb: 3 }}>
            <CardContent sx={{ p: 3 }}>
              <Typography variant="h6" fontWeight={600} gutterBottom>
                Partner Information
              </Typography>

              <Box sx={{ mt: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Building size={20} color="#6b7280" />
                  <Box>
                    <Typography variant="caption" color="text.secondary">
                      Organization
                    </Typography>
                    <Typography variant="body2" fontWeight={600}>
                      {donation.partner}
                    </Typography>
                  </Box>
                </Box>

                <Divider />

                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Mail size={20} color="#6b7280" />
                  <Box>
                    <Typography variant="caption" color="text.secondary">
                      Email
                    </Typography>
                    <Typography variant="body2">{donation.partnerEmail}</Typography>
                  </Box>
                </Box>

                <Divider />

                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Phone size={20} color="#6b7280" />
                  <Box>
                    <Typography variant="caption" color="text.secondary">
                      Phone
                    </Typography>
                    <Typography variant="body2">{donation.partnerPhone}</Typography>
                  </Box>
                </Box>
              </Box>
            </CardContent>
          </Card>

          {/* Project Information */}
          <Card>
            <CardContent sx={{ p: 3 }}>
              <Typography variant="h6" fontWeight={600} gutterBottom>
                Project Details
              </Typography>

              <Box sx={{ mt: 2 }}>
                <Typography variant="body1" fontWeight={600} gutterBottom>
                  {donation.project}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {donation.projectDescription}
                </Typography>
              </Box>

              {donation.notes && (
                <>
                  <Divider sx={{ my: 2 }} />
                  <Box>
                    <Typography variant="caption" color="text.secondary" gutterBottom>
                      Notes
                    </Typography>
                    <Typography variant="body2" sx={{ mt: 0.5 }}>
                      {donation.notes}
                    </Typography>
                  </Box>
                </>
              )}
            </CardContent>
          </Card>
        </Grid>

        {/* Sidebar */}
        <Grid item xs={12} md={4}>
          {/* Transaction Details */}
          <Card sx={{ mb: 3 }}>
            <CardContent sx={{ p: 3 }}>
              <Typography variant="h6" fontWeight={600} gutterBottom>
                Transaction Details
              </Typography>

              <Box sx={{ mt: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
                <Box>
                  <Typography variant="caption" color="text.secondary">
                    Date
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mt: 0.5 }}>
                    <Calendar size={16} />
                    <Typography variant="body2" suppressHydrationWarning>
                      {new Date(donation.date).toLocaleDateString()}
                    </Typography>
                  </Box>
                </Box>

                <Divider />

                <Box>
                  <Typography variant="caption" color="text.secondary">
                    Payment Method
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mt: 0.5 }}>
                    <CreditCard size={16} />
                    <Typography variant="body2" sx={{ textTransform: 'capitalize' }}>
                      {donation.method.replace('_', ' ')}
                    </Typography>
                  </Box>
                </Box>

                <Divider />

                <Box>
                  <Typography variant="caption" color="text.secondary">
                    Transaction ID
                  </Typography>
                  <Typography variant="body2" sx={{ mt: 0.5, fontFamily: 'monospace' }}>
                    {donation.transactionId}
                  </Typography>
                </Box>

                <Divider />

                <Box>
                  <Typography variant="caption" color="text.secondary">
                    Reference Number
                  </Typography>
                  <Typography variant="body2" sx={{ mt: 0.5, fontFamily: 'monospace' }}>
                    {donation.reference}
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>

          {/* Receipt Information */}
          <Card>
            <CardContent sx={{ p: 3 }}>
              <Typography variant="h6" fontWeight={600} gutterBottom>
                Receipt Information
              </Typography>

              <Box sx={{ mt: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
                <Box>
                  <Typography variant="caption" color="text.secondary">
                    Receipt Number
                  </Typography>
                  <Typography variant="body2" fontWeight={600} sx={{ mt: 0.5 }}>
                    {donation.receiptNumber}
                  </Typography>
                </Box>

                <Divider />

                <Box>
                  <Typography variant="caption" color="text.secondary">
                    Tax Deductible
                  </Typography>
                  <Typography
                    variant="body2"
                    fontWeight={600}
                    color={donation.taxDeductible ? 'success.main' : 'text.secondary'}
                    sx={{ mt: 0.5 }}
                  >
                    {donation.taxDeductible ? 'Yes' : 'No'}
                  </Typography>
                </Box>
              </Box>

              <Button
                variant="outlined"
                startIcon={<FileText size={18} />}
                fullWidth
                onClick={handleDownloadReceipt}
                sx={{ mt: 3, textTransform: 'none' }}
              >
                Download Receipt
              </Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}
