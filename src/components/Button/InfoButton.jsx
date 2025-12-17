import React from "react";
import { StyledInfoButton } from "../../styles/Button.styled";

const InfoButton = ({
  size = "medium",
  width = "auto",
  variant = "solid",
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
    <StyledInfoButton
      $size={size}
      $width={width}
      $variant={variant}
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
    </StyledInfoButton>
  );
};

export default InfoButton;
