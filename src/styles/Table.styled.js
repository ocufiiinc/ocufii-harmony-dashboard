import styled from "styled-components";

export const TableContainer = styled.div`
  background: ${({ theme }) => theme.colors.background};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  box-shadow: ${({ theme }) => theme.shadows.md};
  border: 1px solid ${({ theme }) => theme.colors.border};
  overflow: hidden;
  margin-bottom: ${({ theme }) => theme.spacing.xl};

  .table-header {
    padding: ${({ theme }) => theme.spacing.xl}
      ${({ theme }) => theme.spacing.xl} ${({ theme }) => theme.spacing.lg};
    border-bottom: 1px solid ${({ theme }) => theme.colors.border};
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    gap: ${({ theme }) => theme.spacing.md};

    @media (max-width: 768px) {
      padding: ${({ theme }) => theme.spacing.lg};
      flex-direction: column;
      align-items: flex-start;
      gap: ${({ theme }) => theme.spacing.sm};
    }
  }

  .table-title {
    display: flex;
    align-items: center;
    gap: ${({ theme }) => theme.spacing.md};
    font-size: ${({ theme }) => theme.fontSize.xl};
    font-weight: ${({ theme }) => theme.fontWeight.semibold};
    color: ${({ theme }) => theme.colors.textPrimary};
    margin: 0;
    text-transform: uppercase;
    letter-spacing: 1px;

    @media (max-width: 768px) {
      font-size: ${({ theme }) => theme.fontSize.lg};
    }

    @media (max-width: 576px) {
      font-size: ${({ theme }) => theme.fontSize.md};
    }
  }

  .count-badge {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-width: 32px;
    height: 32px;
    padding: 0 ${({ theme }) => theme.spacing.sm};
    background-color: #f7941d;
    color: white;
    border-radius: ${({ theme }) => theme.borderRadius.full};
    font-size: ${({ theme }) => theme.fontSize.md};
    font-weight: ${({ theme }) => theme.fontWeight.semibold};

    @media (max-width: 768px) {
      min-width: 28px;
      height: 28px;
      font-size: ${({ theme }) => theme.fontSize.sm};
    }
  }

  .client-info {
    display: flex;
    align-items: center;
    gap: ${({ theme }) => theme.spacing.sm};

    .client-label {
      font-size: ${({ theme }) => theme.fontSize.sm};
      color: ${({ theme }) => theme.colors.textSecondary};
      font-weight: ${({ theme }) => theme.fontWeight.medium};
    }

    .client-name {
      font-size: ${({ theme }) => theme.fontSize.sm};
      color: ${({ theme }) => theme.colors.textPrimary};
      font-weight: ${({ theme }) => theme.fontWeight.semibold};
    }

    @media (max-width: 576px) {
      .client-label,
      .client-name {
        font-size: ${({ theme }) => theme.fontSize.xs};
      }
    }
  }

  .table-wrapper {
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
  }
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  background: ${({ theme }) => theme.colors.background};
  font-family: ${({ theme }) => theme.fontFamily};
  min-width: 800px; /* Ensures table doesn't compress too much on mobile */

  @media (max-width: 1440px) {
    font-size: ${({ theme }) => theme.fontSize.xs};
  }

  @media (max-width: 768px) {
    min-width: 700px;
  }

  @media (max-width: 576px) {
    min-width: 600px;
  }
`;

export const TableHeader = styled.thead`
  background: ${({ theme }) => theme.colors.backgroundSecondary};
`;

export const TableHeaderCell = styled.th`
  padding: ${({ theme }) => theme.spacing.lg} ${({ theme }) => theme.spacing.md};
  text-align: left;
  font-weight: ${({ theme }) => theme.fontWeight.semibold};
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: ${({ theme }) => theme.fontSize.sm};
  text-transform: uppercase;
  letter-spacing: 0.5px;
  border-bottom: 2px solid ${({ theme }) => theme.colors.border};
  white-space: nowrap;

  &:first-child {
    padding-left: ${({ theme }) => theme.spacing.xl};
  }

  &:last-child {
    padding-right: ${({ theme }) => theme.spacing.xl};
  }

  @media (max-width: 1440px) {
    padding: ${({ theme }) => theme.spacing.md}
      ${({ theme }) => theme.spacing.sm};
    font-size: ${({ theme }) => theme.fontSize.xs};

    &:first-child {
      padding-left: ${({ theme }) => theme.spacing.md};
    }

    &:last-child {
      padding-right: ${({ theme }) => theme.spacing.md};
    }
  }

  @media (max-width: 768px) {
    padding: ${({ theme }) => theme.spacing.md}
      ${({ theme }) => theme.spacing.sm};
    font-size: ${({ theme }) => theme.fontSize.xs};

    &:first-child {
      padding-left: ${({ theme }) => theme.spacing.lg};
    }

    &:last-child {
      padding-right: ${({ theme }) => theme.spacing.lg};
    }
  }

  @media (max-width: 576px) {
    padding: ${({ theme }) => theme.spacing.sm};

    &:first-child {
      padding-left: ${({ theme }) => theme.spacing.md};
    }

    &:last-child {
      padding-right: ${({ theme }) => theme.spacing.md};
    }
  }
`;

export const TableBody = styled.tbody``;

export const TableRow = styled.tr`
  transition: background-color ${({ theme }) => theme.transitions.fast};

  &:hover {
    background: ${({ theme }) => theme.colors.backgroundSecondary};
  }

  &:not(:last-child) {
    border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  }
`;

export const TableCell = styled.td`
  padding: ${({ theme }) => theme.spacing.lg} ${({ theme }) => theme.spacing.md};
  color: ${({ theme }) => theme.colors.textPrimary};
  font-size: ${({ theme }) => theme.fontSize.sm};
  line-height: 1.4;
  vertical-align: middle;

  &:first-child {
    padding-left: ${({ theme }) => theme.spacing.xl};
    font-weight: ${({ theme }) => theme.fontWeight.medium};
  }

  &:last-child {
    padding-right: ${({ theme }) => theme.spacing.xl};
  }

  @media (max-width: 1440px) {
    padding: ${({ theme }) => theme.spacing.md}
      ${({ theme }) => theme.spacing.sm};
    font-size: ${({ theme }) => theme.fontSize.xs};

    &:first-child {
      padding-left: ${({ theme }) => theme.spacing.md};
    }

    &:last-child {
      padding-right: ${({ theme }) => theme.spacing.md};
    }
  }

  @media (max-width: 768px) {
    padding: ${({ theme }) => theme.spacing.md}
      ${({ theme }) => theme.spacing.sm};
    font-size: ${({ theme }) => theme.fontSize.xs};

    &:first-child {
      padding-left: ${({ theme }) => theme.spacing.lg};
    }

    &:last-child {
      padding-right: ${({ theme }) => theme.spacing.lg};
    }
  }

  @media (max-width: 576px) {
    padding: ${({ theme }) => theme.spacing.sm};

    &:first-child {
      padding-left: ${({ theme }) => theme.spacing.md};
    }

    &:last-child {
      padding-right: ${({ theme }) => theme.spacing.md};
    }
  }
`;

export const StatusBadge = styled.span`
  display: inline-flex;
  align-items: center;
  padding: ${({ theme }) => theme.spacing.xs} ${({ theme }) => theme.spacing.sm};
  border-radius: ${({ theme }) => theme.borderRadius.full};
  font-size: ${({ theme }) => theme.fontSize.xs};
  font-weight: ${({ theme }) => theme.fontWeight.medium};
  text-transform: capitalize;
  white-space: nowrap;

  ${({ status, theme }) => {
    switch (status) {
      case "online":
        return `
          background-color: rgba(76, 219, 76, 0.1);
          color: #4cdb4c;
          border: 1px solid rgba(76, 219, 76, 0.3);
        `;
      case "offline":
        return `
          background-color: rgba(221, 62, 62, 0.1);
          color: #dd3e3e;
          border: 1px solid rgba(221, 62, 62, 0.3);
        `;
      case "snoozed":
        return `
          background-color: rgba(239, 239, 45, 0.1);
          color: #efef2d;
          border: 1px solid rgba(239, 239, 45, 0.3);
        `;
      default:
        return `
          background-color: ${theme.colors.backgroundSecondary};
          color: ${theme.colors.textSecondary};
          border: 1px solid ${theme.colors.border};
        `;
    }
  }}

  @media (max-width: 576px) {
    padding: ${({ theme }) => theme.spacing.xs};
    font-size: 10px;
  }
`;

export const AvatarWrapper = styled.div`
  position: relative;
  display: inline-block;
  width: 40px;
  height: 40px;
`;

export const Avatar = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
  background-color: ${({ theme }) => theme.colors.backgroundSecondary};
`;

export const StatusIndicator = styled.div`
  position: absolute;
  bottom: 0;
  right: 0;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  border: 2px solid ${({ theme }) => theme.colors.background};

  ${({ status }) => {
    switch (status) {
      case "online":
        return `background-color: #4cdb4c;`;
      case "offline":
        return `background-color: #dd3e3e;`;
      case "snoozed":
      case "snooze":
        return `background-color: #efef2d;`;
      default:
        return `background-color: #9CA3AF;`;
    }
  }}
`;

export const SettingsButton = styled.button`
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.lg};
  background-color: #007aff;
  color: white;
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  font-size: ${({ theme }) => theme.fontSize.sm};
  font-weight: ${({ theme }) => theme.fontWeight.semibold};
  cursor: pointer;
  transition: background-color ${({ theme }) => theme.transitions.fast};

  &:hover {
    background-color: #0051d5;
  }

  &:active {
    background-color: #004bb8;
  }

  @media (max-width: 1440px) {
    padding: ${({ theme }) => theme.spacing.xs}
      ${({ theme }) => theme.spacing.md};
    font-size: ${({ theme }) => theme.fontSize.xs};
  }

  @media (max-width: 768px) {
    padding: ${({ theme }) => theme.spacing.xs}
      ${({ theme }) => theme.spacing.sm};
    font-size: ${({ theme }) => theme.fontSize.xs};
  }
`;
