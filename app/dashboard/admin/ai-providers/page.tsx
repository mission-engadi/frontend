'use client';

import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Chip,
  IconButton,
  Button,
  CircularProgress,
  Alert,
} from '@mui/material';
import {
  Bot,
  Image,
  Video,
  Mic,
  RefreshCw,
  Settings,
  CheckCircle,
  AlertCircle,
  XCircle,
} from 'lucide-react';
import { useState, useEffect } from 'react';
import { aiApi } from '@/lib/api-clients';
import ProviderDetailModal from '@/src/components/admin/ProviderDetailModal';

interface Provider {
  name: string;
  type: 'llm' | 'image' | 'video' | 'audio';
  status: 'healthy' | 'degraded' | 'unavailable';
  enabled: boolean;
  models: string[];
  defaultModel: string;
  priority: number;
  costPerUnit: number;
  qualityRating: number;
  speedRating: number;
}

interface ProviderStatus {
  llm: { [key: string]: Provider };
  image: { [key: string]: Provider };
  video: { [key: string]: Provider };
  audio: { [key: string]: Provider };
}

const getProviderIcon = (type: string) => {
  switch (type) {
    case 'llm':
      return <Bot size={24} />;
    case 'image':
      return <Image size={24} />;
    case 'video':
      return <Video size={24} />;
    case 'audio':
      return <Mic size={24} />;
    default:
      return <Bot size={24} />;
  }
};

const getStatusColor = (status: string) => {
  switch (status) {
    case 'healthy':
      return 'success';
    case 'degraded':
      return 'warning';
    case 'unavailable':
      return 'error';
    default:
      return 'default';
  }
};

const getStatusIcon = (status: string) => {
  switch (status) {
    case 'healthy':
      return <CheckCircle size={20} />;
    case 'degraded':
      return <AlertCircle size={20} />;
    case 'unavailable':
      return <XCircle size={20} />;
    default:
      return <AlertCircle size={20} />;
  }
};

export default function AIProvidersPage() {
  const [providers, setProviders] = useState<ProviderStatus | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [refreshing, setRefreshing] = useState(false);
  const [selectedProvider, setSelectedProvider] = useState<Provider | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const fetchProviderStatus = async () => {
    try {
      setRefreshing(true);
      const response = await aiApi.get('/admin/providers/status');
      setProviders(response.data);
      setError(null);
    } catch (err: any) {
      console.error('Error fetching provider status:', err);
      setError(err.response?.data?.detail || 'Failed to fetch provider status');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchProviderStatus();
    // Refresh every 30 seconds
    const interval = setInterval(fetchProviderStatus, 30000);
    return () => clearInterval(interval);
  }, []);

  const renderProviderCard = (name: string, provider: Provider) => {
    return (
      <Grid item xs={12} sm={6} md={4} key={name}>
        <Card
          sx={{
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            transition: 'transform 0.2s, box-shadow 0.2s',
            '&:hover': {
              transform: 'translateY(-4px)',
              boxShadow: 4,
            },
          }}
        >
          <CardContent sx={{ flexGrow: 1 }}>
            {/* Header */}
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Box
                  sx={{
                    width: 40,
                    height: 40,
                    borderRadius: 1,
                    bgcolor: `${getStatusColor(provider.status)}.light`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: `${getStatusColor(provider.status)}.main`,
                  }}
                >
                  {getProviderIcon(provider.type)}
                </Box>
                <Box>
                  <Typography variant="h6" fontWeight={600}>
                    {name.charAt(0).toUpperCase() + name.slice(1)}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {provider.type.toUpperCase()}
                  </Typography>
                </Box>
              </Box>
              <IconButton
                size="small"
                onClick={() => {
                  setSelectedProvider(provider);
                  setModalOpen(true);
                }}
              >
                <Settings size={20} />
              </IconButton>
            </Box>

            {/* Status */}
            <Box sx={{ mb: 2 }}>
              <Chip
                icon={getStatusIcon(provider.status)}
                label={provider.status.charAt(0).toUpperCase() + provider.status.slice(1)}
                color={getStatusColor(provider.status) as any}
                size="small"
                sx={{ fontWeight: 500 }}
              />
              {!provider.enabled && (
                <Chip label="Disabled" size="small" sx={{ ml: 1 }} color="default" variant="outlined" />
              )}
            </Box>

            {/* Metrics */}
            <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
              <Box sx={{ flex: 1 }}>
                <Typography variant="caption" color="text.secondary">
                  Quality
                </Typography>
                <Box sx={{ display: 'flex', gap: 0.5, mt: 0.5 }}>
                  {[...Array(5)].map((_, i) => (
                    <Box
                      key={i}
                      sx={{
                        width: 8,
                        height: 8,
                        borderRadius: '50%',
                        bgcolor: i < provider.qualityRating ? 'primary.main' : 'grey.300',
                      }}
                    />
                  ))}
                </Box>
              </Box>
              <Box sx={{ flex: 1 }}>
                <Typography variant="caption" color="text.secondary">
                  Speed
                </Typography>
                <Box sx={{ display: 'flex', gap: 0.5, mt: 0.5 }}>
                  {[...Array(5)].map((_, i) => (
                    <Box
                      key={i}
                      sx={{
                        width: 8,
                        height: 8,
                        borderRadius: '50%',
                        bgcolor: i < provider.speedRating ? 'success.main' : 'grey.300',
                      }}
                    />
                  ))}
                </Box>
              </Box>
            </Box>

            {/* Models */}
            <Box>
              <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 0.5 }}>
                Models ({provider.models.length})
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                {provider.models.slice(0, 2).map((model) => (
                  <Chip key={model} label={model} size="small" variant="outlined" />
                ))}
                {provider.models.length > 2 && (
                  <Chip label={`+${provider.models.length - 2} more`} size="small" variant="outlined" />
                )}
              </Box>
            </Box>

            {/* Cost */}
            <Box sx={{ mt: 2, pt: 2, borderTop: 1, borderColor: 'divider' }}>
              <Typography variant="caption" color="text.secondary">
                Cost per unit
              </Typography>
              <Typography variant="body2" fontWeight={600}>
                ${provider.costPerUnit.toFixed(4)}
              </Typography>
            </Box>
          </CardContent>
        </Card>
      </Grid>
    );
  };

  if (loading) {
    return (
      <Container maxWidth="xl" sx={{ mt: 4, mb: 4, display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
        <CircularProgress />
      </Container>
    );
  }

  if (error) {
    return (
      <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
        <Button variant="contained" onClick={fetchProviderStatus}>
          Retry
        </Button>
      </Container>
    );
  }

  return (
    <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
      {/* Header */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Box>
          <Typography variant="h4" fontWeight={700} gutterBottom>
            AI Providers
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Manage AI providers, monitor status, and configure settings
          </Typography>
        </Box>
        <Button
          variant="outlined"
          startIcon={refreshing ? <CircularProgress size={16} /> : <RefreshCw size={20} />}
          onClick={fetchProviderStatus}
          disabled={refreshing}
        >
          Refresh
        </Button>
      </Box>

      {/* Provider Sections */}
      {providers && (
        <>
          {/* LLM Providers */}
          {Object.keys(providers.llm || {}).length > 0 && (
            <Box sx={{ mb: 4 }}>
              <Typography variant="h5" fontWeight={600} gutterBottom sx={{ mb: 2 }}>
                LLM Providers
              </Typography>
              <Grid container spacing={3}>
                {Object.entries(providers.llm).map(([name, provider]) => renderProviderCard(name, provider))}
              </Grid>
            </Box>
          )}

          {/* Image Providers */}
          {Object.keys(providers.image || {}).length > 0 && (
            <Box sx={{ mb: 4 }}>
              <Typography variant="h5" fontWeight={600} gutterBottom sx={{ mb: 2 }}>
                Image Providers
              </Typography>
              <Grid container spacing={3}>
                {Object.entries(providers.image).map(([name, provider]) => renderProviderCard(name, provider))}
              </Grid>
            </Box>
          )}

          {/* Video Providers */}
          {Object.keys(providers.video || {}).length > 0 && (
            <Box sx={{ mb: 4 }}>
              <Typography variant="h5" fontWeight={600} gutterBottom sx={{ mb: 2 }}>
                Video Providers
              </Typography>
              <Grid container spacing={3}>
                {Object.entries(providers.video).map(([name, provider]) => renderProviderCard(name, provider))}
              </Grid>
            </Box>
          )}

          {/* Audio Providers */}
          {Object.keys(providers.audio || {}).length > 0 && (
            <Box sx={{ mb: 4 }}>
              <Typography variant="h5" fontWeight={600} gutterBottom sx={{ mb: 2 }}>
                Audio Providers
              </Typography>
              <Grid container spacing={3}>
                {Object.entries(providers.audio).map(([name, provider]) => renderProviderCard(name, provider))}
              </Grid>
            </Box>
          )}
        </>
      )}

      {/* Provider Detail Modal */}
      <ProviderDetailModal
        open={modalOpen}
        provider={selectedProvider}
        onClose={() => {
          setModalOpen(false);
          setSelectedProvider(null);
        }}
        onToggleEnabled={(providerName, enabled) => {
          // TODO: Implement enable/disable API call
          console.log(`Toggle ${providerName} to ${enabled}`);
          setModalOpen(false);
          setSelectedProvider(null);
        }}
      />
    </Container>
  );
}
