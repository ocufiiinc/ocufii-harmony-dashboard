import styled from "styled-components";

export const DevicesContainer = styled.div`
  width: 100%;

  .devices-header {
    margin-bottom: ${({ theme }) => theme.spacing.xl};

    h1 {
      color: ${({ theme }) => theme.colors.textPrimary};
      font-size: ${({ theme }) => theme.fontSize.xxxl};
      font-weight: ${({ theme }) => theme.fontWeight.semibold};
      margin: 0 0 ${({ theme }) => theme.spacing.md} 0;

      @media (max-width: 768px) {
        font-size: ${({ theme }) => theme.fontSize.xl};
      }

      @media (max-width: 576px) {
        font-size: ${({ theme }) => theme.fontSize.lg};
      }
    }

    p {
      color: ${({ theme }) => theme.colors.textSecondary};
      font-size: ${({ theme }) => theme.fontSize.md};
      line-height: 1.6;
      margin: 0;

      @media (max-width: 768px) {
        font-size: ${({ theme }) => theme.fontSize.sm};
      }
    }
  }

  .devices-table {
    width: 100%;
  }
`;

export const DeviceFilters = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.md};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  flex-wrap: wrap;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: ${({ theme }) => theme.spacing.sm};
  }
`;

export const FilterButton = styled.button`
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.lg};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  background: ${({ theme, active }) =>
    active ? theme.colors.primary : theme.colors.background};
  color: ${({ theme, active }) =>
    active ? theme.colors.white : theme.colors.textPrimary};
  font-size: ${({ theme }) => theme.fontSize.sm};
  font-weight: ${({ theme }) => theme.fontWeight.medium};
  cursor: pointer;
  transition: all ${({ theme }) => theme.transitions.fast};

  &:hover {
    background: ${({ theme, active }) =>
      active ? theme.colors.primaryHover : theme.colors.backgroundSecondary};
    border-color: ${({ theme }) => theme.colors.primary};
  }

  @media (max-width: 576px) {
    padding: ${({ theme }) => theme.spacing.sm};
    font-size: ${({ theme }) => theme.fontSize.xs};
  }
`;
