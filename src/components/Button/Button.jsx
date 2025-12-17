import React from "react";
import { StyledButton } from "../../styles/Button.styled";

const Button = ({
  variant = "primary",
  size = "medium",
  fullWidth = false,
  isLoading = false,
  disabled = false,
  children,
  leftIcon,
  rightIcon,
  customStyles,
  className,
  onClick,
  type = "button",
  ...props
}) => {
  return (
    <StyledButton
      $variant={variant}
      $size={size}
      $fullWidth={fullWidth}
      $isLoading={isLoading}
      disabled={disabled || isLoading}
      $customStyles={customStyles}
      className={className}
      onClick={onClick}
      type={type}
      {...props}
    >
      {leftIcon && !isLoading && leftIcon}
      {!isLoading && children}
      {rightIcon && !isLoading && rightIcon}
      {isLoading && <span style={{ opacity: 0 }}>{children}</span>}
    </StyledButton>
  );
};

export default Button;
