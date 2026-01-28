# Mission Engadi Platform - Frontend Implementation Roadmap
## Architecture Decision Summary

✅ **Framework**: Next.js 14+ with App Router  
✅ **UI Library**: Material-UI v6  
✅ **State Management**: Zustand  
✅ **Admin Framework**: Refine  
✅ **Auth**: Auth0 React SDK (free tier)  
✅ **Charts**: Chart.js with react-chartjs-2  
✅ **Icons**: Lucide React  
✅ **Forms**: React Hook Form  

## Social Media Strategy

### Provider Architecture (Incremental Approach)

**Phase 0 - Provider Abstraction** ✅ (Backend ready)
- Unified API in `social-media-service`
- Provider interface defined
- Routes to CloudCampaign, Ayrshare, or Buffer transparently

**Primary Provider**: **CloudCampaign**
- White-label solution
- Rich scheduling & calendar
- Multi-client workflows
- Agency-focused features

**Secondary Providers**: Ayrshare / Buffer
- Fallback for edge cases
- Platform coverage gaps
- Pricing experiments

**Future Direct Integrations**:
1. Meta (Facebook + Instagram Business) - Phase 2
2. LinkedIn Company Pages - Phase 2
3. X (Twitter) - Phase 3 (evaluate cost/benefit)

### Frontend Integration Points

```typescript
// All social media operations go through gateway
POST   /api/v1/social/posts          // Create/schedule post
GET    /api/v1/social/posts          // List posts
GET    /api/v1/social/accounts       // Connected accounts
POST   /api/v1/social/accounts       // Connect new account
GET    /api/v1/social/metrics/:id    // Post analytics
DELETE /api/v1/social/posts/:id      // Delete post
```

Backend handles provider routing, frontend doesn't need to know.

## Implementation Phases

### ✅ Phase 0: Foundation (COMPLETED)

**Files Created**:
- `package.json` - Updated with all dependencies
- `.env.local.example` - Environment configuration template
- `src/stores/authStore.ts` - Authentication state management
- `src/stores/uiStore.ts` - UI state (theme, sidebar, notifications)
- `src/providers/auth0-provider.tsx` - Auth0 integration
- `src/providers/mui-theme-provider.tsx` - Material-UI theming
- `src/providers/refine-provider.tsx` - Admin dashboard config
- `src/config/api.ts` - API client & service URLs
- `components/providers.tsx` - Unified provider wrapper

**What's Ready**:
- ✅ Project structure
- ✅ All providers configured
- ✅ State management setup
- ✅ API client with interceptors
- ✅ Theme system (light/dark)
- ✅ Auth0 integration skeleton

**Next Action**: Install dependencies (see SETUP_INSTRUCTIONS.md)

---

### 🔨 Phase 1: Core Dashboard UI (Week 1)

**Goal**: Create the main dashboard layout and navigation

#### 1.1 Dashboard Layout Components

Create `src/components/layout/`:
- `DashboardLayout.tsx` - Main layout with sidebar
- `Sidebar.tsx` - Navigation sidebar with menu items
- `Header.tsx` - Top bar with user menu, notifications, search
- `Footer.tsx` - Footer component

Navigation menu structure:
```
- Dashboard (home)
- Projects
  - All Projects
  - Create New
  - Categories
- Content
  - Articles
  - Media Library
  - Translations
- Partners & CRM
  - Partners
  - Donations
  - Communications
- Campaigns
  - Social Media
  - Email Campaigns
  - Analytics
- Search
- Settings
```

#### 1.2 Dashboard Homepage

Create `app/dashboard/page.tsx`:
- Welcome banner
- Service health monitor (use existing `ServiceHealth.tsx`)
- Key metrics cards:
  - Total projects
  - Active campaigns
  - Partner count
  - Recent donations
- Recent activity timeline
- Quick actions buttons

#### 1.3 Authentication Flow

Create `app/(auth)/`:
- `login/page.tsx` - Login page with Auth0
- `callback/page.tsx` - OAuth callback handler
- `logout/page.tsx` - Logout confirmation

Add protected route wrapper:
- `src/components/auth/ProtectedRoute.tsx`

---

### 🚀 Phase 2: Resource Management (Week 2)

**Goal**: CRUD operations for core resources using Refine

#### 2.1 Projects Module

Create `app/dashboard/projects/`:
- `page.tsx` - Projects list (DataGrid)
- `create/page.tsx` - Create new project form
- `[id]/page.tsx` - Project details view
- `[id]/edit/page.tsx` - Edit project form

Components needed:
- `src/components/projects/ProjectCard.tsx`
- `src/components/projects/ProjectForm.tsx`
- `src/components/projects/ProjectStats.tsx`

#### 2.2 Content Management

Create `app/dashboard/content/`:
- `page.tsx` - Content list with filters
- `create/page.tsx` - Rich text editor for content
- `[id]/page.tsx` - Content preview
- `[id]/edit/page.tsx` - Content editor

Components:
- `src/components/content/ContentEditor.tsx` (rich text)
- `src/components/content/MediaUploader.tsx`
- `src/components/content/TranslationPanel.tsx`

#### 2.3 Partners & CRM

Create `app/dashboard/partners/`:
- `page.tsx` - Partners list
- `create/page.tsx` - Add partner form
- `[id]/page.tsx` - Partner profile
- `[id]/donations/page.tsx` - Donation history

Components:
- `src/components/partners/PartnerCard.tsx`
- `src/components/partners/DonationForm.tsx`
- `src/components/partners/CommunicationLog.tsx`

#### 2.4 Search Integration

Create `app/dashboard/search/page.tsx`:
- Global search interface
- Filters by type (projects, content, partners)
- Search results with highlighting
- Recent searches

---

### 📱 Phase 3: Advanced Features (Week 3)

**Goal**: Social media, analytics, and notifications

#### 3.1 Social Media Campaign Manager

Create `app/dashboard/campaigns/social/`:
- `page.tsx` - Campaign list
- `create/page.tsx` - Create campaign wizard
  - Step 1: Select platforms
  - Step 2: Compose content (with AI assistance)
  - Step 3: Schedule posts
  - Step 4: Review & publish
- `[id]/page.tsx` - Campaign analytics dashboard

Components:
- `src/components/social/PlatformSelector.tsx`
- `src/components/social/PostComposer.tsx`
- `src/components/social/ScheduleCalendar.tsx`
- `src/components/social/AnalyticsChart.tsx`
- `src/components/social/AccountConnector.tsx`

**CloudCampaign Integration**:
```typescript
// src/services/socialMediaService.ts
export const socialMediaService = {
  // All operations hit your backend
  // Backend routes to CloudCampaign or other providers
  async createPost(data) {
    return apiClient.post('/api/v1/social/posts', data);
  },
  async getAccounts() {
    return apiClient.get('/api/v1/social/accounts');
  },
  async getMetrics(postId) {
    return apiClient.get(`/api/v1/social/metrics/${postId}`);
  },
};
```

#### 3.2 Analytics Dashboard

Create `app/dashboard/analytics/`:
- `page.tsx` - Overview with key metrics
- `projects/page.tsx` - Project-specific analytics
- `campaigns/page.tsx` - Campaign performance
- `partners/page.tsx` - Donor insights

Charts to implement (Chart.js):
- Line charts for trends
- Bar charts for comparisons
- Pie charts for distributions
- Funnel charts for conversion

Components:
- `src/components/charts/LineChart.tsx`
- `src/components/charts/BarChart.tsx`
- `src/components/charts/PieChart.tsx`
- `src/components/charts/MetricCard.tsx`

#### 3.3 Notification Center

Create:
- `src/components/notifications/NotificationBell.tsx` (header)
- `src/components/notifications/NotificationPanel.tsx` (drawer)
- `src/components/notifications/NotificationItem.tsx`

Integrate with `notification-service` via WebSocket for real-time updates.

#### 3.4 Multi-language Support

Implement:
- Language selector in header
- i18n configuration
- Translation files for UI strings
- RTL support for Arabic/Hebrew

Files:
- `src/i18n/config.ts`
- `src/i18n/locales/en.json`
- `src/i18n/locales/es.json`
- `src/i18n/locales/pt.json`

---

### 🎨 Phase 4: Polish & Progressive Web App (Week 4)

**Goal**: Production-ready, mobile-optimized PWA

#### 4.1 Mobile Responsiveness

- Test all pages on mobile viewports
- Optimize sidebar for mobile (drawer pattern)
- Touch-friendly buttons and forms
- Responsive data tables (horizontal scroll or cards)

#### 4.2 Progressive Web App

Create:
- `public/manifest.json` - PWA manifest
- `public/service-worker.js` - Service worker for offline
- `public/icons/` - App icons (various sizes)

Configure in `next.config.ts`:
```typescript
const withPWA = require('next-pwa')({
  dest: 'public',
  register: true,
  skipWaiting: true,
});

module.exports = withPWA({
  // existing config
});
```

#### 4.3 Performance Optimization

- Lazy load heavy components
- Image optimization (next/image)
- Code splitting by route
- Prefetch critical resources
- Bundle analysis and optimization

#### 4.4 Testing & Documentation

- Component unit tests (Jest + React Testing Library)
- E2E tests for critical flows (Playwright)
- Storybook for component documentation
- User guide for admin features

---

## Component Library Strategy

### Core Components to Build

**Layout**:
- ✅ `DashboardLayout`
- ✅ `Sidebar`
- ✅ `Header`
- ✅ `Footer`

**Data Display**:
- `DataTable` (wrapper for MUI DataGrid)
- `MetricCard` (stat cards)
- `Timeline` (activity feed)
- `StatusBadge` (status indicators)

**Forms**:
- `FormInput` (text, email, etc.)
- `FormSelect` (dropdown)
- `FormDatePicker` (date selection)
- `FormRichText` (WYSIWYG editor)
- `FormMediaUpload` (file upload)

**Charts** (Chart.js):
- `LineChart`
- `BarChart`
- `PieChart`
- `DoughnutChart`

**Social Media**:
- `PostComposer`
- `PlatformSelector`
- `ScheduleCalendar`
- `AccountConnector`
- `AnalyticsChart`

### Reusable Patterns

1. **List + Detail Pattern** (Refine standard):
   - List page with DataGrid
   - Show page for read-only view
   - Edit page with form
   - Create page with form

2. **Dashboard Cards**:
   - Consistent card design
   - Loading states
   - Error states
   - Empty states

3. **Modal Workflows**:
   - Confirmation dialogs
   - Forms in modals
   - Multi-step wizards

---

## API Integration Checklist

### Services to Integrate

- [ ] Gateway Service (8000) - Main entry point
- [ ] Auth Service (8001) - User authentication
- [ ] Content Service (8002) - Content management
- [ ] Projects Service (8003) - Project CRUD
- [ ] Partners CRM Service (8004) - CRM operations
- [ ] Search Service (8005) - Global search
- [ ] Social Media Service (8006) - Social campaigns
- [ ] Notification Service (8008) - Real-time notifications
- [ ] Analytics Service (8009) - Metrics & reporting
- [ ] AI Service (8010) - Content generation

### API Client Features

✅ Automatic token injection  
✅ Error handling  
✅ 401 auto-logout  
- [ ] Request retry logic  
- [ ] Request deduplication  
- [ ] Response caching  
- [ ] Upload progress tracking  
- [ ] Download progress tracking  

---

## Quality Checklist

### Code Quality
- [ ] TypeScript strict mode enabled
- [ ] ESLint configured with Next.js rules
- [ ] Prettier for code formatting
- [ ] Husky for pre-commit hooks
- [ ] No console.log in production

### Accessibility
- [ ] Semantic HTML
- [ ] ARIA labels
- [ ] Keyboard navigation
- [ ] Screen reader tested
- [ ] Color contrast (WCAG AA)

### Performance
- [ ] Lighthouse score > 90
- [ ] First Contentful Paint < 1.5s
- [ ] Time to Interactive < 3s
- [ ] Bundle size optimized
- [ ] Images lazy loaded

### Security
- [ ] Environment variables for secrets
- [ ] HTTPS in production
- [ ] CSP headers configured
- [ ] XSS protection
- [ ] CSRF tokens where needed

---

## Deployment Strategy

### Development
- Run locally: `npm run dev`
- Connected to local backend services
- Hot reload enabled

### Staging
- Deploy to Vercel/Netlify
- Connected to staging backend
- Auth0 staging app

### Production
- Deploy to Vercel/Netlify (or Docker)
- Connected to production backend
- Auth0 production app
- CDN for static assets
- Analytics tracking

---

## Current Status

✅ **Foundation Complete**
- All providers configured
- State management ready
- API client set up
- Theme system implemented

🔨 **Next Immediate Steps**:
1. Fix NPM cache: `sudo chown -R $(whoami) "/Users/engadi/.npm"`
2. Install dependencies: `npm install --legacy-peer-deps`
3. Set up `.env.local` with Auth0 credentials
4. Start building Phase 1: Dashboard layout

---

## Resources & Documentation

- **Next.js**: https://nextjs.org/docs
- **Material-UI**: https://mui.com/
- **Refine**: https://refine.dev/docs/
- **Auth0**: https://auth0.com/docs/quickstart/spa/react
- **Zustand**: https://zustand-demo.pmnd.rs/
- **Chart.js**: https://www.chartjs.org/docs/
- **React Hook Form**: https://react-hook-form.com/
- **CloudCampaign API**: (contact support for documentation)

---

## Support & Maintenance

### Regular Tasks
- Update dependencies monthly
- Review Auth0 usage (free tier limits)
- Monitor API rate limits
- Check error logs
- Performance audits

### Scaling Considerations
- CloudCampaign white-label cost vs DIY
- Auth0 free tier → paid when scaling users
- Consider moving to self-hosted Keycloak if user base grows significantly
- Plan for multi-region CDN if global usage

---

**Document Version**: 1.0  
**Last Updated**: January 6, 2026  
**Status**: Foundation Complete, Ready for Phase 1
