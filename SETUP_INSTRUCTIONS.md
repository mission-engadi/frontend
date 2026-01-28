# Frontend Setup Instructions
## Tech Stack Implemented

✅ **Next.js 14+** with App Router
✅ **Material-UI (MUI) v6** - Component library with React 19 support
✅ **Zustand** - Lightweight state management
✅ **Refine** - Admin dashboard framework
✅ **Auth0 React SDK** - Authentication (free tier)
✅ **Chart.js + react-chartjs-2** - Data visualization
✅ **Lucide React** - Modern icon library
✅ **Axios** - HTTP client
✅ **React Hook Form** - Form management
✅ **TailwindCSS** - Utility-first CSS

## Installation Steps

### 1. Fix NPM Cache Permission (if needed)

```bash
sudo chown -R $(whoami) "/Users/engadi/.npm"
```

### 2. Install Dependencies

```bash
cd /Users/engadi/mission-engadi/frontend
npm install --legacy-peer-deps
```

The `--legacy-peer-deps` flag is used because some packages have not fully updated to React 19 yet.

### 3. Set up Environment Variables

Copy the example environment file:

```bash
cp .env.local.example .env.local
```

Then edit `.env.local` and add your Auth0 credentials:

```env
# Auth0 Configuration
NEXT_PUBLIC_AUTH0_DOMAIN=your-tenant.auth0.com
NEXT_PUBLIC_AUTH0_CLIENT_ID=your-client-id
NEXT_PUBLIC_AUTH0_AUDIENCE=https://api.mission-engadi.org
NEXT_PUBLIC_AUTH0_REDIRECT_URI=http://localhost:3000

# API Configuration
NEXT_PUBLIC_API_URL=http://localhost:8000
NEXT_PUBLIC_GATEWAY_URL=http://localhost:8000
```

### 4. Run Development Server

```bash
npm run dev
```

The frontend will be available at http://localhost:3000

## Project Structure

```
frontend/
├── app/                    # Next.js App Router pages
├── components/            # React components
├── src/
│   ├── config/           # Configuration files
│   │   └── api.ts       # API client & service URLs
│   ├── providers/       # Context providers
│   │   ├── auth0-provider.tsx      # Auth0 integration
│   │   ├── mui-theme-provider.tsx  # Material-UI theme
│   │   └── refine-provider.tsx     # Refine admin framework
│   └── stores/          # Zustand state management
│       ├── authStore.ts  # Authentication state
│       └── uiStore.ts    # UI state (theme, sidebar, notifications)
├── lib/                 # Utility functions
└── public/             # Static assets
```

## Key Features Configured

### 1. Authentication (Auth0)
- SSO integration ready
- Token management with Zustand
- Protected routes support
- Automatic token refresh

### 2. State Management (Zustand)
- **authStore**: User authentication state
- **uiStore**: Theme, sidebar, language, notifications

### 3. API Integration
- Centralized API client with interceptors
- Automatic token injection
- Error handling & 401 redirects
- All service URLs configured

### 4. Admin Dashboard (Refine)
Pre-configured resources:
- Projects (`/dashboard/projects`)
- Content (`/dashboard/content`)
- Partners (`/dashboard/partners`)
- Campaigns (`/dashboard/campaigns`)

### 5. Material-UI Theme
- Light/Dark mode support
- Responsive design
- Custom color palette for Mission Engadi branding
- Typography optimized for readability

## Next Steps

### Phase 1: Core Dashboard (Week 1)
1. Create dashboard layout with sidebar navigation
2. Build dashboard homepage with:
   - Service health monitor (already exists)
   - Key metrics cards
   - Recent activity feed
3. Implement login/logout flows with Auth0

### Phase 2: Resource Management (Week 2)
1. Projects CRUD pages
2. Content management interface
3. Partners/CRM views
4. Basic search functionality

### Phase 3: Advanced Features (Week 3)
1. Social media campaign manager with CloudCampaign integration
2. Analytics dashboards with Chart.js
3. Notification center
4. Multi-language support

### Phase 4: Polish & PWA (Week 4)
1. Mobile responsiveness
2. PWA manifest & service workers
3. Offline support
4. Performance optimization

## CloudCampaign Integration Plan

As discussed, the social media service will use:

1. **Primary**: CloudCampaign (white-label, API + embedded UI)
2. **Secondary**: Ayrshare/Buffer (fallback)
3. **Future**: Direct integrations (Meta, LinkedIn, X)

The provider abstraction is built into the social-media-service backend, so the frontend just calls:

```typescript
POST /api/v1/social/posts
GET /api/v1/social/accounts
GET /api/v1/social/metrics
```

The backend handles routing to CloudCampaign or other providers transparently.

## Auth0 Setup (Free Tier)

1. Create account at https://auth0.com
2. Create a new Application (Single Page Application)
3. Configure:
   - Allowed Callback URLs: `http://localhost:3000`
   - Allowed Logout URLs: `http://localhost:3000`
   - Allowed Web Origins: `http://localhost:3000`
4. Copy Domain and Client ID to `.env.local`

## Available Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
```

## Troubleshooting

### Module not found errors
Run: `npm install --legacy-peer-deps`

### TypeScript errors
The errors will resolve after dependencies are installed.

### Auth0 not working
Verify `.env.local` has correct values and restart dev server.

### API connection issues
Ensure all backend services are running via `./launch_platform.sh`

## Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Material-UI Documentation](https://mui.com/)
- [Refine Documentation](https://refine.dev/docs/)
- [Auth0 React SDK](https://auth0.com/docs/quickstart/spa/react)
- [Zustand Documentation](https://zustand-demo.pmnd.rs/)
- [Chart.js Documentation](https://www.chartjs.org/docs/)
