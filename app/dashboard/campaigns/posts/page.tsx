'use client';

import {
  Box,
  Button,
  Card,
  Chip,
  IconButton,
  TextField,
  Typography,
  InputAdornment,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Avatar,
  Grid,
} from '@mui/material';
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import {
  Plus,
  Search,
  Eye,
  Edit,
  Trash2,
  Calendar,
  Clock,
  Image as ImageIcon,
  Video,
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  ArcElement,
  Title,
  Tooltip,
  Legend
);

// Mock data
const mockPosts = [
  {
    id: 1,
    content: 'Join us in making a difference! Our Water Initiative in Kenya has reached 5,000 families...',
    campaign: 'Water Initiative Kenya 2024',
    platforms: ['facebook', 'instagram'],
    status: 'published',
    scheduledDate: '2024-01-15T10:00:00',
    publishedDate: '2024-01-15T10:02:00',
    mediaType: 'image',
    reach: 12000,
    engagement: 850,
    likes: 620,
    comments: 130,
    shares: 100,
  },
  {
    id: 2,
    content: 'Education transforms lives! See how your support is building schools in Uganda...',
    campaign: 'Education Program Launch',
    platforms: ['linkedin', 'facebook'],
    status: 'scheduled',
    scheduledDate: '2024-02-01T14:00:00',
    publishedDate: null,
    mediaType: 'video',
    reach: 0,
    engagement: 0,
    likes: 0,
    comments: 0,
    shares: 0,
  },
  {
    id: 3,
    content: 'Medical mission update: Our team has provided care to over 3,000 patients this month...',
    campaign: 'Medical Mission Outreach',
    platforms: ['twitter', 'instagram'],
    status: 'published',
    scheduledDate: '2024-01-10T09:30:00',
    publishedDate: '2024-01-10T09:31:00',
    mediaType: 'image',
    reach: 8500,
    engagement: 640,
    likes: 480,
    comments: 90,
    shares: 70,
  },
  {
    id: 4,
    content: 'Draft: Easter campaign message about hope and renewal...',
    campaign: 'Easter Campaign 2024',
    platforms: ['facebook'],
    status: 'draft',
    scheduledDate: null,
    publishedDate: null,
    mediaType: 'image',
    reach: 0,
    engagement: 0,
    likes: 0,
    comments: 0,
    shares: 0,
  },
];

const statusColors: Record<string, { bg: string; text: string }> = {
  published: { bg: '#10b981', text: '#fff' },
  scheduled: { bg: '#3b82f6', text: '#fff' },
  draft: { bg: '#6b7280', text: '#fff' },
  failed: { bg: '#ef4444', text: '#fff' },
};

const platformColors: Record<string, string> = {
  facebook: '#1877f2',
  twitter: '#1da1f2',
  instagram: '#e4405f',
  linkedin: '#0077b5',
};

const platformIcons: Record<string, string> = {
  facebook: 'F',
  twitter: 'T',
  instagram: 'I',
  linkedin: 'L',
};

export default function PostsPage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  // Platform distribution for doughnut chart
  const platformData = {
    labels: ['Facebook', 'Instagram', 'Twitter', 'LinkedIn'],
    datasets: [
      {
        data: [35, 30, 20, 15],
        backgroundColor: ['#1877f2', '#e4405f', '#1da1f2', '#0077b5'],
        borderWidth: 0,
      },
    ],
  };

  const doughnutOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom' as const,
        labels: {
          color: '#9ca3af',
          padding: 15,
        },
      },
    },
  };

  const columns: GridColDef[] = [
    {
      field: 'content',
      headerName: 'Post Content',
      flex: 1,
      minWidth: 300,
      renderCell: (params: GridRenderCellParams) => (
        <Box>
          <Typography variant="body2" fontWeight={600} noWrap>
            {params.value}
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 0.5 }}>
            {params.row.mediaType === 'image' ? (
              <ImageIcon size={14} color="#3b82f6" />
            ) : (
              <Video size={14} color="#ef4444" />
            )}
            <Typography variant="caption" color="text.secondary">
              {params.row.campaign}
            </Typography>
          </Box>
        </Box>
      ),
    },
    {
      field: 'platforms',
      headerName: 'Platforms',
      width: 120,
      renderCell: (params: GridRenderCellParams) => (
        <Box sx={{ display: 'flex', gap: 0.5 }}>
          {(params.value as string[]).map((platform) => (
            <Avatar
              key={platform}
              sx={{
                width: 24,
                height: 24,
                bgcolor: platformColors[platform],
                fontSize: '0.7rem',
                fontWeight: 700,
              }}
            >
              {platformIcons[platform]}
            </Avatar>
          ))}
        </Box>
      ),
    },
    {
      field: 'status',
      headerName: 'Status',
      width: 120,
      renderCell: (params: GridRenderCellParams) => (
        <Chip
          label={params.value}
          size="small"
          sx={{
            bgcolor: statusColors[params.value as string]?.bg,
            color: statusColors[params.value as string]?.text,
            textTransform: 'capitalize',
            fontWeight: 600,
          }}
        />
      ),
    },
    {
      field: 'scheduledDate',
      headerName: 'Schedule',
      width: 160,
      renderCell: (params: GridRenderCellParams) => (
        <Box>
          {params.value ? (
            <>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                <Calendar size={12} />
                <Typography variant="caption">
                  {new Date(params.value).toLocaleDateString()}
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                <Clock size={12} />
                <Typography variant="caption" color="text.secondary">
                  {new Date(params.value).toLocaleTimeString([], {
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </Typography>
              </Box>
            </>
          ) : (
            <Typography variant="caption" color="text.secondary">
              Not scheduled
            </Typography>
          )}
        </Box>
      ),
    },
    {
      field: 'reach',
      headerName: 'Reach',
      width: 100,
      renderCell: (params: GridRenderCellParams) => (
        <Typography variant="body2" fontWeight={600} color="primary">
          {params.value > 0 ? `${(params.value / 1000).toFixed(1)}K` : '-'}
        </Typography>
      ),
    },
    {
      field: 'engagement',
      headerName: 'Engagement',
      width: 110,
      renderCell: (params: GridRenderCellParams) => (
        <Typography variant="body2" fontWeight={600} color="success.main">
          {params.value > 0 ? params.value.toLocaleString() : '-'}
        </Typography>
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
            onClick={() => router.push(`/dashboard/campaigns/posts/${params.row.id}`)}
          >
            <Eye size={18} />
          </IconButton>
          <IconButton
            size="small"
            onClick={() => router.push(`/dashboard/campaigns/posts/${params.row.id}/edit`)}
          >
            <Edit size={18} />
          </IconButton>
          <IconButton size="small" color="error">
            <Trash2 size={18} />
          </IconButton>
        </Box>
      ),
    },
  ];

  const filteredPosts = mockPosts.filter((post) => {
    const matchesSearch =
      post.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.campaign.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = filterStatus === 'all' || post.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const stats = [
    { label: 'Total Posts', value: '156', color: '#3b82f6' },
    { label: 'Scheduled', value: '24', color: '#f59e0b' },
    { label: 'Published', value: '132', color: '#10b981' },
    { label: 'Avg Engagement', value: '4.2%', color: '#8b5cf6' },
  ];

  return (
    <Box>
      {/* Header */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Box>
          <Typography variant="h4" fontWeight={600} gutterBottom>
            Social Media Posts
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Schedule and manage posts across all platforms
          </Typography>
        </Box>
        <Button
          variant="contained"
          startIcon={<Plus size={20} />}
          onClick={() => router.push('/dashboard/campaigns/posts/create')}
          sx={{ textTransform: 'none' }}
        >
          Create Post
        </Button>
      </Box>

      {/* Stats and Chart */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} md={8}>
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
              gap: 2,
            }}
          >
            {stats.map((stat) => (
              <Card
                key={stat.label}
                sx={{
                  p: 2.5,
                  border: '1px solid',
                  borderColor: 'divider',
                }}
              >
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  {stat.label}
                </Typography>
                <Typography variant="h4" fontWeight={700} sx={{ color: stat.color }}>
                  {stat.value}
                </Typography>
              </Card>
            ))}
          </Box>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card sx={{ p: 3, border: '1px solid', borderColor: 'divider' }}>
            <Typography variant="h6" fontWeight={600} gutterBottom>
              Platform Distribution
            </Typography>
            <Box sx={{ height: 200, mt: 2 }}>
              <Doughnut data={platformData} options={doughnutOptions} />
            </Box>
          </Card>
        </Grid>
      </Grid>

      {/* Filters */}
      <Card sx={{ mb: 3, p: 2 }}>
        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
          <TextField
            placeholder="Search posts..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            sx={{ flex: 1, minWidth: 300 }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search size={20} />
                </InputAdornment>
              ),
            }}
          />
          <FormControl sx={{ minWidth: 150 }}>
            <InputLabel>Status</InputLabel>
            <Select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              label="Status"
            >
              <MenuItem value="all">All Status</MenuItem>
              <MenuItem value="published">Published</MenuItem>
              <MenuItem value="scheduled">Scheduled</MenuItem>
              <MenuItem value="draft">Draft</MenuItem>
              <MenuItem value="failed">Failed</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </Card>

      {/* Data Grid */}
      <Card>
        <DataGrid
          rows={filteredPosts}
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
            '& .MuiDataGrid-row:hover': {
              backgroundColor: 'action.hover',
            },
          }}
        />
      </Card>
    </Box>
  );
}
