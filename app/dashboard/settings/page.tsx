'use client';

import { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Switch,
  FormControlLabel,
  Divider,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Grid,
  Avatar,
  Tabs,
  Tab,
  Alert,
} from '@mui/material';
import {
  User,
  Bell,
  Lock,
  Globe,
  Palette,
  Mail,
  Shield,
  Save,
} from 'lucide-react';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`settings-tabpanel-${index}`}
      aria-labelledby={`settings-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ pt: 3 }}>{children}</Box>}
    </div>
  );
}

export default function SettingsPage() {
  const [selectedTab, setSelectedTab] = useState(0);
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Profile settings
  const [profile, setProfile] = useState({
    name: 'John Doe',
    email: 'john.doe@engadi.org',
    role: 'Administrator',
    phone: '+1 (555) 123-4567',
    organization: 'Mission Engadi',
  });

  // Notification settings
  const [notifications, setNotifications] = useState({
    emailNotifications: true,
    pushNotifications: false,
    projectUpdates: true,
    donationAlerts: true,
    campaignReports: false,
    weeklyDigest: true,
  });

  // Appearance settings
  const [appearance, setAppearance] = useState({
    theme: 'light',
    language: 'en',
    timezone: 'America/New_York',
    dateFormat: 'MM/DD/YYYY',
  });

  // Security settings
  const [security, setSecurityState] = useState({
    twoFactorEnabled: false,
    sessionTimeout: '30',
    passwordLastChanged: '2026-01-01',
  });

  const handleSave = () => {
    // Simulate save
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  const tabs = [
    { label: 'Profile', icon: <User size={18} /> },
    { label: 'Notifications', icon: <Bell size={18} /> },
    { label: 'Appearance', icon: <Palette size={18} /> },
    { label: 'Security', icon: <Shield size={18} /> },
  ];

  return (
    <Box sx={{ p: 3 }}>
      {/* Page Header */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" fontWeight={700} gutterBottom>
          Settings
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Manage your account settings and preferences
        </Typography>
      </Box>

      {/* Success Alert */}
      {saveSuccess && (
        <Alert severity="success" sx={{ mb: 3 }} onClose={() => setSaveSuccess(false)}>
          Settings saved successfully!
        </Alert>
      )}

      {/* Settings Card */}
      <Card>
        <CardContent sx={{ p: 0 }}>
          {/* Tabs */}
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs
              value={selectedTab}
              onChange={(_, newValue) => setSelectedTab(newValue)}
              sx={{ px: 3 }}
            >
              {tabs.map((tab, index) => (
                <Tab
                  key={index}
                  label={tab.label}
                  icon={tab.icon}
                  iconPosition="start"
                  sx={{ textTransform: 'none', minHeight: 64 }}
                />
              ))}
            </Tabs>
          </Box>

          {/* Tab Panels */}
          <Box sx={{ px: 3, pb: 3 }}>
            {/* Profile Tab */}
            <TabPanel value={selectedTab} index={0}>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 3, mb: 3 }}>
                    <Avatar
                      sx={{
                        width: 80,
                        height: 80,
                        bgcolor: 'primary.main',
                        fontSize: '2rem',
                      }}
                    >
                      {profile.name.split(' ').map((n) => n[0]).join('')}
                    </Avatar>
                    <Box>
                      <Typography variant="h6" fontWeight={600}>
                        {profile.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {profile.role}
                      </Typography>
                      <Button size="small" sx={{ mt: 1 }}>
                        Change Photo
                      </Button>
                    </Box>
                  </Box>
                </Grid>

                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Full Name"
                    value={profile.name}
                    onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                  />
                </Grid>

                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Email"
                    type="email"
                    value={profile.email}
                    onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                  />
                </Grid>

                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Phone"
                    value={profile.phone}
                    onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                  />
                </Grid>

                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Organization"
                    value={profile.organization}
                    onChange={(e) => setProfile({ ...profile, organization: e.target.value })}
                  />
                </Grid>

                <Grid item xs={12}>
                  <Button variant="contained" startIcon={<Save size={18} />} onClick={handleSave}>
                    Save Profile
                  </Button>
                </Grid>
              </Grid>
            </TabPanel>

            {/* Notifications Tab */}
            <TabPanel value={selectedTab} index={1}>
              <Typography variant="h6" fontWeight={600} gutterBottom>
                Email Notifications
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                Manage how you receive notifications about platform activity
              </Typography>

              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={notifications.emailNotifications}
                      onChange={(e) =>
                        setNotifications({ ...notifications, emailNotifications: e.target.checked })
                      }
                    />
                  }
                  label="Email Notifications"
                />
                <FormControlLabel
                  control={
                    <Switch
                      checked={notifications.pushNotifications}
                      onChange={(e) =>
                        setNotifications({ ...notifications, pushNotifications: e.target.checked })
                      }
                    />
                  }
                  label="Push Notifications"
                />

                <Divider sx={{ my: 2 }} />

                <Typography variant="subtitle1" fontWeight={600} gutterBottom>
                  Activity Notifications
                </Typography>

                <FormControlLabel
                  control={
                    <Switch
                      checked={notifications.projectUpdates}
                      onChange={(e) =>
                        setNotifications({ ...notifications, projectUpdates: e.target.checked })
                      }
                    />
                  }
                  label="Project Updates"
                />
                <FormControlLabel
                  control={
                    <Switch
                      checked={notifications.donationAlerts}
                      onChange={(e) =>
                        setNotifications({ ...notifications, donationAlerts: e.target.checked })
                      }
                    />
                  }
                  label="Donation Alerts"
                />
                <FormControlLabel
                  control={
                    <Switch
                      checked={notifications.campaignReports}
                      onChange={(e) =>
                        setNotifications({ ...notifications, campaignReports: e.target.checked })
                      }
                    />
                  }
                  label="Campaign Reports"
                />
                <FormControlLabel
                  control={
                    <Switch
                      checked={notifications.weeklyDigest}
                      onChange={(e) =>
                        setNotifications({ ...notifications, weeklyDigest: e.target.checked })
                      }
                    />
                  }
                  label="Weekly Digest"
                />

                <Box sx={{ mt: 2 }}>
                  <Button variant="contained" startIcon={<Save size={18} />} onClick={handleSave}>
                    Save Preferences
                  </Button>
                </Box>
              </Box>
            </TabPanel>

            {/* Appearance Tab */}
            <TabPanel value={selectedTab} index={2}>
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <FormControl fullWidth>
                    <InputLabel>Theme</InputLabel>
                    <Select
                      value={appearance.theme}
                      label="Theme"
                      onChange={(e) => setAppearance({ ...appearance, theme: e.target.value })}
                    >
                      <MenuItem value="light">Light</MenuItem>
                      <MenuItem value="dark">Dark</MenuItem>
                      <MenuItem value="auto">Auto (System)</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>

                <Grid item xs={12} md={6}>
                  <FormControl fullWidth>
                    <InputLabel>Language</InputLabel>
                    <Select
                      value={appearance.language}
                      label="Language"
                      onChange={(e) => setAppearance({ ...appearance, language: e.target.value })}
                    >
                      <MenuItem value="en">English</MenuItem>
                      <MenuItem value="es">Español</MenuItem>
                      <MenuItem value="fr">Français</MenuItem>
                      <MenuItem value="pt">Português</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>

                <Grid item xs={12} md={6}>
                  <FormControl fullWidth>
                    <InputLabel>Timezone</InputLabel>
                    <Select
                      value={appearance.timezone}
                      label="Timezone"
                      onChange={(e) => setAppearance({ ...appearance, timezone: e.target.value })}
                    >
                      <MenuItem value="America/New_York">Eastern Time (ET)</MenuItem>
                      <MenuItem value="America/Chicago">Central Time (CT)</MenuItem>
                      <MenuItem value="America/Denver">Mountain Time (MT)</MenuItem>
                      <MenuItem value="America/Los_Angeles">Pacific Time (PT)</MenuItem>
                      <MenuItem value="UTC">UTC</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>

                <Grid item xs={12} md={6}>
                  <FormControl fullWidth>
                    <InputLabel>Date Format</InputLabel>
                    <Select
                      value={appearance.dateFormat}
                      label="Date Format"
                      onChange={(e) => setAppearance({ ...appearance, dateFormat: e.target.value })}
                    >
                      <MenuItem value="MM/DD/YYYY">MM/DD/YYYY</MenuItem>
                      <MenuItem value="DD/MM/YYYY">DD/MM/YYYY</MenuItem>
                      <MenuItem value="YYYY-MM-DD">YYYY-MM-DD</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>

                <Grid item xs={12}>
                  <Button variant="contained" startIcon={<Save size={18} />} onClick={handleSave}>
                    Save Appearance
                  </Button>
                </Grid>
              </Grid>
            </TabPanel>

            {/* Security Tab */}
            <TabPanel value={selectedTab} index={3}>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <Typography variant="h6" fontWeight={600} gutterBottom>
                    Password
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    Last changed: {security.passwordLastChanged}
                  </Typography>
                  <Button variant="outlined" startIcon={<Lock size={18} />}>
                    Change Password
                  </Button>
                </Grid>

                <Grid item xs={12}>
                  <Divider />
                </Grid>

                <Grid item xs={12}>
                  <Typography variant="h6" fontWeight={600} gutterBottom>
                    Two-Factor Authentication
                  </Typography>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={security.twoFactorEnabled}
                        onChange={(e) =>
                          setSecurityState({ ...security, twoFactorEnabled: e.target.checked })
                        }
                      />
                    }
                    label="Enable two-factor authentication"
                  />
                  <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                    Add an extra layer of security to your account
                  </Typography>
                </Grid>

                <Grid item xs={12}>
                  <Divider />
                </Grid>

                <Grid item xs={12} md={6}>
                  <FormControl fullWidth>
                    <InputLabel>Session Timeout</InputLabel>
                    <Select
                      value={security.sessionTimeout}
                      label="Session Timeout"
                      onChange={(e) =>
                        setSecurityState({ ...security, sessionTimeout: e.target.value })
                      }
                    >
                      <MenuItem value="15">15 minutes</MenuItem>
                      <MenuItem value="30">30 minutes</MenuItem>
                      <MenuItem value="60">1 hour</MenuItem>
                      <MenuItem value="240">4 hours</MenuItem>
                      <MenuItem value="never">Never</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>

                <Grid item xs={12}>
                  <Button variant="contained" startIcon={<Save size={18} />} onClick={handleSave}>
                    Save Security Settings
                  </Button>
                </Grid>
              </Grid>
            </TabPanel>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}
