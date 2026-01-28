'use client';

import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Box,
  Avatar,
  Menu,
  MenuItem,
  Badge,
  Tooltip,
  useTheme,
} from '@mui/material';
import {
  Menu as MenuIcon,
  Bell,
  Moon,
  Sun,
  Search,
  User,
  LogOut,
  Settings,
} from 'lucide-react';
import { useState } from 'react';
import { useUIStore } from '@/src/stores/uiStore';

interface HeaderProps {
  onMenuClick: () => void;
  drawerWidth: number;
}

export function Header({ onMenuClick, drawerWidth }: HeaderProps) {
  const theme = useTheme();
  const { theme: currentTheme, setTheme } = useUIStore();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleUserMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleUserMenuClose = () => {
    setAnchorEl(null);
  };

  const toggleTheme = () => {
    setTheme(currentTheme === 'light' ? 'dark' : 'light');
  };

  return (
    <AppBar
      position="fixed"
      elevation={1}
      sx={{
        width: { md: `calc(100% - ${drawerWidth}px)` },
        ml: { md: `${drawerWidth}px` },
        backgroundColor: theme.palette.background.paper,
        borderBottom: `1px solid ${theme.palette.divider}`,
      }}
    >
      <Toolbar>
        {/* Mobile menu button */}
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={onMenuClick}
          sx={{ mr: 2, display: { md: 'none' } }}
        >
          <MenuIcon size={24} />
        </IconButton>

        {/* Title - removed to give more space to content */}
        <Box sx={{ flexGrow: 1 }} />

        {/* Right side actions */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          {/* Search */}
          <Tooltip title="Search">
            <IconButton sx={{ color: theme.palette.text.primary }}>
              <Search size={20} />
            </IconButton>
          </Tooltip>

          {/* Theme toggle */}
          <Tooltip title={`Switch to ${currentTheme === 'light' ? 'dark' : 'light'} mode`}>
            <IconButton onClick={toggleTheme} sx={{ color: theme.palette.text.primary }}>
              {currentTheme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
            </IconButton>
          </Tooltip>

          {/* Notifications */}
          <Tooltip title="Notifications">
            <IconButton sx={{ color: theme.palette.text.primary }}>
              <Badge badgeContent={3} color="error">
                <Bell size={20} />
              </Badge>
            </IconButton>
          </Tooltip>

          {/* User menu */}
          <Tooltip title="Account">
            <IconButton onClick={handleUserMenuOpen} sx={{ ml: 1 }}>
              <Avatar sx={{ width: 32, height: 32, bgcolor: theme.palette.primary.main }}>
                <User size={20} />
              </Avatar>
            </IconButton>
          </Tooltip>

          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleUserMenuClose}
            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
          >
            <MenuItem onClick={handleUserMenuClose}>
              <User size={18} style={{ marginRight: 8 }} />
              Profile
            </MenuItem>
            <MenuItem onClick={handleUserMenuClose}>
              <Settings size={18} style={{ marginRight: 8 }} />
              Settings
            </MenuItem>
            <MenuItem onClick={handleUserMenuClose}>
              <LogOut size={18} style={{ marginRight: 8 }} />
              Logout
            </MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
