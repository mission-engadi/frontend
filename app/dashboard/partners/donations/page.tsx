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
  Grid,
} from '@mui/material';
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import {
  Plus,
  Search,
  Eye,
  Download,
  DollarSign,
  TrendingUp,
  Calendar,
  Heart,
  CreditCard,
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Bar, Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Title, Tooltip, Legend);

// Mock data
const mockDonations = [
  {
    id: 1,
    partner: 'Grace Community Church',
    amount: 5000,
    type: 'monthly',
    method: 'bank_transfer',
    status: 'completed',
    date: '2024-01-15',
    project: 'Water Initiative',
  },
  {
    id: 2,
    partner: 'Hope Foundation',
    amount: 25000,
    type: 'one-time',
    method: 'wire_transfer',
    status: 'completed',
    date: '2024-01-14',
    project: 'Education Program',
  },
  {
    id: 3,
    partner: 'Global Outreach Ministry',
    amount: 3500,
    type: 'monthly',
    method: 'credit_card',
    status: 'pending',
    date: '2024-01-16',
    project: 'Medical Mission',
  },
  {
    id: 4,
    partner: 'Compassion Network',
    amount: 1200,
    type: 'quarterly',
    method: 'paypal',
    status: 'completed',
    date: '2024-01-10',
    project: 'General Fund',
  },
];

const statusColors: Record<string, { bg: string; text: string }> = {
  completed: { bg: '#10b981', text: '#fff' },
  pending: { bg: '#f59e0b', text: '#fff' },
  failed: { bg: '#ef4444', text: '#fff' },
};

export default function DonationsPage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  const handleDownloadReceipt = (donationId: number) => {
    // Find the donation details
    const donation = mockDonations.find(d => d.id === donationId);
    console.log('Downloading receipt for donation:', donationId, donation);
    
    // In real implementation, this would generate and download a PDF receipt
    const receiptInfo = donation 
      ? `Receipt for ${donation.partner} - $${donation.amount.toLocaleString()} - ${donation.project}`
      : `Receipt for donation #${donationId}`;
    
    alert(`Generating PDF receipt...

${receiptInfo}

In production, this will automatically download as:
receipt-${donationId}-${new Date().getFullYear()}.pdf`);
  };

  // Monthly donations data for bar chart
  const monthlyData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
    datasets: [
      {
        label: 'Donations ($K)',
        data: [30, 35, 32, 40, 38, 42, 42.5],
        backgroundColor: '#3b82f6',
        borderRadius: 8,
      },
    ],
  };

  // Donation types for doughnut chart
  const donationTypesData = {
    labels: ['Monthly', 'One-time', 'Quarterly', 'Annual'],
    datasets: [
      {
        data: [45, 30, 15, 10],
        backgroundColor: ['#3b82f6', '#10b981', '#f59e0b', '#8b5cf6'],
        borderWidth: 0,
      },
    ],
  };

  const barOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: 'rgba(255, 255, 255, 0.1)',
        },
        ticks: {
          color: '#9ca3af',
        },
      },
      x: {
        grid: {
          display: false,
        },
        ticks: {
          color: '#9ca3af',
        },
      },
    },
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
      field: 'partner',
      headerName: 'Partner',
      flex: 1,
      minWidth: 200,
      renderCell: (params: GridRenderCellParams) => (
        <Typography variant="body2" fontWeight={600}>
          {params.value}
        </Typography>
      ),
    },
    {
      field: 'amount',
      headerName: 'Amount',
      width: 130,
      renderCell: (params: GridRenderCellParams) => (
        <Typography variant="body2" fontWeight={700} color="success.main">
          ${params.value.toLocaleString()}
        </Typography>
      ),
    },
    {
      field: 'type',
      headerName: 'Type',
      width: 120,
      renderCell: (params: GridRenderCellParams) => (
        <Typography variant="body2" sx={{ textTransform: 'capitalize' }}>
          {params.value}
        </Typography>
      ),
    },
    {
      field: 'method',
      headerName: 'Method',
      width: 150,
      renderCell: (params: GridRenderCellParams) => (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <CreditCard size={16} />
          <Typography variant="body2" sx={{ textTransform: 'capitalize' }}>
            {params.value.replace('_', ' ')}
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
      field: 'date',
      headerName: 'Date',
      width: 130,
      renderCell: (params: GridRenderCellParams) => (
        <Typography variant="body2">
          {new Date(params.value).toLocaleDateString()}
        </Typography>
      ),
    },
    {
      field: 'project',
      headerName: 'Project',
      width: 160,
    },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 100,
      sortable: false,
      renderCell: (params: GridRenderCellParams) => (
        <Box sx={{ display: 'flex', gap: 0.5 }}>
          <IconButton
            size="small"
            onClick={() => router.push(`/dashboard/partners/donations/${params.row.id}`)}
          >
            <Eye size={18} />
          </IconButton>
          <IconButton
            size="small"
            onClick={() => handleDownloadReceipt(params.row.id)}
          >
            <Download size={18} />
          </IconButton>
        </Box>
      ),
    },
  ];

  const filteredDonations = mockDonations.filter((donation) => {
    const matchesSearch =
      donation.partner.toLowerCase().includes(searchQuery.toLowerCase()) ||
      donation.project.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = filterStatus === 'all' || donation.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const stats = [
    { label: 'Total Raised', value: '$1.2M', icon: <DollarSign size={24} />, color: '#10b981' },
    { label: 'This Month', value: '$42.5K', icon: <Calendar size={24} />, color: '#3b82f6' },
    { label: 'Avg Donation', value: '$2,850', icon: <TrendingUp size={24} />, color: '#f59e0b' },
    { label: 'Total Donors', value: '156', icon: <Heart size={24} />, color: '#ef4444' },
  ];

  return (
    <Box>
      {/* Header */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Box>
          <Typography variant="h4" fontWeight={600} gutterBottom>
            Donations
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Track and manage all donation activities
          </Typography>
        </Box>
        <Button
          variant="contained"
          startIcon={<Plus size={20} />}
          onClick={() => router.push('/dashboard/partners/donations/new')}
          sx={{ textTransform: 'none' }}
        >
          Record Donation
        </Button>
      </Box>

      {/* Stats Cards */}
      <Grid container spacing={2} sx={{ mb: 3 }}>
        {stats.map((stat) => (
          <Grid item xs={12} sm={6} md={3} key={stat.label}>
            <Card sx={{ p: 2.5, border: '1px solid', borderColor: 'divider' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Box
                  sx={{
                    width: 48,
                    height: 48,
                    borderRadius: 2,
                    bgcolor: `${stat.color}15`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: stat.color,
                  }}
                >
                  {stat.icon}
                </Box>
                <Box>
                  <Typography variant="body2" color="text.secondary">
                    {stat.label}
                  </Typography>
                  <Typography variant="h5" fontWeight={700}>
                    {stat.value}
                  </Typography>
                </Box>
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Charts */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} md={8}>
          <Card sx={{ p: 3, border: '1px solid', borderColor: 'divider' }}>
            <Typography variant="h6" fontWeight={600} gutterBottom>
              Monthly Donations
            </Typography>
            <Box sx={{ height: 300, mt: 2 }}>
              <Bar data={monthlyData} options={barOptions} />
            </Box>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card sx={{ p: 3, border: '1px solid', borderColor: 'divider' }}>
            <Typography variant="h6" fontWeight={600} gutterBottom>
              Donation Types
            </Typography>
            <Box sx={{ height: 300, mt: 2 }}>
              <Doughnut data={donationTypesData} options={doughnutOptions} />
            </Box>
          </Card>
        </Grid>
      </Grid>

      {/* Filters */}
      <Card sx={{ mb: 3, p: 2 }}>
        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
          <TextField
            placeholder="Search donations..."
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
              <MenuItem value="completed">Completed</MenuItem>
              <MenuItem value="pending">Pending</MenuItem>
              <MenuItem value="failed">Failed</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </Card>

      {/* Data Grid */}
      <Card>
        <DataGrid
          rows={filteredDonations}
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
