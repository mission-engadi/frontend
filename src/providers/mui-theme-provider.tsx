'use client';

import { ThemeProvider, createTheme } from '@mui/material/styles';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v16-appRouter';
import { ReactNode, useMemo } from 'react';
import { useUIStore } from '@/src/stores/uiStore';

interface MUIThemeProviderProps {
  children: ReactNode;
}

/**
 * Neo-Brutalist Design System Theme
 *
 * Characteristics:
 * - Bold, high-contrast colors
 * - Hard-edged shadows (no blur)
 * - Thick borders (2-4px)
 * - Sharp corners (0-4px max)
 * - Strong typography with weight contrast
 */

// Neo-Brutalist Color Palette
const neoBrutalistColors = {
  // Primary colors - bold and saturated
  electricBlue: '#0066FF',
  hotPink: '#FF1493',
  acidYellow: '#DFFF00',
  brightOrange: '#FF6B00',
  mintGreen: '#00FF7F',

  // Neutral backgrounds
  pureWhite: '#FFFFFF',
  jetBlack: '#000000',
  offWhite: '#F5F5F5',
  darkGray: '#1A1A1A',
  mediumGray: '#333333',

  // Semantic colors
  success: '#00CC66',
  warning: '#FFAA00',
  error: '#FF3333',
  info: '#0099FF',
};

export function MUIThemeProvider({ children }: MUIThemeProviderProps) {
  const theme = useUIStore((state) => state.theme);
  const isDark = theme === 'dark';

  const muiTheme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: theme,
          primary: {
            main: neoBrutalistColors.electricBlue,
            light: '#3399FF',
            dark: '#0044CC',
            contrastText: neoBrutalistColors.pureWhite,
          },
          secondary: {
            main: neoBrutalistColors.hotPink,
            light: '#FF69B4',
            dark: '#CC1177',
            contrastText: neoBrutalistColors.pureWhite,
          },
          success: {
            main: neoBrutalistColors.success,
            light: '#33FF99',
            dark: '#009944',
            contrastText: neoBrutalistColors.jetBlack,
          },
          warning: {
            main: neoBrutalistColors.warning,
            light: '#FFCC33',
            dark: '#CC8800',
            contrastText: neoBrutalistColors.jetBlack,
          },
          error: {
            main: neoBrutalistColors.error,
            light: '#FF6666',
            dark: '#CC0000',
            contrastText: neoBrutalistColors.pureWhite,
          },
          info: {
            main: neoBrutalistColors.info,
            light: '#33BBFF',
            dark: '#0077CC',
            contrastText: neoBrutalistColors.pureWhite,
          },
          background: {
            default: isDark ? neoBrutalistColors.darkGray : neoBrutalistColors.offWhite,
            paper: isDark ? neoBrutalistColors.mediumGray : neoBrutalistColors.pureWhite,
          },
          text: {
            primary: isDark ? neoBrutalistColors.pureWhite : neoBrutalistColors.jetBlack,
            // Improved contrast ratios for accessibility (WCAG AA compliant)
            // Light mode: #444444 on #F5F5F5 = 7.1:1 contrast ratio
            // Dark mode: #CCCCCC on #1A1A1A = 10.5:1 contrast ratio
            secondary: isDark ? '#CCCCCC' : '#444444',
          },
          divider: isDark ? '#444444' : neoBrutalistColors.jetBlack,
        },

        typography: {
          fontFamily: [
            'Geist',
            '-apple-system',
            'BlinkMacSystemFont',
            '"Segoe UI"',
            'Roboto',
            '"Helvetica Neue"',
            'Arial',
            'sans-serif',
          ].join(','),

          // Neo-Brutalist: Strong weight contrast with explicit colors for readability
          h1: {
            fontWeight: 900,
            letterSpacing: '-0.02em',
            lineHeight: 1.1,
            color: isDark ? neoBrutalistColors.pureWhite : neoBrutalistColors.jetBlack,
          },
          h2: {
            fontWeight: 800,
            letterSpacing: '-0.02em',
            lineHeight: 1.2,
            color: isDark ? neoBrutalistColors.pureWhite : neoBrutalistColors.jetBlack,
          },
          h3: {
            fontWeight: 800,
            letterSpacing: '-0.01em',
            lineHeight: 1.2,
            color: isDark ? neoBrutalistColors.pureWhite : neoBrutalistColors.jetBlack,
          },
          h4: {
            fontWeight: 700,
            letterSpacing: '-0.01em',
            lineHeight: 1.3,
            color: isDark ? neoBrutalistColors.pureWhite : neoBrutalistColors.jetBlack,
          },
          h5: {
            fontWeight: 700,
            lineHeight: 1.4,
            color: isDark ? neoBrutalistColors.pureWhite : neoBrutalistColors.jetBlack,
          },
          h6: {
            fontWeight: 700,
            lineHeight: 1.4,
            color: isDark ? neoBrutalistColors.pureWhite : neoBrutalistColors.jetBlack,
          },
          subtitle1: {
            fontWeight: 600,
            lineHeight: 1.5,
            color: isDark ? neoBrutalistColors.pureWhite : neoBrutalistColors.jetBlack,
          },
          subtitle2: {
            fontWeight: 600,
            lineHeight: 1.5,
            color: isDark ? neoBrutalistColors.pureWhite : neoBrutalistColors.jetBlack,
          },
          body1: {
            fontWeight: 400,
            lineHeight: 1.6,
          },
          body2: {
            fontWeight: 400,
            lineHeight: 1.6,
          },
          button: {
            fontWeight: 700,
            letterSpacing: '0.02em',
            textTransform: 'none' as const,
          },
          caption: {
            fontWeight: 500,
            lineHeight: 1.4,
          },
          overline: {
            fontWeight: 700,
            letterSpacing: '0.1em',
            textTransform: 'uppercase' as const,
          },
        },

        // Neo-Brutalist: Sharp corners
        shape: {
          borderRadius: 0,
        },

        // Hard shadows for Neo-Brutalist aesthetic
        shadows: [
          'none',
          // Level 1-4: Small hard shadows
          `2px 2px 0px ${isDark ? '#000000' : '#000000'}`,
          `3px 3px 0px ${isDark ? '#000000' : '#000000'}`,
          `4px 4px 0px ${isDark ? '#000000' : '#000000'}`,
          `5px 5px 0px ${isDark ? '#000000' : '#000000'}`,
          // Level 5-8: Medium hard shadows
          `6px 6px 0px ${isDark ? '#000000' : '#000000'}`,
          `7px 7px 0px ${isDark ? '#000000' : '#000000'}`,
          `8px 8px 0px ${isDark ? '#000000' : '#000000'}`,
          `9px 9px 0px ${isDark ? '#000000' : '#000000'}`,
          // Level 9-12: Larger hard shadows
          `10px 10px 0px ${isDark ? '#000000' : '#000000'}`,
          `11px 11px 0px ${isDark ? '#000000' : '#000000'}`,
          `12px 12px 0px ${isDark ? '#000000' : '#000000'}`,
          `13px 13px 0px ${isDark ? '#000000' : '#000000'}`,
          // Level 13-24: Extra large (repeat pattern)
          `14px 14px 0px ${isDark ? '#000000' : '#000000'}`,
          `15px 15px 0px ${isDark ? '#000000' : '#000000'}`,
          `16px 16px 0px ${isDark ? '#000000' : '#000000'}`,
          `17px 17px 0px ${isDark ? '#000000' : '#000000'}`,
          `18px 18px 0px ${isDark ? '#000000' : '#000000'}`,
          `19px 19px 0px ${isDark ? '#000000' : '#000000'}`,
          `20px 20px 0px ${isDark ? '#000000' : '#000000'}`,
          `21px 21px 0px ${isDark ? '#000000' : '#000000'}`,
          `22px 22px 0px ${isDark ? '#000000' : '#000000'}`,
          `23px 23px 0px ${isDark ? '#000000' : '#000000'}`,
          `24px 24px 0px ${isDark ? '#000000' : '#000000'}`,
          `25px 25px 0px ${isDark ? '#000000' : '#000000'}`,
        ],

        components: {
          // Neo-Brutalist Buttons: Chunky with thick borders and hard shadows
          MuiButton: {
            styleOverrides: {
              root: {
                borderRadius: 0,
                fontWeight: 700,
                textTransform: 'none',
                padding: '12px 24px',
                minHeight: 48,
                border: `3px solid ${neoBrutalistColors.jetBlack}`,
                boxShadow: `4px 4px 0px ${neoBrutalistColors.jetBlack}`,
                transition: 'transform 0.1s ease, box-shadow 0.1s ease',
                '&:hover': {
                  transform: 'translate(2px, 2px)',
                  boxShadow: `2px 2px 0px ${neoBrutalistColors.jetBlack}`,
                },
                '&:active': {
                  transform: 'translate(4px, 4px)',
                  boxShadow: 'none',
                },
              },
              contained: {
                '&:hover': {
                  backgroundColor: 'inherit',
                  filter: 'brightness(1.1)',
                },
              },
              containedPrimary: {
                backgroundColor: neoBrutalistColors.electricBlue,
                color: neoBrutalistColors.pureWhite,
                '&:hover': {
                  backgroundColor: neoBrutalistColors.electricBlue,
                },
              },
              containedSecondary: {
                backgroundColor: neoBrutalistColors.hotPink,
                color: neoBrutalistColors.pureWhite,
                '&:hover': {
                  backgroundColor: neoBrutalistColors.hotPink,
                },
              },
              outlined: {
                borderWidth: 3,
                backgroundColor: isDark ? neoBrutalistColors.mediumGray : neoBrutalistColors.pureWhite,
                '&:hover': {
                  borderWidth: 3,
                  backgroundColor: isDark ? '#444444' : neoBrutalistColors.offWhite,
                },
              },
              text: {
                border: 'none',
                boxShadow: 'none',
                '&:hover': {
                  transform: 'none',
                  boxShadow: 'none',
                  backgroundColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)',
                },
                '&:active': {
                  transform: 'none',
                  boxShadow: 'none',
                },
              },
              sizeSmall: {
                padding: '8px 16px',
                minHeight: 40,
                fontSize: '0.875rem',
              },
              sizeLarge: {
                padding: '16px 32px',
                minHeight: 56,
                fontSize: '1.125rem',
              },
            },
          },

          // Neo-Brutalist Cards: Bordered containers with offset shadows
          MuiCard: {
            styleOverrides: {
              root: {
                borderRadius: 0,
                border: `3px solid ${neoBrutalistColors.jetBlack}`,
                boxShadow: `6px 6px 0px ${neoBrutalistColors.jetBlack}`,
                backgroundImage: 'none',
                overflow: 'visible',
              },
            },
          },

          MuiCardContent: {
            styleOverrides: {
              root: {
                padding: 24,
                '&:last-child': {
                  paddingBottom: 24,
                },
              },
            },
          },

          // Neo-Brutalist Paper
          MuiPaper: {
            styleOverrides: {
              root: {
                borderRadius: 0,
                backgroundImage: 'none',
              },
              elevation1: {
                border: `2px solid ${neoBrutalistColors.jetBlack}`,
                boxShadow: `4px 4px 0px ${neoBrutalistColors.jetBlack}`,
              },
              elevation2: {
                border: `2px solid ${neoBrutalistColors.jetBlack}`,
                boxShadow: `6px 6px 0px ${neoBrutalistColors.jetBlack}`,
              },
              elevation3: {
                border: `3px solid ${neoBrutalistColors.jetBlack}`,
                boxShadow: `8px 8px 0px ${neoBrutalistColors.jetBlack}`,
              },
            },
          },

          // Neo-Brutalist Inputs: Thick borders, visible focus states
          MuiTextField: {
            styleOverrides: {
              root: {
                '& .MuiOutlinedInput-root': {
                  borderRadius: 0,
                  '& fieldset': {
                    borderWidth: 2,
                    borderColor: neoBrutalistColors.jetBlack,
                  },
                  '&:hover fieldset': {
                    borderWidth: 3,
                    borderColor: neoBrutalistColors.jetBlack,
                  },
                  '&.Mui-focused fieldset': {
                    borderWidth: 3,
                    borderColor: neoBrutalistColors.electricBlue,
                    boxShadow: `3px 3px 0px ${neoBrutalistColors.electricBlue}`,
                  },
                },
                '& .MuiInputLabel-root': {
                  fontWeight: 600,
                },
              },
            },
          },

          MuiOutlinedInput: {
            styleOverrides: {
              root: {
                borderRadius: 0,
                '& fieldset': {
                  borderWidth: 2,
                  borderColor: neoBrutalistColors.jetBlack,
                },
                '&:hover fieldset': {
                  borderWidth: 3,
                  borderColor: neoBrutalistColors.jetBlack,
                },
                '&.Mui-focused fieldset': {
                  borderWidth: 3,
                  borderColor: neoBrutalistColors.electricBlue,
                },
              },
            },
          },

          // Neo-Brutalist Chips: Bold with thick borders
          MuiChip: {
            styleOverrides: {
              root: {
                borderRadius: 0,
                fontWeight: 600,
                border: `2px solid ${neoBrutalistColors.jetBlack}`,
                height: 32,
              },
              filled: {
                '&.MuiChip-colorPrimary': {
                  backgroundColor: neoBrutalistColors.electricBlue,
                  color: neoBrutalistColors.pureWhite,
                },
                '&.MuiChip-colorSecondary': {
                  backgroundColor: neoBrutalistColors.hotPink,
                  color: neoBrutalistColors.pureWhite,
                },
                '&.MuiChip-colorSuccess': {
                  backgroundColor: neoBrutalistColors.success,
                  color: neoBrutalistColors.jetBlack,
                },
                '&.MuiChip-colorWarning': {
                  backgroundColor: neoBrutalistColors.warning,
                  color: neoBrutalistColors.jetBlack,
                },
                '&.MuiChip-colorError': {
                  backgroundColor: neoBrutalistColors.error,
                  color: neoBrutalistColors.pureWhite,
                },
                '&.MuiChip-colorInfo': {
                  backgroundColor: neoBrutalistColors.info,
                  color: neoBrutalistColors.pureWhite,
                },
              },
              outlined: {
                borderWidth: 2,
              },
            },
          },

          // Neo-Brutalist Select
          MuiSelect: {
            styleOverrides: {
              root: {
                borderRadius: 0,
              },
            },
          },

          // Neo-Brutalist AppBar
          MuiAppBar: {
            styleOverrides: {
              root: {
                borderRadius: 0,
                boxShadow: 'none',
                borderBottom: `3px solid ${neoBrutalistColors.jetBlack}`,
              },
            },
          },

          // Neo-Brutalist Drawer
          MuiDrawer: {
            styleOverrides: {
              paper: {
                borderRadius: 0,
                borderRight: `3px solid ${neoBrutalistColors.jetBlack}`,
              },
            },
          },

          // Neo-Brutalist List Items
          MuiListItemButton: {
            styleOverrides: {
              root: {
                borderRadius: 0,
                '&.Mui-selected': {
                  backgroundColor: isDark
                    ? 'rgba(0, 102, 255, 0.2)'
                    : 'rgba(0, 102, 255, 0.1)',
                  borderLeft: `4px solid ${neoBrutalistColors.electricBlue}`,
                  '&:hover': {
                    backgroundColor: isDark
                      ? 'rgba(0, 102, 255, 0.3)'
                      : 'rgba(0, 102, 255, 0.15)',
                  },
                },
                '&:hover': {
                  backgroundColor: isDark
                    ? 'rgba(255, 255, 255, 0.05)'
                    : 'rgba(0, 0, 0, 0.04)',
                },
              },
            },
          },

          // Neo-Brutalist IconButton
          MuiIconButton: {
            styleOverrides: {
              root: {
                borderRadius: 0,
                '&:hover': {
                  backgroundColor: isDark
                    ? 'rgba(255, 255, 255, 0.1)'
                    : 'rgba(0, 0, 0, 0.08)',
                },
              },
            },
          },

          // Neo-Brutalist Avatar
          MuiAvatar: {
            styleOverrides: {
              root: {
                borderRadius: 0,
                border: `2px solid ${neoBrutalistColors.jetBlack}`,
              },
            },
          },

          // Neo-Brutalist Alert
          MuiAlert: {
            styleOverrides: {
              root: {
                borderRadius: 0,
                border: `3px solid ${neoBrutalistColors.jetBlack}`,
                fontWeight: 500,
              },
              standardSuccess: {
                backgroundColor: isDark ? 'rgba(0, 204, 102, 0.2)' : 'rgba(0, 204, 102, 0.1)',
                borderColor: neoBrutalistColors.success,
              },
              standardError: {
                backgroundColor: isDark ? 'rgba(255, 51, 51, 0.2)' : 'rgba(255, 51, 51, 0.1)',
                borderColor: neoBrutalistColors.error,
              },
              standardWarning: {
                backgroundColor: isDark ? 'rgba(255, 170, 0, 0.2)' : 'rgba(255, 170, 0, 0.1)',
                borderColor: neoBrutalistColors.warning,
              },
              standardInfo: {
                backgroundColor: isDark ? 'rgba(0, 153, 255, 0.2)' : 'rgba(0, 153, 255, 0.1)',
                borderColor: neoBrutalistColors.info,
              },
            },
          },

          // Neo-Brutalist Dialog
          MuiDialog: {
            styleOverrides: {
              paper: {
                borderRadius: 0,
                border: `3px solid ${neoBrutalistColors.jetBlack}`,
                boxShadow: `8px 8px 0px ${neoBrutalistColors.jetBlack}`,
              },
            },
          },

          // Neo-Brutalist Menu
          MuiMenu: {
            styleOverrides: {
              paper: {
                borderRadius: 0,
                border: `2px solid ${neoBrutalistColors.jetBlack}`,
                boxShadow: `4px 4px 0px ${neoBrutalistColors.jetBlack}`,
              },
            },
          },

          // Neo-Brutalist Tooltip
          MuiTooltip: {
            styleOverrides: {
              tooltip: {
                borderRadius: 0,
                border: `2px solid ${neoBrutalistColors.jetBlack}`,
                backgroundColor: isDark ? neoBrutalistColors.mediumGray : neoBrutalistColors.pureWhite,
                color: isDark ? neoBrutalistColors.pureWhite : neoBrutalistColors.jetBlack,
                fontWeight: 500,
                boxShadow: `3px 3px 0px ${neoBrutalistColors.jetBlack}`,
              },
            },
          },

          // Neo-Brutalist Badge
          MuiBadge: {
            styleOverrides: {
              badge: {
                borderRadius: 0,
                fontWeight: 700,
                border: `2px solid ${isDark ? neoBrutalistColors.mediumGray : neoBrutalistColors.pureWhite}`,
              },
            },
          },

          // Note: DataGrid styles are applied via sx prop in components
          // since MuiDataGrid is from @mui/x-data-grid, not core MUI

          // Neo-Brutalist Tab
          MuiTab: {
            styleOverrides: {
              root: {
                borderRadius: 0,
                fontWeight: 600,
                textTransform: 'none',
                '&.Mui-selected': {
                  fontWeight: 700,
                },
              },
            },
          },

          MuiTabs: {
            styleOverrides: {
              indicator: {
                height: 4,
                backgroundColor: neoBrutalistColors.electricBlue,
              },
            },
          },

          // Neo-Brutalist Checkbox and Radio
          MuiCheckbox: {
            styleOverrides: {
              root: {
                borderRadius: 0,
                '& .MuiSvgIcon-root': {
                  borderRadius: 0,
                },
              },
            },
          },

          MuiRadio: {
            styleOverrides: {
              root: {
                '& .MuiSvgIcon-root': {
                  borderRadius: 0,
                },
              },
            },
          },

          // Neo-Brutalist Switch
          MuiSwitch: {
            styleOverrides: {
              root: {
                '& .MuiSwitch-track': {
                  borderRadius: 0,
                },
                '& .MuiSwitch-thumb': {
                  borderRadius: 0,
                },
              },
            },
          },

          // Neo-Brutalist Accordion
          MuiAccordion: {
            styleOverrides: {
              root: {
                borderRadius: 0,
                border: `2px solid ${neoBrutalistColors.jetBlack}`,
                '&:before': {
                  display: 'none',
                },
                '&.Mui-expanded': {
                  margin: 0,
                },
              },
            },
          },

          // Neo-Brutalist Divider
          MuiDivider: {
            styleOverrides: {
              root: {
                borderColor: neoBrutalistColors.jetBlack,
                borderWidth: 1,
              },
            },
          },

          // Neo-Brutalist Typography - Ensure headings always have proper contrast
          MuiTypography: {
            styleOverrides: {
              root: {
                // Ensure text inherits proper color by default
              },
              h1: {
                color: isDark ? neoBrutalistColors.pureWhite : neoBrutalistColors.jetBlack,
              },
              h2: {
                color: isDark ? neoBrutalistColors.pureWhite : neoBrutalistColors.jetBlack,
              },
              h3: {
                color: isDark ? neoBrutalistColors.pureWhite : neoBrutalistColors.jetBlack,
              },
              h4: {
                color: isDark ? neoBrutalistColors.pureWhite : neoBrutalistColors.jetBlack,
              },
              h5: {
                color: isDark ? neoBrutalistColors.pureWhite : neoBrutalistColors.jetBlack,
              },
              h6: {
                color: isDark ? neoBrutalistColors.pureWhite : neoBrutalistColors.jetBlack,
              },
              subtitle1: {
                color: isDark ? neoBrutalistColors.pureWhite : neoBrutalistColors.jetBlack,
              },
              subtitle2: {
                color: isDark ? neoBrutalistColors.pureWhite : neoBrutalistColors.jetBlack,
              },
            },
          },

          // Neo-Brutalist CardHeader - Ensure card titles are readable
          MuiCardHeader: {
            styleOverrides: {
              root: {
                padding: 24,
              },
              title: {
                fontWeight: 700,
                color: isDark ? neoBrutalistColors.pureWhite : neoBrutalistColors.jetBlack,
              },
              subheader: {
                fontWeight: 500,
                color: isDark ? '#CCCCCC' : '#444444',
              },
            },
          },

          // Neo-Brutalist ListItemText - Ensure list item titles are readable
          MuiListItemText: {
            styleOverrides: {
              primary: {
                fontWeight: 600,
                color: isDark ? neoBrutalistColors.pureWhite : neoBrutalistColors.jetBlack,
              },
              secondary: {
                color: isDark ? '#CCCCCC' : '#444444',
              },
            },
          },

          // Neo-Brutalist DialogTitle - Ensure dialog titles are readable
          MuiDialogTitle: {
            styleOverrides: {
              root: {
                fontWeight: 700,
                color: isDark ? neoBrutalistColors.pureWhite : neoBrutalistColors.jetBlack,
              },
            },
          },

          // Neo-Brutalist TableCell - Ensure table headers are readable
          MuiTableCell: {
            styleOverrides: {
              head: {
                fontWeight: 700,
                color: isDark ? neoBrutalistColors.pureWhite : neoBrutalistColors.jetBlack,
                backgroundColor: isDark ? neoBrutalistColors.mediumGray : neoBrutalistColors.offWhite,
                borderBottom: `2px solid ${neoBrutalistColors.jetBlack}`,
              },
              body: {
                color: isDark ? neoBrutalistColors.pureWhite : neoBrutalistColors.jetBlack,
                borderBottom: `1px solid ${isDark ? '#444444' : '#DDDDDD'}`,
              },
            },
          },
        },
      }),
    [theme, isDark]
  );

  return (
    <AppRouterCacheProvider>
      <ThemeProvider theme={muiTheme}>
        {children}
      </ThemeProvider>
    </AppRouterCacheProvider>
  );
}
