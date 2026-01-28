# MinistryOS Neo-Brutalist Design System

This document outlines the Neo-Brutalist design system implemented for the MinistryOS frontend application.

## Design Principles

The Neo-Brutalist aesthetic is characterized by:

1. **Bold, High-Contrast Colors** - Saturated primaries against stark backgrounds
2. **Hard-Edged Shadows** - No blur, only offset shadows (e.g., `4px 4px 0px #000`)
3. **Thick Borders** - 2-4px minimum, black borders are canonical
4. **Sharp Corners** - 0-4px max border radius
5. **Strong Typography** - Bold, chunky typefaces with weight contrast

## Color Palette

### Primary Colors
- Electric Blue: `#0066FF` - Primary brand color
- Hot Pink: `#FF1493` - Secondary/accent
- Acid Yellow: `#DFFF00` - Highlight/call-to-action
- Bright Orange: `#FF6B00` - Warning accent
- Mint Green: `#00FF7F` - Success accent

### Neutral Colors
- Pure White: `#FFFFFF`
- Jet Black: `#000000`
- Off White: `#F5F5F5` - Light mode background
- Dark Gray: `#1A1A1A` - Dark mode background
- Medium Gray: `#333333` - Dark mode surfaces

### Semantic Colors
- Success: `#00CC66`
- Warning: `#FFAA00`
- Error: `#FF3333`
- Info: `#0099FF`

## Shadow System

All shadows are hard-edged with no blur:

```css
--shadow-small: 4px 4px 0px #000000;
--shadow-medium: 6px 6px 0px #000000;
--shadow-large: 8px 8px 0px #000000;
```

### Interactive Shadow Behavior
- **Default**: Full shadow offset
- **Hover**: Shadow reduces, element translates toward shadow direction
- **Active/Pressed**: Shadow disappears, element at full translation

Example:
```tsx
sx={{
  boxShadow: '4px 4px 0px #000',
  transition: 'transform 0.1s ease, box-shadow 0.1s ease',
  '&:hover': {
    transform: 'translate(2px, 2px)',
    boxShadow: '2px 2px 0px #000',
  },
  '&:active': {
    transform: 'translate(4px, 4px)',
    boxShadow: 'none',
  },
}}
```

## Typography

Font stack: `Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif`

### Weight Hierarchy
- h1: 900 (Black)
- h2, h3: 800 (Extra Bold)
- h4, h5, h6: 700 (Bold)
- Subtitle: 600 (Semi Bold)
- Body: 400 (Regular)
- Button: 700 (Bold)
- Caption: 500 (Medium)

### Letter Spacing
- Headlines: `-0.02em` (tight)
- Labels: `0.05em` (spaced)
- Buttons: `0.02em`

## Component Library

### Import Statement
```tsx
import {
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
} from '@/src/components/ui';
```

### PageHeader
Standard page header with title, subtitle, and optional action button.

```tsx
<PageHeader
  title="Projects"
  subtitle="Manage your humanitarian projects"
  action={<Button variant="contained">Create Project</Button>}
/>
```

### StatCard
Metric card with icon, value, trend indicator, and optional sparkline.

```tsx
<StatCard
  label="Active Projects"
  value="24"
  icon={<FolderKanban size={24} />}
  color="#0066FF"
  change="+12%"
  trend="up"
  sparklineData={[12, 15, 13, 18, 16, 22, 24]}
/>
```

### StatsGrid
Responsive grid container for stat cards.

```tsx
<StatsGrid columns={4}>
  <StatCard ... />
  <StatCard ... />
</StatsGrid>
```

### StatusChip
Pre-styled chip for common status values.

```tsx
<StatusChip status="active" />
<StatusChip status="pending" variant="outlined" />
```

Supported statuses: `active`, `published`, `completed`, `planned`, `pending`, `draft`, `inactive`, `on_hold`, `cancelled`, `error`, `review`

### SectionCard
Card with header section for content grouping.

```tsx
<SectionCard
  title="Recent Activity"
  subtitle="Track your latest updates"
  action={<Button>View All</Button>}
>
  {/* Content */}
</SectionCard>
```

### FilterBar
Card container for filter controls.

```tsx
<FilterBar>
  <TextField placeholder="Search..." />
  <Select>...</Select>
</FilterBar>
```

### EmptyState
Centered empty state with icon, message, and optional action.

```tsx
<EmptyState
  icon={<FolderKanban size={32} />}
  title="No Projects Yet"
  description="Create your first project to get started"
  action={<Button>Create Project</Button>}
/>
```

### ProgressBar
Neo-Brutalist styled progress indicator.

```tsx
<ProgressBar
  value={75}
  max={100}
  color="#0066FF"
  showLabel={true}
  height={24}
/>
```

## CSS Utility Classes

Available in `globals.css`:

```css
.neo-card        /* Card with border and shadow */
.neo-button      /* Button with shadow and hover effect */
.neo-button-primary
.neo-button-secondary
.neo-input       /* Input with thick border */
.neo-badge       /* Badge/tag */
.neo-badge-success
.neo-badge-warning
.neo-badge-error
.neo-badge-info
.font-black      /* font-weight: 900 */
.tracking-tight  /* letter-spacing: -0.02em */
.uppercase-label /* Uppercase with letter spacing */
```

## MUI Theme Integration

The theme is configured in `/src/providers/mui-theme-provider.tsx` and automatically styles:
- Buttons (with shadow hover effects)
- Cards (bordered with offset shadows)
- Text Fields (thick borders, colored focus states)
- Chips (squared with borders)
- Alerts (bordered with semantic colors)
- Dialogs, Menus, Tooltips
- List items, Avatars, Badges
- Tabs, Checkboxes, Switches
- Accordions, Dividers

## Responsive Breakpoints

- Mobile: 320px - 767px
- Tablet: 768px - 1199px
- Desktop: 1200px+

## Accessibility

- Minimum color contrast ratio: 4.5:1 for text
- Minimum touch target: 44px
- Visible focus indicators: 3px solid primary color
- All interactive elements have focus states

## File Structure

```
src/
  components/
    ui/
      index.tsx        # Shared UI components
  design-system/
    README.md          # This file
  providers/
    mui-theme-provider.tsx  # MUI theme configuration
app/
  globals.css          # CSS variables and utility classes
```
