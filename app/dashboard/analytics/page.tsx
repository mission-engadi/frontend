'use client';

import {
  Box,
  Button,
  Card,
  CardContent,
  Typography,
  Grid,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Chip,
} from '@mui/material';
import {
  TrendingUp,
  TrendingDown,
  Users,
  DollarSign,
  Heart,
  Globe,
  Download,
  Calendar,
} from 'lucide-react';
import { useState } from 'react';
import { Line, Bar, Doughnut, Radar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  RadialLinearScale,
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
  ArcElement,
  RadialLinearScale,
  Title,
  Tooltip,
  Legend,
  Filler
);

export default function AnalyticsDashboardPage() {
  const [timeRange, setTimeRange] = useState('30days');

  // Key metrics with trends
  const keyMetrics = [
    {
      label: 'Total Revenue',
      value: '$1.2M',
      change: '+15.3%',
      trend: 'up',
      icon: <DollarSign size={24} />,
      color: '#10b981',
    },
    {
      label: 'Active Partners',
      value: '142',
      change: '+8.2%',
      trend: 'up',
      icon: <Users size={24} />,
      color: '#3b82f6',
    },
    {
      label: 'Campaign Reach',
      value: '234K',
      change: '+12.5%',
      trend: 'up',
      icon: <Globe size={24} />,
      color: '#f59e0b',
    },
    {
      label: 'Donations',
      value: '1,847',
      change: '-2.4%',
      trend: 'down',
      icon: <Heart size={24} />,
      color: '#ef4444',
    },
  ];

  // Revenue trend data (12 months)
  const revenueData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
      {
        label: 'Revenue',
        data: [85000, 92000, 88000, 95000, 102000, 98000, 110000, 115000, 108000, 120000, 118000, 125000],
        borderColor: '#10b981',
        backgroundColor: 'rgba(16, 185, 129, 0.1)',
        fill: true,
        tension: 0.4,
      },
      {
        label: 'Target',
        data: [90000, 90000, 95000, 95000, 100000, 100000, 105000, 105000, 110000, 110000, 115000, 115000],
        borderColor: '#6b7280',
        backgroundColor: 'transparent',
        borderDash: [5, 5],
        fill: false,
        tension: 0.4,
      },
    ],
  };

  // Project performance data
  const projectData = {
    labels: ['Water Initiative', 'Education Program', 'Medical Mission', 'General Fund', 'Tech Training'],
    datasets: [
      {
        label: 'Funds Raised ($K)',
        data: [450, 320, 280, 180, 120],
        backgroundColor: ['#3b82f6', '#10b981', '#f59e0b', '#8b5cf6', '#ef4444'],
        borderRadius: 8,
      },
    ],
  };

  // Geographic distribution
  const geographicData = {
    labels: ['North America', 'Europe', 'Africa', 'Asia', 'South America', 'Oceania'],
    datasets: [
      {
        data: [35, 28, 18, 12, 5, 2],
        backgroundColor: [
          '#3b82f6',
          '#10b981',
          '#f59e0b',
          '#8b5cf6',
          '#ef4444',
          '#06b6d4',
        ],
        borderWidth: 0,
      },
    ],
  };

  // Campaign performance radar
  const campaignPerformanceData = {
    labels: ['Reach', 'Engagement', 'Conversions', 'ROI', 'Sentiment'],
    datasets: [
      {
        label: 'Current Period',
        data: [85, 78, 65, 72, 88],
        backgroundColor: 'rgba(59, 130, 246, 0.2)',
        borderColor: '#3b82f6',
        borderWidth: 2,
      },
      {
        label: 'Previous Period',
        data: [70, 65, 58, 62, 75],
        backgroundColor: 'rgba(107, 114, 128, 0.2)',
        borderColor: '#6b7280',
        borderWidth: 2,
      },
    ],
  };

  // Partner growth data
  const partnerGrowthData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
      {
        label: 'New Partners',
        data: [8, 12, 10, 15, 14, 18, 16, 20, 19, 22, 21, 24],
        backgroundColor: '#3b82f6',
        borderRadius: 8,
      },
      {
        label: 'Churned',
        data: [2, 3, 1, 2, 4, 2, 3, 1, 2, 3, 2, 1],
        backgroundColor: '#ef4444',
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
        displayColors: true,
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
          callback: (value: any) => `$${(value / 1000).toFixed(0)}K`,
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

  const doughnutOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom' as const,
        labels: {
          color: '#9ca3af',
          padding: 15,
          usePointStyle: true,
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
  };

  const radarOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
        labels: {
          color: '#9ca3af',
          padding: 15,
        },
      },
    },
    scales: {
      r: {
        beginAtZero: true,
        max: 100,
        ticks: {
          color: '#9ca3af',
          backdropColor: 'transparent',
        },
        grid: {
          color: 'rgba(255, 255, 255, 0.1)',
        },
        pointLabels: {
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
            Analytics Dashboard
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Comprehensive insights and performance metrics
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <FormControl sx={{ minWidth: 150 }}>
            <InputLabel>Time Range</InputLabel>
            <Select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              label="Time Range"
            >
              <MenuItem value="7days">Last 7 Days</MenuItem>
              <MenuItem value="30days">Last 30 Days</MenuItem>
              <MenuItem value="90days">Last 90 Days</MenuItem>
              <MenuItem value="1year">Last Year</MenuItem>
              <MenuItem value="all">All Time</MenuItem>
            </Select>
          </FormControl>
          <Button
            variant="outlined"
            startIcon={<Download size={20} />}
            sx={{ textTransform: 'none' }}
          >
            Export
          </Button>
        </Box>
      </Box>

      {/* Key Metrics */}
      <Grid container spacing={2} sx={{ mb: 3 }}>
        {keyMetrics.map((metric) => (
          <Grid item xs={12} sm={6} md={3} key={metric.label}>
            <Card sx={{ border: '1px solid', borderColor: 'divider' }}>
              <CardContent sx={{ p: 2.5 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <Box>
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                      {metric.label}
                    </Typography>
                    <Typography variant="h4" fontWeight={700} gutterBottom>
                      {metric.value}
                    </Typography>
                    <Chip
                      icon={
                        metric.trend === 'up' ? (
                          <TrendingUp size={14} />
                        ) : (
                          <TrendingDown size={14} />
                        )
                      }
                      label={metric.change}
                      size="small"
                      sx={{
                        bgcolor:
                          metric.trend === 'up'
                            ? 'rgba(16, 185, 129, 0.15)'
                            : 'rgba(239, 68, 68, 0.15)',
                        color: metric.trend === 'up' ? '#10b981' : '#ef4444',
                        fontWeight: 600,
                      }}
                    />
                  </Box>
                  <Box
                    sx={{
                      width: 48,
                      height: 48,
                      borderRadius: 2,
                      bgcolor: `${metric.color}15`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: metric.color,
                    }}
                  >
                    {metric.icon}
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Revenue Trend */}
      <Card sx={{ mb: 3 }}>
        <CardContent sx={{ p: 3 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Box>
              <Typography variant="h6" fontWeight={600}>
                Revenue Trend
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Monthly revenue vs target over the past year
              </Typography>
            </Box>
            <Chip icon={<Calendar size={16} />} label="12 Months" />
          </Box>
          <Box sx={{ height: 350, mt: 2 }}>
            <Line data={revenueData} options={lineChartOptions} />
          </Box>
        </CardContent>
      </Card>

      {/* Charts Grid */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        {/* Project Performance */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent sx={{ p: 3 }}>
              <Typography variant="h6" fontWeight={600} gutterBottom>
                Project Performance
              </Typography>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                Funds raised by project
              </Typography>
              <Box sx={{ height: 300, mt: 2 }}>
                <Bar data={projectData} options={barChartOptions} />
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Geographic Distribution */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent sx={{ p: 3 }}>
              <Typography variant="h6" fontWeight={600} gutterBottom>
                Geographic Distribution
              </Typography>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                Partner distribution by region
              </Typography>
              <Box sx={{ height: 300, mt: 2 }}>
                <Doughnut data={geographicData} options={doughnutOptions} />
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Campaign Performance Radar */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent sx={{ p: 3 }}>
              <Typography variant="h6" fontWeight={600} gutterBottom>
                Campaign Performance
              </Typography>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                Multi-dimensional campaign analysis
              </Typography>
              <Box sx={{ height: 300, mt: 2 }}>
                <Radar data={campaignPerformanceData} options={radarOptions} />
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Partner Growth */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent sx={{ p: 3 }}>
              <Typography variant="h6" fontWeight={600} gutterBottom>
                Partner Growth
              </Typography>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                New partners vs churned over time
              </Typography>
              <Box sx={{ height: 300, mt: 2 }}>
                <Bar data={partnerGrowthData} options={barChartOptions} />
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}
