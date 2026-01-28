# API Integration Guide
This document explains how the frontend connects to backend APIs and how to use the API services.

## Architecture

The frontend uses a **Gateway Pattern** where all API requests go through a single Gateway Service (port 8000) that routes to appropriate microservices.

### Service Ports

- **Gateway Service**: http://localhost:8000 (Main entry point)
- **Auth Service**: http://localhost:8001
- **Content Service**: http://localhost:8002
- **Projects Service**: http://localhost:8003
- **Partners CRM Service**: http://localhost:8004
- **Social Media Service**: http://localhost:8006
- **Notification Service**: http://localhost:8008
- **Analytics Service**: http://localhost:8009
- **AI Service**: http://localhost:8010

## API Client Setup

### Base Configuration (`/lib/api.ts`)

```typescript
import api from '@/lib/api';

// All requests automatically include:
// - Base URL: http://localhost:8000/api/v1
// - Auth token from localStorage
// - 30-second timeout
// - Error handling
```

## Available Services

### 1. Projects Service (`/lib/services/projects.service.ts`)

**Endpoints:**
- `GET /projects` - List all projects
- `GET /projects/:id` - Get project details
- `POST /projects` - Create new project
- `PUT /projects/:id` - Update project
- `DELETE /projects/:id` - Delete project
- `GET /projects/statistics` - Get project statistics

**Example Usage:**
```typescript
import { projectsService } from '@/lib/services';

// In your component
const { data, loading, error, execute } = useApi(projectsService.getAll);

useEffect(() => {
  execute({ skip: 0, limit: 10, status: 'active' });
}, []);
```

### 2. Partners Service (`/lib/services/partners.service.ts`)

**Endpoints:**
- `GET /partners` - List all partners
- `GET /partners/:id` - Get partner details
- `POST /partners` - Create new partner
- `PUT /partners/:id` - Update partner
- `DELETE /partners/:id` - Delete partner
- `GET /partners/statistics` - Get partner statistics

### 3. Donations Service (`/lib/services/donations.service.ts`)

**Endpoints:**
- `GET /donations` - List all donations
- `GET /donations/:id` - Get donation details
- `POST /donations` - Create new donation
- `PUT /donations/:id` - Update donation
- `DELETE /donations/:id` - Delete donation
- `GET /donations/:id/receipt` - Download receipt (PDF)
- `GET /donations/statistics` - Get donation statistics

**Download Receipt Example:**
```typescript
import { donationsService } from '@/lib/services';
import { downloadFile } from '@/lib/utils/api-error';

const handleDownload = async (id: number) => {
  try {
    const blob = await donationsService.downloadReceipt(id);
    downloadFile(blob, `receipt-${id}.pdf`);
  } catch (error) {
    console.error('Failed to download receipt:', error);
  }
};
```

### 4. Content Service (`/lib/services/content.service.ts`)

**Content Endpoints:**
- `GET /content` - List all content
- `GET /content/:id` - Get content details
- `POST /content` - Create new content
- `PUT /content/:id` - Update content
- `DELETE /content/:id` - Delete content

**Media Endpoints:**
- `GET /media` - List all media files
- `POST /media/upload` - Upload media file
- `DELETE /media/:id` - Delete media file

**Translation Endpoints:**
- `GET /content/:id/translations` - Get translations
- `POST /content/:id/translations` - Create translation
- `PUT /content/:id/translations/:translationId` - Update translation
- `DELETE /content/:id/translations/:translationId` - Delete translation

**Upload Media Example:**
```typescript
import { contentService } from '@/lib/services';

const handleUpload = async (file: File, projectId: number) => {
  try {
    const result = await contentService.uploadMedia(file, projectId);
    console.log('Uploaded:', result);
  } catch (error) {
    console.error('Upload failed:', error);
  }
};
```

### 5. Campaigns Service (`/lib/services/campaigns.service.ts`)

**Campaign Endpoints:**
- `GET /campaigns` - List all campaigns
- `GET /campaigns/:id` - Get campaign details
- `POST /campaigns` - Create new campaign
- `PUT /campaigns/:id` - Update campaign
- `DELETE /campaigns/:id` - Delete campaign
- `GET /campaigns/statistics` - Get campaign statistics

**Post Endpoints:**
- `GET /campaigns/posts` - List all posts
- `GET /campaigns/posts/:id` - Get post details
- `POST /campaigns/posts` - Create new post
- `PUT /campaigns/posts/:id` - Update post
- `DELETE /campaigns/posts/:id` - Delete post

### 6. Analytics Service (`/lib/services/analytics.service.ts`)

**Dashboard:**
- `GET /analytics/dashboard` - Get dashboard statistics
- `GET /analytics/realtime` - Get real-time metrics

**Donations Analytics:**
- `GET /analytics/donations/trends` - Get donation trends
- `GET /analytics/donations/top-donors` - Get top donors

**Project Analytics:**
- `GET /analytics/projects/performance` - Get project performance
- `GET /analytics/projects/roi` - Get project ROI

**Campaign Analytics:**
- `GET /analytics/campaigns/performance` - Get campaign performance
- `GET /analytics/campaigns/:id/performance` - Get specific campaign performance
- `GET /analytics/social-media/metrics` - Get social media metrics

**Reports:**
- `POST /analytics/reports/generate` - Generate PDF/Excel report
- `GET /analytics/export/:dataType` - Export data

**Generate Report Example:**
```typescript
import { analyticsService } from '@/lib/services';
import { downloadFile } from '@/lib/utils/api-error';

const handleExportPDF = async () => {
  try {
    const blob = await analyticsService.generateReport('pdf', {
      startDate: '2024-01-01',
      endDate: '2024-12-31',
      includeCharts: true,
    });
    downloadFile(blob, 'analytics-report.pdf');
  } catch (error) {
    console.error('Failed to generate report:', error);
  }
};
```

## Using the API Hook

The `useApi` hook simplifies API calls with automatic loading and error handling:

```typescript
import { useApi } from '@/lib/hooks/useApi';
import { projectsService } from '@/lib/services';

function MyComponent() {
  const { data, loading, error, execute } = useApi(projectsService.getAll);

  useEffect(() => {
    execute();
  }, []);

  if (loading) return <CircularProgress />;
  if (error) return <Alert severity="error">{error.message}</Alert>;
  if (!data) return null;

  return <div>{/* Render data */}</div>;
}
```

## Error Handling

All API errors are automatically handled and transformed into a consistent format:

```typescript
interface ApiError {
  message: string;
  code?: string;
  status?: number;
  details?: any;
}
```

**Error Codes:**
- `UNAUTHORIZED` (401) - Not authenticated
- `FORBIDDEN` (403) - No permission
- `NOT_FOUND` (404) - Resource not found
- `VALIDATION_ERROR` (422) - Invalid input
- `INTERNAL_ERROR` (500) - Server error
- `API_ERROR` - Generic API error
- `UNKNOWN_ERROR` - Unknown error

## Authentication

The API client automatically includes the JWT token from localStorage:

```typescript
// Store token after login
localStorage.setItem('token', yourJwtToken);

// Token is automatically included in all requests
// Authorization: Bearer <token>

// Remove token on logout
localStorage.removeItem('token');
```

## Environment Variables

Configure API URLs in `.env.local`:

```bash
# Primary API Gateway (all requests go through this)
NEXT_PUBLIC_API_URL=http://localhost:8000/api/v1

# Or for production
NEXT_PUBLIC_API_URL=https://api.mission-engadi.org/api/v1
```

## Type Safety

All services include TypeScript interfaces for:
- Request DTOs (Data Transfer Objects)
- Response types
- Query parameters

Example:
```typescript
import { CreateProjectDto, Project } from '@/lib/services';

const createProject = async (data: CreateProjectDto): Promise<Project> => {
  return await projectsService.create(data);
};
```

## Best Practices

1. **Always use the `useApi` hook** for automatic loading/error handling
2. **Handle errors gracefully** - Show user-friendly messages
3. **Use TypeScript types** - Leverage type safety
4. **Implement loading states** - Show loaders during API calls
5. **Cache data when appropriate** - Use React Query or SWR for caching
6. **Test with mock data first** - Develop UI before backend is ready
7. **Log errors in development** - Automatic via API interceptor

## Switching from Mock to Real Data

To connect a page to real APIs:

1. Import the service:
```typescript
import { projectsService } from '@/lib/services';
```

2. Use the `useApi` hook:
```typescript
const { data, loading, error, execute } = useApi(projectsService.getAll);
```

3. Replace mock data with API data:
```typescript
// Before
const projects = mockProjects;

// After
const projects = data || [];
```

4. Add error handling:
```typescript
{error && <Alert severity="error">{error.message}</Alert>}
{loading && <CircularProgress />}
```

## Next Steps

1. ✅ Start backend services (`./start_all_services.sh`)
2. ✅ Test API endpoints with curl or Postman
3. ✅ Connect one module at a time
4. ✅ Test thoroughly
5. ✅ Replace all mock data progressively
