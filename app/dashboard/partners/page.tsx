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
  Avatar,
} from '@mui/material';
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import {
  Plus,
  Search,
  Eye,
  Edit,
  Trash2,
  Mail,
  Phone,
  MapPin,
  Heart,
  TrendingUp,
  Users,
  DollarSign,
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
const mockPartners = [
  {
    id: 1,
    name: 'Grace Community Church',
    type: 'church',
    status: 'active',
    location: 'San Diego, USA',
    contact: 'pastor@gracecc.org',
    phone: '+1 (619) 555-0123',
    totalDonations: 125000,
    lastDonation: '2024-01-10',
    memberSince: '2020-03-15',
  },
  {
    id: 2,
    name: 'Hope Foundation',
    type: 'foundation',
    status: 'active',
    location: 'London, UK',
    contact: 'info@hopefoundation.org',
    phone: '+44 20 7946 0958',
    totalDonations: 450000,
    lastDonation: '2024-01-14',
    memberSince: '2018-06-20',
  },
  {
    id: 3,
    name: 'Global Outreach Ministry',
    type: 'ministry',
    status: 'active',
    location: 'Sydney, Australia',
    contact: 'contact@globaloutreach.au',
    phone: '+61 2 9876 5432',
    totalDonations: 89000,
    lastDonation: '2024-01-08',
    memberSince: '2021-11-10',
  },
  {
    id: 4,
    name: 'Compassion Network',
    type: 'nonprofit',
    status: 'inactive',
    location: 'Toronto, Canada',
    contact: 'hello@compassionnet.ca',
    phone: '+1 (416) 555-0199',
    totalDonations: 32000,
    lastDonation: '2023-10-22',
    memberSince: '2022-01-05',
  },
];

const statusColors: Record<string, { bg: string; text: string }> = {
  active: { bg: '#10b981', text: '#fff' },
  inactive: { bg: '#6b7280', text: '#fff' },
  pending: { bg: '#f59e0b', text: '#fff' },
};

const typeColors: Record<string, string> = {
  church: '#3b82f6',
  foundation: '#8b5cf6',
  ministry: '#10b981',
  nonprofit: '#f59e0b',
  individual: '#ef4444',
};

export default function PartnersListPage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');

  // Stats data
  const stats = [
    {
      label: 'Total Partners',
      value: '156',
      change: '+8%',
      trend: 'up',
      sparkline: [140, 145, 148, 150, 152, 154, 156],
      color: '#3b82f6',
    },
    {
      label: 'Active Partners',
      value: '142',
      change: '+5%',
      trend: 'up',
      sparkline: [130, 132, 135, 137, 139, 141, 142],
      color: '#10b981',
    },
    {
      label: 'Total Donations',
      value: '$1.2M',
      change: '+15%',
      trend: 'up',
      sparkline: [900, 950, 1000, 1050, 1100, 1150, 1200],
      color: '#f59e0b',
    },
    {
      label: 'This Month',
      value: '$42.5K',
      change: '+12%',
      trend: 'up',
      sparkline: [30, 32, 35, 37, 39, 41, 42.5],
      color: '#ef4444',
    },
  ];

  const columns: GridColDef[] = [
    {
      field: 'name',
      headerName: 'Partner Name',
      flex: 1,
      minWidth: 250,
      renderCell: (params: GridRenderCellParams) => (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Avatar
            sx={{
              bgcolor: typeColors[params.row.type as string] || '#3b82f6',
              width: 40,
              height: 40,
            }}
          >
            {params.value.charAt(0)}
          </Avatar>
          <Box>
            <Typography variant="body2" fontWeight={600}>
              {params.value}
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
              <MapPin size={12} />
              <Typography variant="caption" color="text.secondary">
                {params.row.location}
              </Typography>
            </Box>
          </Box>
        </Box>
      ),
    },
    {
      field: 'type',
      headerName: 'Type',
      width: 130,
      renderCell: (params: GridRenderCellParams) => (
        <Chip
          label={params.value}
          size="small"
          sx={{
            bgcolor: `${typeColors[params.value as string]}20`,
            color: typeColors[params.value as string],
            textTransform: 'capitalize',
            fontWeight: 600,
            border: `1px solid ${typeColors[params.value as string]}40`,
          }}
        />
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
      field: 'totalDonations',
      headerName: 'Total Donations',
      width: 150,
      renderCell: (params: GridRenderCellParams) => (
        <Typography variant="body2" fontWeight={600} color="success.main">
          ${params.value.toLocaleString()}
        </Typography>
      ),
    },
    {
      field: 'lastDonation',
      headerName: 'Last Donation',
      width: 140,
      renderCell: (params: GridRenderCellParams) => (
        <Typography variant="body2">
          {new Date(params.value).toLocaleDateString()}
        </Typography>
      ),
    },
    {
      field: 'contact',
      headerName: 'Contact',
      width: 200,
      renderCell: (params: GridRenderCellParams) => (
        <Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mb: 0.5 }}>
            <Mail size={12} />
            <Typography variant="caption">{params.value}</Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            <Phone size={12} />
            <Typography variant="caption" color="text.secondary">
              {params.row.phone}
            </Typography>
          </Box>
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
            onClick={() => router.push(`/dashboard/partners/${params.row.id}`)}
          >
            <Eye size={18} />
          </IconButton>
          <IconButton
            size="small"
            onClick={() => router.push(`/dashboard/partners/${params.row.id}/edit`)}
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

  const filteredPartners = mockPartners.filter((partner) => {
    const matchesSearch =
      partner.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      partner.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      partner.contact.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = filterType === 'all' || partner.type === filterType;
    const matchesStatus = filterStatus === 'all' || partner.status === filterStatus;
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
            Partners & CRM
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Manage your ministry partners and track donations
          </Typography>
        </Box>
        <Button
          variant="contained"
          startIcon={<Plus size={20} />}
          onClick={() => router.push('/dashboard/partners/create')}
          sx={{ textTransform: 'none' }}
        >
          Add Partner
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
            placeholder="Search partners..."
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
            <Select value={filterType} onChange={(e) => setFilterType(e.target.value)} label="Type">
              <MenuItem value="all">All Types</MenuItem>
              <MenuItem value="church">Church</MenuItem>
              <MenuItem value="foundation">Foundation</MenuItem>
              <MenuItem value="ministry">Ministry</MenuItem>
              <MenuItem value="nonprofit">Nonprofit</MenuItem>
              <MenuItem value="individual">Individual</MenuItem>
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
              <MenuItem value="active">Active</MenuItem>
              <MenuItem value="inactive">Inactive</MenuItem>
              <MenuItem value="pending">Pending</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </Card>

      {/* Data Grid */}
      <Card>
        <DataGrid
          rows={filteredPartners}
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
