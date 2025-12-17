import styled, { css } from "styled-components";

// Primary Button Styled Component
export const StyledPrimaryButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 12px 24px;
  border: none;
  border-radius: 8px;
  font-weight: 400;
  font-size: 14px;
  line-height: 1;
  cursor: pointer;
  transition: all 0.2s ease;
  text-decoration: none;
  user-select: none;
  white-space: nowrap;
  box-sizing: border-box;
  font-family: ${({ theme }) => theme.fontFamily.primary};
  min-height: 44px;

  /* Color configuration */
  background-color: ${({ $color }) => $color || "#007bff"};
  color: ${({ $textColor }) => $textColor || "#ffffff"};

  /* Width configuration */
  ${({ $width }) =>
    $width === "full"
      ? css`
          width: 100%;
        `
      : $width
      ? css`
          width: ${$width};
        `
      : css`
          width: auto;
        `}

  /* Size variants */
  ${({ $size }) =>
    $size === "small" &&
    css`
      padding: 8px 16px;
      font-size: 12px;
      min-height: 36px;
    `}

  ${({ $size }) =>
    $size === "large" &&
    css`
      padding: 16px 32px;
      font-size: 16px;
      min-height: 52px;
    `}

  /* Hover state */
  &:hover:not(:disabled) {
    background-color: ${({ $hoverColor, $color }) =>
      $hoverColor || ($color ? `${$color}dd` : "#0056b3")};
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 123, 255, 0.25);
  }

  /* Active state */
  &:active:not(:disabled) {
    transform: translateY(0);
  }

  /* Focus state */
  &:focus {
    outline: none;
    box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.25);
  }

  /* Disabled state */
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none !important;
    box-shadow: none !important;
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

  /* Custom border radius */
  ${({ $borderRadius }) =>
    $borderRadius &&
    css`
      border-radius: ${$borderRadius};
    `}

  /* Responsive */
  @media (max-width: 768px) {
    ${({ $size }) =>
      $size === "large" &&
      css`
        padding: 12px 24px;
        font-size: 14px;
        min-height: 44px;
      `}
  }
`;

// Info Button Styled Component
export const StyledInfoButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 12px 24px;
  border: none;
  border-radius: 8px;
  font-weight: 400;
  font-size: 14px;
  line-height: 1;
  cursor: pointer;
  transition: all 0.2s ease;
  text-decoration: none;
  user-select: none;
  white-space: nowrap;
  box-sizing: border-box;
  font-family: ${({ theme }) => theme.fontFamily.primary};
  min-height: 44px;

  /* Color configuration */
  background-color: ${({ $color }) => $color || "#17a2b8"};
  color: ${({ $textColor }) => $textColor || "#ffffff"};

  /* Width configuration */
  ${({ $width }) =>
    $width === "full"
      ? css`
          width: 100%;
        `
      : $width
      ? css`
          width: ${$width};
        `
      : css`
          width: auto;
        `}

  /* Size variants */
  ${({ $size }) =>
    $size === "small" &&
    css`
      padding: 8px 16px;
      font-size: 12px;
      min-height: 36px;
    `}

  ${({ $size }) =>
    $size === "large" &&
    css`
      padding: 16px 32px;
      font-size: 16px;
      min-height: 52px;
    `}

  /* Icon style variant */
  ${({ $variant }) =>
    $variant === "icon" &&
    css`
      padding: 12px;
      min-width: 44px;
      border-radius: 50%;
    `}

  /* Outline variant */
  ${({ $variant, $color }) =>
    $variant === "outline" &&
    css`
      background-color: transparent;
      color: ${$color || "#17a2b8"};
      border: 2px solid ${$color || "#17a2b8"};

      &:hover:not(:disabled) {
        background-color: ${$color || "#17a2b8"};
        color: #ffffff;
      }
    `}

  /* Soft variant */
  ${({ $variant, $color }) =>
    $variant === "soft" &&
    css`
      background-color: ${$color ? `${$color}20` : "rgba(23, 162, 184, 0.1)"};
      color: ${$color || "#17a2b8"};

      &:hover:not(:disabled) {
        background-color: ${$color ? `${$color}30` : "rgba(23, 162, 184, 0.2)"};
      }
    `}

  /* Hover state */
  &:hover:not(:disabled) {
    background-color: ${({ $hoverColor, $color, $variant }) =>
      $variant === "outline" || $variant === "soft"
        ? ""
        : $hoverColor || ($color ? `${$color}dd` : "#138496")};
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(23, 162, 184, 0.25);
  }

  /* Active state */
  &:active:not(:disabled) {
    transform: translateY(0);
  }

  /* Focus state */
  &:focus {
    outline: none;
    box-shadow: 0 0 0 3px rgba(23, 162, 184, 0.25);
  }

  /* Disabled state */
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none !important;
    box-shadow: none !important;
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

  /* Custom border radius */
  ${({ $borderRadius }) =>
    $borderRadius &&
    css`
      border-radius: ${$borderRadius};
    `}

  /* Responsive */
  @media (max-width: 768px) {
    ${({ $size }) =>
      $size === "large" &&
      css`
        padding: 12px 24px;
        font-size: 14px;
        min-height: 44px;
      `}

    ${({ $variant, $size }) =>
      $variant === "icon" &&
      $size === "large" &&
      css`
        padding: 12px;
        min-width: 44px;
      `}
  }
`;

// Secondary Button Styled Component
export const StyledSecondaryButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 12px 24px;
  border: 2px solid;
  border-radius: 8px;
  font-weight: 600;
  font-size: 14px;
  line-height: 1;
  cursor: pointer;
  transition: all 0.2s ease;
  text-decoration: none;
  user-select: none;
  white-space: nowrap;
  box-sizing: border-box;
  font-family: ${({ theme }) => theme.fontFamily.primary};
  min-height: 44px;

  /* Color configuration */
  background-color: ${({ $backgroundColor }) =>
    $backgroundColor || "transparent"};
  color: ${({ $color }) => $color || "#6c757d"};
  border-color: ${({ $borderColor, $color }) =>
    $borderColor || $color || "#6c757d"};

  /* Width configuration */
  ${({ $width }) =>
    $width === "full"
      ? css`
          width: 100%;
        `
      : $width
      ? css`
          width: ${$width};
        `
      : css`
          width: auto;
        `}

  /* Size variants */
  ${({ $size }) =>
    $size === "small" &&
    css`
      padding: 8px 16px;
      font-size: 12px;
      min-height: 36px;
      border-width: 1px;
    `}

  ${({ $size }) =>
    $size === "large" &&
    css`
      padding: 16px 32px;
      font-size: 16px;
      min-height: 52px;
    `}

  /* Hover state */
  &:hover:not(:disabled) {
    background-color: ${({ $hoverBackgroundColor, $color }) =>
      $hoverBackgroundColor || $color || "#6c757d"};
    color: ${({ $hoverTextColor }) => $hoverTextColor || "#ffffff"};
    border-color: ${({ $hoverBorderColor, $hoverBackgroundColor, $color }) =>
      $hoverBorderColor || $hoverBackgroundColor || $color || "#6c757d"};
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(108, 117, 125, 0.25);
  }

  /* Active state */
  &:active:not(:disabled) {
    transform: translateY(0);
  }

  /* Focus state */
  &:focus {
    outline: none;
    box-shadow: 0 0 0 3px rgba(108, 117, 125, 0.25);
  }

  /* Disabled state */
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none !important;
    box-shadow: none !important;
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

  /* Custom border radius */
  ${({ $borderRadius }) =>
    $borderRadius &&
    css`
      border-radius: ${$borderRadius};
    `}

  /* Responsive */
  @media (max-width: 768px) {
    ${({ $size }) =>
      $size === "large" &&
      css`
        padding: 12px 24px;
        font-size: 14px;
        min-height: 44px;
      `}
  }
`;
