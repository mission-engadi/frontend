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
  Chip,
  Alert,
  Autocomplete,
} from '@mui/material';
import { Save, X } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { partnersService, CreatePartnerDto, PartnerType, PartnerStatus } from '@/lib/services';
import { handleApiError } from '@/lib/utils/api-error';

interface PartnerFormData {
  name: string;
  partner_type: PartnerType;
  status: PartnerStatus;
  email: string;
  phone: string;
  website: string;
  address: string;
  country: string;
  description: string;
  tags: string[];
}

const partnerTypes: { value: PartnerType; label: string }[] = [
  { value: 'corporate', label: 'Corporate Sponsor' },
  { value: 'church_ministry', label: 'Church/Ministry' },
  { value: 'family_individual', label: 'Family/Individual' },
  { value: 'prayer', label: 'Prayer Partner' },
];

const statuses: { value: PartnerStatus; label: string }[] = [
  { value: 'active', label: 'Active' },
  { value: 'inactive', label: 'Inactive' },
  { value: 'pending', label: 'Pending' },
];

const suggestedTags = [
  'Major Donor',
  'Monthly Supporter',
  'Prayer Partner',
  'Volunteer',
  'Board Member',
  'VIP',
  'First-Time Donor',
  'Legacy Partner',
];

export default function CreatePartnerPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<PartnerFormData>({
    defaultValues: {
      status: 'active',
      partner_type: 'family_individual',
      tags: [],
    },
  });

  const onSubmit = async (data: PartnerFormData) => {
    setIsSubmitting(true);
    setError(null);

    try {
      const partnerData: CreatePartnerDto = {
        name: data.name,
        partner_type: data.partner_type,
        status: data.status,
        email: data.email || undefined,
        phone: data.phone || undefined,
        address: data.address || undefined,
        country: data.country || undefined,
        website: data.website || undefined,
        description: data.description || undefined,
        tags: selectedTags.length > 0 ? selectedTags : undefined,
        created_by: '00000000-0000-0000-0000-000000000001', // Dev mode user ID
      };

      console.log('[Create Partner] Sending data:', partnerData);
      const result = await partnersService.create(partnerData);
      console.log('[Create Partner] Success:', result);
      router.push('/dashboard/partners');
    } catch (err) {
      const apiError = handleApiError(err);
      setError(apiError.message);
      console.error('[Create Partner] Failed:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Box>
      {/* Header */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="h4" fontWeight={600} gutterBottom>
          Add New Partner
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Register a new ministry partner or donor
        </Typography>
      </Box>

      {/* Form */}
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Error Alert */}
        {error && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {error}
          </Alert>
        )}

        <Grid container spacing={3}>
          {/* Main Information */}
          <Grid item xs={12} md={8}>
            <Card sx={{ mb: 3 }}>
              <CardContent sx={{ p: 3 }}>
                <Typography variant="h6" fontWeight={600} gutterBottom>
                  Partner Information
                </Typography>

                <Grid container spacing={2.5}>
                  {/* Partner Name */}
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

                  {/* Partner Type */}
                  <Grid item xs={12} sm={6}>
                    <Controller
                      name="partner_type"
                      control={control}
                      rules={{ required: 'Partner type is required' }}
                      render={({ field }) => (
                        <FormControl fullWidth error={!!errors.partner_type}>
                          <InputLabel>Partner Type</InputLabel>
                          <Select {...field} label="Partner Type">
                            {partnerTypes.map((type) => (
                              <MenuItem key={type.value} value={type.value}>
                                {type.label}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      )}
                    />
                  </Grid>

                  {/* Status */}
                  <Grid item xs={12} sm={6}>
                    <Controller
                      name="status"
                      control={control}
                      rules={{ required: 'Status is required' }}
                      render={({ field }) => (
                        <FormControl fullWidth error={!!errors.status}>
                          <InputLabel>Status</InputLabel>
                          <Select {...field} label="Status">
                            {statuses.map((status) => (
                              <MenuItem key={status.value} value={status.value}>
                                {status.label}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      )}
                    />
                  </Grid>

                  {/* Email */}
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      type="email"
                      label="Email"
                      placeholder="partner@example.org"
                      {...register('email', {
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                          message: 'Invalid email address',
                        },
                      })}
                      error={!!errors.email}
                      helperText={errors.email?.message || 'Optional'}
                    />
                  </Grid>

                  {/* Phone */}
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Phone"
                      placeholder="+1 (555) 123-4567"
                      {...register('phone')}
                      helperText="Optional"
                    />
                  </Grid>

                  {/* Website */}
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Website"
                      placeholder="https://www.example.org"
                      {...register('website')}
                      helperText="Optional"
                    />
                  </Grid>

                  {/* Address */}
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Address"
                      placeholder="123 Main Street, City, State, ZIP"
                      {...register('address')}
                      helperText="Full address including city and state"
                    />
                  </Grid>

                  {/* Country */}
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Country"
                      placeholder="USA"
                      {...register('country')}
                      helperText="Optional"
                    />
                  </Grid>

                  {/* Tags */}
                  <Grid item xs={12}>
                    <Autocomplete
                      multiple
                      freeSolo
                      options={suggestedTags}
                      value={selectedTags}
                      onChange={(_, newValue) => setSelectedTags(newValue)}
                      renderTags={(value, getTagProps) =>
                        value.map((option, index) => (
                          <Chip
                            label={option}
                            {...getTagProps({ index })}
                            key={option}
                          />
                        ))
                      }
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Tags"
                          placeholder="Add tags..."
                          helperText="Press Enter to add custom tags"
                        />
                      )}
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
                  Description & Notes
                </Typography>
                <TextField
                  fullWidth
                  multiline
                  rows={10}
                  placeholder="Add any relevant information about this partner..."
                  {...register('description')}
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
                {isSubmitting ? 'Creating...' : 'Create Partner'}
              </Button>
              <Button
                variant="outlined"
                size="large"
                startIcon={<X size={20} />}
                onClick={() => router.push('/dashboard/partners')}
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
