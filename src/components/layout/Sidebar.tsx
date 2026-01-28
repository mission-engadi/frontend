'use client';

import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Collapse,
  Divider,
  Typography,
  useTheme,
} from '@mui/material';
import {
  LayoutDashboard,
  FolderKanban,
  FileText,
  Users,
  Megaphone,
  Search,
  Settings,
  ChevronDown,
  ChevronRight,
  Heart,
  MessageSquare,
  Share2,
  Bot,
  DollarSign,
  Sliders,
} from 'lucide-react';
import { useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';

/**
 * Sidebar Component - Neo-Brutalist Design
 *
 * Navigation sidebar with:
 * - Sharp corners (no border-radius)
 * - Bold typography
 * - High-contrast active states
 * - Clean hierarchy
 */

interface SidebarProps {
  onItemClick?: () => void;
}

interface MenuItem {
  label: string;
  icon: React.ReactNode;
  path?: string;
  children?: MenuItem[];
}

export function Sidebar({ onItemClick }: SidebarProps) {
  const theme = useTheme();
  const router = useRouter();
  const pathname = usePathname();
  const [openMenus, setOpenMenus] = useState<{ [key: string]: boolean }>({});
  const isDark = theme.palette.mode === 'dark';

  const menuItems: MenuItem[] = [
    {
      label: 'Dashboard',
      icon: <LayoutDashboard size={20} />,
      path: '/dashboard',
    },
    {
      label: 'Projects',
      icon: <FolderKanban size={20} />,
      path: '/dashboard/projects',
    },
    {
      label: 'Content',
      icon: <FileText size={20} />,
      path: '/dashboard/content',
    },
    {
      label: 'Partners & CRM',
      icon: <Users size={20} />,
      children: [
        { label: 'All Partners', icon: <Users size={18} />, path: '/dashboard/partners' },
        { label: 'Donations', icon: <Heart size={18} />, path: '/dashboard/partners/donations' },
      ],
    },
    {
      label: 'Campaigns',
      icon: <Megaphone size={20} />,
      children: [
        { label: 'All Campaigns', icon: <Megaphone size={18} />, path: '/dashboard/campaigns' },
        { label: 'Social Posts', icon: <Share2 size={18} />, path: '/dashboard/campaigns/posts' },
      ],
    },
    {
      label: 'Analytics',
      icon: <DollarSign size={20} />,
      path: '/dashboard/analytics',
    },
    {
      label: 'Search',
      icon: <Search size={20} />,
      path: '/dashboard/search',
    },
    {
      label: 'AI Admin',
      icon: <Bot size={20} />,
      children: [
        { label: 'Test AI Chat', icon: <MessageSquare size={18} />, path: '/dashboard/test-ai' },
        { label: 'Providers', icon: <Bot size={18} />, path: '/dashboard/admin/ai-providers' },
        { label: 'Cost Monitoring', icon: <DollarSign size={18} />, path: '/dashboard/admin/ai-providers/cost' },
        { label: 'Configuration', icon: <Sliders size={18} />, path: '/dashboard/admin/ai-providers/config' },
      ],
    },
  ];

  const handleMenuClick = (item: MenuItem) => {
    if (item.children) {
      setOpenMenus((prev) => ({
        ...prev,
        [item.label]: !prev[item.label],
      }));
    } else if (item.path) {
      router.push(item.path);
      onItemClick?.();
    }
  };

  const isActive = (path?: string) => {
    if (!path) return false;
    return pathname === path;
  };

  const renderMenuItem = (item: MenuItem, depth = 0) => {
    const hasChildren = item.children && item.children.length > 0;
    const isOpen = openMenus[item.label];
    const active = isActive(item.path);

    return (
      <Box key={item.label}>
        <ListItem disablePadding sx={{ mb: 0.5 }}>
          <ListItemButton
            onClick={() => handleMenuClick(item)}
            sx={{
              pl: 2 + depth * 2,
              py: 1.5,
              mx: 1.5,
              borderRadius: 0,
              border: active ? '2px solid' : '2px solid transparent',
              borderColor: active ? 'primary.main' : 'transparent',
              backgroundColor: active
                ? isDark
                  ? 'rgba(0, 102, 255, 0.15)'
                  : 'rgba(0, 102, 255, 0.08)'
                : 'transparent',
              transition: 'all 0.1s ease',
              '&:hover': {
                backgroundColor: isDark
                  ? 'rgba(255, 255, 255, 0.08)'
                  : 'rgba(0, 0, 0, 0.04)',
                borderColor: active ? 'primary.main' : isDark ? '#444' : '#ddd',
              },
            }}
          >
            <ListItemIcon
              sx={{
                minWidth: 36,
                color: active ? 'primary.main' : 'text.secondary',
              }}
            >
              {item.icon}
            </ListItemIcon>
            <ListItemText
              primary={item.label}
              primaryTypographyProps={{
                fontSize: depth === 0 ? '0.9rem' : '0.85rem',
                fontWeight: active ? 700 : depth === 0 ? 600 : 500,
                color: active ? 'primary.main' : 'text.primary',
                letterSpacing: '0.01em',
              }}
            />
            {hasChildren &&
              (isOpen ? (
                <ChevronDown size={16} color={theme.palette.text.secondary} />
              ) : (
                <ChevronRight size={16} color={theme.palette.text.secondary} />
              ))}
          </ListItemButton>
        </ListItem>

        {hasChildren && (
          <Collapse in={isOpen} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {item.children!.map((child) => renderMenuItem(child, depth + 1))}
            </List>
          </Collapse>
        )}
      </Box>
    );
  };

  return (
    <Box
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: 'background.default',
      }}
    >
      {/* Logo/Brand */}
      <Box
        sx={{
          p: 3,
          display: 'flex',
          alignItems: 'center',
          gap: 2,
        }}
      >
        <Box
          sx={{
            width: 40,
            height: 40,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'primary.main',
            border: '2px solid',
            borderColor: isDark ? '#fff' : '#000',
          }}
        >
          <Heart size={22} color="white" fill="white" />
        </Box>
        <Typography
          variant="h6"
          sx={{
            fontWeight: 800,
            letterSpacing: '-0.02em',
            color: 'text.primary',
          }}
        >
          MinistryOS
        </Typography>
      </Box>

      <Divider sx={{ borderWidth: 1 }} />

      {/* Navigation Menu */}
      <Box sx={{ flex: 1, overflowY: 'auto', py: 2 }}>
        <List component="nav">{menuItems.map((item) => renderMenuItem(item))}</List>
      </Box>

      <Divider sx={{ borderWidth: 1 }} />

      {/* Settings at bottom */}
      <List>
        <ListItem disablePadding>
          <ListItemButton
            onClick={() => {
              router.push('/dashboard/settings');
              onItemClick?.();
            }}
            sx={{
              py: 2,
              mx: 1.5,
              borderRadius: 0,
              '&:hover': {
                backgroundColor: isDark
                  ? 'rgba(255, 255, 255, 0.08)'
                  : 'rgba(0, 0, 0, 0.04)',
              },
            }}
          >
            <ListItemIcon sx={{ minWidth: 40, color: 'text.secondary' }}>
              <Settings size={20} />
            </ListItemIcon>
            <ListItemText
              primary="Settings"
              primaryTypographyProps={{
                fontWeight: 600,
              }}
            />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );
}
