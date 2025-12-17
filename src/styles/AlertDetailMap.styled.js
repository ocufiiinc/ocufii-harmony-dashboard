import styled from "styled-components";

export const MapContainer = styled.div`
  display: flex;
  flex-direction: column;
  background: ${({ theme }) => theme.colors.background};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  box-shadow: ${({ theme }) => theme.shadows.md};
  border: 1px solid ${({ theme }) => theme.colors.border};
  overflow: hidden;
  height: 100%;
`;

export const MapHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${({ theme }) => theme.spacing.lg};
  background: ${({ theme }) => theme.colors.background};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};

  h3 {
    margin: 0;
    font-size: ${({ theme }) => theme.fontSize.lg};
    font-weight: ${({ theme }) => theme.fontWeight.semibold};
    color: ${({ theme }) => theme.colors.textPrimary};
  }

  @media (max-width: 768px) {
    padding: ${({ theme }) => theme.spacing.md};

    h3 {
      font-size: ${({ theme }) => theme.fontSize.md};
    }
  }
`;

export const CloseButton = styled.button`
  background: transparent;
  border: none;
  padding: ${({ theme }) => theme.spacing.sm};
  cursor: pointer;
  color: ${({ theme }) => theme.colors.textSecondary};
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all ${({ theme }) => theme.transitions.fast};

  &:hover {
    background: rgba(0, 0, 0, 0.05);
    color: ${({ theme }) => theme.colors.textPrimary};
  }

  svg {
    width: 24px;
    height: 24px;
  }
`;

export const MapWrapper = styled.div`
  flex: 1;
  min-height: 430px;

  width: 100%;

  .mapboxgl-popup-content {
    padding: 0;
    border-radius: 8px;
  }

  .mapboxgl-popup-close-button {
    font-size: 20px;
    padding: 8px;
  }

  @media (max-width: 1440px) {
    min-height: 400px;
    max-height: 400px;
  }

  @media (max-width: 1200px) {
    min-height: 380px;
    max-height: 380px;
  }

  @media (max-width: 768px) {
    min-height: 320px;
    max-height: 320px;
  }
`;
