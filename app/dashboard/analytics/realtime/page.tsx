'use client';

import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  Chip,
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Divider,
} from '@mui/material';
import {
  Activity,
  Users,
  DollarSign,
  TrendingUp,
  Globe,
  Heart,
  MessageSquare,
  Share2,
  Eye,
} from 'lucide-react';
import { useState, useEffect } from 'react';
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

export default function RealTimeMetricsPage() {
  const [realtimeData, setRealtimeData] = useState<number[]>([45, 52, 48, 55, 51, 58, 62, 59, 65, 68]);
  const [currentValue, setCurrentValue] = useState(68);

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setRealtimeData((prev) => {
        const newValue = Math.floor(Math.random() * 20) + 50;
        setCurrentValue(newValue);
        const newData = [...prev.slice(1), newValue];
        return newData;
      });
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  // Real-time chart data
  const realtimeChartData = {
    labels: Array(10).fill(''),
    datasets: [
      {
        label: 'Active Users',
        data: realtimeData,
        borderColor: '#3b82f6',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        fill: true,
        tension: 0.4,
        pointRadius: 2,
      },
    ],
  };

  const realtimeChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    animation: {
      duration: 750,
    },
    plugins: {
      legend: { display: false },
      tooltip: { enabled: false },
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
          display: false,
        },
      },
    },
  };

  // Live activity feed
  const recentActivities = [
    {
      id: 1,
      type: 'donation',
      user: 'Grace Community Church',
      action: 'donated $5,000',
      time: '2 minutes ago',
      icon: <DollarSign size={20} />,
      color: '#10b981',
    },
    {
      id: 2,
      type: 'partner',
      user: 'Hope Foundation',
      action: 'became a partner',
      time: '5 minutes ago',
      icon: <Users size={20} />,
      color: '#3b82f6',
    },
    {
      id: 3,
      type: 'engagement',
      user: 'Social Media Post',
      action: '150 new engagements',
      time: '8 minutes ago',
      icon: <Heart size={20} />,
      color: '#ef4444',
    },
    {
      id: 4,
      type: 'share',
      user: 'Water Initiative Campaign',
      action: 'shared 45 times',
      time: '12 minutes ago',
      icon: <Share2 size={20} />,
      color: '#f59e0b',
    },
    {
      id: 5,
      type: 'view',
      user: 'Education Program',
      action: '320 new views',
      time: '15 minutes ago',
      icon: <Eye size={20} />,
      color: '#8b5cf6',
    },
  ];

  // Live metrics
  const liveMetrics = [
    {
      label: 'Active Users',
      value: currentValue,
      unit: '',
      icon: <Activity size={24} />,
      color: '#3b82f6',
    },
    {
      label: 'Today\'s Revenue',
      value: '$12,450',
      unit: '',
      icon: <DollarSign size={24} />,
      color: '#10b981',
    },
    {
      label: 'Page Views',
      value: '3,247',
      unit: '/hr',
      icon: <Globe size={24} />,
      color: '#f59e0b',
    },
    {
      label: 'Conversions',
      value: '24',
      unit: '/hr',
      icon: <TrendingUp size={24} />,
      color: '#ef4444',
    },
  ];

  // Platform engagement (live)
  const platformEngagement = [
    { platform: 'Facebook', count: 1250, color: '#1877f2', trend: '+12%' },
    { platform: 'Instagram', count: 980, color: '#e4405f', trend: '+8%' },
    { platform: 'Twitter', count: 750, color: '#1da1f2', trend: '+5%' },
    { platform: 'LinkedIn', count: 420, color: '#0077b5', trend: '+15%' },
  ];

  return (
    <Box>
      {/* Header */}
      <Box sx={{ mb: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1 }}>
          <Typography variant="h4" fontWeight={600}>
            Real-Time Metrics
          </Typography>
          <Chip
            icon={<Activity size={14} />}
            label="Live"
            size="small"
            sx={{
              bgcolor: 'rgba(16, 185, 129, 0.15)',
              color: '#10b981',
              fontWeight: 600,
              animation: 'pulse 2s infinite',
              '@keyframes pulse': {
                '0%, 100%': { opacity: 1 },
                '50%': { opacity: 0.6 },
              },
            }}
          />
        </Box>
        <Typography variant="body2" color="text.secondary">
          Live platform activity and performance metrics
        </Typography>
      </Box>

      {/* Live Metrics Cards */}
      <Grid container spacing={2} sx={{ mb: 3 }}>
        {liveMetrics.map((metric) => (
          <Grid item xs={12} sm={6} md={3} key={metric.label}>
            <Card sx={{ border: '1px solid', borderColor: 'divider' }}>
              <CardContent sx={{ p: 2.5 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <Box>
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                      {metric.label}
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 0.5 }}>
                      <Typography variant="h4" fontWeight={700}>
                        {metric.value}
                      </Typography>
                      {metric.unit && (
                        <Typography variant="caption" color="text.secondary">
                          {metric.unit}
                        </Typography>
                      )}
                    </Box>
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

      {/* Main Content Grid */}
      <Grid container spacing={3}>
        {/* Real-time Chart */}
        <Grid item xs={12} md={8}>
          <Card sx={{ mb: 3 }}>
            <CardContent sx={{ p: 3 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Box>
                  <Typography variant="h6" fontWeight={600}>
                    Active Users (Live)
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Real-time user activity on the platform
                  </Typography>
                </Box>
                <Chip
                  label="Updates every 3s"
                  size="small"
                  sx={{ bgcolor: 'rgba(59, 130, 246, 0.15)', color: '#3b82f6' }}
                />
              </Box>
              <Box sx={{ height: 250, mt: 2 }}>
                <Line data={realtimeChartData} options={realtimeChartOptions} />
              </Box>
            </CardContent>
          </Card>

          {/* Platform Engagement */}
          <Card>
            <CardContent sx={{ p: 3 }}>
              <Typography variant="h6" fontWeight={600} gutterBottom>
                Platform Engagement (Last Hour)
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                Live engagement across social platforms
              </Typography>
              <Grid container spacing={2}>
                {platformEngagement.map((platform) => (
                  <Grid item xs={12} sm={6} key={platform.platform}>
                    <Card
                      sx={{
                        bgcolor: `${platform.color}10`,
                        border: '1px solid',
                        borderColor: `${platform.color}30`,
                      }}
                    >
                      <CardContent sx={{ p: 2 }}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                            <Avatar
                              sx={{
                                width: 40,
                                height: 40,
                                bgcolor: platform.color,
                                fontSize: '1rem',
                                fontWeight: 700,
                              }}
                            >
                              {platform.platform.charAt(0)}
                            </Avatar>
                            <Box>
                              <Typography variant="body2" fontWeight={600}>
                                {platform.platform}
                              </Typography>
                              <Typography variant="h6" fontWeight={700} suppressHydrationWarning>
                                {platform.count.toLocaleString()}
                              </Typography>
                            </Box>
                          </Box>
                          <Chip
                            icon={<TrendingUp size={14} />}
                            label={platform.trend}
                            size="small"
                            sx={{
                              bgcolor: 'rgba(16, 185, 129, 0.15)',
                              color: '#10b981',
                              fontWeight: 600,
                            }}
                          />
                        </Box>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </CardContent>
          </Card>
        </Grid>

        {/* Activity Feed */}
        <Grid item xs={12} md={4}>
          <Card sx={{ height: '100%' }}>
            <CardContent sx={{ p: 3 }}>
              <Typography variant="h6" fontWeight={600} gutterBottom>
                Live Activity Feed
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                Recent platform activities
              </Typography>
              <List sx={{ p: 0 }}>
                {recentActivities.map((activity, index) => (
                  <Box key={activity.id}>
                    <ListItem
                      sx={{
                        px: 0,
                        py: 2,
                        '&:hover': {
                          bgcolor: 'rgba(255, 255, 255, 0.02)',
                          borderRadius: 1,
                        },
                      }}
                    >
                      <ListItemAvatar>
                        <Avatar
                          sx={{
                            bgcolor: `${activity.color}20`,
                            color: activity.color,
                          }}
                        >
                          {activity.icon}
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary={
                          <Typography variant="body2" fontWeight={600}>
                            {activity.user}
                          </Typography>
                        }
                        secondary={
                          <Box component="span" sx={{ display: 'block' }}>
                            <Typography variant="body2" color="text.secondary" component="span" sx={{ display: 'block' }}>
                              {activity.action}
                            </Typography>
                            <Typography variant="caption" color="text.secondary" component="span" sx={{ display: 'block' }}>
                              {activity.time}
                            </Typography>
                          </Box>
                        }
                      />
                    </ListItem>
                    {index < recentActivities.length - 1 && <Divider />}
                  </Box>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}
