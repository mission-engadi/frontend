'use client';

import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  Typography,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  InputAdornment,
  FormControlLabel,
  Checkbox,
} from '@mui/material';
import { Save, X, DollarSign } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

interface DonationFormData {
  partner: string;
  amount: string;
  type: string;
  method: string;
  project: string;
  date: string;
  reference: string;
  notes: string;
  taxDeductible: boolean;
}

const donationTypes = ['one-time', 'monthly', 'quarterly', 'annual'];
const paymentMethods = ['bank_transfer', 'wire_transfer', 'credit_card', 'paypal', 'check', 'cash'];
const partners = [
  'Grace Community Church',
  'Hope Foundation',
  'Global Outreach Ministry',
  'Compassion Network',
  'Faith Action Alliance',
];
const projects = [
  'Water Initiative Kenya 2024',
  'Education Program Launch',
  'Medical Mission Outreach',
  'General Fund',
  'Emergency Relief',
];

export default function NewDonationPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [taxDeductible, setTaxDeductible] = useState(true);
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<DonationFormData>();

  const amount = watch('amount', '');

  const onSubmit = async (data: DonationFormData) => {
    setIsSubmitting(true);
    console.log('Recording donation:', { ...data, taxDeductible });

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    router.push('/dashboard/partners/donations');
  };

  return (
    <Box>
      {/* Header */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="h4" fontWeight={600} gutterBottom>
          Record New Donation
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Enter donation details to record a new contribution
        </Typography>
      </Box>

      {/* Form */}
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={3}>
          {/* Main Content */}
          <Grid item xs={12} md={8}>
            <Card sx={{ mb: 3 }}>
              <CardContent sx={{ p: 3 }}>
                <Typography variant="h6" fontWeight={600} gutterBottom>
                  Donation Information
                </Typography>

                <Grid container spacing={2.5}>
                  <Grid item xs={12}>
                    <FormControl fullWidth error={!!errors.partner}>
                      <InputLabel>Partner/Donor</InputLabel>
                      <Select
                        label="Partner/Donor"
                        defaultValue=""
                        {...register('partner', { required: 'Partner is required' })}
                      >
                        {partners.map((partner) => (
                          <MenuItem key={partner} value={partner}>
                            {partner}
                          </MenuItem>
                        ))}
                      </Select>
                      {errors.partner && (
                        <Typography variant="caption" color="error" sx={{ mt: 0.5 }}>
                          {errors.partner.message}
                        </Typography>
                      )}
                    </FormControl>
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Amount"
                      type="number"
                      placeholder="0.00"
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <DollarSign size={20} />
                          </InputAdornment>
                        ),
                      }}
                      {...register('amount', {
                        required: 'Amount is required',
                        min: { value: 1, message: 'Amount must be greater than 0' },
                      })}
                      error={!!errors.amount}
                      helperText={errors.amount?.message}
                    />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      type="date"
                      label="Donation Date"
                      InputLabelProps={{ shrink: true }}
                      {...register('date', { required: 'Date is required' })}
                      error={!!errors.date}
                      helperText={errors.date?.message}
                    />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <FormControl fullWidth error={!!errors.type}>
                      <InputLabel>Donation Type</InputLabel>
                      <Select
                        label="Donation Type"
                        defaultValue=""
                        {...register('type', { required: 'Type is required' })}
                      >
                        {donationTypes.map((type) => (
                          <MenuItem key={type} value={type}>
                            <span style={{ textTransform: 'capitalize' }}>{type}</span>
                          </MenuItem>
                        ))}
                      </Select>
                      {errors.type && (
                        <Typography variant="caption" color="error" sx={{ mt: 0.5 }}>
                          {errors.type.message}
                        </Typography>
                      )}
                    </FormControl>
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <FormControl fullWidth error={!!errors.method}>
                      <InputLabel>Payment Method</InputLabel>
                      <Select
                        label="Payment Method"
                        defaultValue=""
                        {...register('method', { required: 'Payment method is required' })}
                      >
                        {paymentMethods.map((method) => (
                          <MenuItem key={method} value={method}>
                            <span style={{ textTransform: 'capitalize' }}>
                              {method.replace('_', ' ')}
                            </span>
                          </MenuItem>
                        ))}
                      </Select>
                      {errors.method && (
                        <Typography variant="caption" color="error" sx={{ mt: 0.5 }}>
                          {errors.method.message}
                        </Typography>
                      )}
                    </FormControl>
                  </Grid>

                  <Grid item xs={12}>
                    <FormControl fullWidth error={!!errors.project}>
                      <InputLabel>Associated Project</InputLabel>
                      <Select
                        label="Associated Project"
                        defaultValue=""
                        {...register('project', { required: 'Project is required' })}
                      >
                        {projects.map((project) => (
                          <MenuItem key={project} value={project}>
                            {project}
                          </MenuItem>
                        ))}
                      </Select>
                      {errors.project && (
                        <Typography variant="caption" color="error" sx={{ mt: 0.5 }}>
                          {errors.project.message}
                        </Typography>
                      )}
                    </FormControl>
                  </Grid>

                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Reference Number"
                      placeholder="e.g., REF-GCC-JAN-2024"
                      {...register('reference')}
                      helperText="Optional - Internal reference or check number"
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      multiline
                      rows={4}
                      label="Notes"
                      placeholder="Add any additional notes about this donation..."
                      {...register('notes')}
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={taxDeductible}
                          onChange={(e) => setTaxDeductible(e.target.checked)}
                        />
                      }
                      label="Tax Deductible"
                    />
                    <Typography variant="caption" color="text.secondary" display="block" sx={{ ml: 4 }}>
                      Check if this donation qualifies for tax deduction
                    </Typography>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>

          {/* Sidebar */}
          <Grid item xs={12} md={4}>
            {/* Summary Card */}
            <Card sx={{ mb: 3 }}>
              <CardContent sx={{ p: 3 }}>
                <Typography variant="h6" fontWeight={600} gutterBottom>
                  Summary
                </Typography>

                <Box sx={{ mt: 2, p: 2, bgcolor: 'action.hover', borderRadius: 2 }}>
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    Donation Amount
                  </Typography>
                  <Typography variant="h3" fontWeight={700} color="success.main">
                    ${amount || '0'}
                  </Typography>
                </Box>

                <Box sx={{ mt: 2, display: 'flex', flexDirection: 'column', gap: 1 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography variant="body2" color="text.secondary">
                      Processing Fee
                    </Typography>
                    <Typography variant="body2" fontWeight={600}>
                      $0.00
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography variant="body2" color="text.secondary">
                      Tax Deductible
                    </Typography>
                    <Typography variant="body2" fontWeight={600} color={taxDeductible ? 'success.main' : 'text.secondary'}>
                      {taxDeductible ? 'Yes' : 'No'}
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>

            {/* Guidelines Card */}
            <Card sx={{ mb: 3 }}>
              <CardContent sx={{ p: 3 }}>
                <Typography variant="h6" fontWeight={600} gutterBottom>
                  Guidelines
                </Typography>

                <Box sx={{ mt: 2 }}>
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    • Ensure all donation details are accurate
                  </Typography>
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    • Include reference number for checks
                  </Typography>
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    • Verify partner information before saving
                  </Typography>
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    • Receipt will be auto-generated
                  </Typography>
                </Box>
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <Button
                type="submit"
                variant="contained"
                size="large"
                startIcon={<Save size={20} />}
                disabled={isSubmitting}
                fullWidth
              >
                {isSubmitting ? 'Recording...' : 'Record Donation'}
              </Button>
              <Button
                variant="outlined"
                size="large"
                startIcon={<X size={20} />}
                onClick={() => router.push('/dashboard/partners/donations')}
                disabled={isSubmitting}
                fullWidth
              >
                Cancel
              </Button>
            </Box>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
}
