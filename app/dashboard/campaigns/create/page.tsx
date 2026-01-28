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
  Checkbox,
  FormGroup,
  FormControlLabel,
  Avatar,
  Chip,
} from '@mui/material';
import { Save, X } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

interface CampaignFormData {
  title: string;
  description: string;
  project: string;
  startDate: string;
  endDate: string;
  status: string;
  objective: string;
  targetAudience: string;
  budget: string;
}

const statuses = ['draft', 'scheduled', 'active', 'paused', 'completed'];
const projects = ['Water Initiative', 'Education Program', 'Medical Mission', 'General Fund'];

const socialPlatforms = [
  { id: 'facebook', name: 'Facebook', color: '#1877f2' },
  { id: 'twitter', name: 'Twitter', color: '#1da1f2' },
  { id: 'instagram', name: 'Instagram', color: '#e4405f' },
  { id: 'linkedin', name: 'LinkedIn', color: '#0077b5' },
  { id: 'youtube', name: 'YouTube', color: '#ff0000' },
];

export default function CreateCampaignPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>(['facebook']);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CampaignFormData>();

  const handlePlatformToggle = (platformId: string) => {
    setSelectedPlatforms((prev) =>
      prev.includes(platformId)
        ? prev.filter((id) => id !== platformId)
        : [...prev, platformId]
    );
  };

  const onSubmit = async (data: CampaignFormData) => {
    setIsSubmitting(true);
    console.log('Creating campaign:', { ...data, platforms: selectedPlatforms });

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    router.push('/dashboard/campaigns');
  };

  return (
    <Box>
      {/* Header */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="h4" fontWeight={600} gutterBottom>
          Create Social Media Campaign
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Set up a new campaign to reach your audience across multiple platforms
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
                  Campaign Information
                </Typography>

                <Grid container spacing={2.5}>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Campaign Title"
                      placeholder="e.g., Water Initiative Kenya 2024"
                      {...register('title', { required: 'Title is required' })}
                      error={!!errors.title}
                      helperText={errors.title?.message}
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      multiline
                      rows={4}
                      label="Description"
                      placeholder="Describe the campaign goals, message, and target audience..."
                      {...register('description', { required: 'Description is required' })}
                      error={!!errors.description}
                      helperText={errors.description?.message}
                    />
                  </Grid>

                  <Grid item xs={12} sm={6}>
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
                    </FormControl>
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <FormControl fullWidth error={!!errors.status}>
                      <InputLabel>Status</InputLabel>
                      <Select
                        label="Status"
                        defaultValue="draft"
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
                      type="date"
                      label="Start Date"
                      InputLabelProps={{ shrink: true }}
                      {...register('startDate', { required: 'Start date is required' })}
                      error={!!errors.startDate}
                      helperText={errors.startDate?.message}
                    />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      type="date"
                      label="End Date"
                      InputLabelProps={{ shrink: true }}
                      {...register('endDate', { required: 'End date is required' })}
                      error={!!errors.endDate}
                      helperText={errors.endDate?.message}
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Campaign Objective"
                      placeholder="e.g., Raise $50,000 and reach 100,000 people"
                      {...register('objective', { required: 'Objective is required' })}
                      error={!!errors.objective}
                      helperText={errors.objective?.message}
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Target Audience"
                      placeholder="e.g., Christian communities, age 25-65, interested in humanitarian work"
                      {...register('targetAudience')}
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      type="number"
                      label="Budget (Optional)"
                      placeholder="0"
                      {...register('budget')}
                      InputProps={{
                        startAdornment: <Typography sx={{ mr: 1 }}>$</Typography>,
                      }}
                    />
                  </Grid>
                </Grid>
              </CardContent>
            </Card>

            {/* Platform Selection */}
            <Card>
              <CardContent sx={{ p: 3 }}>
                <Typography variant="h6" fontWeight={600} gutterBottom>
                  Target Platforms
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                  Select the social media platforms where this campaign will run
                </Typography>

                <FormGroup>
                  <Grid container spacing={2}>
                    {socialPlatforms.map((platform) => (
                      <Grid item xs={12} sm={6} key={platform.id}>
                        <Card
                          sx={{
                            p: 2,
                            cursor: 'pointer',
                            border: '2px solid',
                            borderColor: selectedPlatforms.includes(platform.id)
                              ? platform.color
                              : 'divider',
                            bgcolor: selectedPlatforms.includes(platform.id)
                              ? `${platform.color}15`
                              : 'background.paper',
                            transition: 'all 0.2s',
                            '&:hover': {
                              borderColor: platform.color,
                            },
                          }}
                          onClick={() => handlePlatformToggle(platform.id)}
                        >
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                            <Avatar
                              sx={{
                                width: 40,
                                height: 40,
                                bgcolor: platform.color,
                                fontSize: '1.25rem',
                                fontWeight: 700,
                              }}
                            >
                              {platform.name.charAt(0)}
                            </Avatar>
                            <Box sx={{ flex: 1 }}>
                              <Typography variant="body1" fontWeight={600}>
                                {platform.name}
                              </Typography>
                              <Typography variant="caption" color="text.secondary">
                                {selectedPlatforms.includes(platform.id)
                                  ? 'Selected'
                                  : 'Click to select'}
                              </Typography>
                            </Box>
                            <Checkbox
                              checked={selectedPlatforms.includes(platform.id)}
                              sx={{
                                color: platform.color,
                                '&.Mui-checked': {
                                  color: platform.color,
                                },
                              }}
                            />
                          </Box>
                        </Card>
                      </Grid>
                    ))}
                  </Grid>
                </FormGroup>

                {selectedPlatforms.length === 0 && (
                  <Typography variant="caption" color="error" sx={{ mt: 2, display: 'block' }}>
                    Please select at least one platform
                  </Typography>
                )}
              </CardContent>
            </Card>
          </Grid>

          {/* Sidebar */}
          <Grid item xs={12} md={4}>
            <Card sx={{ mb: 3 }}>
              <CardContent sx={{ p: 3 }}>
                <Typography variant="h6" fontWeight={600} gutterBottom>
                  Selected Platforms
                </Typography>
                {selectedPlatforms.length > 0 ? (
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 2 }}>
                    {selectedPlatforms.map((platformId) => {
                      const platform = socialPlatforms.find((p) => p.id === platformId);
                      return (
                        <Chip
                          key={platformId}
                          label={platform?.name}
                          onDelete={() => handlePlatformToggle(platformId)}
                          sx={{
                            bgcolor: `${platform?.color}20`,
                            color: platform?.color,
                            fontWeight: 600,
                            border: `1px solid ${platform?.color}40`,
                          }}
                        />
                      );
                    })}
                  </Box>
                ) : (
                  <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
                    No platforms selected
                  </Typography>
                )}
              </CardContent>
            </Card>

            <Card sx={{ mb: 3 }}>
              <CardContent sx={{ p: 3 }}>
                <Typography variant="h6" fontWeight={600} gutterBottom>
                  CloudCampaign Integration
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  This campaign will be created using CloudCampaign API for cross-platform
                  publishing and analytics.
                </Typography>
                <Chip label="CloudCampaign" color="primary" size="small" />
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <Button
                type="submit"
                variant="contained"
                size="large"
                startIcon={<Save size={20} />}
                disabled={isSubmitting || selectedPlatforms.length === 0}
                fullWidth
              >
                {isSubmitting ? 'Creating...' : 'Create Campaign'}
              </Button>
              <Button
                variant="outlined"
                size="large"
                startIcon={<X size={20} />}
                onClick={() => router.push('/dashboard/campaigns')}
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
