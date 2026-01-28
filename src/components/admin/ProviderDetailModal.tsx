'use client';

import React, { useEffect, useState } from 'react';
import { aiApi } from '@/lib/api-clients';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
  Typography,
  Grid,
  Chip,
  Divider,
  List,
  ListItem,
  ListItemText,
  Switch,
  FormControlLabel,
  LinearProgress,
  Alert,
} from '@mui/material';
import {
  CheckCircle,
  XCircle,
  AlertCircle,
  TrendingUp,
  DollarSign,
  Zap,
  Star,
} from 'lucide-react';

interface ProviderStats {
  totalRequests: number;
  totalCost: number;
  averageLatency: number;
  successRate: number;
  last24Hours: {
    requests: number;
    cost: number;
  };
  last7Days: {
    requests: number;
    cost: number;
  };
}

interface ProviderDetail {
  name: string;
  type: string;
  status: 'healthy' | 'degraded' | 'unavailable';
  enabled: boolean;
  models: string[];
  defaultModel: string;
  priority: number;
  costPerUnit: number;
  qualityRating: number;
  speedRating: number;
  apiUrl?: string;
  stats?: ProviderStats;
}

interface ProviderDetailModalProps {
  open: boolean;
  provider: ProviderDetail | null;
  onClose: () => void;
  onToggleEnabled?: (providerName: string, enabled: boolean) => void;
}

export default function ProviderDetailModal({
  open,
  provider,
  onClose,
  onToggleEnabled,
}: ProviderDetailModalProps) {
  const [stats, setStats] = useState<ProviderStats | null>(null);
  const [loadingStats, setLoadingStats] = useState(false);

  // Fetch provider stats when modal opens
  useEffect(() => {
    if (open && provider) {
      fetchProviderStats();
    }
  }, [open, provider]);

  const fetchProviderStats = async () => {
    if (!provider) return;

    try {
      setLoadingStats(true);
      const response = await aiApi.get(
        `/admin/providers/${provider.type}/${provider.name}/stats?days=7`
      );

      const data = response.data;
      setStats({
        totalRequests: data.stats.total_requests,
        totalCost: data.stats.total_cost,
        averageLatency: data.stats.average_latency,
        successRate: data.stats.success_rate,
        last24Hours: {
          requests: data.stats.last_24_hours.requests,
          cost: data.stats.last_24_hours.cost,
        },
        last7Days: {
          requests: data.stats.last_7_days.requests,
          cost: data.stats.last_7_days.cost,
        },
      });
    } catch (error) {
      console.error('Error fetching provider stats:', error);
      // Stats are optional, don't block the modal
    } finally {
      setLoadingStats(false);
    }
  };

  if (!provider) return null;

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'healthy':
        return <CheckCircle size={20} color="#10b981" />;
      case 'degraded':
        return <AlertCircle size={20} color="#f59e0b" />;
      case 'unavailable':
        return <XCircle size={20} color="#ef4444" />;
      default:
        return null;
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

  const handleToggleEnabled = () => {
    if (onToggleEnabled) {
      onToggleEnabled(provider.name, !provider.enabled);
    }
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 2,
        },
      }}
    >
      <DialogTitle>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Typography variant="h5" fontWeight={700}>
              {provider.name.charAt(0).toUpperCase() + provider.name.slice(1)}
            </Typography>
            <Chip
              label={provider.type.toUpperCase()}
              size="small"
              color="primary"
              variant="outlined"
            />
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            {getStatusIcon(provider.status)}
            <Chip
              label={provider.status}
              size="small"
              color={getStatusColor(provider.status) as any}
            />
          </Box>
        </Box>
      </DialogTitle>

      <DialogContent dividers>
        {/* Status Alert */}
        {provider.status === 'unavailable' && (
          <Alert severity="warning" sx={{ mb: 3 }}>
            This provider is unavailable. Please check that the API key is configured in the
            environment variables.
          </Alert>
        )}
        {provider.status === 'degraded' && (
          <Alert severity="info" sx={{ mb: 3 }}>
            This provider is experiencing issues. Some features may not be available.
          </Alert>
        )}

        {/* Enable/Disable Toggle */}
        <Box sx={{ mb: 3 }}>
          <FormControlLabel
            control={
              <Switch
                checked={provider.enabled}
                onChange={handleToggleEnabled}
                color="primary"
              />
            }
            label={provider.enabled ? 'Provider Enabled' : 'Provider Disabled'}
          />
          <Typography variant="caption" color="text.secondary" display="block" sx={{ ml: 4 }}>
            {provider.enabled
              ? 'This provider is available for AI operations'
              : 'This provider will not be used for AI operations'}
          </Typography>
        </Box>

        <Divider sx={{ my: 3 }} />

        {/* Configuration Details */}
        <Typography variant="h6" fontWeight={600} gutterBottom>
          Configuration
        </Typography>

        <Grid container spacing={3} sx={{ mb: 3 }}>
          <Grid item xs={6}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
              <DollarSign size={18} color="#6b7280" />
              <Typography variant="body2" color="text.secondary">
                Cost per Unit
              </Typography>
            </Box>
            <Typography variant="h6" fontWeight={600}>
              ${provider.costPerUnit.toFixed(6)}
            </Typography>
          </Grid>

          <Grid item xs={6}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
              <TrendingUp size={18} color="#6b7280" />
              <Typography variant="body2" color="text.secondary">
                Priority
              </Typography>
            </Box>
            <Typography variant="h6" fontWeight={600}>
              {provider.priority}
            </Typography>
          </Grid>

          <Grid item xs={6}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
              <Star size={18} color="#6b7280" />
              <Typography variant="body2" color="text.secondary">
                Quality Rating
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <LinearProgress
                variant="determinate"
                value={(provider.qualityRating / 5) * 100}
                sx={{ flexGrow: 1, height: 8, borderRadius: 4 }}
              />
              <Typography variant="body2" fontWeight={600}>
                {provider.qualityRating}/5
              </Typography>
            </Box>
          </Grid>

          <Grid item xs={6}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
              <Zap size={18} color="#6b7280" />
              <Typography variant="body2" color="text.secondary">
                Speed Rating
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <LinearProgress
                variant="determinate"
                value={(provider.speedRating / 5) * 100}
                sx={{ flexGrow: 1, height: 8, borderRadius: 4 }}
                color="secondary"
              />
              <Typography variant="body2" fontWeight={600}>
                {provider.speedRating}/5
              </Typography>
            </Box>
          </Grid>
        </Grid>

        <Divider sx={{ my: 3 }} />

        {/* Available Models */}
        <Typography variant="h6" fontWeight={600} gutterBottom>
          Available Models
        </Typography>
        <List dense>
          {provider.models.map((model) => (
            <ListItem key={model} sx={{ py: 0.5 }}>
              <ListItemText
                primary={model}
                secondary={model === provider.defaultModel ? 'Default Model' : null}
                primaryTypographyProps={{
                  fontWeight: model === provider.defaultModel ? 600 : 400,
                }}
              />
              {model === provider.defaultModel && (
                <Chip label="Default" size="small" color="primary" />
              )}
            </ListItem>
          ))}
        </List>

        {/* Usage Statistics */}
        {stats && (
          <>
            <Divider sx={{ my: 3 }} />
            <Typography variant="h6" fontWeight={600} gutterBottom>
              Usage Statistics
            </Typography>

            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Box sx={{ p: 2, bgcolor: 'background.default', borderRadius: 1 }}>
                  <Typography variant="caption" color="text.secondary">
                    Total Requests
                  </Typography>
                  <Typography variant="h5" fontWeight={600}>
                    {stats.totalRequests.toLocaleString()}
                  </Typography>
                </Box>
              </Grid>

              <Grid item xs={6}>
                <Box sx={{ p: 2, bgcolor: 'background.default', borderRadius: 1 }}>
                  <Typography variant="caption" color="text.secondary">
                    Total Cost
                  </Typography>
                  <Typography variant="h5" fontWeight={600}>
                    ${stats.totalCost.toFixed(2)}
                  </Typography>
                </Box>
              </Grid>

              <Grid item xs={6}>
                <Box sx={{ p: 2, bgcolor: 'background.default', borderRadius: 1 }}>
                  <Typography variant="caption" color="text.secondary">
                    Avg Latency
                  </Typography>
                  <Typography variant="h5" fontWeight={600}>
                    {stats.averageLatency}ms
                  </Typography>
                </Box>
              </Grid>

              <Grid item xs={6}>
                <Box sx={{ p: 2, bgcolor: 'background.default', borderRadius: 1 }}>
                  <Typography variant="caption" color="text.secondary">
                    Success Rate
                  </Typography>
                  <Typography variant="h5" fontWeight={600} color="success.main">
                    {stats.successRate.toFixed(1)}%
                  </Typography>
                </Box>
              </Grid>
            </Grid>

            <Box sx={{ mt: 2 }}>
              <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                Last 24 Hours
              </Typography>
              <Typography variant="body2">
                {stats.last24Hours.requests} requests • $
                {stats.last24Hours.cost.toFixed(2)}
              </Typography>
            </Box>

            <Box sx={{ mt: 1 }}>
              <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                Last 7 Days
              </Typography>
              <Typography variant="body2">
                {stats.last7Days.requests} requests • $
                {stats.last7Days.cost.toFixed(2)}
              </Typography>
            </Box>
          </>
        )}

        {/* API URL (if available) */}
        {provider.apiUrl && (
          <>
            <Divider sx={{ my: 3 }} />
            <Typography variant="h6" fontWeight={600} gutterBottom>
              API Endpoint
            </Typography>
            <Typography
              variant="body2"
              sx={{
                fontFamily: 'monospace',
                bgcolor: 'background.default',
                p: 1.5,
                borderRadius: 1,
                wordBreak: 'break-all',
              }}
            >
              {provider.apiUrl}
            </Typography>
          </>
        )}
      </DialogContent>

      <DialogActions sx={{ p: 2.5 }}>
        <Button onClick={onClose} variant="contained">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
}
