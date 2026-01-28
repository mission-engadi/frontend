'use client';

import { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  TextField,
  Typography,
  InputAdornment,
  Chip,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Tabs,
  Tab,
  CircularProgress,
} from '@mui/material';
import {
  Search as SearchIcon,
  FileText,
  Users,
  FolderKanban,
  Megaphone,
  Calendar,
} from 'lucide-react';

interface SearchResult {
  id: string;
  type: 'content' | 'project' | 'partner' | 'campaign';
  title: string;
  description: string;
  metadata?: string;
}

const mockResults: SearchResult[] = [
  {
    id: '1',
    type: 'project',
    title: 'Clean Water Initiative - Kenya',
    description: 'Providing clean water access to rural communities in Kenya',
    metadata: 'Active • 1,250 beneficiaries',
  },
  {
    id: '2',
    type: 'content',
    title: 'Gospel Outreach Update - March 2026',
    description: 'Monthly report on gospel outreach activities across 5 regions',
    metadata: 'Published • 4 languages',
  },
  {
    id: '3',
    type: 'partner',
    title: 'Grace Community Church',
    description: 'Long-term ministry partner supporting education projects',
    metadata: 'Active • $45,000 donated',
  },
  {
    id: '4',
    type: 'campaign',
    title: 'Easter Hope Campaign 2026',
    description: 'Social media campaign sharing Easter message',
    metadata: 'Scheduled • 12 posts',
  },
];

const getIcon = (type: string) => {
  switch (type) {
    case 'content':
      return <FileText size={20} />;
    case 'project':
      return <FolderKanban size={20} />;
    case 'partner':
      return <Users size={20} />;
    case 'campaign':
      return <Megaphone size={20} />;
    default:
      return <FileText size={20} />;
  }
};

const getColor = (type: string) => {
  switch (type) {
    case 'content':
      return '#3b82f6';
    case 'project':
      return '#10b981';
    case 'partner':
      return '#f59e0b';
    case 'campaign':
      return '#8b5cf6';
    default:
      return '#6b7280';
  }
};

export default function SearchPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTab, setSelectedTab] = useState(0);
  const [isSearching, setIsSearching] = useState(false);
  const [results, setResults] = useState<SearchResult[]>([]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query.length > 2) {
      setIsSearching(true);
      // Simulate API search delay
      setTimeout(() => {
        setResults(
          mockResults.filter(
            (r) =>
              r.title.toLowerCase().includes(query.toLowerCase()) ||
              r.description.toLowerCase().includes(query.toLowerCase())
          )
        );
        setIsSearching(false);
      }, 500);
    } else {
      setResults([]);
    }
  };

  const filterResults = (type?: string) => {
    if (!type || type === 'all') return results;
    return results.filter((r) => r.type === type);
  };

  const tabs = [
    { label: 'All', value: 'all' },
    { label: 'Projects', value: 'project' },
    { label: 'Content', value: 'content' },
    { label: 'Partners', value: 'partner' },
    { label: 'Campaigns', value: 'campaign' },
  ];

  const filteredResults = filterResults(tabs[selectedTab].value);

  return (
    <Box sx={{ p: 3 }}>
      {/* Page Header */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" fontWeight={700} gutterBottom>
          Search Platform
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Search across all content, projects, partners, and campaigns
        </Typography>
      </Box>

      {/* Search Bar */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <TextField
            fullWidth
            placeholder="Search for projects, content, partners, campaigns..."
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon size={20} />
                </InputAdornment>
              ),
              endAdornment: isSearching ? (
                <InputAdornment position="end">
                  <CircularProgress size={20} />
                </InputAdornment>
              ) : null,
            }}
            sx={{ mb: 2 }}
          />

          {/* Quick Filters */}
          <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
            <Chip label="Recent" size="small" onClick={() => {}} />
            <Chip label="This Month" size="small" onClick={() => {}} />
            <Chip label="Active Only" size="small" onClick={() => {}} />
          </Box>
        </CardContent>
      </Card>

      {/* Results */}
      {searchQuery.length > 0 && (
        <Card>
          <CardContent>
            {/* Tabs */}
            <Tabs
              value={selectedTab}
              onChange={(_, newValue) => setSelectedTab(newValue)}
              sx={{ borderBottom: 1, borderColor: 'divider', mb: 2 }}
            >
              {tabs.map((tab, index) => (
                <Tab
                  key={tab.value}
                  label={`${tab.label} ${
                    tab.value === 'all' ? `(${results.length})` : `(${filterResults(tab.value).length})`
                  }`}
                />
              ))}
            </Tabs>

            {/* Results List */}
            {isSearching ? (
              <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
                <CircularProgress />
              </Box>
            ) : filteredResults.length > 0 ? (
              <List>
                {filteredResults.map((result) => (
                  <ListItem key={result.id} disablePadding>
                    <ListItemButton
                      onClick={() => {
                        // Navigate to the specific item
                        const paths = {
                          content: '/dashboard/content',
                          project: '/dashboard/projects',
                          partner: '/dashboard/partners',
                          campaign: '/dashboard/campaigns',
                        };
                        window.location.href = `${paths[result.type]}/${result.id}`;
                      }}
                      sx={{ py: 2 }}
                    >
                      <ListItemAvatar>
                        <Avatar
                          sx={{
                            bgcolor: getColor(result.type),
                          }}
                        >
                          {getIcon(result.type)}
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary={
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <Typography variant="subtitle1" fontWeight={600}>
                              {result.title}
                            </Typography>
                            <Chip
                              label={result.type}
                              size="small"
                              sx={{
                                bgcolor: `${getColor(result.type)}20`,
                                color: getColor(result.type),
                                textTransform: 'capitalize',
                              }}
                            />
                          </Box>
                        }
                        secondary={
                          <Box>
                            <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
                              {result.description}
                            </Typography>
                            {result.metadata && (
                              <Typography variant="caption" color="text.secondary">
                                {result.metadata}
                              </Typography>
                            )}
                          </Box>
                        }
                      />
                    </ListItemButton>
                  </ListItem>
                ))}
              </List>
            ) : searchQuery.length > 2 ? (
              <Box sx={{ textAlign: 'center', py: 4 }}>
                <SearchIcon size={48} color="#9ca3af" />
                <Typography variant="h6" color="text.secondary" sx={{ mt: 2 }}>
                  No results found
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Try adjusting your search terms
                </Typography>
              </Box>
            ) : (
              <Box sx={{ textAlign: 'center', py: 4 }}>
                <SearchIcon size={48} color="#9ca3af" />
                <Typography variant="body1" color="text.secondary" sx={{ mt: 2 }}>
                  Enter at least 3 characters to search
                </Typography>
              </Box>
            )}
          </CardContent>
        </Card>
      )}

      {/* Empty State */}
      {searchQuery.length === 0 && (
        <Card>
          <CardContent sx={{ textAlign: 'center', py: 6 }}>
            <SearchIcon size={64} color="#9ca3af" />
            <Typography variant="h5" fontWeight={600} sx={{ mt: 3, mb: 1 }}>
              Search the Platform
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
              Find projects, content, partners, and campaigns across the entire platform
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Try searching for: "Kenya", "Education", "Water", "Campaign"
            </Typography>
          </CardContent>
        </Card>
      )}
    </Box>
  );
}
