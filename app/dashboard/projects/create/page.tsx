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
  InputAdornment,
  Alert,
} from '@mui/material';
import { Save, X, DollarSign, MapPin } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { projectsService, CreateProjectDto, ProjectType, ProjectStatus } from '@/lib/services';
import { handleApiError } from '@/lib/utils/api-error';

interface ProjectFormData {
  name: string;
  slug: string;
  description: string;
  project_type: ProjectType;
  status: ProjectStatus;
  country: string;
  location: string;
  start_date: string;
  end_date: string;
  budget: number;
  target_beneficiaries: number;
}

const projectTypes: { value: ProjectType; label: string }[] = [
  { value: 'humanitarian', label: 'Humanitarian' },
  { value: 'gospel_outreach', label: 'Gospel Outreach' },
  { value: 'education', label: 'Education' },
  { value: 'medical', label: 'Medical' },
  { value: 'water_sanitation', label: 'Water & Sanitation' },
  { value: 'agriculture', label: 'Agriculture' },
];

const statuses: { value: ProjectStatus; label: string }[] = [
  { value: 'planned', label: 'Planned' },
  { value: 'active', label: 'Active' },
  { value: 'on_hold', label: 'On Hold' },
  { value: 'completed', label: 'Completed' },
];

export default function CreateProjectPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProjectFormData>();

  const onSubmit = async (data: ProjectFormData) => {
    setIsSubmitting(true);
    setError(null);
    
    try {
      // Prepare data for API - convert empty strings to undefined
      const projectData: CreateProjectDto = {
        name: data.name,
        slug: data.slug || data.name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, ''),
        description: data.description,
        project_type: data.project_type,
        status: data.status,
        country: data.country,
        location: data.location || undefined,
        start_date: data.start_date,
        end_date: data.end_date || undefined,
        budget: data.budget ? Number(data.budget) : 0,
        target_beneficiaries: data.target_beneficiaries && Number(data.target_beneficiaries) > 0 ? Number(data.target_beneficiaries) : undefined,
        created_by: '00000000-0000-0000-0000-000000000001', // Dev mode user ID
      };

      console.log('[Create Project] Sending data:', projectData);
      const result = await projectsService.create(projectData);
      console.log('[Create Project] Success:', result);
      router.push('/dashboard/projects');
    } catch (err) {
      const apiError = handleApiError(err);
      setError(apiError.message);
      console.error('[Create Project] Failed:', err);
      console.error('[Create Project] Error details:', (err as any)?.response?.data);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Box>
      {/* Header */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="h4" fontWeight={600} gutterBottom>
          Create New Project
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Fill in the details to create a new humanitarian project
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

        <Card>
          <CardContent sx={{ p: 4 }}>
            <Grid container spacing={3}>
              {/* Project Name */}
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Project Name"
                  placeholder="e.g., Clean Water Initiative - Kenya"
                  {...register('name', { required: 'Name is required' })}
                  error={!!errors.name}
                  helperText={errors.name?.message}
                />
              </Grid>

              {/* URL Slug */}
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="URL Slug"
                  placeholder="e.g., clean-water-initiative-kenya"
                  {...register('slug')}
                  error={!!errors.slug}
                  helperText={errors.slug?.message || 'Leave blank to auto-generate from name'}
                />
              </Grid>

              {/* Description */}
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  multiline
                  rows={4}
                  label="Description"
                  placeholder="Describe the project objectives and impact..."
                  {...register('description', { required: 'Description is required' })}
                  error={!!errors.description}
                  helperText={errors.description?.message}
                />
              </Grid>

              {/* Location */}
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="City/Location"
                  placeholder="e.g., Nairobi"
                  {...register('location')}
                  error={!!errors.location}
                  helperText={errors.location?.message}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <MapPin size={20} />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Country"
                  placeholder="e.g., Kenya"
                  {...register('country', { required: 'Country is required' })}
                  error={!!errors.country}
                  helperText={errors.country?.message}
                />
              </Grid>

              {/* Project Type and Status */}
              <Grid item xs={12} md={6}>
                <TextField
                  select
                  fullWidth
                  label="Project Type"
                  defaultValue="humanitarian"
                  {...register('project_type', { required: 'Project type is required' })}
                  error={!!errors.project_type}
                  helperText={errors.project_type?.message}
                >
                  {projectTypes.map((type) => (
                    <MenuItem key={type.value} value={type.value}>
                      {type.label}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>

              <Grid item xs={12} md={6}>
                <TextField
                  select
                  fullWidth
                  label="Status"
                  defaultValue="planned"
                  {...register('status', { required: 'Status is required' })}
                  error={!!errors.status}
                  helperText={errors.status?.message}
                >
                  {statuses.map((status) => (
                    <MenuItem key={status.value} value={status.value}>
                      {status.label}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>

              {/* Budget */}
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  type="number"
                  label="Budget (USD)"
                  placeholder="50000"
                  {...register('budget', {
                    required: 'Budget is required',
                    min: { value: 0, message: 'Budget must be positive' },
                  })}
                  error={!!errors.budget}
                  helperText={errors.budget?.message}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <DollarSign size={20} />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>

              {/* Beneficiaries */}
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  type="number"
                  label="Target Beneficiaries"
                  placeholder="1000"
                  {...register('target_beneficiaries', {
                    min: { value: 0, message: 'Must be positive' },
                  })}
                  error={!!errors.target_beneficiaries}
                  helperText={errors.target_beneficiaries?.message}
                />
              </Grid>

              {/* Dates */}
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  type="date"
                  label="Start Date"
                  InputLabelProps={{ shrink: true }}
                  {...register('start_date', { required: 'Start date is required' })}
                  error={!!errors.start_date}
                  helperText={errors.start_date?.message}
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  type="date"
                  label="End Date"
                  InputLabelProps={{ shrink: true }}
                  {...register('end_date')}
                  error={!!errors.end_date}
                  helperText={errors.end_date?.message}
                />
              </Grid>
            </Grid>

            {/* Action Buttons */}
            <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end', mt: 4 }}>
              <Button
                variant="outlined"
                startIcon={<X size={20} />}
                onClick={() => router.push('/dashboard/projects')}
                disabled={isSubmitting}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant="contained"
                startIcon={<Save size={20} />}
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Creating...' : 'Create Project'}
              </Button>
            </Box>
          </CardContent>
        </Card>
      </form>
    </Box>
  );
}
