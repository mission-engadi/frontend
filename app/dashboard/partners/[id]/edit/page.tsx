'use client';

import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  Typography,
  Grid,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
} from '@mui/material';
import { Save, X } from 'lucide-react';
import { useRouter, useParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';

interface PartnerFormData {
  name: string;
  type: string;
  status: string;
  email: string;
  phone: string;
  website: string;
  address: string;
  city: string;
  country: string;
  contactName: string;
  contactRole: string;
  contactEmail: string;
  contactPhone: string;
  notes: string;
}

const partnerTypes = ['church', 'foundation', 'ministry', 'nonprofit', 'individual'];
const statuses = ['active', 'inactive', 'pending'];

// Mock partner data
const mockPartner = {
  id: 1,
  name: 'Grace Community Church',
  type: 'church',
  status: 'active',
  email: 'pastor@gracecc.org',
  phone: '+1 (619) 555-0123',
  website: 'www.gracecc.org',
  address: '123 Main Street',
  city: 'San Diego',
  country: 'USA',
  contactName: 'Pastor David Martinez',
  contactRole: 'Senior Pastor',
  contactEmail: 'david@gracecc.org',
  contactPhone: '+1 (619) 555-0124',
  notes: 'Grace Community Church has been a faithful partner since 2020.',
};

export default function EditPartnerPage() {
  const router = useRouter();
  const params = useParams();
  const partnerId = params?.id;
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<PartnerFormData>();

  useEffect(() => {
    // Simulate loading partner data
    const loadPartner = async () => {
      setIsLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 500));
      reset(mockPartner);
      setIsLoading(false);
    };
    loadPartner();
  }, [partnerId, reset]);

  const onSubmit = async (data: PartnerFormData) => {
    setIsSubmitting(true);
    console.log('Updating partner:', data);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    router.push(`/dashboard/partners/${partnerId}`);
  };

  if (isLoading) {
    return (
      <Box sx={{ p: 3 }}>
        <Typography>Loading partner data...</Typography>
      </Box>
    );
  }

  return (
    <Box>
      {/* Header */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="h4" fontWeight={600} gutterBottom>
          Edit Partner
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Update partner information
        </Typography>
      </Box>

      {/* Form */}
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={3}>
          {/* Main Information */}
          <Grid item xs={12} md={8}>
            <Card sx={{ mb: 3 }}>
              <CardContent sx={{ p: 3 }}>
                <Typography variant="h6" fontWeight={600} gutterBottom>
                  Partner Information
                </Typography>

                <Grid container spacing={2.5}>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Partner Name"
                      placeholder="e.g., Grace Community Church"
                      {...register('name', { required: 'Name is required' })}
                      error={!!errors.name}
                      helperText={errors.name?.message}
                    />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <FormControl fullWidth error={!!errors.type}>
                      <InputLabel>Partner Type</InputLabel>
                      <Select
                        label="Partner Type"
                        defaultValue={mockPartner.type}
                        {...register('type', { required: 'Type is required' })}
                      >
                        {partnerTypes.map((type) => (
                          <MenuItem key={type} value={type}>
                            <span style={{ textTransform: 'capitalize' }}>{type}</span>
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <FormControl fullWidth error={!!errors.status}>
                      <InputLabel>Status</InputLabel>
                      <Select
                        label="Status"
                        defaultValue={mockPartner.status}
                        {...register('status', { required: 'Status is required' })}
                      >
                        {statuses.map((status) => (
                          <MenuItem key={status} value={status}>
                            <span style={{ textTransform: 'capitalize' }}>{status}</span>
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      type="email"
                      label="Email"
                      placeholder="partner@example.org"
                      {...register('email', {
                        required: 'Email is required',
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                          message: 'Invalid email address',
                        },
                      })}
                      error={!!errors.email}
                      helperText={errors.email?.message}
                    />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Phone"
                      placeholder="+1 (555) 123-4567"
                      {...register('phone', { required: 'Phone is required' })}
                      error={!!errors.phone}
                      helperText={errors.phone?.message}
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Website"
                      placeholder="www.example.org"
                      {...register('website')}
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Address"
                      placeholder="123 Main Street"
                      {...register('address', { required: 'Address is required' })}
                      error={!!errors.address}
                      helperText={errors.address?.message}
                    />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="City"
                      placeholder="San Diego"
                      {...register('city', { required: 'City is required' })}
                      error={!!errors.city}
                      helperText={errors.city?.message}
                    />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Country"
                      placeholder="USA"
                      {...register('country', { required: 'Country is required' })}
                      error={!!errors.country}
                      helperText={errors.country?.message}
                    />
                  </Grid>
                </Grid>
              </CardContent>
            </Card>

            <Card>
              <CardContent sx={{ p: 3 }}>
                <Typography variant="h6" fontWeight={600} gutterBottom>
                  Primary Contact Person
                </Typography>

                <Grid container spacing={2.5}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Contact Name"
                      placeholder="John Doe"
                      {...register('contactName', { required: 'Contact name is required' })}
                      error={!!errors.contactName}
                      helperText={errors.contactName?.message}
                    />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Role/Title"
                      placeholder="Senior Pastor"
                      {...register('contactRole', { required: 'Role is required' })}
                      error={!!errors.contactRole}
                      helperText={errors.contactRole?.message}
                    />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      type="email"
                      label="Contact Email"
                      placeholder="john@example.org"
                      {...register('contactEmail', {
                        required: 'Contact email is required',
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                          message: 'Invalid email address',
                        },
                      })}
                      error={!!errors.contactEmail}
                      helperText={errors.contactEmail?.message}
                    />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Contact Phone"
                      placeholder="+1 (555) 123-4568"
                      {...register('contactPhone', { required: 'Contact phone is required' })}
                      error={!!errors.contactPhone}
                      helperText={errors.contactPhone?.message}
                    />
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>

          {/* Sidebar */}
          <Grid item xs={12} md={4}>
            <Card sx={{ mb: 3 }}>
              <CardContent sx={{ p: 3 }}>
                <Typography variant="h6" fontWeight={600} gutterBottom>
                  Notes
                </Typography>
                <TextField
                  fullWidth
                  multiline
                  rows={10}
                  placeholder="Add any relevant notes about this partner..."
                  {...register('notes')}
                />
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
                {isSubmitting ? 'Saving...' : 'Save Changes'}
              </Button>
              <Button
                variant="outlined"
                size="large"
                startIcon={<X size={20} />}
                onClick={() => router.push(`/dashboard/partners/${partnerId}`)}
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
