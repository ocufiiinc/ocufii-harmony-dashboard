import React from "react";
import { StyledSecondaryButton } from "../../styles/Button.styled";

const SecondaryButton = ({
  size = "medium",
  width = "auto",
  color,
  backgroundColor,
  borderColor,
  hoverBackgroundColor,
  hoverTextColor,
  hoverBorderColor,
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
    <StyledSecondaryButton
      $size={size}
      $width={width}
      $color={color}
      $backgroundColor={backgroundColor}
      $borderColor={borderColor}
      $hoverBackgroundColor={hoverBackgroundColor}
      $hoverTextColor={hoverTextColor}
      $hoverBorderColor={hoverBorderColor}
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
    </StyledSecondaryButton>
  );
};

export default SecondaryButton;
