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
  Paper,
  Divider,
} from '@mui/material';
import { Save, X, DollarSign, MapPin, Sparkles } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { projectsService, CreateProjectDto, ProjectType, ProjectStatus } from '@/lib/services';
import { handleApiError } from '@/lib/utils/api-error';
import { AIAssistantPanel } from '@/src/components/ai';
import { AIAction } from '@/src/types/ai-assistant';

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

export default function CreateProjectAIPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<ProjectFormData>({
    defaultValues: {
      status: 'planned',
      project_type: 'humanitarian',
    },
  });

  // Watch form values to show AI what's been filled
  const formValues = watch();

  const handleAIAction = (action: AIAction) => {
    console.log('AI Action received:', action);

    if (action.type === 'fill_form' || action.type === 'create_project') {
      // Extract project data from AI and auto-fill form
      const data = action.data;

      if (data.name) {
        setValue('name', data.name);
        setSuccess('Project name set by AI ✨');
      }

      if (data.description) {
        setValue('description', data.description);
      }

      if (data.type) {
        // Map AI type to our project type
        const typeMapping: Record<string, ProjectType> = {
          'water': 'water_sanitation',
          'water_sanitation': 'water_sanitation',
          'food': 'humanitarian',
          'food_security': 'humanitarian',
          'education': 'education',
          'health': 'medical',
          'medical': 'medical',
          'agriculture': 'agriculture',
          'gospel': 'gospel_outreach',
        };

        const mappedType = typeMapping[data.type.toLowerCase()] || 'humanitarian';
        setValue('project_type', mappedType);
      }

      if (data.country) {
        setValue('country', data.country);
      }

      if (data.location) {
        setValue('location', data.location);
      }

      if (data.budget || data.estimated_budget) {
        setValue('budget', data.budget || data.estimated_budget);
      }

      if (data.beneficiaries || data.estimated_beneficiaries || data.target_beneficiaries) {
        setValue('target_beneficiaries', data.beneficiaries || data.estimated_beneficiaries || data.target_beneficiaries);
      }

      if (data.start_date) {
        setValue('start_date', data.start_date);
      }

      if (data.end_date) {
        setValue('end_date', data.end_date);
      }

      // Show success message
      setTimeout(() => setSuccess(null), 3000);
    }
  };

  const onSubmit = async (data: ProjectFormData) => {
    setIsSubmitting(true);
    setError(null);

    try {
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

      console.log('[Create Project AI] Sending data:', projectData);
      const result = await projectsService.create(projectData);
      console.log('[Create Project AI] Success:', result);
      router.push('/dashboard/projects');
    } catch (err) {
      const apiError = handleApiError(err);
      setError(apiError.message);
      console.error('[Create Project AI] Failed:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Box>
      {/* Header */}
      <Box sx={{ mb: 3, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Sparkles size={28} color="#6366f1" />
            <Typography variant="h4" fontWeight={600}>
              Create Project with AI
            </Typography>
          </Box>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            Chat with AI to create your project - no manual form filling required!
          </Typography>
        </Box>

        <Button
          variant="outlined"
          size="small"
          onClick={() => router.push('/dashboard/projects/create')}
        >
          Use Manual Form
        </Button>
      </Box>

      {/* Success/Error Alerts */}
      {success && (
        <Alert severity="success" sx={{ mb: 2 }} onClose={() => setSuccess(null)}>
          {success}
        </Alert>
      )}

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      {/* Main Layout: AI Assistant + Form */}
      <Grid container spacing={3}>
        {/* Left: AI Assistant */}
        <Grid item xs={12} lg={5}>
          <Paper elevation={3} sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
            <Box sx={{ p: 2, bgcolor: 'primary.main', color: 'white' }}>
              <Typography variant="h6" fontWeight={600}>
                AI Project Assistant
              </Typography>
              <Typography variant="caption">
                Tell me about your project and I'll help you create it
              </Typography>
            </Box>

            <Box sx={{ flex: 1, overflow: 'hidden' }}>
              <AIAssistantPanel
                context="project"
                title="Project AI"
                welcomeMessage={`Hi! I'll help you create your project. Just tell me:

1. What type of project? (water, food, education, health, etc.)
2. Where will it be located?
3. How many people will benefit?
4. What's your budget range?

Try saying: "I want to create a water project in Kenya for 500 people with a budget of $60,000"`}
                onAction={handleAIAction}
                metadata={{
                  currentForm: formValues,
                  formFilled: {
                    name: !!formValues.name,
                    type: !!formValues.project_type,
                    country: !!formValues.country,
                    budget: !!formValues.budget,
                  },
                }}
                defaultExpanded={true}
                showQuickActions={true}
              />
            </Box>
          </Paper>
        </Grid>

        {/* Right: Form */}
        <Grid item xs={12} lg={7}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Card>
              <CardContent sx={{ p: 4 }}>
                <Typography variant="h6" fontWeight={600} gutterBottom>
                  Project Details
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                  Review and edit the details filled by AI, or fill manually
                </Typography>

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
                      helperText="Leave blank to auto-generate from name"
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
                      {...register('project_type', { required: 'Project type is required' })}
                      error={!!errors.project_type}
                      helperText={errors.project_type?.message}
                      value={formValues.project_type || 'humanitarian'}
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
                      {...register('status', { required: 'Status is required' })}
                      error={!!errors.status}
                      helperText={errors.status?.message}
                      value={formValues.status || 'planned'}
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
                    />
                  </Grid>
                </Grid>

                <Divider sx={{ my: 3 }} />

                {/* Action Buttons */}
                <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
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
        </Grid>
      </Grid>
    </Box>
  );
}
