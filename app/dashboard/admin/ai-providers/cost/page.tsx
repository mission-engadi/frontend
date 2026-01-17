'use client';

import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  LinearProgress,
  Chip,
  Alert,
  CircularProgress,
  Button,
} from '@mui/material';
import {
  DollarSign,
  TrendingUp,
  TrendingDown,
  AlertCircle,
  RefreshCw,
} from 'lucide-react';
import { useState, useEffect } from 'react';
import { apiClient, serviceUrls } from '@/src/config/api';
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

interface CostData {
  dailyCost: number;
  weeklyCost: number;
  monthlyCost: number;
  dailyBudget: number;
  alertThreshold: number;
  costByProvider: { name: string; cost: number; color: string }[];
  costByAgent: { name: string; cost: number }[];
  dailyTrend: { date: string; cost: number }[];
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#82ca9d'];

export default function CostMonitoringPage() {
  const [costData, setCostData] = useState<CostData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [refreshing, setRefreshing] = useState(false);

  const fetchCostData = async () => {
    try {
      setRefreshing(true);

      // TODO: Replace with actual API endpoint
      // For now, using mock data
      const mockData: CostData = {
        dailyCost: 12.45,
        weeklyCost: 78.30,
        monthlyCost: 289.75,
        dailyBudget: 100,
        alertThreshold: 80,
        costByProvider: [
          { name: 'Groq', cost: 2.35, color: '#0088FE' },
          { name: 'Claude', cost: 4.80, color: '#00C49F' },
          { name: 'GPT-4o', cost: 3.20, color: '#FFBB28' },
          { name: 'fal.ai', cost: 1.50, color: '#FF8042' },
          { name: 'ElevenLabs', cost: 0.60, color: '#8884D8' },
        ],
        costByAgent: [
          { name: 'Scraping', cost: 2.10 },
          { name: 'Validation', cost: 4.50 },
          { name: 'Budget', cost: 3.05 },
          { name: 'PM Agent', cost: 2.80 },
        ],
        dailyTrend: [
          { date: '2026-01-10', cost: 10.20 },
          { date: '2026-01-11', cost: 11.50 },
          { date: '2026-01-12', cost: 9.80 },
          { date: '2026-01-13', cost: 13.20 },
          { date: '2026-01-14', cost: 12.10 },
          { date: '2026-01-15', cost: 11.90 },
          { date: '2026-01-16', cost: 12.45 },
        ],
      };

      setCostData(mockData);
      setError(null);
    } catch (err: any) {
      console.error('Error fetching cost data:', err);
      setError(err.response?.data?.detail || 'Failed to fetch cost data');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchCostData();
    // Refresh every 60 seconds
    const interval = setInterval(fetchCostData, 60000);
    return () => clearInterval(interval);
  }, []);

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
        <Button variant="contained" onClick={fetchCostData}>
          Retry
        </Button>
      </Container>
    );
  }

  if (!costData) return null;

  const budgetUsagePercent = (costData.dailyCost / costData.dailyBudget) * 100;
  const isOverThreshold = budgetUsagePercent >= costData.alertThreshold;
  const isOverBudget = budgetUsagePercent >= 100;

  const totalDailyCost = costData.costByProvider.reduce((sum, p) => sum + p.cost, 0);

  return (
    <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
      {/* Header */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Box>
          <Typography variant="h4" fontWeight={700} gutterBottom>
            Cost Monitoring
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Track AI provider costs and budget usage
          </Typography>
        </Box>
        <Button
          variant="outlined"
          startIcon={refreshing ? <CircularProgress size={16} /> : <RefreshCw size={20} />}
          onClick={fetchCostData}
          disabled={refreshing}
        >
          Refresh
        </Button>
      </Box>

      {/* Budget Alert */}
      {isOverThreshold && (
        <Alert severity={isOverBudget ? 'error' : 'warning'} icon={<AlertCircle />} sx={{ mb: 3 }}>
          {isOverBudget
            ? `Daily budget exceeded! Current: $${costData.dailyCost.toFixed(2)} / Budget: $${costData.dailyBudget.toFixed(2)}`
            : `Daily cost approaching budget limit (${budgetUsagePercent.toFixed(1)}% used)`}
        </Alert>
      )}

      {/* Summary Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {/* Today's Cost */}
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
                <Typography variant="body2" color="text.secondary">
                  Today's Cost
                </Typography>
                <DollarSign size={20} color="#0088FE" />
              </Box>
              <Typography variant="h4" fontWeight={700}>
                ${costData.dailyCost.toFixed(2)}
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mt: 1 }}>
                <TrendingUp size={16} color="#10b981" />
                <Typography variant="caption" color="success.main">
                  +8% from yesterday
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Weekly Cost */}
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
                <Typography variant="body2" color="text.secondary">
                  This Week
                </Typography>
                <DollarSign size={20} color="#00C49F" />
              </Box>
              <Typography variant="h4" fontWeight={700}>
                ${costData.weeklyCost.toFixed(2)}
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mt: 1 }}>
                <TrendingDown size={16} color="#ef4444" />
                <Typography variant="caption" color="error.main">
                  -3% from last week
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Monthly Cost */}
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
                <Typography variant="body2" color="text.secondary">
                  This Month
                </Typography>
                <DollarSign size={20} color="#FFBB28" />
              </Box>
              <Typography variant="h4" fontWeight={700}>
                ${costData.monthlyCost.toFixed(2)}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                Projected: $558
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Budget Usage */}
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
                <Typography variant="body2" color="text.secondary">
                  Budget Usage
                </Typography>
                <Chip
                  label={`${budgetUsagePercent.toFixed(1)}%`}
                  size="small"
                  color={isOverBudget ? 'error' : isOverThreshold ? 'warning' : 'success'}
                />
              </Box>
              <Box sx={{ mt: 2 }}>
                <LinearProgress
                  variant="determinate"
                  value={Math.min(budgetUsagePercent, 100)}
                  color={isOverBudget ? 'error' : isOverThreshold ? 'warning' : 'primary'}
                  sx={{ height: 8, borderRadius: 4 }}
                />
              </Box>
              <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
                ${costData.dailyCost.toFixed(2)} / ${costData.dailyBudget.toFixed(2)} daily
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Charts */}
      <Grid container spacing={3}>
        {/* Cost by Provider (Pie Chart) */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" fontWeight={600} gutterBottom>
                Cost by Provider (Today)
              </Typography>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={costData.costByProvider}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${((percent ?? 0) * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="cost"
                  >
                    {costData.costByProvider.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value: number) => `$${value.toFixed(2)}`} />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>

        {/* Cost by Agent (Bar Chart) */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" fontWeight={600} gutterBottom>
                Cost by Agent (Today)
              </Typography>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={costData.costByAgent}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip formatter={(value: number) => `$${value.toFixed(2)}`} />
                  <Bar dataKey="cost" fill="#0088FE" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>

        {/* Daily Trend (Line Chart) */}
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h6" fontWeight={600} gutterBottom>
                Daily Cost Trend (Last 7 Days)
              </Typography>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={costData.dailyTrend}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip formatter={(value: number) => `$${value.toFixed(2)}`} />
                  <Legend />
                  <Line type="monotone" dataKey="cost" stroke="#0088FE" strokeWidth={2} dot={{ r: 4 }} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
}
