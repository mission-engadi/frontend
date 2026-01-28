'use client';

import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  Typography,
  Grid,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  Chip,
} from '@mui/material';
import { Save, X, ArrowLeft, Upload } from 'lucide-react';
import { useRouter, useParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';

interface ContentFormData {
  title: string;
  description: string;
  type: string;
  status: string;
  language: string;
  category: string;
  content: string;
}

const contentTypes = ['article', 'video', 'document', 'image'];
const statuses = ['draft', 'review', 'published'];
const languages = ['English', 'Spanish', 'Portuguese', 'French', 'Swahili', 'Arabic'];
const categories = [
  'Project Updates',
  'Success Stories',
  'Educational',
  'Testimonials',
  'News & Events',
  'Resources',
];

// Mock data
const mockContent = {
  id: 1,
  title: 'Water Project Success Story',
  description:
    'How our clean water initiative transformed a rural community in Kenya, providing safe drinking water to over 2,500 people.',
  type: 'article',
  status: 'published',
  language: 'English',
  category: 'Success Stories',
  content: `# Transforming Lives Through Clean Water\n\nIn the heart of rural Kenya, the small village of Makutano faced a daily struggle...`,
  tags: ['water', 'kenya', 'infrastructure'],
};

export default function EditContentPage() {
  const router = useRouter();
  const params = useParams();
  const contentId = params?.id;
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const {
    register,
    handleSubmit,
    reset,
    watch,
    control,
    formState: { errors },
  } = useForm<ContentFormData>({
    defaultValues: {
      title: '',
      description: '',
      type: '',
      status: '',
      language: '',
      category: '',
      content: '',
    },
  });

  const contentType = watch('type');

  useEffect(() => {
    // Simulate loading content data
    setTimeout(() => {
      reset(mockContent);
      setSelectedTags(mockContent.tags);
      setIsLoading(false);
    }, 500);
  }, [reset, contentId]);

  const onSubmit = async (data: ContentFormData) => {
    setIsSubmitting(true);
    console.log('Updating content:', { ...data, tags: selectedTags });

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    router.push(`/dashboard/content/${contentId}`);
  };

  const handleAddTag = (tag: string) => {
    if (tag && !selectedTags.includes(tag)) {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  const handleDeleteTag = (tagToDelete: string) => {
    setSelectedTags(selectedTags.filter((tag) => tag !== tagToDelete));
  };

  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 400 }}>
        <Typography>Loading content...</Typography>
      </Box>
    );
  }

  return (
    <Box>
      {/* Header */}
      <Box sx={{ mb: 3 }}>
        <Button
          startIcon={<ArrowLeft size={20} />}
          onClick={() => router.push(`/dashboard/content/${contentId}`)}
          sx={{ mb: 2, textTransform: 'none' }}
        >
          Back to Content
        </Button>

        <Typography variant="h4" fontWeight={600} gutterBottom>
          Edit Content
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Update content details and information
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
                  Content Details
                </Typography>

                <Grid container spacing={2.5}>
                  {/* Title */}
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Title"
                      {...register('title', { required: 'Title is required' })}
                      error={!!errors.title}
                      helperText={errors.title?.message}
                    />
                  </Grid>

                  {/* Description */}
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      multiline
                      rows={2}
                      label="Description"
                      {...register('description', { required: 'Description is required' })}
                      error={!!errors.description}
                      helperText={errors.description?.message}
                    />
                  </Grid>

                  {/* Content Type */}
                  <Grid item xs={12} sm={6}>
                    <FormControl fullWidth error={!!errors.type}>
                      <InputLabel>Content Type</InputLabel>
                      <Controller
                        name="type"
                        control={control}
                        rules={{ required: 'Type is required' }}
                        render={({ field }) => (
                          <Select {...field} label="Content Type">
                            {contentTypes.map((type) => (
                              <MenuItem key={type} value={type}>
                                <span style={{ textTransform: 'capitalize' }}>{type}</span>
                              </MenuItem>
                            ))}
                          </Select>
                        )}
                      />
                    </FormControl>
                  </Grid>

                  {/* Language */}
                  <Grid item xs={12} sm={6}>
                    <FormControl fullWidth error={!!errors.language}>
                      <InputLabel>Language</InputLabel>
                      <Controller
                        name="language"
                        control={control}
                        rules={{ required: 'Language is required' }}
                        render={({ field }) => (
                          <Select {...field} label="Language">
                            {languages.map((lang) => (
                              <MenuItem key={lang} value={lang}>
                                {lang}
                              </MenuItem>
                            ))}
                          </Select>
                        )}
                      />
                    </FormControl>
                  </Grid>

                  {/* Content Body */}
                  <Grid item xs={12}>
                    {contentType !== 'video' && contentType !== 'image' ? (
                      <TextField
                        fullWidth
                        multiline
                        rows={12}
                        label="Content"
                        {...register('content', { required: 'Content is required' })}
                        error={!!errors.content}
                        helperText={errors.content?.message}
                      />
                    ) : (
                      <Box
                        sx={{
                          border: '2px dashed',
                          borderColor: 'divider',
                          borderRadius: 2,
                          p: 4,
                          textAlign: 'center',
                          cursor: 'pointer',
                          '&:hover': {
                            borderColor: 'primary.main',
                            bgcolor: 'action.hover',
                          },
                        }}
                      >
                        <Upload size={48} style={{ marginBottom: 16, opacity: 0.5 }} />
                        <Typography variant="body1" fontWeight={600} gutterBottom>
                          Click to replace media file
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {contentType === 'video' ? 'MP4, MOV, AVI' : 'PNG, JPG, GIF'} (max 50MB)
                        </Typography>
                      </Box>
                    )}
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>

          {/* Sidebar */}
          <Grid item xs={12} md={4}>
            <Card sx={{ mb: 3 }}>
              <CardContent sx={{ p: 3 }}>
                <Typography variant="h6" fontWeight={600} gutterBottom>
                  Publishing
                </Typography>

                <Grid container spacing={2.5}>
                  {/* Status */}
                  <Grid item xs={12}>
                    <FormControl fullWidth error={!!errors.status}>
                      <InputLabel>Status</InputLabel>
                      <Controller
                        name="status"
                        control={control}
                        rules={{ required: 'Status is required' }}
                        render={({ field }) => (
                          <Select {...field} label="Status">
                            {statuses.map((status) => (
                              <MenuItem key={status} value={status}>
                                <span style={{ textTransform: 'capitalize' }}>{status}</span>
                              </MenuItem>
                            ))}
                          </Select>
                        )}
                      />
                    </FormControl>
                  </Grid>

                  {/* Category */}
                  <Grid item xs={12}>
                    <FormControl fullWidth error={!!errors.category}>
                      <InputLabel>Category</InputLabel>
                      <Controller
                        name="category"
                        control={control}
                        rules={{ required: 'Category is required' }}
                        render={({ field }) => (
                          <Select {...field} label="Category">
                            {categories.map((cat) => (
                              <MenuItem key={cat} value={cat}>
                                {cat}
                              </MenuItem>
                            ))}
                          </Select>
                        )}
                      />
                    </FormControl>
                  </Grid>

                  {/* Tags */}
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Tags"
                      placeholder="Press Enter to add tags"
                      onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          const target = e.target as HTMLInputElement;
                          handleAddTag(target.value);
                          target.value = '';
                        }
                      }}
                    />
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 1.5 }}>
                      {selectedTags.map((tag) => (
                        <Chip
                          key={tag}
                          label={tag}
                          onDelete={() => handleDeleteTag(tag)}
                          size="small"
                        />
                      ))}
                    </Box>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <Button
                type="submit"
                variant="contained"
                size="large"
                startIcon={<Save size={20} />}
                disabled={isSubmitting}
                fullWidth
              >
                {isSubmitting ? 'Saving...' : 'Save Changes'}
              </Button>
              <Button
                variant="outlined"
                size="large"
                startIcon={<X size={20} />}
                onClick={() => router.push(`/dashboard/content/${contentId}`)}
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
