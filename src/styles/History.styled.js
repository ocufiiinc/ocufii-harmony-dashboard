import styled, { css } from "styled-components";

export const HistoryContainer = styled.div`
  width: 100%;
`;

export const HistoryHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${({ theme }) => theme.spacing.lg};
  background: ${({ theme }) => theme.colors.surface};

  @media (max-width: 1440px) {
    padding: 12px 16px;
  }

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    gap: ${({ theme }) => theme.spacing.md};
  }
`;

export const HistoryTitle = styled.h1`
  font-size: ${({ theme }) => theme.fontSize.xxl};
  font-weight: ${({ theme }) => theme.fontWeight.semibold};
  color: ${({ theme }) => theme.colors.text};
  margin: 0;

  @media (max-width: 1440px) {
    font-size: 1.1rem;
  }
`;

export const FilterContainer = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};

  label {
    color: ${({ theme }) => theme.colors.textPrimary};
    font-size: ${({ theme }) => theme.fontSize.md};
    font-weight: ${({ theme }) => theme.fontWeight.medium};
    white-space: nowrap;
  }

  .filter-dropdown {
    padding: 8px 16px;
    border: 2px solid ${({ theme }) => theme.colors.border};
    border-radius: 8px;
    background-color: ${({ theme }) => theme.colors.background};
    color: ${({ theme }) => theme.colors.textPrimary};
    font-size: ${({ theme }) => theme.fontSize.sm};
    font-weight: ${({ theme }) => theme.fontWeight.normal};
    font-family: ${({ theme }) => theme.fontFamily.primary};
    cursor: pointer;
    outline: none;
    transition: all 0.3s ease;
    min-width: 150px;

    &:hover {
      border-color: ${({ theme }) => theme.colors.primary};
    }

    &:focus {
      border-color: ${({ theme }) => theme.colors.primary};
      box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.1);
    }

    option {
      padding: 8px;
      background-color: ${({ theme }) => theme.colors.background};
      color: ${({ theme }) => theme.colors.textPrimary};
    }
  }

  @media (max-width: 1440px) {
    gap: 6px;

    label {
      font-size: 0.75rem;
    }

    .filter-dropdown {
      padding: 5px 10px;
      font-size: 0.7rem;
      min-width: 110px;
    }
  }

  @media (max-width: 768px) {
    label {
      font-size: ${({ theme }) => theme.fontSize.sm};
    }

    .filter-dropdown {
      min-width: 120px;
      font-size: ${({ theme }) => theme.fontSize.xs};
    }
  }
`;

export const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: ${({ theme }) => theme.spacing.lg};
  margin-top: ${({ theme }) => theme.spacing.xl};
  padding: ${({ theme }) => theme.spacing.lg};

  @media (max-width: 1440px) {
    gap: 10px;
    margin-top: 12px;
    padding: 10px 14px;
    grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
  }

  @media (max-width: 1200px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
    gap: ${({ theme }) => theme.spacing.md};
  }

  @media (max-width: 576px) {
    grid-template-columns: 1fr;
  }
`;

export const CardsContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${({ theme }) => theme.spacing.lg};
  padding: ${({ theme }) => theme.spacing.lg};
  margin-top: ${({ theme }) => theme.spacing.lg};

  @media (max-width: 1440px) {
    gap: 10px;
    padding: 10px 14px;
    margin-top: 10px;
  }

  @media (max-width: 992px) {
    grid-template-columns: 1fr;
  }
`;

export const SummaryCard = styled.div`
  background: ${({ theme }) => theme.colors.background};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  overflow: hidden;
`;

export const CardTitle = styled.h2`
  font-size: ${({ theme }) => theme.fontSize.lg};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  color: ${({ theme }) => theme.colors.textPrimary};
  padding: ${({ theme }) => theme.spacing.lg};
  margin: 0;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  text-transform: uppercase;
  letter-spacing: 0.5px;

  @media (max-width: 1440px) {
    font-size: 0.9rem;
    padding: 10px 14px;
  }
`;

export const CardContent = styled.div`
  padding: ${({ theme }) => theme.spacing.lg};

  @media (max-width: 1440px) {
    padding: 10px 14px;
  }
`;

export const SystemTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-bottom: ${({ theme }) => theme.spacing.lg};

  th {
    text-align: left;
    padding: ${({ theme }) => theme.spacing.sm};
    font-size: ${({ theme }) => theme.fontSize.sm};
    font-weight: ${({ theme }) => theme.fontWeight.medium};
    color: ${({ theme }) => theme.colors.textSecondary};
  }

  td {
    padding: ${({ theme }) => theme.spacing.md}
      ${({ theme }) => theme.spacing.sm};
    font-size: ${({ theme }) => theme.fontSize.md};
    font-weight: ${({ theme }) => theme.fontWeight.semibold};
    color: ${({ theme }) => theme.colors.textPrimary};
  }

  tr {
    border-bottom: 1px solid ${({ theme }) => theme.colors.border};

    &:last-child {
      border-bottom: none;
    }
  }

  .device-cell {
    display: flex;
    align-items: center;
    gap: ${({ theme }) => theme.spacing.md};

    img {
      width: 32px;
      height: 32px;
      object-fit: contain;
    }
  }

  .online {
    color: #0db5e2;
  }

  .offline {
    color: #ff0000;
  }

  .snooze {
    color: #fcc400;
  }
`;

export const AlertList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  max-height: 400px;
  overflow-y: auto;

  @media (max-width: 1440px) {
    gap: 6px;
    max-height: 300px;
    margin-bottom: 10px;
  }
`;

export const AlertItem = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};
  padding: ${({ theme }) => theme.spacing.md};
  background: ${({ theme }) => theme.colors.backgroundSecondary};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  border: 1px solid ${({ theme }) => theme.colors.border};

  img {
    width: 40px;
    height: 40px;
    object-fit: contain;
  }

  .alert-info {
    flex: 1;

    .alert-title {
      font-size: ${({ theme }) => theme.fontSize.md};
      font-weight: ${({ theme }) => theme.fontWeight.semibold};
      color: ${({ theme }) => theme.colors.textPrimary};
      margin-bottom: 4px;
    }

    .alert-device {
      font-size: ${({ theme }) => theme.fontSize.sm};
      color: ${({ theme }) => theme.colors.textSecondary};
    }
  }

  .alert-time {
    font-size: ${({ theme }) => theme.fontSize.xs};
    color: ${({ theme }) => theme.colors.textSecondary};
    white-space: nowrap;
  }

  @media (max-width: 1440px) {
    gap: 6px;
    padding: 8px;

    img {
      width: 28px;
      height: 28px;
    }

    .alert-info {
      .alert-title {
        font-size: 0.75rem;
        margin-bottom: 2px;
      }

      .alert-device {
        font-size: 0.65rem;
      }
    }

    .alert-time {
      font-size: 0.6rem;
    }
  }
`;

export const AlertFilter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.spacing.md};

  label {
    font-size: ${({ theme }) => theme.fontSize.md};
    font-weight: ${({ theme }) => theme.fontWeight.medium};
    color: ${({ theme }) => theme.colors.textPrimary};
  }

  select {
    padding: 8px 16px;
    border: 2px solid ${({ theme }) => theme.colors.border};
    border-radius: 8px;
    background-color: ${({ theme }) => theme.colors.background};
    color: ${({ theme }) => theme.colors.textPrimary};
    font-size: ${({ theme }) => theme.fontSize.sm};
    cursor: pointer;
    outline: none;

    &:hover {
      border-color: ${({ theme }) => theme.colors.primary};
    }

    &:focus {
      border-color: ${({ theme }) => theme.colors.primary};
      box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.1);
    }
  }

  @media (max-width: 1440px) {
    margin-bottom: 8px;

    label {
      font-size: 0.75rem;
    }

    select {
      padding: 5px 10px;
      font-size: 0.7rem;
    }
  }
`;

export const DownloadSection = styled.div`
  padding-top: ${({ theme }) => theme.spacing.lg};
  border-top: 1px solid ${({ theme }) => theme.colors.border};

  p {
    font-size: ${({ theme }) => theme.fontSize.sm};
    color: ${({ theme }) => theme.colors.textSecondary};
    margin: 0 0 ${({ theme }) => theme.spacing.md} 0;
  }

  @media (max-width: 1440px) {
    padding-top: 10px;

    p {
      font-size: 0.7rem;
      margin: 0 0 6px 0;
    }
  }
`;

export const ButtonGroup = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: ${({ theme }) => theme.spacing.md};

  @media (max-width: 1440px) {
    gap: 6px;
  }

  @media (max-width: 576px) {
    grid-template-columns: 1fr;
  }
`;

export const DownloadButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing.xs};
  padding: ${({ theme }) => theme.spacing.md};
  background: #0099ff;
  color: white;
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  font-size: ${({ theme }) => theme.fontSize.sm};
  font-weight: ${({ theme }) => theme.fontWeight.semibold};
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: #0077cc;
    transform: translateY(-2px);
  }

  &:active {
    transform: translateY(0);
  }

  svg {
    width: 16px;
    height: 16px;
  }

  @media (max-width: 1440px) {
    gap: 3px;
    padding: 6px 8px;
    font-size: 0.7rem;

    svg {
      width: 12px;
      height: 12px;
    }
  }
`;
