import React from "react";
import styled, { css } from "styled-components";

// Simple Input Container
const InputContainer = styled.div`
  margin-bottom: 1rem;

  ${({ $width }) =>
    $width &&
    css`
      width: ${$width === "full" ? "100%" : $width};
    `}
`;

// Simple Input Label
const InputLabel = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  color: #ffffff;
  font-weight: 500;
  font-size: 14px;
  text-align: left;
  font-family: ${({ theme }) => theme.fontFamily.primary};
`;

// Simple Input Field
const StyledInput = styled.input`
  width: 100%;
  padding: 12px 16px;
  border: 2px solid ${({ $hasError }) => ($hasError ? "#dc3545" : "#e1e5e9")};
  border-radius: 8px;
  font-size: 16px;
  background-color: #fff;
  color: #333;
  transition: all 0.3s ease;
  box-sizing: border-box;
  font-family: ${({ theme }) => theme.fontFamily.primary};

  ${({ $height }) =>
    $height &&
    css`
      height: ${$height};
    `}

  &:focus {
    outline: none;
    border-color: ${({ $hasError }) => ($hasError ? "#dc3545" : "#007bff")};
    box-shadow: 0 0 0 3px
      ${({ $hasError }) =>
        $hasError ? "rgba(220, 53, 69, 0.25)" : "rgba(0, 123, 255, 0.25)"};
  }

  &::placeholder {
    color: #6c757d;
  }

  &:disabled {
    background-color: #f8f9fa;
    color: #6c757d;
    cursor: not-allowed;
    opacity: 0.6;
  }

  /* Custom styles override */
  ${({ $styling }) => $styling}
`;

// Simple Error Message
const ErrorMessage = styled.div`
  color: #dc3545;
  font-size: 14px;
  margin-top: 0.5rem;
  text-align: left;
  font-family: "Decimal", "Segoe UI", Roboto, sans-serif;
`;

const Input = ({
  label,
  type = "text",
  width = "full",
  height,
  disabled = false,
  error,
  styling,
  variant,
  ...props
}) => {
  const hasError = Boolean(error);

  return (
    <InputContainer $width={width}>
      {label && <InputLabel $variant={variant}>{label}</InputLabel>}

      <StyledInput
        type={type}
        disabled={disabled}
        $hasError={hasError}
        $height={height}
        $styling={styling}
        {...props}
      />

      {hasError && <ErrorMessage>{error}</ErrorMessage>}
    </InputContainer>
  );
};

export default Input;
