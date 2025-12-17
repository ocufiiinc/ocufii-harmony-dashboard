import styled, { css } from "styled-components";

// Input container wrapper
export const InputContainer = styled.div`
  margin-bottom: ${({ theme, hasError }) =>
    hasError ? theme.spacing.sm : theme.spacing.lg};
  width: 100%;

  @media (max-width: 768px) {
    margin-bottom: ${({ theme, hasError }) =>
      hasError ? theme.spacing.xs : theme.spacing.md};
  }

  @media (max-width: 576px) {
    margin-bottom: ${({ theme, hasError }) =>
      hasError ? theme.spacing.xs : theme.spacing.sm};
  }
`;

// Label styling
export const InputLabel = styled.label`
  display: block;
  margin-bottom: ${({ theme }) => theme.spacing.sm};
  color: ${({ theme }) => theme.colors.textPrimary};
  font-weight: ${({ theme }) => theme.fontWeight.medium};
  font-size: ${({ theme }) => theme.fontSize.sm};
  text-align: left;
  transition: color ${({ theme }) => theme.transitions.fast};

  ${({ required }) =>
    required &&
    css`
      &::after {
        content: " *";
        color: ${({ theme }) => theme.colors.danger};
      }
    `}

  ${({ hasError, theme }) =>
    hasError &&
    css`
      color: ${theme.colors.danger};
    `}

  @media (max-width: 768px) {
    font-size: ${({ theme }) => theme.fontSize.xs};
    margin-bottom: ${({ theme }) => theme.spacing.xs};
  }

  @media (max-width: 576px) {
    font-size: 0.75rem;
  }

  @media (max-width: 480px) {
    font-size: 0.7rem;
  }
`;

// Input field styling with variants
export const StyledInput = styled.input`
  width: 100%;
  padding: ${({ theme, size = "medium" }) => {
    switch (size) {
      case "small":
        return `${theme.spacing.sm} ${theme.spacing.md}`;
      case "large":
        return `${theme.spacing.lg} ${theme.spacing.xl}`;
      default:
        return `${theme.spacing.md} ${theme.spacing.lg}`;
    }
  }};
  border: 1px solid
    ${({ theme, hasError }) =>
      hasError ? theme.colors.danger : theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  font-size: ${({ theme, size = "medium" }) => {
    switch (size) {
      case "small":
        return theme.fontSize.sm;
      case "large":
        return theme.fontSize.lg;
      default:
        return theme.fontSize.md;
    }
  }};
  background-color: ${({ theme, variant = "default" }) => {
    switch (variant) {
      case "dark":
        return "#2a2a2a";
      case "light":
        return theme.colors.white;
      default:
        return theme.colors.background;
    }
  }};
  color: ${({ theme, variant = "default" }) => {
    switch (variant) {
      case "dark":
        return "#ffffff";
      default:
        return theme.colors.textPrimary;
    }
  }};
  transition: all ${({ theme }) => theme.transitions.fast};
  box-sizing: border-box;
  font-family: inherit;

  &:focus {
    outline: none;
    border-color: ${({ theme, hasError }) =>
      hasError ? theme.colors.danger : theme.colors.primary};
    background-color: ${({ theme, variant = "default" }) => {
      switch (variant) {
        case "dark":
          return "#333";
        default:
          return theme.colors.background;
      }
    }};
    box-shadow: 0 0 0 3px
      ${({ theme, hasError }) =>
        hasError ? `${theme.colors.danger}30` : `${theme.colors.primary}30`};
  }

  &::placeholder {
    color: ${({ theme, variant = "default" }) => {
      switch (variant) {
        case "dark":
          return "#888";
        default:
          return theme.colors.textMuted;
      }
    }};
  }

  &:disabled {
    background-color: ${({ theme }) => theme.colors.backgroundTertiary};
    color: ${({ theme }) => theme.colors.textMuted};
    cursor: not-allowed;
    opacity: 0.6;
  }

  ${({ fullWidth }) =>
    fullWidth &&
    css`
      width: 100%;
    `}

  ${({ hasError, theme }) =>
    hasError &&
    css`
      &:focus {
        box-shadow: 0 0 0 3px ${theme.colors.danger}30;
      }
    `}

  // Custom styles override
  ${({ customStyles }) => customStyles}

  @media (max-width: 768px) {
    padding: ${({ theme, size = "medium" }) => {
      switch (size) {
        case "small":
          return `${theme.spacing.xs} ${theme.spacing.sm}`;
        case "large":
          return `${theme.spacing.md} ${theme.spacing.lg}`;
        default:
          return `${theme.spacing.sm} ${theme.spacing.md}`;
      }
    }};
    font-size: ${({ theme, size = "medium" }) => {
      switch (size) {
        case "small":
          return theme.fontSize.xs;
        case "large":
          return theme.fontSize.md;
        default:
          return theme.fontSize.sm;
      }
    }};
  }

  @media (max-width: 576px) {
    padding: ${({ theme }) => "0.6rem"};
    font-size: ${({ theme }) => theme.fontSize.xs};
  }

  @media (max-width: 480px) {
    padding: 0.5rem;
    font-size: 0.75rem;
  }

  @media (max-width: 360px) {
    padding: 0.4rem;
    font-size: 0.7rem;
  }
`;

// Error message styling
export const ErrorMessage = styled.div`
  color: ${({ theme }) => theme.colors.danger};
  font-size: ${({ theme }) => theme.fontSize.xs};
  margin-top: ${({ theme }) => theme.spacing.xs};
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs};
  font-weight: ${({ theme }) => theme.fontWeight.medium};
  line-height: 1.4;

  svg {
    width: 14px;
    height: 14px;
    fill: currentColor;
    flex-shrink: 0;
  }

  @media (max-width: 576px) {
    font-size: 0.75rem;
    margin-top: ${({ theme }) => theme.spacing.xs};
  }

  @media (max-width: 480px) {
    font-size: 0.7rem;
  }

  @media (max-width: 360px) {
    font-size: 0.65rem;
  }
`;

// Success message styling
export const SuccessMessage = styled.div`
  color: ${({ theme }) => theme.colors.success};
  font-size: ${({ theme }) => theme.fontSize.xs};
  margin-top: ${({ theme }) => theme.spacing.xs};
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs};
  font-weight: ${({ theme }) => theme.fontWeight.medium};

  svg {
    width: 14px;
    height: 14px;
    fill: currentColor;
    flex-shrink: 0;
  }
`;

// Helper text styling
export const HelperText = styled.div`
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: ${({ theme }) => theme.fontSize.xs};
  margin-top: ${({ theme }) => theme.spacing.xs};
  line-height: 1.4;

  @media (max-width: 576px) {
    font-size: 0.75rem;
  }

  @media (max-width: 480px) {
    font-size: 0.7rem;
  }
`;

// Input wrapper for icons
export const InputWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

// Icon styling
export const InputIcon = styled.div`
  position: absolute;
  ${({ position = "left" }) => position}: ${({ theme }) => theme.spacing.md};
  color: ${({ theme }) => theme.colors.textMuted};
  display: flex;
  align-items: center;
  pointer-events: none;
  z-index: 1;

  svg {
    width: 16px;
    height: 16px;
    fill: currentColor;
  }

  @media (max-width: 768px) {
    ${({ position = "left" }) => position}: ${({ theme }) => theme.spacing.sm};

    svg {
      width: 14px;
      height: 14px;
    }
  }
`;

// Input with icon padding adjustments
export const InputWithIcon = styled(StyledInput)`
  ${({ hasLeftIcon, hasRightIcon, theme }) => css`
    padding-left: ${hasLeftIcon ? "2.5rem" : theme.spacing.lg};
    padding-right: ${hasRightIcon ? "2.5rem" : theme.spacing.lg};

    @media (max-width: 768px) {
      padding-left: ${hasLeftIcon ? "2rem" : theme.spacing.md};
      padding-right: ${hasRightIcon ? "2rem" : theme.spacing.md};
    }

    @media (max-width: 576px) {
      padding-left: ${hasLeftIcon ? "1.8rem" : "0.6rem"};
      padding-right: ${hasRightIcon ? "1.8rem" : "0.6rem"};
    }
  `}
`;
