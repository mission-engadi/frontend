'use client';

/**
 * Neo-Brutalist UI Components
 *
 * A collection of reusable UI components following the Neo-Brutalist design system.
 * These components ensure visual consistency across the application.
 */

import React, { ReactNode } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  Chip,
  Paper,
  useTheme,
  SxProps,
  Theme,
} from '@mui/material';
import { TrendingUp, TrendingDown, LucideIcon } from 'lucide-react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Filler,
} from 'chart.js';

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Filler);

// =============================================================================
// DESIGN TOKENS
// =============================================================================

export const neoBrutalistTokens = {
  colors: {
    electricBlue: '#0066FF',
    hotPink: '#FF1493',
    acidYellow: '#DFFF00',
    brightOrange: '#FF6B00',
    mintGreen: '#00FF7F',
    pureWhite: '#FFFFFF',
    jetBlack: '#000000',
    offWhite: '#F5F5F5',
    darkGray: '#1A1A1A',
    mediumGray: '#333333',
    success: '#00CC66',
    warning: '#FFAA00',
    error: '#FF3333',
    info: '#0099FF',
    // Text colors with WCAG AA compliant contrast ratios
    textPrimaryLight: '#000000', // On light backgrounds
    textPrimaryDark: '#FFFFFF', // On dark backgrounds
    textSecondaryLight: '#444444', // 7.1:1 contrast on #F5F5F5
    textSecondaryDark: '#CCCCCC', // 10.5:1 contrast on #1A1A1A
  },
  shadows: {
    small: '4px 4px 0px #000000',
    medium: '6px 6px 0px #000000',
    large: '8px 8px 0px #000000',
  },
  borders: {
    thin: '2px solid #000000',
    medium: '3px solid #000000',
    thick: '4px solid #000000',
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
  },
};

// =============================================================================
// PAGE HEADER COMPONENT
// =============================================================================

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  action?: ReactNode;
}

export function PageHeader({ title, subtitle, action }: PageHeaderProps) {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        mb: 4,
        flexWrap: 'wrap',
        gap: 2,
      }}
    >
      <Box>
        <Typography
          variant="h4"
          sx={{
            fontWeight: 800,
            letterSpacing: '-0.02em',
            mb: subtitle ? 1 : 0,
          }}
        >
          {title}
        </Typography>
        {subtitle && (
          <Typography variant="body1" color="text.secondary">
            {subtitle}
          </Typography>
        )}
      </Box>
      {action && <Box>{action}</Box>}
    </Box>
  );
}

// =============================================================================
// STAT CARD COMPONENT
// =============================================================================

interface StatCardProps {
  label: string;
  value: string | number;
  change?: string;
  trend?: 'up' | 'down';
  sparklineData?: number[];
  color?: string;
  icon?: ReactNode;
}

export function StatCard({
  label,
  value,
  change,
  trend,
  sparklineData,
  color = neoBrutalistTokens.colors.electricBlue,
  icon,
}: StatCardProps) {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';

  const sparklineChartData = sparklineData
    ? {
        labels: sparklineData.map(() => ''),
        datasets: [
          {
            data: sparklineData,
            borderColor: color,
            backgroundColor: `${color}20`,
            fill: true,
            tension: 0.4,
            pointRadius: 0,
            borderWidth: 2,
          },
        ],
      }
    : null;

  const sparklineOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: { enabled: false },
    },
    scales: {
      x: { display: false },
      y: { display: false },
    },
  };

  return (
    <Card
      sx={{
        height: '100%',
        transition: 'transform 0.15s ease, box-shadow 0.15s ease',
        '&:hover': {
          transform: 'translate(-2px, -2px)',
          boxShadow: '8px 8px 0px #000000',
        },
      }}
    >
      <CardContent sx={{ p: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2, mb: 2 }}>
          {icon && (
            <Box
              sx={{
                width: 48,
                height: 48,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: `${color}20`,
                border: `2px solid ${neoBrutalistTokens.colors.jetBlack}`,
                color: color,
              }}
            >
              {icon}
            </Box>
          )}
          <Box sx={{ flex: 1 }}>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', mb: 0.5 }}
            >
              {label}
            </Typography>
            <Typography variant="h4" sx={{ fontWeight: 800 }}>
              {value}
            </Typography>
          </Box>
        </Box>

        {(change || trend) && (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: sparklineData ? 2 : 0 }}>
            {trend === 'up' ? (
              <TrendingUp size={16} color={neoBrutalistTokens.colors.success} />
            ) : trend === 'down' ? (
              <TrendingDown size={16} color={neoBrutalistTokens.colors.error} />
            ) : null}
            <Typography
              variant="body2"
              sx={{
                color: trend === 'up' ? neoBrutalistTokens.colors.success : neoBrutalistTokens.colors.error,
                fontWeight: 700,
              }}
            >
              {change}
            </Typography>
            <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 500 }}>
              vs last period
            </Typography>
          </Box>
        )}

        {sparklineData && sparklineChartData && (
          <Box sx={{ height: 60, mt: 1 }}>
            <Line data={sparklineChartData} options={sparklineOptions} />
          </Box>
        )}
      </CardContent>
    </Card>
  );
}

// =============================================================================
// STATS GRID COMPONENT
// =============================================================================

interface StatsGridProps {
  children: ReactNode;
  columns?: number;
}

export function StatsGrid({ children, columns = 4 }: StatsGridProps) {
  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: {
          xs: '1fr',
          sm: 'repeat(2, 1fr)',
          md: `repeat(${Math.min(columns, 3)}, 1fr)`,
          lg: `repeat(${columns}, 1fr)`,
        },
        gap: 3,
        mb: 4,
      }}
    >
      {children}
    </Box>
  );
}

// =============================================================================
// FILTER BAR COMPONENT
// =============================================================================

interface FilterBarProps {
  children: ReactNode;
  sx?: SxProps<Theme>;
}

export function FilterBar({ children, sx }: FilterBarProps) {
  return (
    <Card sx={{ mb: 3, ...sx }}>
      <CardContent sx={{ py: 2 }}>
        <Box
          sx={{
            display: 'flex',
            gap: 2,
            flexWrap: 'wrap',
            alignItems: 'center',
          }}
        >
          {children}
        </Box>
      </CardContent>
    </Card>
  );
}

// =============================================================================
// STATUS CHIP COMPONENT
// =============================================================================

interface StatusChipProps {
  status: string;
  variant?: 'filled' | 'outlined';
}

const statusConfig: Record<string, { color: string; bgColor: string }> = {
  active: { color: '#FFFFFF', bgColor: neoBrutalistTokens.colors.success },
  published: { color: '#FFFFFF', bgColor: neoBrutalistTokens.colors.success },
  completed: { color: '#FFFFFF', bgColor: neoBrutalistTokens.colors.info },
  planned: { color: '#000000', bgColor: neoBrutalistTokens.colors.warning },
  pending: { color: '#000000', bgColor: neoBrutalistTokens.colors.warning },
  draft: { color: '#FFFFFF', bgColor: neoBrutalistTokens.colors.mediumGray },
  inactive: { color: '#FFFFFF', bgColor: neoBrutalistTokens.colors.mediumGray },
  on_hold: { color: '#FFFFFF', bgColor: neoBrutalistTokens.colors.mediumGray },
  cancelled: { color: '#FFFFFF', bgColor: neoBrutalistTokens.colors.error },
  error: { color: '#FFFFFF', bgColor: neoBrutalistTokens.colors.error },
  review: { color: '#000000', bgColor: neoBrutalistTokens.colors.warning },
};

export function StatusChip({ status, variant = 'filled' }: StatusChipProps) {
  const normalizedStatus = status.toLowerCase().replace(/\s+/g, '_');
  const config = statusConfig[normalizedStatus] || {
    color: '#FFFFFF',
    bgColor: neoBrutalistTokens.colors.mediumGray,
  };

  const displayLabel = status.replace(/_/g, ' ');

  return (
    <Chip
      label={displayLabel}
      size="small"
      sx={{
        backgroundColor: variant === 'filled' ? config.bgColor : 'transparent',
        color: variant === 'filled' ? config.color : config.bgColor,
        borderColor: config.bgColor,
        textTransform: 'capitalize',
        fontWeight: 700,
        letterSpacing: '0.02em',
      }}
      variant={variant === 'filled' ? 'filled' : 'outlined'}
    />
  );
}

// =============================================================================
// SECTION CARD COMPONENT
// =============================================================================

interface SectionCardProps {
  title: string;
  subtitle?: string;
  action?: ReactNode;
  children: ReactNode;
  noPadding?: boolean;
}

export function SectionCard({ title, subtitle, action, children, noPadding }: SectionCardProps) {
  return (
    <Card>
      <CardContent sx={{ p: noPadding ? 0 : 3 }}>
        {(title || action) && (
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-start',
              mb: subtitle ? 1 : 2,
              px: noPadding ? 3 : 0,
              pt: noPadding ? 3 : 0,
            }}
          >
            <Box>
              <Typography variant="h6" sx={{ fontWeight: 700 }}>
                {title}
              </Typography>
              {subtitle && (
                <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                  {subtitle}
                </Typography>
              )}
            </Box>
            {action && <Box>{action}</Box>}
          </Box>
        )}
        {children}
      </CardContent>
    </Card>
  );
}

// =============================================================================
// EMPTY STATE COMPONENT
// =============================================================================

interface EmptyStateProps {
  icon?: ReactNode;
  title: string;
  description?: string;
  action?: ReactNode;
}

export function EmptyState({ icon, title, description, action }: EmptyStateProps) {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        py: 8,
        px: 4,
        textAlign: 'center',
      }}
    >
      {icon && (
        <Box
          sx={{
            width: 80,
            height: 80,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: `${neoBrutalistTokens.colors.electricBlue}15`,
            border: `3px solid ${neoBrutalistTokens.colors.jetBlack}`,
            mb: 3,
            color: neoBrutalistTokens.colors.electricBlue,
          }}
        >
          {icon}
        </Box>
      )}
      <Typography variant="h5" sx={{ fontWeight: 700, mb: 1 }}>
        {title}
      </Typography>
      {description && (
        <Typography variant="body1" color="text.secondary" sx={{ mb: 3, maxWidth: 400 }}>
          {description}
        </Typography>
      )}
      {action && <Box>{action}</Box>}
    </Box>
  );
}

// =============================================================================
// ICON BOX COMPONENT
// =============================================================================

interface IconBoxProps {
  icon: ReactNode;
  color?: string;
  size?: 'small' | 'medium' | 'large';
}

export function IconBox({ icon, color = neoBrutalistTokens.colors.electricBlue, size = 'medium' }: IconBoxProps) {
  const sizeMap = {
    small: 32,
    medium: 48,
    large: 64,
  };

  return (
    <Box
      sx={{
        width: sizeMap[size],
        height: sizeMap[size],
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: `${color}20`,
        border: `2px solid ${neoBrutalistTokens.colors.jetBlack}`,
        color: color,
      }}
    >
      {icon}
    </Box>
  );
}

// =============================================================================
// ACTION BUTTON GROUP
// =============================================================================

interface ActionButtonGroupProps {
  children: ReactNode;
  align?: 'left' | 'right' | 'center';
}

export function ActionButtonGroup({ children, align = 'right' }: ActionButtonGroupProps) {
  return (
    <Box
      sx={{
        display: 'flex',
        gap: 2,
        justifyContent: align === 'left' ? 'flex-start' : align === 'right' ? 'flex-end' : 'center',
        mt: 4,
      }}
    >
      {children}
    </Box>
  );
}

// =============================================================================
// DATA LIST ITEM COMPONENT
// =============================================================================

interface DataListItemProps {
  label: string;
  value: ReactNode;
  icon?: ReactNode;
}

export function DataListItem({ label, value, icon }: DataListItemProps) {
  return (
    <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2, py: 1.5 }}>
      {icon && (
        <Box sx={{ color: 'text.secondary', mt: 0.5 }}>
          {icon}
        </Box>
      )}
      <Box sx={{ flex: 1 }}>
        <Typography
          variant="caption"
          color="text.secondary"
          sx={{ fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}
        >
          {label}
        </Typography>
        <Typography variant="body1" sx={{ fontWeight: 500 }}>
          {value}
        </Typography>
      </Box>
    </Box>
  );
}

// =============================================================================
// PROGRESS BAR COMPONENT
// =============================================================================

interface ProgressBarProps {
  value: number;
  max?: number;
  color?: string;
  showLabel?: boolean;
  height?: number;
}

export function ProgressBar({
  value,
  max = 100,
  color = neoBrutalistTokens.colors.electricBlue,
  showLabel = true,
  height = 24,
}: ProgressBarProps) {
  const percentage = Math.min((value / max) * 100, 100);

  return (
    <Box>
      <Box
        sx={{
          width: '100%',
          height: height,
          backgroundColor: 'background.default',
          border: `2px solid ${neoBrutalistTokens.colors.jetBlack}`,
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <Box
          sx={{
            width: `${percentage}%`,
            height: '100%',
            backgroundColor: color,
            transition: 'width 0.3s ease',
          }}
        />
        {showLabel && (
          <Typography
            variant="caption"
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              fontWeight: 700,
              color: percentage > 50 ? '#FFFFFF' : neoBrutalistTokens.colors.jetBlack,
            }}
          >
            {percentage.toFixed(0)}%
          </Typography>
        )}
      </Box>
    </Box>
  );
}

// =============================================================================
// EXPORTS
// =============================================================================

export default {
  PageHeader,
  StatCard,
  StatsGrid,
  FilterBar,
  StatusChip,
  SectionCard,
  EmptyState,
  IconBox,
  ActionButtonGroup,
  DataListItem,
  ProgressBar,
  neoBrutalistTokens,
};
