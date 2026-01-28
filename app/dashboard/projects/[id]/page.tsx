'use client';

import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Grid,
  LinearProgress,
  Typography,
  Divider,
  Avatar,
  IconButton,
  CircularProgress,
  Alert,
} from '@mui/material';
import {
  Edit,
  Trash2,
  MapPin,
  Calendar,
  Users,
  DollarSign,
  Target,
  TrendingUp,
  ArrowLeft,
} from 'lucide-react';
import { useRouter, useParams } from 'next/navigation';
import { useEffect } from 'react';
import { useApi } from '@/lib/hooks/useApi';
import { projectsService, Project } from '@/lib/services';



const statusColors: Record<string, 'success' | 'warning' | 'info' | 'default' | 'error'> = {
  active: 'success',
  planned: 'warning',
  completed: 'info',
  on_hold: 'default',
  cancelled: 'error',
};

export default function ProjectDetailPage() {
  const router = useRouter();
  const params = useParams();
  const projectId = params?.id as string; // UUID

  // API integration
  const { data: project, loading, error, execute } = useApi<Project>(projectsService.getById);

  // Load project on mount
  useEffect(() => {
    if (projectId) {
      execute(projectId);
    }
  }, [projectId]);

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this project?')) {
      return;
    }
    
    try {
      await projectsService.delete(projectId);
      router.push('/dashboard/projects');
    } catch (err) {
      console.error('Failed to delete project:', err);
      alert('Failed to delete project. Please try again.');
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

  const fundingPercentage = project.budget && project.budget > 0
    ? (project.funds_raised / project.budget) * 100
    : 0;

  return (
    <Box>
      {/* Header */}
      <Box sx={{ mb: 3 }}>
        <Button
          startIcon={<ArrowLeft size={20} />}
          onClick={() => router.push('/dashboard/projects')}
          sx={{ mb: 2, textTransform: 'none' }}
        >
          Back to Projects
        </Button>

        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1 }}>
              <Typography variant="h4" fontWeight={600}>
                {project.name}
              </Typography>
              <Chip
                label={project.status.replace('_', ' ')}
                color={statusColors[project.status]}
                sx={{ textTransform: 'capitalize' }}
              />
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, color: 'text.secondary' }}>
              <MapPin size={16} />
              <Typography variant="body2">
                {project.location || project.country}
              </Typography>
            </Box>
          </Box>

          <Box sx={{ display: 'flex', gap: 1 }}>
            <Button
              variant="outlined"
              startIcon={<Edit size={20} />}
              onClick={() => router.push(`/dashboard/projects/${projectId}/edit`)}
              sx={{ textTransform: 'none' }}
            >
              Edit
            </Button>
            <IconButton color="error" onClick={handleDelete}>
              <Trash2 size={20} />
            </IconButton>
          </Box>
        </Box>
      </Box>

      <Grid container spacing={3}>
        {/* Main Content */}
        <Grid item xs={12} md={8}>
          {/* Description */}
          <Card sx={{ mb: 3 }}>
            <CardContent>
              <Typography variant="h6" fontWeight={600} gutterBottom>
                Project Description
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ whiteSpace: 'pre-line' }}
              >
                {project.description}
              </Typography>
            </CardContent>
          </Card>

          {/* Milestones */}
          {project.target_beneficiaries && (
            <Card>
              <CardContent>
                <Typography variant="h6" fontWeight={600} gutterBottom>
                  Project Impact
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  This project aims to positively impact {project.target_beneficiaries.toLocaleString()} beneficiaries.
                  Currently reached: {project.actual_beneficiaries.toLocaleString()} beneficiaries.
                </Typography>
              </CardContent>
            </Card>
          )}
        </Grid>

        {/* Sidebar */}
        <Grid item xs={12} md={4}>
          {/* Stats */}
          <Card sx={{ mb: 3 }}>
            <CardContent>
              <Typography variant="h6" fontWeight={600} gutterBottom>
                Funding Progress
              </Typography>
              <Box sx={{ mb: 2 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography variant="h4" fontWeight={700} color="primary">
                    ${project.funds_raised.toLocaleString()}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    of ${project.budget?.toLocaleString() || 'N/A'}
                  </Typography>
                </Box>
                <LinearProgress
                  variant="determinate"
                  value={fundingPercentage}
                  sx={{ height: 8, borderRadius: 1 }}
                />
                <Typography variant="caption" color="text.secondary" sx={{ mt: 0.5 }}>
                  {fundingPercentage.toFixed(1)}% funded
                </Typography>
              </Box>

              <Divider sx={{ my: 2 }} />

              {/* Quick Stats */}
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                  <Box
                    sx={{
                      p: 1,
                      borderRadius: 1,
                      bgcolor: 'primary.50',
                      display: 'flex',
                      color: 'primary.main',
                    }}
                  >
                    <Users size={20} />
                  </Box>
                  <Box>
                    <Typography variant="caption" color="text.secondary">
                      Beneficiaries
                    </Typography>
                    <Typography variant="body1" fontWeight={600}>
                      {project.actual_beneficiaries?.toLocaleString() || '0'}
                    </Typography>
                  </Box>
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                  <Box
                    sx={{
                      p: 1,
                      borderRadius: 1,
                      bgcolor: 'success.50',
                      display: 'flex',
                      color: 'success.main',
                    }}
                  >
                    <Calendar size={20} />
                  </Box>
                  <Box>
                    <Typography variant="caption" color="text.secondary">
                      Duration
                    </Typography>
                    <Typography variant="body2" fontWeight={600}>
                      {project.start_date && new Date(project.start_date).toLocaleDateString()}
                      {project.start_date && project.end_date && ' - '}
                      {project.end_date && new Date(project.end_date).toLocaleDateString()}
                    </Typography>
                  </Box>
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                  <Box
                    sx={{
                      p: 1,
                      borderRadius: 1,
                      bgcolor: 'warning.50',
                      display: 'flex',
                      color: 'warning.main',
                    }}
                  >
                    <Target size={20} />
                  </Box>
                  <Box>
                    <Typography variant="caption" color="text.secondary">
                      Category
                    </Typography>
                    <Typography variant="body1" fontWeight={600}>
                      {project.project_type.replace('_', ' ')}
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </CardContent>
          </Card>

          {/* Team Members - Hidden for now as not in API */}
          {/* <Card>
            <CardContent>
              <Typography variant="h6" fontWeight={600} gutterBottom>
                Additional Information
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Created: {project.createdAt ? new Date(project.createdAt).toLocaleDateString() : 'N/A'}
              </Typography>
            </CardContent>
          </Card> */}
        </Grid>
      </Grid>
    </Box>
  );
}
