'use client';

import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  Typography,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Checkbox,
  Avatar,
  Chip,
} from '@mui/material';
import { Save, X, Upload, Image as ImageIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

interface PostFormData {
  content: string;
  campaign: string;
  scheduledDate: string;
  scheduledTime: string;
  status: string;
}

const statuses = ['draft', 'scheduled', 'published'];
const campaigns = [
  'Water Initiative Kenya 2024',
  'Education Program Launch',
  'Medical Mission Outreach',
  'Easter Campaign 2024',
];

const socialPlatforms = [
  { id: 'facebook', name: 'Facebook', color: '#1877f2' },
  { id: 'twitter', name: 'Twitter', color: '#1da1f2' },
  { id: 'instagram', name: 'Instagram', color: '#e4405f' },
  { id: 'linkedin', name: 'LinkedIn', color: '#0077b5' },
];

export default function CreatePostPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>(['facebook']);
  const [mediaPreview, setMediaPreview] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<PostFormData>();

  const content = watch('content', '');
  const characterCount = content?.length || 0;
  const characterLimit = 280;

  const handlePlatformToggle = (platformId: string) => {
    setSelectedPlatforms((prev) =>
      prev.includes(platformId)
        ? prev.filter((id) => id !== platformId)
        : [...prev, platformId]
    );
  };

  const handleMediaUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setMediaPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = async (data: PostFormData) => {
    setIsSubmitting(true);
    console.log('Creating post:', { ...data, platforms: selectedPlatforms });

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    router.push('/dashboard/campaigns/posts');
  };

  return (
    <Box>
      {/* Header */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="h4" fontWeight={600} gutterBottom>
          Create Social Media Post
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Compose and schedule a post across multiple platforms
        </Typography>
      </Box>

      {/* Form */}
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={3}>
          {/* Main Content */}
          <Grid item xs={12} md={8}>
            <Card sx={{ mb: 3 }}>
              <CardContent sx={{ p: 3 }}>
                <Typography variant="h6" fontWeight={600} gutterBottom>
                  Post Content
                </Typography>

                <Grid container spacing={2.5}>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      multiline
                      rows={6}
                      label="Post Text"
                      placeholder="Write your post content here..."
                      {...register('content', { required: 'Content is required' })}
                      error={!!errors.content}
                      helperText={
                        errors.content?.message ||
                        `${characterCount}/${characterLimit} characters`
                      }
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <FormControl fullWidth error={!!errors.campaign}>
                      <InputLabel>Associated Campaign</InputLabel>
                      <Select
                        label="Associated Campaign"
                        defaultValue=""
                        {...register('campaign', { required: 'Campaign is required' })}
                      >
                        {campaigns.map((campaign) => (
                          <MenuItem key={campaign} value={campaign}>
                            {campaign}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>

                  <Grid item xs={12}>
                    <Box>
                      <Typography variant="body2" gutterBottom>
                        Media Attachment
                      </Typography>
                      <Button
                        variant="outlined"
                        component="label"
                        startIcon={<Upload size={20} />}
                        sx={{ textTransform: 'none' }}
                      >
                        Upload Image/Video
                        <input
                          type="file"
                          hidden
                          accept="image/*,video/*"
                          onChange={handleMediaUpload}
                        />
                      </Button>
                      {mediaPreview && (
                        <Box
                          sx={{
                            mt: 2,
                            p: 2,
                            border: '2px dashed',
                            borderColor: 'divider',
                            borderRadius: 2,
                            textAlign: 'center',
                          }}
                        >
                          <ImageIcon size={48} color="#9ca3af" />
                          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                            Media uploaded
                          </Typography>
                        </Box>
                      )}
                    </Box>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>

            {/* Platform Selection */}
            <Card>
              <CardContent sx={{ p: 3 }}>
                <Typography variant="h6" fontWeight={600} gutterBottom>
                  Target Platforms
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                  Select the social media platforms where this post will be published
                </Typography>

                <Grid container spacing={2}>
                  {socialPlatforms.map((platform) => (
                    <Grid item xs={12} sm={6} key={platform.id}>
                      <Card
                        sx={{
                          p: 2,
                          cursor: 'pointer',
                          border: '2px solid',
                          borderColor: selectedPlatforms.includes(platform.id)
                            ? platform.color
                            : 'divider',
                          bgcolor: selectedPlatforms.includes(platform.id)
                            ? `${platform.color}15`
                            : 'background.paper',
                          transition: 'all 0.2s',
                          '&:hover': {
                            borderColor: platform.color,
                          },
                        }}
                        onClick={() => handlePlatformToggle(platform.id)}
                      >
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                          <Avatar
                            sx={{
                              width: 40,
                              height: 40,
                              bgcolor: platform.color,
                              fontSize: '1.25rem',
                              fontWeight: 700,
                            }}
                          >
                            {platform.name.charAt(0)}
                          </Avatar>
                          <Box sx={{ flex: 1 }}>
                            <Typography variant="body1" fontWeight={600}>
                              {platform.name}
                            </Typography>
                            <Typography variant="caption" color="text.secondary">
                              {selectedPlatforms.includes(platform.id)
                                ? 'Selected'
                                : 'Click to select'}
                            </Typography>
                          </Box>
                          <Checkbox
                            checked={selectedPlatforms.includes(platform.id)}
                            sx={{
                              color: platform.color,
                              '&.Mui-checked': {
                                color: platform.color,
                              },
                            }}
                          />
                        </Box>
                      </Card>
                    </Grid>
                  ))}
                </Grid>

                {selectedPlatforms.length === 0 && (
                  <Typography variant="caption" color="error" sx={{ mt: 2, display: 'block' }}>
                    Please select at least one platform
                  </Typography>
                )}
              </CardContent>
            </Card>
          </Grid>

          {/* Sidebar */}
          <Grid item xs={12} md={4}>
            <Card sx={{ mb: 3 }}>
              <CardContent sx={{ p: 3 }}>
                <Typography variant="h6" fontWeight={600} gutterBottom>
                  Schedule
                </Typography>

                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      type="date"
                      label="Scheduled Date"
                      InputLabelProps={{ shrink: true }}
                      {...register('scheduledDate', { required: 'Date is required' })}
                      error={!!errors.scheduledDate}
                      helperText={errors.scheduledDate?.message}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      type="time"
                      label="Scheduled Time"
                      InputLabelProps={{ shrink: true }}
                      {...register('scheduledTime', { required: 'Time is required' })}
                      error={!!errors.scheduledTime}
                      helperText={errors.scheduledTime?.message}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <FormControl fullWidth error={!!errors.status}>
                      <InputLabel>Status</InputLabel>
                      <Select
                        label="Status"
                        defaultValue="draft"
                        {...register('status', { required: 'Status is required' })}
                      >
                        {statuses.map((status) => (
                          <MenuItem key={status} value={status}>
                            <span style={{ textTransform: 'capitalize' }}>{status}</span>
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>

            <Card sx={{ mb: 3 }}>
              <CardContent sx={{ p: 3 }}>
                <Typography variant="h6" fontWeight={600} gutterBottom>
                  Selected Platforms
                </Typography>
                {selectedPlatforms.length > 0 ? (
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 2 }}>
                    {selectedPlatforms.map((platformId) => {
                      const platform = socialPlatforms.find((p) => p.id === platformId);
                      return (
                        <Chip
                          key={platformId}
                          label={platform?.name}
                          onDelete={() => handlePlatformToggle(platformId)}
                          sx={{
                            bgcolor: `${platform?.color}20`,
                            color: platform?.color,
                            fontWeight: 600,
                            border: `1px solid ${platform?.color}40`,
                          }}
                        />
                      );
                    })}
                  </Box>
                ) : (
                  <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
                    No platforms selected
                  </Typography>
                )}
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <Button
                type="submit"
                variant="contained"
                size="large"
                startIcon={<Save size={20} />}
                disabled={isSubmitting || selectedPlatforms.length === 0}
                fullWidth
              >
                {isSubmitting ? 'Creating...' : 'Create Post'}
              </Button>
              <Button
                variant="outlined"
                size="large"
                startIcon={<X size={20} />}
                onClick={() => router.push('/dashboard/campaigns/posts')}
                disabled={isSubmitting}
                fullWidth
              >
                Cancel
              </Button>
            </Box>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
}
