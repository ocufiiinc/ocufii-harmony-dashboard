import { useTheme } from "../theme/ThemeContext";

// Custom hook to get commonly used theme values
export const useThemeValues = () => {
  const { theme, isDark, toggleTheme, currentTheme } = useTheme();

  return {
    theme,
    isDark,
    toggleTheme,
    currentTheme,
    // Common color shortcuts
    colors: theme.colors,
    spacing: theme.spacing,
    fontSize: theme.fontSize,
    borderRadius: theme.borderRadius,
    shadows: theme.shadows,
    transitions: theme.transitions,

    // Utility functions
    getTextColor: (variant = "primary") => {
      const colorMap = {
        primary: theme.colors.textPrimary,
        secondary: theme.colors.textSecondary,
        muted: theme.colors.textMuted,
      };
      return colorMap[variant] || theme.colors.textPrimary;
    },

    getBackgroundColor: (variant = "primary") => {
      const colorMap = {
        primary: theme.colors.background,
        secondary: theme.colors.backgroundSecondary,
        tertiary: theme.colors.backgroundTertiary,
      };
      return colorMap[variant] || theme.colors.background;
    },
  };
};
