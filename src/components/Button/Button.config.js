// Button Configuration
// This file allows you to easily customize button defaults and add new variants

export const buttonConfig = {
  // Default props for all buttons
  defaults: {
    variant: "primary",
    size: "medium",
    fullWidth: false,
    isLoading: false,
    disabled: false,
  },

  // Color palette for button variants (can be overridden in theme)
  colors: {
    brand: {
      background: "#ff6b35",
      backgroundHover: "#e55a2b",
      text: "#ffffff",
      border: "#ff6b35",
    },
    primary: {
      background: "theme.colors.primary",
      backgroundHover: "theme.colors.primaryHover",
      text: "theme.colors.white",
      border: "theme.colors.primary",
    },
    secondary: {
      background: "theme.colors.backgroundSecondary",
      backgroundHover: "theme.colors.backgroundTertiary",
      text: "theme.colors.textPrimary",
      border: "theme.colors.border",
    },
    success: {
      background: "theme.colors.success",
      backgroundHover: "#218838",
      text: "theme.colors.white",
      border: "theme.colors.success",
    },
    danger: {
      background: "theme.colors.danger",
      backgroundHover: "theme.colors.dangerHover",
      text: "theme.colors.white",
      border: "theme.colors.danger",
    },
    warning: {
      background: "theme.colors.warning",
      backgroundHover: "#e0a800",
      text: "theme.colors.dark",
      border: "theme.colors.warning",
    },
    info: {
      background: "theme.colors.info",
      backgroundHover: "#138496",
      text: "theme.colors.white",
      border: "theme.colors.info",
    },
  },

  // Size configurations
  sizes: {
    small: {
      padding: "theme.spacing.sm theme.spacing.md",
      fontSize: "theme.fontSize.sm",
      minHeight: "32px",
    },
    medium: {
      padding: "theme.spacing.md theme.spacing.lg",
      fontSize: "theme.fontSize.md",
      minHeight: "40px",
    },
    large: {
      padding: "theme.spacing.lg theme.spacing.xl",
      fontSize: "theme.fontSize.lg",
      minHeight: "48px",
    },
    xlarge: {
      padding: "theme.spacing.xl theme.spacing.xxl",
      fontSize: "theme.fontSize.xl",
      minHeight: "56px",
    },
  },

  // Animation and transition settings
  animations: {
    transition: "theme.transitions.fast",
    hoverTransform: "translateY(-2px)",
    activeTransform: "translateY(0)",
    focusBoxShadow: "0 0 0 3px",
  },

  // Border radius settings
  borderRadius: "theme.borderRadius.md",

  // Shadow configurations
  shadows: {
    default: "theme.shadows.sm",
    hover: "theme.shadows.md",
    focus: "0 0 0 3px",
  },
};

// Helper function to create custom button variants
export const createButtonVariant = (config) => {
  return {
    backgroundColor: config.background,
    color: config.text,
    border: `1px solid ${config.border}`,
    "&:hover:not(:disabled)": {
      backgroundColor: config.backgroundHover,
      borderColor: config.borderHover || config.backgroundHover,
      transform: "translateY(-2px)",
      boxShadow: `0 4px 12px ${config.background}40`,
    },
  };
};

// Example of how to create a custom variant
export const customVariants = {
  // Example: Create a gradient button
  gradient: {
    background: "linear-gradient(45deg, #ff6b35, #f7931e)",
    backgroundHover: "linear-gradient(45deg, #e55a2b, #e8851d)",
    text: "#ffffff",
    border: "transparent",
  },

  // Example: Create a minimal button
  minimal: {
    background: "transparent",
    backgroundHover: "theme.colors.backgroundSecondary",
    text: "theme.colors.textSecondary",
    border: "transparent",
  },
};

export default buttonConfig;
