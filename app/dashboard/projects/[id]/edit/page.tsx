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
  CircularProgress,
  Alert,
} from '@mui/material';
import { Save, X, DollarSign, MapPin, ArrowLeft } from 'lucide-react';
import { useRouter, useParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useApi } from '@/lib/hooks/useApi';
import { projectsService, Project, CreateProjectDto, ProjectType, ProjectStatus } from '@/lib/services';
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
  { value: 'cancelled', label: 'Cancelled' },
];



export default function EditProjectPage() {
  const router = useRouter();
  const params = useParams();
  const projectId = params?.id as string; // UUID
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [updateError, setUpdateError] = useState<string | null>(null);

  // Fetch project data
  const { data: project, loading, error, execute } = useApi<Project>(projectsService.getById);

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<ProjectFormData>();

  useEffect(() => {
    if (projectId) {
      execute(projectId);
    }
  }, [projectId]);

  useEffect(() => {
    if (project) {
      reset({
        name: project.name,
        slug: project.slug,
        description: project.description,
        project_type: project.project_type,
        status: project.status,
        country: project.country,
        location: project.location || '',
        start_date: project.start_date,
        end_date: project.end_date || '',
        budget: Number(project.budget),
        target_beneficiaries: project.target_beneficiaries || 0,
      });
    }
  }, [project, reset]);

  const onSubmit = async (data: ProjectFormData) => {
    setIsSubmitting(true);
    setUpdateError(null);

    try {
      // Prepare data for API - convert empty strings to undefined
      const projectData: Partial<CreateProjectDto> = {
        name: data.name,
        slug: data.slug,
        description: data.description,
        project_type: data.project_type,
        status: data.status,
        country: data.country,
        location: data.location || undefined,
        start_date: data.start_date,
        end_date: data.end_date || undefined,
        budget: data.budget ? Number(data.budget) : undefined,
        target_beneficiaries: data.target_beneficiaries && Number(data.target_beneficiaries) > 0 ? Number(data.target_beneficiaries) : undefined,
      };

      console.log('[Edit Project] Sending data:', projectData);
      await projectsService.update(projectId, projectData);
      router.push(`/dashboard/projects/${projectId}`);
    } catch (err) {
      const apiError = handleApiError(err);
      setUpdateError(apiError.message);
      console.error('[Edit Project] Failed:', err);
      console.error('[Edit Project] Error details:', (err as any)?.response?.data);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Loading state
  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 400 }}>
        <CircularProgress />
      </Box>
    );
  }

  // Error state
  if (error) {
    return (
      <Box>
        <Alert severity="error" sx={{ mb: 3 }}>
          {error.message}
        </Alert>
        <Button
          startIcon={<ArrowLeft size={20} />}
          onClick={() => router.push('/dashboard/projects')}
          sx={{ textTransform: 'none' }}
        >
          Back to Projects
        </Button>
      </Box>
    );
  }

  // No data state
  if (!project) {
    return (
      <Box>
        <Alert severity="warning" sx={{ mb: 3 }}>
          Project not found
        </Alert>
        <Button
          startIcon={<ArrowLeft size={20} />}
          onClick={() => router.push('/dashboard/projects')}
          sx={{ textTransform: 'none' }}
        >
          Back to Projects
        </Button>
      </Box>
    );
  }

  return (
    <Box>
      {/* Header */}
      <Box sx={{ mb: 3 }}>
        <Button
          startIcon={<ArrowLeft size={20} />}
          onClick={() => router.push(`/dashboard/projects/${projectId}`)}
          sx={{ mb: 2, textTransform: 'none' }}
        >
          Back to Project
        </Button>

        <Typography variant="h4" fontWeight={600} gutterBottom>
          Edit Project
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Update project details and information
        </Typography>
      </Box>

      {/* Form */}
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Error Alert */}
        {updateError && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {updateError}
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
                  {...register('slug', { required: 'Slug is required' })}
                  error={!!errors.slug}
                  helperText={errors.slug?.message}
                />
              </Grid>

              {/* Description */}
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  multiline
                  rows={4}
                  label="Description"
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
                  {...register('country', { required: 'Country is required' })}
                  error={!!errors.country}
                  helperText={errors.country?.message}
                />
              </Grid>

              {/* Project Type and Status */}
              <Grid item xs={12} md={6}>
                <Controller
                  name="project_type"
                  control={control}
                  defaultValue="humanitarian"
                  rules={{ required: 'Project type is required' }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      select
                      fullWidth
                      label="Project Type"
                      error={!!errors.project_type}
                      helperText={errors.project_type?.message}
                    >
                      {projectTypes.map((type) => (
                        <MenuItem key={type.value} value={type.value}>
                          {type.label}
                        </MenuItem>
                      ))}
                    </TextField>
                  )}
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <Controller
                  name="status"
                  control={control}
                  defaultValue="planned"
                  rules={{ required: 'Status is required' }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      select
                      fullWidth
                      label="Status"
                      error={!!errors.status}
                      helperText={errors.status?.message}
                    >
                      {statuses.map((status) => (
                        <MenuItem key={status.value} value={status.value}>
                          {status.label}
                        </MenuItem>
                      ))}
                    </TextField>
                  )}
                />
              </Grid>

              {/* Budget */}
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  type="number"
                  label="Budget (USD)"
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
                onClick={() => router.push(`/dashboard/projects/${projectId}`)}
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
                {isSubmitting ? 'Saving...' : 'Save Changes'}
              </Button>
            </Box>
          </CardContent>
        </Card>
      </form>
    </Box>
  );
}
