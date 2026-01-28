'use client';

import {
  Box,
  Button,
  Card,
  IconButton,
  TextField,
  Typography,
  InputAdornment,
  CircularProgress,
  Alert,
} from '@mui/material';
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import {
  Plus,
  Search,
  Eye,
  Edit,
  Trash2,
  MapPin,
  Calendar,
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { useApi } from '@/lib/hooks/useApi';
import { projectsService, Project, ProjectsListResponse } from '@/lib/services';
import {
  PageHeader,
  FilterBar,
  StatusChip,
  neoBrutalistTokens,
} from '@/src/components/ui';

/**
 * Projects List Page - Neo-Brutalist Design
 *
 * Lists all projects with search and filtering capabilities.
 * Uses shared UI components for consistent styling.
 */

export default function ProjectsListPage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');

  // API integration
  const { data: response, loading, error, execute } = useApi<ProjectsListResponse>(projectsService.getAll);

  // Load projects on mount
  useEffect(() => {
    execute({ limit: 100 });
  }, []);

  // Extract projects array from response
  const projects = response?.items || [];

  const columns: GridColDef[] = [
    {
      field: 'name',
      headerName: 'Project Name',
      flex: 1,
      minWidth: 250,
      renderCell: (params: GridRenderCellParams) => (
        <Box>
          <Typography variant="body2" sx={{ fontWeight: 700 }}>
            {params.value}
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mt: 0.5 }}>
            <MapPin size={14} />
            <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 500 }}>
              {params.row.location || params.row.country}
            </Typography>
          </Box>
        </Box>
      ),
    },
    {
      field: 'project_type',
      headerName: 'Type',
      width: 150,
      renderCell: (params: GridRenderCellParams) => (
        <Typography variant="body2" sx={{ textTransform: 'capitalize', fontWeight: 500 }}>
          {params.value?.replace('_', ' ')}
        </Typography>
      ),
    },
    {
      field: 'status',
      headerName: 'Status',
      width: 130,
      renderCell: (params: GridRenderCellParams) => (
        <StatusChip status={params.value || 'unknown'} />
      ),
    },
    {
      field: 'budget',
      headerName: 'Budget',
      width: 120,
      renderCell: (params: GridRenderCellParams) => (
        <Typography variant="body2" sx={{ fontWeight: 600 }}>
          {params.value ? `$${Number(params.value).toLocaleString()}` : 'N/A'}
        </Typography>
      ),
    },
    {
      field: 'funds_raised',
      headerName: 'Raised',
      width: 130,
      renderCell: (params: GridRenderCellParams) => {
        const budget = params.row.budget || 0;
        const raised = params.value || 0;
        const percentage = budget > 0 ? (raised / budget) * 100 : 0;
        return (
          <Box>
            <Typography variant="body2" sx={{ fontWeight: 700, color: neoBrutalistTokens.colors.success }}>
              ${Number(raised).toLocaleString()}
            </Typography>
            <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 500 }}>
              {percentage.toFixed(0)}% funded
            </Typography>
          </Box>
        );
      },
    },
    {
      field: 'start_date',
      headerName: 'Start Date',
      width: 130,
      renderCell: (params: GridRenderCellParams) => (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
          <Calendar size={14} />
          <Typography variant="body2" sx={{ fontWeight: 500 }}>
            {params.value ? new Date(params.value).toLocaleDateString() : 'N/A'}
          </Typography>
        </Box>
      ),
    },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 140,
      sortable: false,
      renderCell: (params: GridRenderCellParams) => (
        <Box sx={{ display: 'flex', gap: 0.5 }}>
          <IconButton
            size="small"
            onClick={() => router.push(`/dashboard/projects/${params.row.id}`)}
            title="View"
            sx={{ borderRadius: 0 }}
          >
            <Eye size={18} />
          </IconButton>
          <IconButton
            size="small"
            onClick={() => router.push(`/dashboard/projects/${params.row.id}/edit`)}
            title="Edit"
            sx={{ borderRadius: 0 }}
          >
            <Edit size={18} />
          </IconButton>
          <IconButton
            size="small"
            color="error"
            onClick={() => handleDelete(params.row.id)}
            title="Delete"
            sx={{ borderRadius: 0 }}
          >
            <Trash2 size={18} />
          </IconButton>
        </Box>
      ),
    },
  ];

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this project?')) {
      return;
    }

    try {
      await projectsService.delete(id);
      execute({ limit: 100 });
    } catch (err) {
      console.error('Failed to delete project:', err);
      alert('Failed to delete project. Please try again.');
    }
  };

  const filteredProjects = projects.filter((project) =>
    project.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    project.location?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    project.country?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    project.project_type?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Box>
      <PageHeader
        title="Projects"
        subtitle="Manage your humanitarian projects and track their progress"
        action={
          <Button
            variant="contained"
            startIcon={<Plus size={20} />}
            onClick={() => router.push('/dashboard/projects/create')}
          >
            Create Project
          </Button>
        }
      />

      {/* Error Alert */}
      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error.message}
        </Alert>
      )}

      {/* Search Filter */}
      <FilterBar>
        <TextField
          fullWidth
          placeholder="Search projects by title, location, or category..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search size={20} />
              </InputAdornment>
            ),
          }}
        />
      </FilterBar>

      {/* Data Grid */}
      <Card>
        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 400 }}>
            <CircularProgress />
          </Box>
        ) : (
          <DataGrid
            rows={filteredProjects}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: { pageSize: 10 },
              },
            }}
            pageSizeOptions={[5, 10, 25, 50]}
            checkboxSelection
            disableRowSelectionOnClick
            autoHeight
            sx={{
              border: 'none',
              '& .MuiDataGrid-cell:focus': {
                outline: 'none',
              },
            }}
          />
        )}
      </Card>
    </Box>
  );
}
