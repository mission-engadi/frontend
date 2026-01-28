'use client';

import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Typography,
  Grid,
  Avatar,
  IconButton,
  LinearProgress,
  Divider,
} from '@mui/material';
import {
  Edit,
  Trash2,
  ArrowLeft,
  TrendingUp,
  Users,
  Heart,
  MessageSquare,
  Share2,
  Eye,
  Calendar,
} from 'lucide-react';
import { useRouter, useParams } from 'next/navigation';
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

// Mock campaign data
const mockCampaign = {
  id: 1,
  title: 'Water Initiative Kenya 2024',
  status: 'active',
  description: `Our Water Initiative campaign aims to bring clean water to 10,000 families in rural Kenya. Through strategic social media engagement, we're raising awareness and funding for sustainable water solutions including wells, filtration systems, and education programs.`,
  platforms: ['facebook', 'twitter', 'instagram'],
  startDate: '2024-01-01',
  endDate: '2024-03-31',
  project: 'Water Initiative',
  postsScheduled: 24,
  postsPublished: 18,
  totalReach: 45000,
  impressions: 67000,
  engagement: 3200,
  engagementRate: 4.8,
  likes: 2100,
  comments: 580,
  shares: 520,
  clicks: 1850,
  newFollowers: 340,
  reachTrend: [25000, 28000, 32000, 35000, 38000, 42000, 45000],
  engagementTrend: [1800, 2000, 2300, 2600, 2800, 3000, 3200],
  platformBreakdown: {
    facebook: { reach: 22000, engagement: 1600 },
    twitter: { reach: 12000, engagement: 800 },
    instagram: { reach: 11000, engagement: 800 },
  },
  topPosts: [
    {
      id: 1,
      content: 'Join us in making a difference! Our Water Initiative...',
      platform: 'facebook',
      reach: 8500,
      engagement: 680,
      date: '2024-01-15',
    },
    {
      id: 2,
      content: 'Clean water changes everything. See the impact...',
      platform: 'instagram',
      reach: 6200,
      engagement: 520,
      date: '2024-01-18',
    },
    {
      id: 3,
      content: 'Every drop counts! Support our mission to...',
      platform: 'twitter',
      reach: 5800,
      engagement: 480,
      date: '2024-01-20',
    },
  ],
};

const statusColors: Record<string, { bg: string; text: string }> = {
  active: { bg: '#10b981', text: '#fff' },
  scheduled: { bg: '#3b82f6', text: '#fff' },
  completed: { bg: '#8b5cf6', text: '#fff' },
  paused: { bg: '#f59e0b', text: '#fff' },
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

export default function CampaignDetailPage() {
  const router = useRouter();
  const params = useParams();
  const campaignId = params?.id;

  const campaign = mockCampaign;
  const postsProgress = (campaign.postsPublished / campaign.postsScheduled) * 100;

  // Reach trend chart
  const reachChartData = {
    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5', 'Week 6', 'Week 7'],
    datasets: [
      {
        label: 'Reach',
        data: campaign.reachTrend,
        borderColor: '#3b82f6',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        fill: true,
        tension: 0.4,
      },
    ],
  };

  // Engagement trend chart
  const engagementChartData = {
    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5', 'Week 6', 'Week 7'],
    datasets: [
      {
        label: 'Engagement',
        data: campaign.engagementTrend,
        borderColor: '#10b981',
        backgroundColor: 'rgba(16, 185, 129, 0.1)',
        fill: true,
        tension: 0.4,
      },
    ],
  };

  // Platform breakdown chart
  const platformChartData = {
    labels: ['Facebook', 'Twitter', 'Instagram'],
    datasets: [
      {
        label: 'Reach',
        data: [
          campaign.platformBreakdown.facebook.reach,
          campaign.platformBreakdown.twitter.reach,
          campaign.platformBreakdown.instagram.reach,
        ],
        backgroundColor: ['#1877f2', '#1da1f2', '#e4405f'],
        borderRadius: 8,
      },
    ],
  };

  const lineChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
    },
    scales: {
      y: {
        beginAtZero: false,
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

  const barChartOptions = {
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

  return (
    <Box>
      {/* Header */}
      <Box sx={{ mb: 3 }}>
        <Button
          startIcon={<ArrowLeft size={20} />}
          onClick={() => router.push('/dashboard/campaigns')}
          sx={{ mb: 2, textTransform: 'none' }}
        >
          Back to Campaigns
        </Button>

        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1 }}>
              <Typography variant="h4" fontWeight={600}>
                {campaign.title}
              </Typography>
              <Chip
                label={campaign.status}
                size="small"
                sx={{
                  bgcolor: statusColors[campaign.status]?.bg,
                  color: statusColors[campaign.status]?.text,
                  textTransform: 'capitalize',
                  fontWeight: 600,
                }}
              />
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mt: 1 }}>
              <Box sx={{ display: 'flex', gap: 1 }}>
                {campaign.platforms.map((platform) => (
                  <Avatar
                    key={platform}
                    sx={{
                      width: 32,
                      height: 32,
                      bgcolor: platformColors[platform],
                      fontSize: '0.875rem',
                      fontWeight: 700,
                    }}
                  >
                    {platformIcons[platform]}
                  </Avatar>
                ))}
              </Box>
              <Typography variant="body2" color="text.secondary">
                {campaign.project}
              </Typography>
            </Box>
          </Box>

          <Box sx={{ display: 'flex', gap: 1 }}>
            <Button
              variant="outlined"
              startIcon={<Edit size={20} />}
              onClick={() => router.push(`/dashboard/campaigns/${campaignId}/edit`)}
              sx={{ textTransform: 'none' }}
            >
              Edit
            </Button>
            <IconButton color="error">
              <Trash2 size={20} />
            </IconButton>
          </Box>
        </Box>
      </Box>

      <Grid container spacing={3}>
        {/* Main Content */}
        <Grid item xs={12} md={8}>
          {/* Key Metrics */}
          <Grid container spacing={2} sx={{ mb: 3 }}>
            <Grid item xs={6} sm={3}>
              <Card sx={{ p: 2, textAlign: 'center' }}>
                <Users size={24} color="#3b82f6" style={{ margin: '0 auto' }} />
                <Typography variant="h5" fontWeight={700} sx={{ mt: 1 }}>
                  {(campaign.totalReach / 1000).toFixed(1)}K
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  Total Reach
                </Typography>
              </Card>
            </Grid>
            <Grid item xs={6} sm={3}>
              <Card sx={{ p: 2, textAlign: 'center' }}>
                <Heart size={24} color="#ef4444" style={{ margin: '0 auto' }} />
                <Typography variant="h5" fontWeight={700} sx={{ mt: 1 }} suppressHydrationWarning>
                  {campaign.likes.toLocaleString()}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  Likes
                </Typography>
              </Card>
            </Grid>
            <Grid item xs={6} sm={3}>
              <Card sx={{ p: 2, textAlign: 'center' }}>
                <MessageSquare size={24} color="#10b981" style={{ margin: '0 auto' }} />
                <Typography variant="h5" fontWeight={700} sx={{ mt: 1 }}>
                  {campaign.comments}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  Comments
                </Typography>
              </Card>
            </Grid>
            <Grid item xs={6} sm={3}>
              <Card sx={{ p: 2, textAlign: 'center' }}>
                <Share2 size={24} color="#f59e0b" style={{ margin: '0 auto' }} />
                <Typography variant="h5" fontWeight={700} sx={{ mt: 1 }}>
                  {campaign.shares}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  Shares
                </Typography>
              </Card>
            </Grid>
          </Grid>

          {/* Reach Trend */}
          <Card sx={{ mb: 3 }}>
            <CardContent sx={{ p: 3 }}>
              <Typography variant="h6" fontWeight={600} gutterBottom>
                Reach Growth
              </Typography>
              <Box sx={{ height: 250, mt: 2 }}>
                <Line data={reachChartData} options={lineChartOptions} />
              </Box>
            </CardContent>
          </Card>

          {/* Engagement Trend */}
          <Card sx={{ mb: 3 }}>
            <CardContent sx={{ p: 3 }}>
              <Typography variant="h6" fontWeight={600} gutterBottom>
                Engagement Over Time
              </Typography>
              <Box sx={{ height: 250, mt: 2 }}>
                <Line data={engagementChartData} options={lineChartOptions} />
              </Box>
            </CardContent>
          </Card>

          {/* Platform Breakdown */}
          <Card>
            <CardContent sx={{ p: 3 }}>
              <Typography variant="h6" fontWeight={600} gutterBottom>
                Platform Performance
              </Typography>
              <Box sx={{ height: 250, mt: 2 }}>
                <Bar data={platformChartData} options={barChartOptions} />
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Sidebar */}
        <Grid item xs={12} md={4}>
          {/* Campaign Info */}
          <Card sx={{ mb: 3 }}>
            <CardContent sx={{ p: 3 }}>
              <Typography variant="h6" fontWeight={600} gutterBottom>
                Campaign Details
              </Typography>

              <Box sx={{ mt: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
                <Box>
                  <Typography variant="caption" color="text.secondary">
                    Duration
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mt: 0.5 }}>
                    <Calendar size={16} />
                    <Typography variant="body2" suppressHydrationWarning>
                      {new Date(campaign.startDate).toLocaleDateString()} -{' '}
                      {new Date(campaign.endDate).toLocaleDateString()}
                    </Typography>
                  </Box>
                </Box>

                <Divider />

                <Box>
                  <Typography variant="caption" color="text.secondary">
                    Posts Progress
                  </Typography>
                  <Box sx={{ mt: 1 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                      <Typography variant="body2" fontWeight={600}>
                        {campaign.postsPublished}/{campaign.postsScheduled}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {postsProgress.toFixed(0)}%
                      </Typography>
                    </Box>
                    <LinearProgress
                      variant="determinate"
                      value={postsProgress}
                      sx={{ height: 8, borderRadius: 1 }}
                    />
                  </Box>
                </Box>

                <Divider />

                <Box>
                  <Typography variant="caption" color="text.secondary">
                    Engagement Rate
                  </Typography>
                  <Typography variant="h5" fontWeight={700} color="success.main" sx={{ mt: 0.5 }}>
                    {campaign.engagementRate}%
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>

          {/* Top Posts */}
          <Card>
            <CardContent sx={{ p: 3 }}>
              <Typography variant="h6" fontWeight={600} gutterBottom>
                Top Performing Posts
              </Typography>
              <Box sx={{ mt: 2 }}>
                {campaign.topPosts.map((post, index) => (
                  <Box key={post.id}>
                    <Box sx={{ py: 2 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                        <Avatar
                          sx={{
                            width: 24,
                            height: 24,
                            bgcolor: platformColors[post.platform],
                            fontSize: '0.7rem',
                            fontWeight: 700,
                          }}
                        >
                          {platformIcons[post.platform]}
                        </Avatar>
                        <Typography variant="caption" color="text.secondary" suppressHydrationWarning>
                          {new Date(post.date).toLocaleDateString()}
                        </Typography>
                      </Box>
                      <Typography variant="body2" noWrap gutterBottom>
                        {post.content}
                      </Typography>
                      <Box sx={{ display: 'flex', gap: 2, mt: 1 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                          <Eye size={14} color="#3b82f6" />
                          <Typography variant="caption">
                            {(post.reach / 1000).toFixed(1)}K
                          </Typography>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                          <TrendingUp size={14} color="#10b981" />
                          <Typography variant="caption">{post.engagement}</Typography>
                        </Box>
                      </Box>
                    </Box>
                    {index < campaign.topPosts.length - 1 && <Divider />}
                  </Box>
                ))}
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}
