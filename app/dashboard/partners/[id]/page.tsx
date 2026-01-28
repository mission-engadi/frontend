'use client';

import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Typography,
  Grid,
  Avatar,
  IconButton,
  Divider,
  LinearProgress,
} from '@mui/material';
import {
  Edit,
  Trash2,
  ArrowLeft,
  Mail,
  Phone,
  MapPin,
  Calendar,
  DollarSign,
  Heart,
  TrendingUp,
  User,
} from 'lucide-react';
import { useRouter, useParams } from 'next/navigation';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

// Mock partner data
const mockPartner = {
  id: 1,
  name: 'Grace Community Church',
  type: 'church',
  status: 'active',
  location: 'San Diego, California',
  country: 'USA',
  email: 'pastor@gracecc.org',
  phone: '+1 (619) 555-0123',
  website: 'www.gracecc.org',
  memberSince: '2020-03-15',
  totalDonations: 125000,
  donationGoal: 150000,
  lastDonation: '2024-01-10',
  contactPerson: {
    name: 'Pastor David Martinez',
    role: 'Senior Pastor',
    email: 'david@gracecc.org',
    phone: '+1 (619) 555-0124',
  },
  recentDonations: [
    { id: 1, amount: 5000, date: '2024-01-10', project: 'Water Initiative' },
    { id: 2, amount: 3500, date: '2023-12-15', project: 'Education Program' },
    { id: 3, amount: 4200, date: '2023-11-10', project: 'Medical Mission' },
  ],
  donationTrend: [90000, 95000, 100000, 105000, 110000, 118000, 125000],
  notes: `Grace Community Church has been a faithful partner since 2020. They actively support our water initiative projects in Kenya and have sponsored multiple mission trips. Their congregation is highly engaged in humanitarian causes and regularly organizes fundraising events.`,
};

const typeColors: Record<string, string> = {
  church: '#3b82f6',
  foundation: '#8b5cf6',
  ministry: '#10b981',
  nonprofit: '#f59e0b',
};

const statusColors: Record<string, { bg: string; text: string }> = {
  active: { bg: '#10b981', text: '#fff' },
  inactive: { bg: '#6b7280', text: '#fff' },
};

export default function PartnerDetailPage() {
  const router = useRouter();
  const params = useParams();
  const partnerId = params?.id;

  const partner = mockPartner;
  const donationProgress = (partner.totalDonations / partner.donationGoal) * 100;

  const donationChartData = {
    labels: ['Mar', 'May', 'Jul', 'Sep', 'Nov', 'Jan 24', 'Now'],
    datasets: [
      {
        label: 'Total Donations',
        data: partner.donationTrend,
        borderColor: '#3b82f6',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        fill: true,
        tension: 0.4,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
    },
    scales: {
      y: {
        beginAtZero: false,
        grid: {
          color: 'rgba(255, 255, 255, 0.1)',
        },
        ticks: {
          color: '#9ca3af',
          callback: (value: any) => `$${(value / 1000).toFixed(0)}K`,
        },
      },
      x: {
        grid: {
          display: false,
        },
        ticks: {
          color: '#9ca3af',
        },
      },
    },
  };

  return (
    <Box>
      {/* Header */}
      <Box sx={{ mb: 3 }}>
        <Button
          startIcon={<ArrowLeft size={20} />}
          onClick={() => router.push('/dashboard/partners')}
          sx={{ mb: 2, textTransform: 'none' }}
        >
          Back to Partners
        </Button>

        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
            <Avatar
              sx={{
                width: 80,
                height: 80,
                bgcolor: typeColors[partner.type],
                fontSize: '2rem',
                fontWeight: 700,
              }}
            >
              {partner.name.charAt(0)}
            </Avatar>
            <Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1 }}>
                <Typography variant="h4" fontWeight={600}>
                  {partner.name}
                </Typography>
                <Chip
                  label={partner.status}
                  size="small"
                  sx={{
                    bgcolor: statusColors[partner.status]?.bg,
                    color: statusColors[partner.status]?.text,
                    textTransform: 'capitalize',
                    fontWeight: 600,
                  }}
                />
                <Chip
                  label={partner.type}
                  size="small"
                  sx={{
                    bgcolor: `${typeColors[partner.type]}20`,
                    color: typeColors[partner.type],
                    textTransform: 'capitalize',
                    fontWeight: 600,
                    border: `1px solid ${typeColors[partner.type]}40`,
                  }}
                />
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, color: 'text.secondary' }}>
                <MapPin size={16} />
                <Typography variant="body2">
                  {partner.location}, {partner.country}
                </Typography>
              </Box>
            </Box>
          </Box>

          <Box sx={{ display: 'flex', gap: 1 }}>
            <Button
              variant="outlined"
              startIcon={<Edit size={20} />}
              onClick={() => router.push(`/dashboard/partners/${partnerId}/edit`)}
              sx={{ textTransform: 'none' }}
            >
              Edit
            </Button>
            <IconButton color="error">
              <Trash2 size={20} />
            </IconButton>
          </Box>
        </Box>
      </Box>

      <Grid container spacing={3}>
        {/* Main Content */}
        <Grid item xs={12} md={8}>
          {/* Donation Progress */}
          <Card sx={{ mb: 3 }}>
            <CardContent sx={{ p: 3 }}>
              <Typography variant="h6" fontWeight={600} gutterBottom>
                Donation Progress
              </Typography>
              <Box sx={{ mb: 2 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography variant="h4" fontWeight={700} color="primary">
                    ${partner.totalDonations.toLocaleString()}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    of ${partner.donationGoal.toLocaleString()} goal
                  </Typography>
                </Box>
                <LinearProgress
                  variant="determinate"
                  value={donationProgress}
                  sx={{ height: 10, borderRadius: 1 }}
                />
                <Typography variant="caption" color="text.secondary" sx={{ mt: 0.5 }}>
                  {donationProgress.toFixed(1)}% funded
                </Typography>
              </Box>
            </CardContent>
          </Card>

          {/* Donation Trend */}
          <Card sx={{ mb: 3 }}>
            <CardContent sx={{ p: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                <TrendingUp size={20} />
                <Typography variant="h6" fontWeight={600}>
                  Donation Trend
                </Typography>
              </Box>
              <Box sx={{ height: 250 }}>
                <Line data={donationChartData} options={chartOptions} />
              </Box>
            </CardContent>
          </Card>

          {/* Recent Donations */}
          <Card>
            <CardContent sx={{ p: 3 }}>
              <Typography variant="h6" fontWeight={600} gutterBottom>
                Recent Donations
              </Typography>
              <Box sx={{ mt: 2 }}>
                {partner.recentDonations.map((donation, index) => (
                  <Box key={donation.id}>
                    <Box
                      sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        py: 2,
                      }}
                    >
                      <Box>
                        <Typography variant="body2" fontWeight={600}>
                          {donation.project}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {new Date(donation.date).toLocaleDateString()}
                        </Typography>
                      </Box>
                      <Typography variant="body1" fontWeight={700} color="success.main">
                        ${donation.amount.toLocaleString()}
                      </Typography>
                    </Box>
                    {index < partner.recentDonations.length - 1 && <Divider />}
                  </Box>
                ))}
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Sidebar */}
        <Grid item xs={12} md={4}>
          {/* Contact Information */}
          <Card sx={{ mb: 3 }}>
            <CardContent sx={{ p: 3 }}>
              <Typography variant="h6" fontWeight={600} gutterBottom>
                Contact Information
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                  <Mail size={18} color="#3b82f6" />
                  <Box>
                    <Typography variant="caption" color="text.secondary">
                      Email
                    </Typography>
                    <Typography variant="body2">{partner.email}</Typography>
                  </Box>
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                  <Phone size={18} color="#10b981" />
                  <Box>
                    <Typography variant="caption" color="text.secondary">
                      Phone
                    </Typography>
                    <Typography variant="body2">{partner.phone}</Typography>
                  </Box>
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                  <MapPin size={18} color="#f59e0b" />
                  <Box>
                    <Typography variant="caption" color="text.secondary">
                      Location
                    </Typography>
                    <Typography variant="body2">
                      {partner.location}, {partner.country}
                    </Typography>
                  </Box>
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                  <Calendar size={18} color="#8b5cf6" />
                  <Box>
                    <Typography variant="caption" color="text.secondary">
                      Member Since
                    </Typography>
                    <Typography variant="body2">
                      {new Date(partner.memberSince).toLocaleDateString()}
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </CardContent>
          </Card>

          {/* Contact Person */}
          <Card sx={{ mb: 3 }}>
            <CardContent sx={{ p: 3 }}>
              <Typography variant="h6" fontWeight={600} gutterBottom>
                Primary Contact
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mt: 2 }}>
                <Avatar sx={{ width: 48, height: 48, bgcolor: 'primary.main' }}>
                  {partner.contactPerson.name.charAt(0)}
                </Avatar>
                <Box>
                  <Typography variant="body1" fontWeight={600}>
                    {partner.contactPerson.name}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {partner.contactPerson.role}
                  </Typography>
                </Box>
              </Box>
              <Box sx={{ mt: 2, display: 'flex', flexDirection: 'column', gap: 1 }}>
                <Typography variant="caption" color="text.secondary">
                  {partner.contactPerson.email}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {partner.contactPerson.phone}
                </Typography>
              </Box>
            </CardContent>
          </Card>

          {/* Notes */}
          <Card>
            <CardContent sx={{ p: 3 }}>
              <Typography variant="h6" fontWeight={600} gutterBottom>
                Notes
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
                {partner.notes}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}
