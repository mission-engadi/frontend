'use client';

import {
  Box,
  Button,
  Card,
  CardContent,
  Typography,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  LinearProgress,
  Avatar,
} from '@mui/material';
import {
  Download,
  TrendingUp,
  TrendingDown,
  Calendar,
  DollarSign,
  Users,
  Target,
} from 'lucide-react';
import { Line, Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
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
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

export default function ReportsPage() {
  const handleExportPDF = () => {
    console.log('Exporting report as PDF');
    // Simulate PDF generation
    const reportData = {
      topDonors,
      projectROI,
      date: new Date().toLocaleDateString(),
    };
    console.log('Report data:', reportData);
    alert('PDF report is being generated. This will download automatically in production.');
  };

  const handleExportExcel = () => {
    console.log('Exporting report as Excel');
    // Simulate Excel generation
    const reportData = {
      topDonors,
      projectROI,
      date: new Date().toLocaleDateString(),
    };
    console.log('Report data:', reportData);
    alert('Excel report is being generated. This will download automatically in production.');
  };
  // Top donors data
  const topDonors = [
    {
      id: 1,
      name: 'Grace Community Church',
      amount: 125000,
      donations: 36,
      trend: 'up',
      change: '+12%',
    },
    {
      id: 2,
      name: 'Hope Foundation',
      amount: 98000,
      donations: 24,
      trend: 'up',
      change: '+8%',
    },
    {
      id: 3,
      name: 'Faith Network',
      amount: 87000,
      donations: 18,
      trend: 'down',
      change: '-3%',
    },
    {
      id: 4,
      name: 'Global Outreach',
      amount: 72000,
      donations: 15,
      trend: 'up',
      change: '+5%',
    },
    {
      id: 5,
      name: 'Compassion Ministry',
      amount: 65000,
      donations: 12,
      trend: 'up',
      change: '+15%',
    },
  ];

  // Project ROI data
  const projectROI = [
    {
      name: 'Water Initiative',
      invested: 450000,
      impact: 890000,
      roi: 97.8,
      beneficiaries: 12500,
    },
    {
      name: 'Education Program',
      invested: 320000,
      impact: 580000,
      roi: 81.3,
      beneficiaries: 8900,
    },
    {
      name: 'Medical Mission',
      invested: 280000,
      impact: 520000,
      roi: 85.7,
      beneficiaries: 15200,
    },
    {
      name: 'Tech Training',
      invested: 120000,
      impact: 195000,
      roi: 62.5,
      beneficiaries: 3400,
    },
  ];

  // Monthly comparison data
  const monthlyComparisonData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
      {
        label: '2024',
        data: [85, 92, 88, 95, 102, 98, 110, 115, 108, 120, 118, 125],
        borderColor: '#3b82f6',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        fill: true,
        tension: 0.4,
      },
      {
        label: '2023',
        data: [75, 82, 79, 85, 88, 90, 92, 95, 93, 98, 96, 100],
        borderColor: '#6b7280',
        backgroundColor: 'rgba(107, 114, 128, 0.1)',
        fill: true,
        tension: 0.4,
      },
    ],
  };

  // Donation frequency data
  const donationFrequencyData = {
    labels: ['One-time', 'Monthly', 'Quarterly', 'Annual'],
    datasets: [
      {
        label: 'Count',
        data: [450, 320, 180, 95],
        backgroundColor: ['#3b82f6', '#10b981', '#f59e0b', '#8b5cf6'],
        borderRadius: 8,
      },
    ],
  };

  const lineChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
        labels: {
          color: '#9ca3af',
          usePointStyle: true,
          padding: 15,
        },
      },
      tooltip: {
        backgroundColor: '#1f2937',
        titleColor: '#f9fafb',
        bodyColor: '#f9fafb',
        borderColor: '#374151',
        borderWidth: 1,
        padding: 12,
      },
    },
    scales: {
      y: {
        beginAtZero: false,
        grid: {
          color: 'rgba(255, 255, 255, 0.1)',
        },
        ticks: {
          color: '#9ca3af',
          callback: (value: any) => `$${value}K`,
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

  const barChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: '#1f2937',
        titleColor: '#f9fafb',
        bodyColor: '#f9fafb',
        borderColor: '#374151',
        borderWidth: 1,
        padding: 12,
      },
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

  return (
    <Box>
      {/* Header */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Box>
          <Typography variant="h4" fontWeight={600} gutterBottom>
            Detailed Reports
          </Typography>
          <Typography variant="body2" color="text.secondary">
            In-depth analysis and performance reports
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button
            variant="outlined"
            startIcon={<Download size={20} />}
            onClick={handleExportPDF}
            sx={{ textTransform: 'none' }}
          >
            Export PDF
          </Button>
          <Button
            variant="contained"
            startIcon={<Download size={20} />}
            onClick={handleExportExcel}
            sx={{ textTransform: 'none' }}
          >
            Export Excel
          </Button>
        </Box>
      </Box>

      {/* Summary Cards */}
      <Grid container spacing={2} sx={{ mb: 3 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ border: '1px solid', borderColor: 'divider' }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Box
                  sx={{
                    width: 48,
                    height: 48,
                    borderRadius: 2,
                    bgcolor: 'rgba(16, 185, 129, 0.15)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#10b981',
                  }}
                >
                  <DollarSign size={24} />
                </Box>
                <Box>
                  <Typography variant="body2" color="text.secondary">
                    Avg Donation
                  </Typography>
                  <Typography variant="h5" fontWeight={700}>
                    $2,850
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ border: '1px solid', borderColor: 'divider' }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Box
                  sx={{
                    width: 48,
                    height: 48,
                    borderRadius: 2,
                    bgcolor: 'rgba(59, 130, 246, 0.15)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#3b82f6',
                  }}
                >
                  <Users size={24} />
                </Box>
                <Box>
                  <Typography variant="body2" color="text.secondary">
                    Retention Rate
                  </Typography>
                  <Typography variant="h5" fontWeight={700}>
                    87.3%
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ border: '1px solid', borderColor: 'divider' }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Box
                  sx={{
                    width: 48,
                    height: 48,
                    borderRadius: 2,
                    bgcolor: 'rgba(245, 158, 11, 0.15)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#f59e0b',
                  }}
                >
                  <Target size={24} />
                </Box>
                <Box>
                  <Typography variant="body2" color="text.secondary">
                    Goal Progress
                  </Typography>
                  <Typography variant="h5" fontWeight={700}>
                    78%
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ border: '1px solid', borderColor: 'divider' }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Box
                  sx={{
                    width: 48,
                    height: 48,
                    borderRadius: 2,
                    bgcolor: 'rgba(139, 92, 246, 0.15)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#8b5cf6',
                  }}
                >
                  <Calendar size={24} />
                </Box>
                <Box>
                  <Typography variant="body2" color="text.secondary">
                    YoY Growth
                  </Typography>
                  <Typography variant="h5" fontWeight={700}>
                    +23.5%
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Charts */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} md={8}>
          <Card>
            <CardContent sx={{ p: 3 }}>
              <Typography variant="h6" fontWeight={600} gutterBottom>
                Year-over-Year Comparison
              </Typography>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                Revenue comparison between 2024 and 2023
              </Typography>
              <Box sx={{ height: 300, mt: 2 }}>
                <Line data={monthlyComparisonData} options={lineChartOptions} />
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent sx={{ p: 3 }}>
              <Typography variant="h6" fontWeight={600} gutterBottom>
                Donation Frequency
              </Typography>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                Breakdown by frequency type
              </Typography>
              <Box sx={{ height: 300, mt: 2 }}>
                <Bar data={donationFrequencyData} options={barChartOptions} />
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Top Donors Table */}
      <Card sx={{ mb: 3 }}>
        <CardContent sx={{ p: 3 }}>
          <Typography variant="h6" fontWeight={600} gutterBottom>
            Top Donors
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            Highest contributing partners this year
          </Typography>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ fontWeight: 600 }}>Donor</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Total Amount</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Donations</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Trend</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {topDonors.map((donor, index) => (
                  <TableRow key={donor.id} hover>
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <Avatar
                          sx={{
                            width: 40,
                            height: 40,
                            bgcolor: 'primary.main',
                            fontSize: '1rem',
                            fontWeight: 700,
                          }}
                        >
                          {index + 1}
                        </Avatar>
                        <Typography variant="body2" fontWeight={600}>
                          {donor.name}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2" fontWeight={700} color="success.main">
                        ${donor.amount.toLocaleString()}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2">{donor.donations}</Typography>
                    </TableCell>
                    <TableCell>
                      <Chip
                        icon={
                          donor.trend === 'up' ? (
                            <TrendingUp size={14} />
                          ) : (
                            <TrendingDown size={14} />
                          )
                        }
                        label={donor.change}
                        size="small"
                        sx={{
                          bgcolor:
                            donor.trend === 'up'
                              ? 'rgba(16, 185, 129, 0.15)'
                              : 'rgba(239, 68, 68, 0.15)',
                          color: donor.trend === 'up' ? '#10b981' : '#ef4444',
                          fontWeight: 600,
                        }}
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>

      {/* Project ROI Table */}
      <Card>
        <CardContent sx={{ p: 3 }}>
          <Typography variant="h6" fontWeight={600} gutterBottom>
            Project ROI Analysis
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            Return on investment and impact metrics
          </Typography>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ fontWeight: 600 }}>Project</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Invested</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Impact Value</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>ROI</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Beneficiaries</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {projectROI.map((project) => (
                  <TableRow key={project.name} hover>
                    <TableCell>
                      <Typography variant="body2" fontWeight={600}>
                        {project.name}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2">
                        ${project.invested.toLocaleString()}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2" color="primary">
                        ${project.impact.toLocaleString()}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Box>
                        <Typography variant="body2" fontWeight={600} gutterBottom>
                          {project.roi}%
                        </Typography>
                        <LinearProgress
                          variant="determinate"
                          value={project.roi}
                          sx={{
                            height: 6,
                            borderRadius: 1,
                            bgcolor: 'rgba(59, 130, 246, 0.15)',
                          }}
                        />
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2">
                        {project.beneficiaries.toLocaleString()}
                      </Typography>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>
    </Box>
  );
}
