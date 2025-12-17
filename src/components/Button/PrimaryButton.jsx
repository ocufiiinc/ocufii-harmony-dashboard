import React from "react";
import { StyledPrimaryButton } from "../../styles/Button.styled";

const PrimaryButton = ({
  size = "medium",
  width = "auto",
  color,
  textColor,
  hoverColor,
  borderRadius,
  isLoading = false,
  disabled = false,
  children,
  leftIcon,
  rightIcon,
  onClick,
  type = "button",
  className,
  ...props
}) => {
  return (
    <StyledPrimaryButton
      $size={size}
      $width={width}
      $color={color}
      $textColor={textColor}
      $hoverColor={hoverColor}
      $borderRadius={borderRadius}
      $isLoading={isLoading}
      disabled={disabled || isLoading}
      onClick={onClick}
      type={type}
      className={className}
      {...props}
    >
      {leftIcon && !isLoading && leftIcon}
      {!isLoading && children}
      {rightIcon && !isLoading && rightIcon}
      {isLoading && <span style={{ opacity: 0 }}>{children}</span>}
    </StyledPrimaryButton>
  );
};

export default PrimaryButton;
