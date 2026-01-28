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
  Divider,
} from '@mui/material';
import {
  Edit,
  Trash2,
  ArrowLeft,
  Heart,
  MessageSquare,
  Share2,
  Eye,
  Calendar,
  Clock,
} from 'lucide-react';
import { useRouter, useParams } from 'next/navigation';
import Image from 'next/image';

// Mock post data
const mockPost = {
  id: 1,
  content: 'Join us in making a difference! Our Water Initiative in Kenya has reached 5,000 families with clean water access. Together, we can transform more lives. #WaterForLife #Kenya #HumanitarianAid',
  campaign: 'Water Initiative Kenya 2024',
  campaignId: 1,
  platforms: ['facebook', 'instagram'],
  status: 'published',
  scheduledDate: '2024-01-15T10:00:00',
  publishedDate: '2024-01-15T10:02:00',
  mediaType: 'image',
  mediaUrl: '/placeholder-water-project.jpg',
  reach: 12000,
  impressions: 15000,
  engagement: 850,
  likes: 620,
  comments: 130,
  shares: 100,
  clicks: 245,
};

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

export default function PostDetailPage() {
  const router = useRouter();
  const params = useParams();
  const postId = params?.id;

  const post = mockPost;

  return (
    <Box>
      {/* Header */}
      <Box sx={{ mb: 3 }}>
        <Button
          startIcon={<ArrowLeft size={20} />}
          onClick={() => router.push('/dashboard/campaigns/posts')}
          sx={{ mb: 2, textTransform: 'none' }}
        >
          Back to Posts
        </Button>

        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1 }}>
              <Typography variant="h4" fontWeight={600}>
                Post Details
              </Typography>
              <Chip
                label={post.status}
                size="small"
                sx={{
                  bgcolor: statusColors[post.status]?.bg,
                  color: statusColors[post.status]?.text,
                  textTransform: 'capitalize',
                  fontWeight: 600,
                }}
              />
            </Box>
            <Typography variant="body2" color="text.secondary">
              Campaign: {post.campaign}
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', gap: 1 }}>
            <Button
              variant="outlined"
              startIcon={<Edit size={20} />}
              onClick={() => router.push(`/dashboard/campaigns/posts/${postId}/edit`)}
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
          {/* Post Content */}
          <Card sx={{ mb: 3 }}>
            <CardContent sx={{ p: 3 }}>
              <Typography variant="h6" fontWeight={600} gutterBottom>
                Post Content
              </Typography>
              <Typography variant="body1" sx={{ whiteSpace: 'pre-wrap', mb: 2 }}>
                {post.content}
              </Typography>

              {/* Media Preview */}
              {post.mediaUrl && (
                <Box
                  sx={{
                    mt: 3,
                    borderRadius: 2,
                    overflow: 'hidden',
                    bgcolor: 'action.hover',
                    height: 300,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Typography color="text.secondary">
                    [Media Preview: {post.mediaType}]
                  </Typography>
                </Box>
              )}

              <Divider sx={{ my: 3 }} />

              {/* Platforms */}
              <Box>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  Published on
                </Typography>
                <Box sx={{ display: 'flex', gap: 1, mt: 1 }}>
                  {post.platforms.map((platform) => (
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
              </Box>
            </CardContent>
          </Card>

          {/* Performance Metrics */}
          <Card>
            <CardContent sx={{ p: 3 }}>
              <Typography variant="h6" fontWeight={600} gutterBottom>
                Performance Metrics
              </Typography>
              <Grid container spacing={2} sx={{ mt: 1 }}>
                <Grid item xs={6} sm={3}>
                  <Card sx={{ p: 2, textAlign: 'center', bgcolor: 'action.hover' }}>
                    <Eye size={24} color="#3b82f6" style={{ margin: '0 auto' }} />
                    <Typography variant="h5" fontWeight={700} sx={{ mt: 1 }}>
                      {(post.reach / 1000).toFixed(1)}K
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      Reach
                    </Typography>
                  </Card>
                </Grid>
                <Grid item xs={6} sm={3}>
                  <Card sx={{ p: 2, textAlign: 'center', bgcolor: 'action.hover' }}>
                    <Heart size={24} color="#ef4444" style={{ margin: '0 auto' }} />
                    <Typography variant="h5" fontWeight={700} sx={{ mt: 1 }} suppressHydrationWarning>
                      {post.likes.toLocaleString()}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      Likes
                    </Typography>
                  </Card>
                </Grid>
                <Grid item xs={6} sm={3}>
                  <Card sx={{ p: 2, textAlign: 'center', bgcolor: 'action.hover' }}>
                    <MessageSquare size={24} color="#10b981" style={{ margin: '0 auto' }} />
                    <Typography variant="h5" fontWeight={700} sx={{ mt: 1 }}>
                      {post.comments}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      Comments
                    </Typography>
                  </Card>
                </Grid>
                <Grid item xs={6} sm={3}>
                  <Card sx={{ p: 2, textAlign: 'center', bgcolor: 'action.hover' }}>
                    <Share2 size={24} color="#f59e0b" style={{ margin: '0 auto' }} />
                    <Typography variant="h5" fontWeight={700} sx={{ mt: 1 }}>
                      {post.shares}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      Shares
                    </Typography>
                  </Card>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>

        {/* Sidebar */}
        <Grid item xs={12} md={4}>
          {/* Schedule Info */}
          <Card sx={{ mb: 3 }}>
            <CardContent sx={{ p: 3 }}>
              <Typography variant="h6" fontWeight={600} gutterBottom>
                Schedule
              </Typography>

              <Box sx={{ mt: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
                <Box>
                  <Typography variant="caption" color="text.secondary">
                    Scheduled Time
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mt: 0.5 }}>
                    <Calendar size={16} />
                    <Typography variant="body2" suppressHydrationWarning>
                      {new Date(post.scheduledDate).toLocaleString()}
                    </Typography>
                  </Box>
                </Box>

                {post.publishedDate && (
                  <>
                    <Divider />
                    <Box>
                      <Typography variant="caption" color="text.secondary">
                        Published Time
                      </Typography>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mt: 0.5 }}>
                        <Clock size={16} />
                        <Typography variant="body2" suppressHydrationWarning>
                          {new Date(post.publishedDate).toLocaleString()}
                        </Typography>
                      </Box>
                    </Box>
                  </>
                )}
              </Box>
            </CardContent>
          </Card>

          {/* Additional Stats */}
          <Card>
            <CardContent sx={{ p: 3 }}>
              <Typography variant="h6" fontWeight={600} gutterBottom>
                Additional Stats
              </Typography>

              <Box sx={{ mt: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant="body2" color="text.secondary">
                    Impressions
                  </Typography>
                  <Typography variant="body2" fontWeight={600} suppressHydrationWarning>
                    {post.impressions.toLocaleString()}
                  </Typography>
                </Box>
                <Divider />
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant="body2" color="text.secondary">
                    Engagement
                  </Typography>
                  <Typography variant="body2" fontWeight={600} suppressHydrationWarning>
                    {post.engagement.toLocaleString()}
                  </Typography>
                </Box>
                <Divider />
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant="body2" color="text.secondary">
                    Clicks
                  </Typography>
                  <Typography variant="body2" fontWeight={600}>
                    {post.clicks}
                  </Typography>
                </Box>
                <Divider />
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant="body2" color="text.secondary">
                    Engagement Rate
                  </Typography>
                  <Typography variant="body2" fontWeight={600} color="success.main">
                    {((post.engagement / post.reach) * 100).toFixed(2)}%
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}
