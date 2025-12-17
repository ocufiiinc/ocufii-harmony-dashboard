export const lightTheme = {
  colors: {
    primary: "#007bff",
    primaryHover: "#0056b3",
    secondary: "#6c757d",
    success: "#28a745",
    danger: "#dc3545",
    dangerHover: "#c82333",
    warning: "#ffc107",
    info: "#17a2b8",
    light: "#f8f9fa",
    dark: "#343a40",
    white: "#ffffff",
    black: "#000000",

    // Background colors
    background: "#ffffff",
    backgroundSecondary: "#f8f9fa",
    backgroundTertiary: "#e9ecef",

    // Text colors
    textPrimary: "#212529",
    textSecondary: "#6c757d",
    textMuted: "#adb5bd",

    // Border colors
    border: "#dee2e6",
    borderHover: "#007bff",

    // Shadow colors
    shadow: "rgba(0, 0, 0, 0.1)",
    shadowHover: "rgba(0, 0, 0, 0.15)",

    // Sidebar colors
    sidebarBackground: "#292828", // Gray-900 for light theme
    sidebarText: "#ffffff",
    sidebarTextSecondary: "#b3b3b3",
    sidebarBorder: "#404040",
  },

  spacing: {
    xs: "0.25rem", // 4px
    sm: "0.5rem", // 8px
    md: "1rem", // 16px
    lg: "1.5rem", // 24px
    xl: "2rem", // 32px
    xxl: "3rem", // 48px
  },

  fontSize: {
    xs: "0.75rem", // 12px
    sm: "0.875rem", // 14px
    md: "1rem", // 16px
    lg: "1.125rem", // 18px
    xl: "1.25rem", // 20px
    xxl: "1.5rem", // 24px
    xxxl: "2rem", // 32px
  },

  fontFamily: {
    primary: "'Decimal', 'Segoe UI'",
    secondary: "'Decimal', 'Segoe UI'",
  },

  fontWeight: {
    light: 300,
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
  },

  borderRadius: {
    none: "0",
    sm: "0.125rem", // 2px
    md: "0.25rem", // 4px
    lg: "0.5rem", // 8px
    xl: "0.75rem", // 12px
    xxl: "1rem", // 16px
    full: "50%",
  },

  shadows: {
    none: "none",
    sm: "0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24)",
    md: "0 4px 6px rgba(0, 0, 0, 0.07), 0 1px 3px rgba(0, 0, 0, 0.1)",
    lg: "0 10px 15px rgba(0, 0, 0, 0.1), 0 4px 6px rgba(0, 0, 0, 0.05)",
    xl: "0 20px 25px rgba(0, 0, 0, 0.1), 0 10px 10px rgba(0, 0, 0, 0.04)",
  },

  transitions: {
    fast: "0.15s ease-in-out",
    normal: "0.3s ease-in-out",
    slow: "0.5s ease-in-out",
  },

  breakpoints: {
    xs: "0px",
    sm: "576px",
    md: "768px",
    lg: "992px",
    xl: "1200px",
    xxl: "1400px",
  },

  zIndex: {
    dropdown: 1000,
    sticky: 1020,
    fixed: 1030,
    modalBackdrop: 1040,
    modal: 1050,
    popover: 1060,
    tooltip: 1070,
  },
};

export const darkTheme = {
  ...lightTheme,
  colors: {
    ...lightTheme.colors,
    primary: "#0d6efd",
    primaryHover: "#0b5ed7",

    // Background colors
    background: "#121212",
    backgroundSecondary: "#1e1e1e",
    backgroundTertiary: "#2d2d2d",

    // Text colors
    textPrimary: "#ffffff",
    textSecondary: "#b3b3b3",
    textMuted: "#6c757d",

    // Border colors
    border: "#404040",
    borderHover: "#0d6efd",

    // Shadow colors
    shadow: "rgba(0, 0, 0, 0.3)",
    shadowHover: "rgba(0, 0, 0, 0.4)",

    // Sidebar colors
    sidebarBackground: "#ffffff", // White for dark theme
    sidebarText: "#212529",
    sidebarTextSecondary: "#6c757d",
    sidebarBorder: "#dee2e6",
  },
};

export const themes = {
  light: lightTheme,
  dark: darkTheme,
};
