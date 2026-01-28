'use client';

import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Button,
  Chip,
  Alert,
  CircularProgress,
  Divider,
  Switch,
  FormControlLabel,
} from '@mui/material';
import {
  Bot,
  Save,
  RefreshCw,
  Settings,
} from 'lucide-react';
import { useState, useEffect } from 'react';
import { aiApi } from '@/lib/api-clients';

interface AgentConfig {
  agentName: string;
  llmProvider: string;
  llmFallback: string[];
  llmModel?: string;
  routingStrategy: 'cost' | 'quality' | 'speed' | 'default';
  maxCostPerRequest: number;
  temperature: number;
  maxTokens: number;
  enableImage: boolean;
  enableVideo: boolean;
  enableAudio: boolean;
  imageProvider?: string;
  videoProvider?: string;
  audioProvider?: string;
}

interface ProviderOption {
  value: string;
  label: string;
  type: string;
}

const agents = [
  {
    name: 'scraping_agent',
    label: 'Scraping Agent',
    description: 'Monitors crisis intelligence from multiple sources',
  },
  {
    name: 'validation_agent',
    label: 'Validation Agent',
    description: 'Cross-validates information and assesses credibility',
  },
  {
    name: 'budget_agent',
    label: 'Budget Agent',
    description: 'Generates budget proposals and cost analyses',
  },
  {
    name: 'project_management_agent',
    label: 'Project Management Agent',
    description: 'Creates project proposals, reports, and donor content',
  },
];

const routingStrategies = [
  { value: 'default', label: 'Default (Configured)' },
  { value: 'cost', label: 'Cost-Optimized (Cheapest)' },
  { value: 'quality', label: 'Quality-Optimized (Best)' },
  { value: 'speed', label: 'Speed-Optimized (Fastest)' },
];

export default function AgentConfigPage() {
  const [selectedAgent, setSelectedAgent] = useState('scraping_agent');
  const [config, setConfig] = useState<AgentConfig | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [providers, setProviders] = useState<{
    llm: ProviderOption[];
    image: ProviderOption[];
    video: ProviderOption[];
    audio: ProviderOption[];
  }>({
    llm: [],
    image: [],
    video: [],
    audio: [],
  });

  const fetchProviders = async () => {
    try {
      const response = await aiApi.get('/admin/providers/status');
      const data = response.data;

      setProviders({
        llm: Object.keys(data.llm || {}).map((name) => ({
          value: name,
          label: name.charAt(0).toUpperCase() + name.slice(1),
          type: 'llm',
        })),
        image: Object.keys(data.image || {}).map((name) => ({
          value: name,
          label: name.charAt(0).toUpperCase() + name.slice(1),
          type: 'image',
        })),
        video: Object.keys(data.video || {}).map((name) => ({
          value: name,
          label: name.charAt(0).toUpperCase() + name.slice(1),
          type: 'video',
        })),
        audio: Object.keys(data.audio || {}).map((name) => ({
          value: name,
          label: name.charAt(0).toUpperCase() + name.slice(1),
          type: 'audio',
        })),
      });
    } catch (err) {
      console.error('Error fetching providers:', err);
    }
  };

  const fetchAgentConfig = async (agentName: string) => {
    try {
      setLoading(true);

      // Fetch real agent configuration from API
      const response = await aiApi.get(`/admin/agents/${agentName}`);
      const data = response.data;

      const config: AgentConfig = {
        agentName: data.agent_name,
        llmProvider: data.llm_provider || '',
        llmFallback: data.llm_fallback || [],
        llmModel: data.llm_model,
        routingStrategy: data.routing_strategy || 'default',
        maxCostPerRequest: data.max_cost_per_request || 0.10,
        temperature: data.temperature || 0.7,
        maxTokens: data.max_tokens || 2000,
        enableImage: data.enable_image || false,
        enableVideo: data.enable_video || false,
        enableAudio: data.enable_audio || false,
        imageProvider: data.image_provider,
        videoProvider: data.video_provider,
        audioProvider: data.audio_provider,
      };

      setConfig(config);
      setError(null);
    } catch (err: any) {
      console.error('Error fetching agent config:', err);
      if (err.response?.status === 404) {
        setError('Agent configuration endpoints are not yet implemented in the AI service. This feature is coming soon!');
      } else {
        setError(err.response?.data?.detail || 'Failed to fetch agent configuration');
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProviders();
    fetchAgentConfig(selectedAgent);
  }, [selectedAgent]);

  const handleSave = async () => {
    if (!config) return;

    try {
      setSaving(true);
      setSuccess(false);

      // Save agent configuration to API
      const payload = {
        agent_name: config.agentName,
        llm_provider: config.llmProvider || null,
        llm_fallback: config.llmFallback || [],
        llm_model: config.llmModel || null,
        routing_strategy: config.routingStrategy,
        max_cost_per_request: config.maxCostPerRequest,
        temperature: config.temperature,
        max_tokens: config.maxTokens,
        enable_image: config.enableImage,
        enable_video: config.enableVideo,
        enable_audio: config.enableAudio,
        image_provider: config.imageProvider || null,
        video_provider: config.videoProvider || null,
        audio_provider: config.audioProvider || null,
      };

      await aiApi.post(
        `/admin/agents/${config.agentName}`,
        payload
      );

      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (err: any) {
      console.error('Error saving config:', err);
      if (err.response?.status === 404) {
        setError('Agent configuration endpoints are not yet implemented in the AI service. This feature is coming soon!');
      } else {
        setError(err.response?.data?.detail || 'Failed to save configuration');
      }
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <Container maxWidth="xl" sx={{ mt: 4, mb: 4, display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
        <CircularProgress />
      </Container>
    );
  }

  if (!config) return null;

  return (
    <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
      {/* Header */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Box>
          <Typography variant="h4" fontWeight={700} gutterBottom>
            Agent Configuration
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Configure provider preferences and settings for AI agents
          </Typography>
        </Box>
        <Button
          variant="contained"
          startIcon={saving ? <CircularProgress size={16} color="inherit" /> : <Save size={20} />}
          onClick={handleSave}
          disabled={saving}
        >
          Save Changes
        </Button>
      </Box>

      {/* Success/Error Alerts */}
      {success && (
        <Alert severity="success" sx={{ mb: 3 }}>
          Configuration saved successfully!
        </Alert>
      )}
      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      <Grid container spacing={3}>
        {/* Agent Selection */}
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" fontWeight={600} gutterBottom>
                Select Agent
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, mt: 2 }}>
                {agents.map((agent) => (
                  <Card
                    key={agent.name}
                    sx={{
                      cursor: 'pointer',
                      border: selectedAgent === agent.name ? 2 : 1,
                      borderColor: selectedAgent === agent.name ? 'primary.main' : 'divider',
                      bgcolor: selectedAgent === agent.name ? 'action.selected' : 'background.paper',
                      '&:hover': {
                        bgcolor: 'action.hover',
                      },
                    }}
                    onClick={() => setSelectedAgent(agent.name)}
                  >
                    <CardContent>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
                        <Bot size={18} />
                        <Typography variant="body1" fontWeight={600}>
                          {agent.label}
                        </Typography>
                      </Box>
                      <Typography variant="caption" color="text.secondary">
                        {agent.description}
                      </Typography>
                    </CardContent>
                  </Card>
                ))}
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Configuration Form */}
        <Grid item xs={12} md={8}>
          <Card>
            <CardContent>
              <Typography variant="h6" fontWeight={600} gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Settings size={20} />
                Configuration
              </Typography>

              <Box sx={{ mt: 3 }}>
                {/* LLM Configuration */}
                <Typography variant="subtitle1" fontWeight={600} gutterBottom>
                  LLM Provider
                </Typography>
                <Grid container spacing={2} sx={{ mb: 3 }}>
                  <Grid item xs={12} sm={6}>
                    <FormControl fullWidth>
                      <InputLabel>Primary Provider</InputLabel>
                      <Select
                        value={config.llmProvider}
                        label="Primary Provider"
                        onChange={(e) => setConfig({ ...config, llmProvider: e.target.value })}
                      >
                        {providers.llm.map((provider) => (
                          <MenuItem key={provider.value} value={provider.value}>
                            {provider.label}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <FormControl fullWidth>
                      <InputLabel>Routing Strategy</InputLabel>
                      <Select
                        value={config.routingStrategy}
                        label="Routing Strategy"
                        onChange={(e) => setConfig({ ...config, routingStrategy: e.target.value as any })}
                      >
                        {routingStrategies.map((strategy) => (
                          <MenuItem key={strategy.value} value={strategy.value}>
                            {strategy.label}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                </Grid>

                <Divider sx={{ my: 3 }} />

                {/* LLM Parameters */}
                <Typography variant="subtitle1" fontWeight={600} gutterBottom>
                  LLM Parameters
                </Typography>
                <Grid container spacing={2} sx={{ mb: 3 }}>
                  <Grid item xs={12} sm={4}>
                    <TextField
                      fullWidth
                      type="number"
                      label="Max Tokens"
                      value={config.maxTokens}
                      onChange={(e) => setConfig({ ...config, maxTokens: parseInt(e.target.value) })}
                      inputProps={{ min: 100, max: 32000, step: 100 }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <TextField
                      fullWidth
                      type="number"
                      label="Temperature"
                      value={config.temperature}
                      onChange={(e) => setConfig({ ...config, temperature: parseFloat(e.target.value) })}
                      inputProps={{ min: 0, max: 2, step: 0.1 }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <TextField
                      fullWidth
                      type="number"
                      label="Max Cost per Request ($)"
                      value={config.maxCostPerRequest}
                      onChange={(e) => setConfig({ ...config, maxCostPerRequest: parseFloat(e.target.value) })}
                      inputProps={{ min: 0.01, max: 10, step: 0.01 }}
                    />
                  </Grid>
                </Grid>

                <Divider sx={{ my: 3 }} />

                {/* Multimedia Capabilities */}
                <Typography variant="subtitle1" fontWeight={600} gutterBottom>
                  Multimedia Capabilities
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <FormControlLabel
                      control={
                        <Switch
                          checked={config.enableImage}
                          onChange={(e) => setConfig({ ...config, enableImage: e.target.checked })}
                        />
                      }
                      label="Enable Image Generation"
                    />
                  </Grid>
                  {config.enableImage && (
                    <Grid item xs={12} sm={6}>
                      <FormControl fullWidth>
                        <InputLabel>Image Provider</InputLabel>
                        <Select
                          value={config.imageProvider || ''}
                          label="Image Provider"
                          onChange={(e) => setConfig({ ...config, imageProvider: e.target.value })}
                        >
                          {providers.image.map((provider) => (
                            <MenuItem key={provider.value} value={provider.value}>
                              {provider.label}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Grid>
                  )}

                  <Grid item xs={12}>
                    <FormControlLabel
                      control={
                        <Switch
                          checked={config.enableVideo}
                          onChange={(e) => setConfig({ ...config, enableVideo: e.target.checked })}
                        />
                      }
                      label="Enable Video Generation"
                    />
                  </Grid>
                  {config.enableVideo && (
                    <Grid item xs={12} sm={6}>
                      <FormControl fullWidth>
                        <InputLabel>Video Provider</InputLabel>
                        <Select
                          value={config.videoProvider || ''}
                          label="Video Provider"
                          onChange={(e) => setConfig({ ...config, videoProvider: e.target.value })}
                        >
                          {providers.video.map((provider) => (
                            <MenuItem key={provider.value} value={provider.value}>
                              {provider.label}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Grid>
                  )}

                  <Grid item xs={12}>
                    <FormControlLabel
                      control={
                        <Switch
                          checked={config.enableAudio}
                          onChange={(e) => setConfig({ ...config, enableAudio: e.target.checked })}
                        />
                      }
                      label="Enable Audio Generation"
                    />
                  </Grid>
                  {config.enableAudio && (
                    <Grid item xs={12} sm={6}>
                      <FormControl fullWidth>
                        <InputLabel>Audio Provider</InputLabel>
                        <Select
                          value={config.audioProvider || ''}
                          label="Audio Provider"
                          onChange={(e) => setConfig({ ...config, audioProvider: e.target.value })}
                        >
                          {providers.audio.map((provider) => (
                            <MenuItem key={provider.value} value={provider.value}>
                              {provider.label}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Grid>
                  )}
                </Grid>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
}
