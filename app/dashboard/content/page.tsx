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
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from '@mui/material';
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import {
  Plus,
  Search,
  Eye,
  Edit,
  Trash2,
  Globe,
  TrendingUp,
  FileText,
  Image as ImageIcon,
  Video,
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
const mockContent = [
  {
    id: 1,
    title: 'Water Project Success Story',
    type: 'article',
    status: 'published',
    language: 'English',
    views: 21243,
    lastModified: '2024-01-15',
    author: 'John Doe',
  },
  {
    id: 2,
    title: 'Education Program Update',
    type: 'article',
    status: 'published',
    language: 'Portuguese',
    views: 15832,
    lastModified: '2024-01-14',
    author: 'Jane Smith',
  },
  {
    id: 3,
    title: 'Medical Mission Video',
    type: 'video',
    status: 'draft',
    language: 'English',
    views: 0,
    lastModified: '2024-01-16',
    author: 'Mike Johnson',
  },
  {
    id: 4,
    title: 'Community Impact Report',
    type: 'document',
    status: 'review',
    language: 'Spanish',
    views: 8456,
    lastModified: '2024-01-13',
    author: 'Sarah Wilson',
  },
];

const statusColors: Record<string, { bg: string; text: string }> = {
  published: { bg: '#10b981', text: '#fff' },
  draft: { bg: '#6b7280', text: '#fff' },
  review: { bg: '#f59e0b', text: '#fff' },
};

export default function ContentListPage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');

  // Stats data
  const stats = [
    {
      label: 'Total Articles',
      value: '245',
      change: '+12%',
      trend: 'up',
      sparkline: [12, 19, 15, 25, 22, 30, 28],
      color: '#10b981',
    },
    {
      label: 'Total Views',
      value: '1.2M',
      change: '+8%',
      trend: 'up',
      sparkline: [30, 40, 35, 50, 49, 60, 70],
      color: '#3b82f6',
    },
    {
      label: 'Translations',
      value: '89',
      change: '+25%',
      trend: 'up',
      sparkline: [5, 10, 8, 15, 13, 20, 22],
      color: '#8b5cf6',
    },
    {
      label: 'Media Files',
      value: '567',
      change: '+5%',
      trend: 'up',
      sparkline: [45, 52, 48, 60, 55, 67, 65],
      color: '#f59e0b',
    },
  ];

  const columns: GridColDef[] = [
    {
      field: 'title',
      headerName: 'Title',
      flex: 1,
      minWidth: 250,
      renderCell: (params: GridRenderCellParams) => (
        <Box>
          <Typography variant="body2" fontWeight={600}>
            {params.value}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            {params.row.author}
          </Typography>
        </Box>
      ),
    },
    {
      field: 'type',
      headerName: 'Type',
      width: 120,
      renderCell: (params: GridRenderCellParams) => (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          {params.value === 'article' && <FileText size={16} />}
          {params.value === 'video' && <Video size={16} />}
          {params.value === 'document' && <ImageIcon size={16} />}
          <Typography variant="body2" sx={{ textTransform: 'capitalize' }}>
            {params.value}
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
      field: 'language',
      headerName: 'Language',
      width: 130,
      renderCell: (params: GridRenderCellParams) => (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Globe size={16} />
          <Typography variant="body2">{params.value}</Typography>
        </Box>
      ),
    },
    {
      field: 'views',
      headerName: 'Views',
      width: 120,
      renderCell: (params: GridRenderCellParams) => (
        <Typography variant="body2" fontWeight={600}>
          {params.value.toLocaleString()}
        </Typography>
      ),
    },
    {
      field: 'lastModified',
      headerName: 'Last Modified',
      width: 140,
      renderCell: (params: GridRenderCellParams) => (
        <Typography variant="body2">
          {new Date(params.value).toLocaleDateString()}
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
            onClick={() => router.push(`/dashboard/content/${params.row.id}`)}
          >
            <Eye size={18} />
          </IconButton>
          <IconButton
            size="small"
            onClick={() => router.push(`/dashboard/content/${params.row.id}/edit`)}
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

  const filteredContent = mockContent.filter((item) => {
    const matchesSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.author.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = filterType === 'all' || item.type === filterType;
    const matchesStatus = filterStatus === 'all' || item.status === filterStatus;
    return matchesSearch && matchesType && matchesStatus;
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
            Content Management
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Manage articles, media, and translations
          </Typography>
        </Box>
        <Button
          variant="contained"
          startIcon={<Plus size={20} />}
          onClick={() => router.push('/dashboard/content/create')}
          sx={{ textTransform: 'none' }}
        >
          Create Content
        </Button>
      </Box>

      {/* Stats Cards - Dark theme style */}
      <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: 2, mb: 3 }}>
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
                    Last 30 days
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
            placeholder="Search content..."
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
            <InputLabel>Type</InputLabel>
            <Select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              label="Type"
            >
              <MenuItem value="all">All Types</MenuItem>
              <MenuItem value="article">Article</MenuItem>
              <MenuItem value="video">Video</MenuItem>
              <MenuItem value="document">Document</MenuItem>
            </Select>
          </FormControl>
          <FormControl sx={{ minWidth: 150 }}>
            <InputLabel>Status</InputLabel>
            <Select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              label="Status"
            >
              <MenuItem value="all">All Status</MenuItem>
              <MenuItem value="published">Published</MenuItem>
              <MenuItem value="draft">Draft</MenuItem>
              <MenuItem value="review">Review</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </Card>

      {/* Data Grid - Dark theme style */}
      <Card>
        <DataGrid
          rows={filteredContent}
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
