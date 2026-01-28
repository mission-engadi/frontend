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
  AvatarGroup,
} from '@mui/material';
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import {
  Plus,
  Search,
  Eye,
  Edit,
  Trash2,
  Share2,
  TrendingUp,
  Calendar,
  Users,
  MessageSquare,
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

// Mock data
const mockCampaigns = [
  {
    id: 1,
    title: 'Water Initiative Kenya 2024',
    status: 'active',
    platforms: ['facebook', 'twitter', 'instagram'],
    startDate: '2024-01-01',
    endDate: '2024-03-31',
    postsScheduled: 24,
    postsPublished: 18,
    totalReach: 45000,
    engagement: 3200,
    project: 'Water Initiative',
  },
  {
    id: 2,
    title: 'Education Program Launch',
    status: 'scheduled',
    platforms: ['linkedin', 'facebook'],
    startDate: '2024-02-01',
    endDate: '2024-04-30',
    postsScheduled: 15,
    postsPublished: 0,
    totalReach: 0,
    engagement: 0,
    project: 'Education Program',
  },
  {
    id: 3,
    title: 'Medical Mission Outreach',
    status: 'active',
    platforms: ['facebook', 'instagram', 'twitter', 'linkedin'],
    startDate: '2023-12-15',
    endDate: '2024-02-15',
    postsScheduled: 32,
    postsPublished: 28,
    totalReach: 67000,
    engagement: 5100,
    project: 'Medical Mission',
  },
  {
    id: 4,
    title: 'Easter Campaign 2024',
    status: 'draft',
    platforms: ['facebook', 'instagram'],
    startDate: '2024-03-15',
    endDate: '2024-04-15',
    postsScheduled: 12,
    postsPublished: 0,
    totalReach: 0,
    engagement: 0,
    project: 'General Fund',
  },
];

const statusColors: Record<string, { bg: string; text: string }> = {
  active: { bg: '#10b981', text: '#fff' },
  scheduled: { bg: '#3b82f6', text: '#fff' },
  draft: { bg: '#6b7280', text: '#fff' },
  completed: { bg: '#8b5cf6', text: '#fff' },
  paused: { bg: '#f59e0b', text: '#fff' },
};

const platformColors: Record<string, string> = {
  facebook: '#1877f2',
  twitter: '#1da1f2',
  instagram: '#e4405f',
  linkedin: '#0077b5',
  youtube: '#ff0000',
};

const platformIcons: Record<string, string> = {
  facebook: 'F',
  twitter: 'T',
  instagram: 'I',
  linkedin: 'L',
  youtube: 'Y',
};

export default function CampaignsListPage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  // Stats data
  const stats = [
    {
      label: 'Active Campaigns',
      value: '12',
      change: '+3',
      sparkline: [8, 9, 10, 11, 11, 12, 12],
      color: '#10b981',
    },
    {
      label: 'Total Reach',
      value: '234K',
      change: '+15%',
      sparkline: [180, 190, 200, 210, 220, 230, 234],
      color: '#3b82f6',
    },
    {
      label: 'Engagement Rate',
      value: '4.8%',
      change: '+0.3%',
      sparkline: [4.2, 4.3, 4.4, 4.5, 4.6, 4.7, 4.8],
      color: '#f59e0b',
    },
    {
      label: 'Scheduled Posts',
      value: '89',
      change: '+12',
      sparkline: [70, 72, 75, 78, 82, 85, 89],
      color: '#ef4444',
    },
  ];

  const columns: GridColDef[] = [
    {
      field: 'title',
      headerName: 'Campaign',
      flex: 1,
      minWidth: 250,
      renderCell: (params: GridRenderCellParams) => (
        <Box>
          <Typography variant="body2" fontWeight={600}>
            {params.value}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            {params.row.project}
          </Typography>
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
      field: 'platforms',
      headerName: 'Platforms',
      width: 150,
      renderCell: (params: GridRenderCellParams) => (
        <AvatarGroup max={4} sx={{ justifyContent: 'flex-start' }}>
          {(params.value as string[]).map((platform) => (
            <Avatar
              key={platform}
              sx={{
                width: 28,
                height: 28,
                bgcolor: platformColors[platform],
                fontSize: '0.75rem',
                fontWeight: 700,
              }}
            >
              {platformIcons[platform]}
            </Avatar>
          ))}
        </AvatarGroup>
      ),
    },
    {
      field: 'duration',
      headerName: 'Duration',
      width: 180,
      renderCell: (params: GridRenderCellParams) => (
        <Box>
          <Typography variant="body2">
            {new Date(params.row.startDate).toLocaleDateString()} -
          </Typography>
          <Typography variant="caption" color="text.secondary">
            {new Date(params.row.endDate).toLocaleDateString()}
          </Typography>
        </Box>
      ),
    },
    {
      field: 'postsScheduled',
      headerName: 'Posts',
      width: 120,
      renderCell: (params: GridRenderCellParams) => (
        <Box>
          <Typography variant="body2" fontWeight={600}>
            {params.row.postsPublished}/{params.value}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            published
          </Typography>
        </Box>
      ),
    },
    {
      field: 'totalReach',
      headerName: 'Reach',
      width: 120,
      renderCell: (params: GridRenderCellParams) => (
        <Typography variant="body2" fontWeight={600} color="primary">
          {params.value > 0 ? `${(params.value / 1000).toFixed(1)}K` : '-'}
        </Typography>
      ),
    },
    {
      field: 'engagement',
      headerName: 'Engagement',
      width: 130,
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
            onClick={() => router.push(`/dashboard/campaigns/${params.row.id}`)}
          >
            <Eye size={18} />
          </IconButton>
          <IconButton
            size="small"
            onClick={() => router.push(`/dashboard/campaigns/${params.row.id}/edit`)}
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

  const filteredCampaigns = mockCampaigns.filter((campaign) => {
    const matchesSearch =
      campaign.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      campaign.project.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = filterStatus === 'all' || campaign.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const createSparklineData = (data: number[], color: string) => ({
    labels: ['', '', '', '', '', '', ''],
    datasets: [
      {
        data,
        borderColor: color,
        backgroundColor: `${color}20`,
        fill: true,
        tension: 0.4,
        pointRadius: 0,
        borderWidth: 2,
      },
    ],
  });

  const sparklineOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: { enabled: false },
    },
    scales: {
      x: { display: false },
      y: { display: false },
    },
  };

  return (
    <Box>
      {/* Header */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Box>
          <Typography variant="h4" fontWeight={600} gutterBottom>
            Social Media Campaigns
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Manage and track your social media campaigns across all platforms
          </Typography>
        </Box>
        <Button
          variant="contained"
          startIcon={<Plus size={20} />}
          onClick={() => router.push('/dashboard/campaigns/create')}
          sx={{ textTransform: 'none' }}
        >
          Create Campaign
        </Button>
      </Box>

      {/* Stats Cards */}
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: 2,
          mb: 3,
        }}
      >
        {stats.map((stat) => (
          <Card
            key={stat.label}
            sx={{
              bgcolor: 'background.paper',
              border: '1px solid',
              borderColor: 'divider',
              p: 2.5,
            }}
          >
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
              <Box>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  {stat.label}
                </Typography>
                <Typography variant="h4" fontWeight={700}>
                  {stat.value}
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mt: 0.5 }}>
                  <TrendingUp size={14} color={stat.color} />
                  <Typography variant="caption" sx={{ color: stat.color, fontWeight: 600 }}>
                    {stat.change}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    Last 7 days
                  </Typography>
                </Box>
              </Box>
            </Box>
            <Box sx={{ height: 50 }}>
              <Line data={createSparklineData(stat.sparkline, stat.color)} options={sparklineOptions} />
            </Box>
          </Card>
        ))}
      </Box>

      {/* Filters */}
      <Card sx={{ mb: 3, p: 2 }}>
        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
          <TextField
            placeholder="Search campaigns..."
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
              <MenuItem value="active">Active</MenuItem>
              <MenuItem value="scheduled">Scheduled</MenuItem>
              <MenuItem value="draft">Draft</MenuItem>
              <MenuItem value="completed">Completed</MenuItem>
              <MenuItem value="paused">Paused</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </Card>

      {/* Data Grid */}
      <Card>
        <DataGrid
          rows={filteredCampaigns}
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
