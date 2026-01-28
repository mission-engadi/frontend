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
  InputAdornment,
  FormControl,
  InputLabel,
  Select,
  Chip,
} from '@mui/material';
import { Save, X, Upload, FileText, Image as ImageIcon, Video } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

interface ContentFormData {
  title: string;
  description: string;
  type: string;
  status: string;
  language: string;
  category: string;
  content: string;
  tags: string;
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

export default function CreateContentPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<ContentFormData>();

  const contentType = watch('type');

  const onSubmit = async (data: ContentFormData) => {
    setIsSubmitting(true);
    console.log('Creating content:', { ...data, tags: selectedTags });

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    router.push('/dashboard/content');
  };

  const handleAddTag = (tag: string) => {
    if (tag && !selectedTags.includes(tag)) {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  const handleDeleteTag = (tagToDelete: string) => {
    setSelectedTags(selectedTags.filter((tag) => tag !== tagToDelete));
  };

  return (
    <Box>
      {/* Header */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="h4" fontWeight={600} gutterBottom>
          Create New Content
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Add new articles, media, or documents to your content library
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
                      placeholder="Enter content title..."
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
                      placeholder="Brief description or excerpt..."
                      {...register('description', { required: 'Description is required' })}
                      error={!!errors.description}
                      helperText={errors.description?.message}
                    />
                  </Grid>

                  {/* Content Type */}
                  <Grid item xs={12} sm={6}>
                    <FormControl fullWidth error={!!errors.type}>
                      <InputLabel>Content Type</InputLabel>
                      <Select
                        label="Content Type"
                        defaultValue="article"
                        {...register('type', { required: 'Type is required' })}
                      >
                        {contentTypes.map((type) => (
                          <MenuItem key={type} value={type}>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                              {type === 'article' && <FileText size={18} />}
                              {type === 'video' && <Video size={18} />}
                              {type === 'image' && <ImageIcon size={18} />}
                              {type === 'document' && <FileText size={18} />}
                              <span style={{ textTransform: 'capitalize' }}>{type}</span>
                            </Box>
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>

                  {/* Language */}
                  <Grid item xs={12} sm={6}>
                    <FormControl fullWidth error={!!errors.language}>
                      <InputLabel>Language</InputLabel>
                      <Select
                        label="Language"
                        defaultValue="English"
                        {...register('language', { required: 'Language is required' })}
                      >
                        {languages.map((lang) => (
                          <MenuItem key={lang} value={lang}>
                            {lang}
                          </MenuItem>
                        ))}
                      </Select>
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
                        placeholder="Write your content here..."
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
                          Click to upload or drag and drop
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

                  {/* Category */}
                  <Grid item xs={12}>
                    <FormControl fullWidth error={!!errors.category}>
                      <InputLabel>Category</InputLabel>
                      <Select
                        label="Category"
                        defaultValue=""
                        {...register('category', { required: 'Category is required' })}
                      >
                        {categories.map((cat) => (
                          <MenuItem key={cat} value={cat}>
                            {cat}
                          </MenuItem>
                        ))}
                      </Select>
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
                {isSubmitting ? 'Publishing...' : 'Publish Content'}
              </Button>
              <Button
                variant="outlined"
                size="large"
                startIcon={<X size={20} />}
                onClick={() => router.push('/dashboard/content')}
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
