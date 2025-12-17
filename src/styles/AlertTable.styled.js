import styled from "styled-components";
export const TableContainer = styled.div`
  width: 100%;
  background-color: ${({ theme }) => theme.colors.background};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  overflow: hidden;
  box-shadow: ${({ theme }) => theme.shadows.sm};

  @media (max-width: 1440px) {
    border-radius: 8px;
  }
`;

export const TableHeader = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  padding: ${({ theme }) => theme.spacing.lg} ${({ theme }) => theme.spacing.xl};
  background-color: ${({ theme }) => theme.colors.backgroundSecondary};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};

  @media (max-width: 1440px) {
    gap: 8px;
    padding: 10px 12px;
  }
`;

export const HeaderIcon = styled.div`
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: ${({ theme }) => theme.borderRadius.md};

  img {
    width: 40px;
    height: 40px;
    object-fit: contain;
  }

  @media (max-width: 1440px) {
    width: 24px;
    height: 24px;

    img {
      width: 28px;
      height: 28px;
    }
  }
`;

export const TitleWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  flex: 1;

  @media (max-width: 1440px) {
    gap: 6px;
  }
`;

export const TableTitle = styled.h3`
  color: ${({ theme }) => theme.colors.textPrimary};
  font-size: ${({ theme }) => theme.fontSize.lg};
  font-weight: ${({ theme }) => theme.fontWeight.semibold};
  margin: 0;

  @media (max-width: 1440px) {
    font-size: 0.85rem;
  }
`;

export const CountBadge = styled.div`
  background-color: ${({ $bgColor }) => $bgColor || "#dc3545"};
  color: ${({ theme }) => theme.colors.white};
  font-size: ${({ theme }) => theme.fontSize.sm};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  padding: 4px 12px;
  border-radius: 50%;
  min-width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;

  @media (max-width: 1440px) {
    font-size: 0.7rem;
    padding: 3px 8px;
    min-width: 24px;
    height: 24px;
  }
`;

export const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

export const TableHead = styled.thead`
  background-color: ${({ theme }) => theme.colors.backgroundTertiary};
`;

export const TableRow = styled.tr`
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  transition: background-color ${({ theme }) => theme.transitions.fast};

  &:last-child {
    border-bottom: none;
  }

  &:hover {
    background-color: ${({ theme }) => theme.colors.backgroundSecondary};
  }
`;

export const TableHeaderCell = styled.th`
  padding: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.lg};
  text-align: left;
  color: ${({ theme }) => theme.colors.textPrimary};
  font-size: ${({ theme }) => theme.fontSize.sm};
  font-weight: ${({ theme }) => theme.fontWeight.semibold};
  text-transform: uppercase;
  letter-spacing: 0.5px;

  @media (max-width: 1440px) {
    padding: 8px 10px;
    font-size: 0.65rem;
    letter-spacing: 0.3px;
  }
`;

export const TableCell = styled.td`
  padding: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.lg};
  color: ${({ theme }) => theme.colors.textPrimary};
  font-size: ${({ theme }) => theme.fontSize.sm};
  vertical-align: middle;

  @media (max-width: 1440px) {
    padding: 8px 10px;
    font-size: 0.7rem;
  }
`;

export const AlertCell = styled(TableCell)`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};

  .alert-icon {
    font-size: 18px;
  }

  @media (max-width: 1440px) {
    gap: 6px;

    .alert-icon {
      font-size: 16px;
    }
  }
`;

export const PaginationWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 24px;
  border-top: 1px solid #e0e0e0;

  @media (max-width: 1440px) {
    padding: 10px 12px;
  }
`;

export const PaginationInfo = styled.div`
  font-size: 14px;
  color: #6c757d;

  @media (max-width: 1440px) {
    font-size: 0.7rem;
  }
`;

export const PaginationControls = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;

  @media (max-width: 1440px) {
    gap: 6px;
  }
`;

export const PageInfo = styled.span`
  font-size: 14px;
  color: #495057;

  @media (max-width: 1440px) {
    font-size: 0.7rem;
  }
`;

export const PaginationButton = styled.button`
  padding: 8px 16px;
  border: 1px solid #dee2e6;
  border-radius: 4px;
  background: ${({ disabled }) => (disabled ? "#f8f9fa" : "#fff")};
  color: ${({ disabled }) => (disabled ? "#6c757d" : "#007bff")};
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
  font-weight: 500;

  @media (max-width: 1440px) {
    padding: 6px 10px;
    font-size: 0.7rem;
  }
`;
