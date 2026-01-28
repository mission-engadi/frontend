'use client';

import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Typography,
  Divider,
  Avatar,
  IconButton,
  Grid,
} from '@mui/material';
import {
  Edit,
  Trash2,
  ArrowLeft,
  Eye,
  ThumbsUp,
  MessageCircle,
  Share2,
  Globe,
  Calendar,
  User,
  TrendingUp,
} from 'lucide-react';
import { useRouter, useParams } from 'next/navigation';
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

// Mock content data
const mockContent = {
  id: 1,
  title: 'Water Project Success Story',
  description:
    'How our clean water initiative transformed a rural community in Kenya, providing safe drinking water to over 2,500 people.',
  type: 'article',
  status: 'published',
  language: 'English',
  category: 'Success Stories',
  author: {
    name: 'John Doe',
    email: 'john@missionengadi.org',
    avatar: '',
  },
  publishedDate: '2024-01-15',
  lastModified: '2024-01-16',
  views: 21243,
  likes: 1284,
  comments: 89,
  shares: 342,
  content: `
# Transforming Lives Through Clean Water

In the heart of rural Kenya, the small village of Makutano faced a daily struggle that many of us take for granted: access to clean, safe drinking water. Before our intervention, villagers, primarily women and children, walked an average of 5 kilometers daily to fetch water from a contaminated river.

## The Challenge

The community of 2,500 people relied on a single water source that was:
- Shared with livestock
- Contaminated with bacteria and parasites
- Located far from the village center
- Causing frequent waterborne diseases

## Our Solution

Mission Engadi, in partnership with local communities, implemented a comprehensive water project that included:

1. **Installation of 10 Water Filtration Systems** - Strategically placed throughout the village to ensure easy access for all residents.

2. **Drilling of 5 New Wells** - Located in key areas to reduce travel time and provide backup sources.

3. **Hygiene Education Workshops** - Conducted for 500 families on water safety, sanitation, and disease prevention.

4. **Training Local Maintenance Personnel** - 20 community members trained to maintain and repair the systems, ensuring long-term sustainability.

## The Impact

Six months after project completion, the results have been remarkable:
- 95% reduction in waterborne diseases
- Children spend 3 more hours per day in school instead of fetching water
- Women can now engage in income-generating activities
- Community health has improved dramatically

## Looking Forward

This project serves as a model for our expansion into neighboring communities. With continued support from our partners and donors, we aim to bring clean water to 50,000 more people across East Africa by 2025.

*"Before, I spent half my day walking for water. Now, I have time to attend school and help my mother with her small business."* - Grace, 12-year-old student from Makutano
`,
  tags: ['water', 'kenya', 'infrastructure', 'community development', 'success story'],
  viewsData: [18500, 19200, 19800, 20100, 20500, 20900, 21243],
};

const statusColors: Record<string, { bg: string; text: string }> = {
  published: { bg: '#10b981', text: '#fff' },
  draft: { bg: '#6b7280', text: '#fff' },
  review: { bg: '#f59e0b', text: '#fff' },
};

export default function ContentDetailPage() {
  const router = useRouter();
  const params = useParams();
  const contentId = params?.id;

  const content = mockContent;

  const viewsChartData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        label: 'Views',
        data: content.viewsData,
        borderColor: '#3b82f6',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        fill: true,
        tension: 0.4,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        mode: 'index' as const,
        intersect: false,
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
          onClick={() => router.push('/dashboard/content')}
          sx={{ mb: 2, textTransform: 'none' }}
        >
          Back to Content
        </Button>

        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <Box sx={{ flex: 1 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1 }}>
              <Typography variant="h4" fontWeight={600}>
                {content.title}
              </Typography>
              <Chip
                label={content.status}
                size="small"
                sx={{
                  bgcolor: statusColors[content.status]?.bg,
                  color: statusColors[content.status]?.text,
                  textTransform: 'capitalize',
                  fontWeight: 600,
                }}
              />
            </Box>
            <Typography variant="body2" color="text.secondary">
              {content.description}
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', gap: 1 }}>
            <Button
              variant="outlined"
              startIcon={<Edit size={20} />}
              onClick={() => router.push(`/dashboard/content/${contentId}/edit`)}
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
          {/* Engagement Stats */}
          <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
            {[
              { icon: <Eye size={20} />, label: 'Views', value: content.views.toLocaleString(), color: '#3b82f6' },
              { icon: <ThumbsUp size={20} />, label: 'Likes', value: content.likes.toLocaleString(), color: '#10b981' },
              { icon: <MessageCircle size={20} />, label: 'Comments', value: content.comments, color: '#f59e0b' },
              { icon: <Share2 size={20} />, label: 'Shares', value: content.shares, color: '#8b5cf6' },
            ].map((stat) => (
              <Box
                key={stat.label}
                sx={{
                  flex: 1,
                  p: 2,
                  borderRadius: 2,
                  border: '1px solid',
                  borderColor: 'divider',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1.5,
                }}
              >
                <Box
                  sx={{
                    width: 40,
                    height: 40,
                    borderRadius: 1.5,
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
                  <Typography variant="h6" fontWeight={700}>
                    {stat.value}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {stat.label}
                  </Typography>
                </Box>
              </Box>
            ))}
          </Box>

          {/* Views Chart */}
          <Card sx={{ mb: 3 }}>
            <CardContent sx={{ p: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                <TrendingUp size={20} />
                <Typography variant="h6" fontWeight={600}>
                  Views Over Last 7 Days
                </Typography>
              </Box>
              <Box sx={{ height: 200 }}>
                <Line data={viewsChartData} options={chartOptions} />
              </Box>
            </CardContent>
          </Card>

          {/* Content Body */}
          <Card>
            <CardContent sx={{ p: 4 }}>
              <Typography
                variant="body1"
                sx={{
                  whiteSpace: 'pre-line',
                  lineHeight: 1.8,
                  '& h1': { fontSize: '2rem', fontWeight: 700, mt: 3, mb: 2 },
                  '& h2': { fontSize: '1.5rem', fontWeight: 600, mt: 3, mb: 2 },
                  '& p': { mb: 2 },
                  '& ul, & ol': { pl: 3, mb: 2 },
                }}
              >
                {content.content}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Sidebar */}
        <Grid item xs={12} md={4}>
          {/* Author Info */}
          <Card sx={{ mb: 3 }}>
            <CardContent sx={{ p: 3 }}>
              <Typography variant="h6" fontWeight={600} gutterBottom>
                Author
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Avatar sx={{ width: 48, height: 48, bgcolor: 'primary.main' }}>
                  {content.author.name.charAt(0)}
                </Avatar>
                <Box>
                  <Typography variant="body1" fontWeight={600}>
                    {content.author.name}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {content.author.email}
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>

          {/* Metadata */}
          <Card sx={{ mb: 3 }}>
            <CardContent sx={{ p: 3 }}>
              <Typography variant="h6" fontWeight={600} gutterBottom>
                Details
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                  <Box
                    sx={{
                      p: 1,
                      borderRadius: 1,
                      bgcolor: 'primary.main',
                      display: 'flex',
                      color: 'white',
                    }}
                  >
                    <Globe size={18} />
                  </Box>
                  <Box>
                    <Typography variant="caption" color="text.secondary">
                      Language
                    </Typography>
                    <Typography variant="body2" fontWeight={600}>
                      {content.language}
                    </Typography>
                  </Box>
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                  <Box
                    sx={{
                      p: 1,
                      borderRadius: 1,
                      bgcolor: 'success.main',
                      display: 'flex',
                      color: 'white',
                    }}
                  >
                    <Calendar size={18} />
                  </Box>
                  <Box>
                    <Typography variant="caption" color="text.secondary">
                      Published
                    </Typography>
                    <Typography variant="body2" fontWeight={600}>
                      {new Date(content.publishedDate).toLocaleDateString()}
                    </Typography>
                  </Box>
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                  <Box
                    sx={{
                      p: 1,
                      borderRadius: 1,
                      bgcolor: 'warning.main',
                      display: 'flex',
                      color: 'white',
                    }}
                  >
                    <User size={18} />
                  </Box>
                  <Box>
                    <Typography variant="caption" color="text.secondary">
                      Category
                    </Typography>
                    <Typography variant="body2" fontWeight={600}>
                      {content.category}
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </CardContent>
          </Card>

          {/* Tags */}
          <Card>
            <CardContent sx={{ p: 3 }}>
              <Typography variant="h6" fontWeight={600} gutterBottom>
                Tags
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                {content.tags.map((tag) => (
                  <Chip key={tag} label={tag} size="small" />
                ))}
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}
