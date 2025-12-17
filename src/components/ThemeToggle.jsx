import React from "react";
import styled from "styled-components";
import { useTheme } from "../theme/ThemeContext";

const ToggleButton = styled.button`
  background: ${({ theme }) => theme.colors.backgroundTertiary};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.full};
  width: 50px;
  height: 25px;
  position: relative;
  cursor: pointer;
  transition: all ${({ theme }) => theme.transitions.fast};

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary};
  }
`;

const ToggleSlider = styled.div`
  position: absolute;
  top: 2px;
  left: ${({ isDark }) => (isDark ? "26px" : "2px")};
  width: 19px;
  height: 19px;
  background: ${({ theme, isDark }) =>
    isDark ? theme.colors.primary : theme.colors.warning};
  border-radius: 50%;
  transition: all ${({ theme }) => theme.transitions.fast};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 10px;

  &::after {
    content: "${({ isDark }) => (isDark ? "🌙" : "☀️")}";
  }
`;

const ToggleContainer = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
`;

const ToggleLabel = styled.span`
  font-size: ${({ theme }) => theme.fontSize.sm};
  color: ${({ theme }) => theme.colors.textSecondary};
  font-weight: ${({ theme }) => theme.fontWeight.medium};
`;

const ThemeToggle = () => {
  const { isDark, toggleTheme } = useTheme();

  return (
    <ToggleContainer>
      <ToggleLabel>Theme</ToggleLabel>
      <ToggleButton onClick={toggleTheme}>
        <ToggleSlider isDark={isDark} />
      </ToggleButton>
    </ToggleContainer>
  );
};

export default ThemeToggle;
