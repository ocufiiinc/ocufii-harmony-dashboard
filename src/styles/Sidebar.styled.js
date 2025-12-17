import styled from "styled-components";

export const SidebarContainer = styled.aside`
  width: 280px;
  height: 100vh;
  background: ${({ theme }) => theme.colors.sidebarBackground};
  border-right: 1px solid ${({ theme }) => theme.colors.sidebarBorder};
  position: fixed;
  left: 0;
  top: 0;
  z-index: 1000;
  display: flex;
  flex-direction: column;
  box-shadow: ${({ theme }) => theme.shadows.lg};
  transition: all ${({ theme }) => theme.transitions.normal};

  @media (max-width: 768px) {
    width: 260px;
    transform: ${({ isOpen }) =>
      isOpen ? "translateX(0)" : "translateX(-100%)"};
  }

  @media (max-width: 576px) {
    width: 100%;
  }
`;

export const LogoSection = styled.div`
  padding: ${({ theme }) => theme.spacing.xl};
  border-bottom: 1px solid ${({ theme }) => theme.colors.sidebarBorder};
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};
  background: ${({ theme }) => theme.colors.sidebarBackground};

  img {
    width: 40px;
    height: 40px;
  }

  h2 {
    color: ${({ theme }) => theme.colors.sidebarText};
    font-size: ${({ theme }) => theme.fontSize.lg};
    font-weight: ${({ theme }) => theme.fontWeight.semibold};
    margin: 0;
  }

  @media (max-width: 768px) {
    padding: ${({ theme }) => theme.spacing.lg};

    img {
      width: 32px;
      height: 32px;
    }

    h2 {
      font-size: ${({ theme }) => theme.fontSize.md};
    }
  }
`;

export const MenuSection = styled.nav`
  flex: 1;
  padding: ${({ theme }) => theme.spacing.lg} 0;
  overflow-y: auto;

  &::-webkit-scrollbar {
    width: 4px;
  }

  &::-webkit-scrollbar-track {
    background: ${({ theme }) => theme.colors.sidebarBackground};
  }

  &::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.colors.sidebarBorder};
    border-radius: 2px;
  }
`;

export const MenuItem = styled.div`
  padding: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.xl};
  color: ${({ theme }) => theme.colors.sidebarTextSecondary};
  cursor: pointer;
  transition: all ${({ theme }) => theme.transitions.fast};
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};
  font-size: ${({ theme }) => theme.fontSize.md};
  font-weight: ${({ theme }) => theme.fontWeight.medium};

  &:hover {
    background: rgba(255, 255, 255, 0.1);
    color: ${({ theme }) => theme.colors.sidebarText};
  }

  &.active {
    background: ${({ theme }) => theme.colors.primary}20;
    color: ${({ theme }) => theme.colors.primary};
    border-right: 3px solid ${({ theme }) => theme.colors.primary};
  }

  svg {
    width: 20px;
    height: 20px;
    fill: currentColor;
  }

  @media (max-width: 768px) {
    padding: ${({ theme }) => theme.spacing.sm}
      ${({ theme }) => theme.spacing.lg};
    font-size: ${({ theme }) => theme.fontSize.sm};

    svg {
      width: 18px;
      height: 18px;
    }
  }
`;

export const FooterSection = styled.div`
  padding: ${({ theme }) => theme.spacing.lg} ${({ theme }) => theme.spacing.xl};
  border-top: 1px solid ${({ theme }) => theme.colors.sidebarBorder};
  background: ${({ theme }) => theme.colors.sidebarBackground};
`;
