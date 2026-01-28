'use client';

import { Box, Typography, Grid, Paper } from '@mui/material';
import {
  FolderKanban,
  Users,
  Megaphone,
  Heart,
  TrendingUp,
  Globe,
  TrendingDown,
} from 'lucide-react';
import {
  PageHeader,
  StatCard,
  StatsGrid,
  SectionCard,
  IconBox,
  neoBrutalistTokens,
} from '@/src/components/ui';

/**
 * Dashboard Overview Page - Neo-Brutalist Design
 *
 * Main dashboard page showing key metrics and recent activity.
 * Uses the shared UI components for consistent styling.
 */

export default function DashboardPage() {
  const stats = [
    {
      label: 'Active Projects',
      value: '24',
      icon: <FolderKanban size={24} />,
      color: neoBrutalistTokens.colors.electricBlue,
      change: '+12%',
      trend: 'up' as const,
      sparkline: [12, 15, 13, 18, 16, 22, 24],
    },
    {
      label: 'Partners',
      value: '156',
      icon: <Users size={24} />,
      color: neoBrutalistTokens.colors.success,
      change: '+8%',
      trend: 'up' as const,
      sparkline: [140, 145, 148, 150, 152, 154, 156],
    },
    {
      label: 'Active Campaigns',
      value: '8',
      icon: <Megaphone size={24} />,
      color: neoBrutalistTokens.colors.warning,
      change: '-2%',
      trend: 'down' as const,
      sparkline: [10, 9, 10, 9, 8, 9, 8],
    },
    {
      label: 'Total Donations',
      value: '$42.5K',
      icon: <Heart size={24} />,
      color: neoBrutalistTokens.colors.error,
      change: '+15%',
      trend: 'up' as const,
      sparkline: [30, 32, 35, 37, 39, 41, 42.5],
    },
  ];

  return (
    <Box>
      <PageHeader
        title="Overview"
        subtitle="Welcome to MinistryOS - Monitor your humanitarian impact"
      />

      {/* Stats Cards with Sparklines */}
      <StatsGrid columns={4}>
        {stats.map((stat) => (
          <StatCard
            key={stat.label}
            label={stat.label}
            value={stat.value}
            icon={stat.icon}
            color={stat.color}
            change={stat.change}
            trend={stat.trend}
            sparklineData={stat.sparkline}
          />
        ))}
      </StatsGrid>

      {/* Additional Info */}
      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <SectionCard
            title="Recent Activity"
            subtitle="Track your latest projects, campaigns, and partnership updates here."
          >
            <Box sx={{ py: 4, textAlign: 'center' }}>
              <Typography variant="body2" color="text.secondary">
                Activity feed will appear here as you use the platform.
              </Typography>
            </Box>
          </SectionCard>
        </Grid>

        <Grid item xs={12} md={4}>
          <SectionCard title="Global Reach">
            <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
              <IconBox
                icon={<Globe size={24} />}
                color={neoBrutalistTokens.colors.electricBlue}
              />
              <Box>
                <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                  Operating in <strong>12 countries</strong> across <strong>3 continents</strong>,
                  impacting thousands of lives through humanitarian aid and gospel outreach.
                </Typography>
              </Box>
            </Box>
          </SectionCard>
        </Grid>
      </Grid>
    </Box>
  );
}
