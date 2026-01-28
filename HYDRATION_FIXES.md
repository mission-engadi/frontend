# Hydration Error Fixes
This document describes the hydration errors that were fixed and best practices for avoiding them in the future.

## Issues Fixed

### 1. API Configuration Error (Fixed)
**File**: `frontend/.env.local`
- **Problem**: `NEXT_PUBLIC_API_URL` was pointing to port 8005 instead of 8000 (Gateway Service)
- **Solution**: Changed to `http://localhost:8000/api/v1`

### 2. MUI Emotion Cache Hydration Mismatch (Fixed)
**Files**:
- `frontend/src/providers/mui-theme-provider.tsx`
- `frontend/app/layout.tsx`
- `frontend/package.json` (added `@mui/material-nextjs`)

**Problem**: The Emotion style injection was causing hydration mismatches between SSR and client. MUI's Emotion cache needs special handling for Next.js App Router to work correctly.

**Solution**:
1. Installed `@mui/material-nextjs` package for proper Next.js 14+ App Router support
2. Wrapped the ThemeProvider with `AppRouterCacheProvider` from `@mui/material-nextjs/v14-appRouter`
3. Removed `CssBaseline` component (not needed with Tailwind CSS)
4. Removed emotion-insertion-point meta tag from layout

This ensures Emotion styles are properly synchronized between server and client rendering.

### 3. Date/Time Locale Formatting (Fixed)
**Files**:
- `frontend/components/ServiceHealth.tsx` (line 89)
- `frontend/app/dashboard/analytics/realtime/page.tsx` (line 343)

**Problem**: `toLocaleString()`, `toLocaleDateString()`, and `toLocaleTimeString()` produce different outputs on server vs client due to timezone and locale differences.

**Solution**: Added `suppressHydrationWarning` attribute to elements displaying locale-formatted values.

## Best Practices Going Forward

### Use SafeHydration Components

A set of utility components has been created in `components/SafeHydration.tsx` to handle locale-dependent formatting safely:

```tsx
import { SafeNumber, SafeDate, SafeDateOnly, SafeTime } from '@/components/SafeHydration';

// For numbers with locale formatting
<SafeNumber value={1250} />
// Renders: 1,250 (or 1.250 or 1 250 depending on locale)

// For full date/time
<SafeDate date={new Date()} />
// Renders: 1/16/2026, 3:45:30 PM

// For date only
<SafeDateOnly date="2026-01-16" />
// Renders: 1/16/2026

// For time only
<SafeTime date={new Date()} />
// Renders: 3:45:30 PM

// For custom date formatting
<SafeDate
  date={new Date()}
  options={{
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }}
/>
// Renders: January 16, 2026
```

### Alternative: Manual suppressHydrationWarning

If you need more control or are using MUI Typography, add the attribute directly:

```tsx
<Typography variant="h6" suppressHydrationWarning>
  {value.toLocaleString()}
</Typography>

<p suppressHydrationWarning>
  {new Date(timestamp).toLocaleString()}
</p>
```

### Common Hydration Pitfalls to Avoid

1. **Locale-dependent formatting**: Always use `suppressHydrationWarning` or SafeHydration components
2. **Browser-only APIs**: Check `typeof window !== 'undefined'` and handle SSR gracefully
3. **Random values**: Don't use `Math.random()` or `Date.now()` directly in render
4. **External data without snapshots**: Use React Query or similar with proper SSR support
5. **Invalid HTML nesting**: Ensure proper HTML structure (no `<div>` inside `<p>`, etc.)

### Files Still Using toLocaleString() (May Need Attention)

The following files use locale formatting and may show hydration warnings:

- `app/dashboard/analytics/reports/page.tsx` (multiple instances)
- `app/dashboard/campaigns/[id]/page.tsx`
- `app/dashboard/campaigns/page.tsx`
- `app/dashboard/campaigns/posts/[id]/page.tsx`
- `app/dashboard/campaigns/posts/page.tsx`
- `app/dashboard/content/[id]/page.tsx`
- `app/dashboard/content/page.tsx`
- `app/dashboard/partners/[id]/page.tsx`
- `app/dashboard/partners/page.tsx`
- `app/dashboard/partners/donations/[id]/page.tsx`
- `app/dashboard/partners/donations/page.tsx`
- `app/dashboard/projects/[id]/page.tsx`
- `app/dashboard/projects/page.tsx`

**Recommendation**: If users report hydration errors on these pages, add `suppressHydrationWarning` to the relevant elements or refactor to use the SafeHydration components.

## Testing

To verify hydration fixes:
1. Hard refresh the browser (Cmd+Shift+R / Ctrl+Shift+R)
2. Check browser console for hydration warnings
3. Verify that numbers and dates display correctly
4. Test in different locales if possible (change browser language settings)

## References

- [Next.js Hydration Errors](https://nextjs.org/docs/messages/react-hydration-error)
- [React suppressHydrationWarning](https://react.dev/reference/react-dom/client/hydrateRoot#suppressing-unavoidable-hydration-mismatch-errors)
- [MUI with Next.js App Router](https://mui.com/material-ui/integrations/nextjs/)
