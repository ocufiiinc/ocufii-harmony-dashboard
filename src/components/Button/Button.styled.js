import styled, { css } from "styled-components";

// Button size variants
const sizeVariants = {
  small: css`
    padding: ${({ theme }) => theme.spacing.sm}
      ${({ theme }) => theme.spacing.md};
    font-size: ${({ theme }) => theme.fontSize.sm};
    min-height: 32px;
  `,
  medium: css`
    padding: ${({ theme }) => theme.spacing.md}
      ${({ theme }) => theme.spacing.lg};
    font-size: ${({ theme }) => theme.fontSize.md};
    min-height: 40px;
  `,
  large: css`
    padding: ${({ theme }) => theme.spacing.lg}
      ${({ theme }) => theme.spacing.xl};
    font-size: ${({ theme }) => theme.fontSize.lg};
    min-height: 48px;
  `,
  xlarge: css`
    padding: ${({ theme }) => theme.spacing.xl}
      ${({ theme }) => theme.spacing.xxl};
    font-size: ${({ theme }) => theme.fontSize.xl};
    min-height: 56px;
  `,
};

// Button variant styles
const buttonVariants = {
  primary: css`
    background-color: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.white};
    border: 1px solid ${({ theme }) => theme.colors.primary};

    &:hover:not(:disabled) {
      background-color: ${({ theme }) => theme.colors.primaryHover};
      border-color: ${({ theme }) => theme.colors.primaryHover};
      transform: translateY(-2px);
      box-shadow: 0 4px 12px ${({ theme }) => theme.colors.primary}40;
    }
  `,

  secondary: css`
    background-color: ${({ theme }) => theme.colors.backgroundSecondary};
    color: ${({ theme }) => theme.colors.textPrimary};
    border: 1px solid ${({ theme }) => theme.colors.border};

    &:hover:not(:disabled) {
      background-color: ${({ theme }) => theme.colors.backgroundTertiary};
      border-color: ${({ theme }) => theme.colors.borderHover};
      transform: translateY(-2px);
      box-shadow: ${({ theme }) => theme.shadows.md};
    }
  `,

  success: css`
    background-color: ${({ theme }) => theme.colors.success};
    color: ${({ theme }) => theme.colors.white};
    border: 1px solid ${({ theme }) => theme.colors.success};

    &:hover:not(:disabled) {
      background-color: #218838;
      border-color: #1e7e34;
      transform: translateY(-2px);
      box-shadow: 0 4px 12px ${({ theme }) => theme.colors.success}40;
    }
  `,

  danger: css`
    background-color: ${({ theme }) => theme.colors.danger};
    color: ${({ theme }) => theme.colors.white};
    border: 1px solid ${({ theme }) => theme.colors.danger};

    &:hover:not(:disabled) {
      background-color: ${({ theme }) => theme.colors.dangerHover};
      border-color: ${({ theme }) => theme.colors.dangerHover};
      transform: translateY(-2px);
      box-shadow: 0 4px 12px ${({ theme }) => theme.colors.danger}40;
    }
  `,

  warning: css`
    background-color: ${({ theme }) => theme.colors.warning};
    color: ${({ theme }) => theme.colors.dark};
    border: 1px solid ${({ theme }) => theme.colors.warning};

    &:hover:not(:disabled) {
      background-color: #e0a800;
      border-color: #d39e00;
      transform: translateY(-2px);
      box-shadow: 0 4px 12px ${({ theme }) => theme.colors.warning}40;
    }
  `,

  info: css`
    background-color: ${({ theme }) => theme.colors.info};
    color: ${({ theme }) => theme.colors.white};
    border: 1px solid ${({ theme }) => theme.colors.info};

    &:hover:not(:disabled) {
      background-color: #138496;
      border-color: #117a8b;
      transform: translateY(-2px);
      box-shadow: 0 4px 12px ${({ theme }) => theme.colors.info}40;
    }
  `,

  outline: css`
    background-color: transparent;
    color: ${({ theme }) => theme.colors.primary};
    border: 2px solid ${({ theme }) => theme.colors.primary};

    &:hover:not(:disabled) {
      background-color: ${({ theme }) => theme.colors.primary};
      color: ${({ theme }) => theme.colors.white};
      transform: translateY(-2px);
      box-shadow: 0 4px 12px ${({ theme }) => theme.colors.primary}40;
    }
  `,

  ghost: css`
    background-color: transparent;
    color: ${({ theme }) => theme.colors.textPrimary};
    border: 1px solid transparent;

    &:hover:not(:disabled) {
      background-color: ${({ theme }) => theme.colors.backgroundSecondary};
      border-color: ${({ theme }) => theme.colors.border};
      transform: translateY(-1px);
      box-shadow: ${({ theme }) => theme.shadows.sm};
    }
  `,

  // Custom brand button for Ocufii
  brand: css`
    background-color: #ff6b35;
    color: #ffffff;
    border: 1px solid #ff6b35;
    text-transform: uppercase;
    letter-spacing: 1px;
    font-weight: ${({ theme }) => theme.fontWeight.bold};

    &:hover:not(:disabled) {
      background-color: #e55a2b;
      border-color: #e55a2b;
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(255, 107, 53, 0.3);
    }
  `,
};

// Main styled button component
export const StyledButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing.sm};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  font-weight: ${({ theme }) => theme.fontWeight.medium};
  line-height: 1;
  cursor: pointer;
  transition: all ${({ theme }) => theme.transitions.fast};
  text-decoration: none;
  user-select: none;
  white-space: nowrap;
  box-sizing: border-box;
  font-family: inherit;

  /* Apply size variant */
  ${({ $size = "medium" }) => sizeVariants[$size]}

  /* Apply button variant */
  ${({ $variant = "primary" }) => buttonVariants[$variant]}
  
  /* Full width option */
  ${({ $fullWidth }) =>
    $fullWidth &&
    css`
      width: 100%;
    `}
  
  /* Disabled state */
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none !important;
    box-shadow: none !important;

    &:hover {
      transform: none !important;
      box-shadow: none !important;
    }
  }

  /* Active state */
  &:active:not(:disabled) {
    transform: translateY(0) !important;
  }

  /* Focus state */
  &:focus {
    outline: none;
    box-shadow: 0 0 0 3px
      ${({ theme, $variant }) =>
        $variant === "brand"
          ? "rgba(255, 107, 53, 0.3)"
          : `${theme.colors.primary}30`};
  }

  /* Loading state */
  ${({ $isLoading }) =>
    $isLoading &&
    css`
      pointer-events: none;
      position: relative;

      &::after {
        content: "";
        position: absolute;
        width: 16px;
        height: 16px;
        border: 2px solid transparent;
        border-top: 2px solid currentColor;
        border-radius: 50%;
        animation: spin 1s linear infinite;
      }

      @keyframes spin {
        0% {
          transform: rotate(0deg);
        }
        100% {
          transform: rotate(360deg);
        }
      }
    `}

  /* Icon styling */
  svg {
    width: 1em;
    height: 1em;
    fill: currentColor;
  }

  /* Custom styles override */
  ${({ $customStyles }) => $customStyles}

  /* Responsive adjustments */
  @media (max-width: 768px) {
    ${({ $size = "medium" }) =>
      $size === "large" &&
      css`
        padding: ${({ theme }) => theme.spacing.md}
          ${({ theme }) => theme.spacing.lg};
        font-size: ${({ theme }) => theme.fontSize.md};
        min-height: 44px;
      `}

    ${({ $size = "medium" }) =>
      $size === "xlarge" &&
      css`
        padding: ${({ theme }) => theme.spacing.lg}
          ${({ theme }) => theme.spacing.xl};
        font-size: ${({ theme }) => theme.fontSize.lg};
        min-height: 48px;
      `}
  }

  @media (max-width: 576px) {
    ${({ $size = "medium" }) =>
      $size === "xlarge" &&
      css`
        padding: ${({ theme }) => theme.spacing.md}
          ${({ theme }) => theme.spacing.lg};
        font-size: ${({ theme }) => theme.fontSize.md};
        min-height: 44px;
      `}
  }
`;
