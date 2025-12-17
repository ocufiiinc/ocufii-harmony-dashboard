import styled from "styled-components";

export const AlertStatsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: ${({ theme }) => theme.spacing.xl};
  margin-bottom: ${({ theme }) => theme.spacing.xl};

  @media (max-width: 1440px) {
    gap: 12px;
    margin-bottom: 16px;
  }

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
  }
`;

export const StatsCardContainer = styled.div`
  background: #e8e8e8;
  border-radius: 16px;
  padding: ${({ theme }) => theme.spacing.xl};
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.12);

  @media (max-width: 1440px) {
    padding: 12px;
    border-radius: 12px;
  }
`;

export const StatsHeader = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};
  margin-bottom: ${({ theme }) => theme.spacing.md};
  background: ${({ theme }) => theme.colors.background};
  padding: ${({ theme }) => theme.spacing.lg};
  border-radius: ${({ theme }) => theme.borderRadius.xxl};

  @media (max-width: 1440px) {
    gap: 8px;
    margin-bottom: 8px;
    padding: 10px;
  }
`;

export const StatsHeaderIcon = styled.div`
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }

  @media (max-width: 1440px) {
    width: 32px;
    height: 32px;
  }
`;

export const StatsHeaderContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;

  @media (max-width: 1440px) {
    gap: 2px;
  }
`;

export const StatsLabel = styled.div`
  font-size: ${({ theme }) => theme.fontSize.md};
  font-weight: ${({ theme }) => theme.fontWeight.medium};
  color: ${({ theme }) => theme.colors.textPrimary};

  @media (max-width: 1440px) {
    font-size: 0.75rem;
  }
`;

export const StatsCount = styled.div`
  font-size: ${({ theme }) => theme.fontSize.xxxl};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  color: ${({ theme }) => theme.colors.textPrimary};

  @media (max-width: 1440px) {
    font-size: 1.3rem;
  }
`;

export const StatsDescription = styled.p`
  font-size: ${({ theme }) => theme.fontSize.sm};
  color: ${({ theme }) => theme.colors.textSecondary};
  margin: ${({ theme }) => theme.spacing.md} 0;
  line-height: 1.5;

  @media (max-width: 1440px) {
    font-size: 0.7rem;
    margin: 8px 0;
    line-height: 1.4;
  }
`;

export const CategoryGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: ${({ theme }) => theme.spacing.md};
  margin: ${({ theme }) => theme.spacing.lg} 0;

  @media (max-width: 1440px) {
    gap: 8px;
    margin: 8px 0;
  }

  @media (max-width: 576px) {
    grid-template-columns: 1fr;
  }
`;

export const CategoryCard = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  background: ${({ theme }) => theme.colors.background};
  padding: ${({ theme }) => theme.spacing.md};
  border-radius: ${({ theme }) => theme.borderRadius.xxl};
  border: 1px solid ${({ theme }) => theme.colors.border};

  @media (max-width: 1440px) {
    gap: 6px;
    padding: 8px;
  }
`;

export const CategoryIcon = styled.div`
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }

  @media (max-width: 1440px) {
    width: 24px;
    height: 24px;
  }
`;

export const CategoryTextContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;

  @media (max-width: 1440px) {
    gap: 0;
  }
`;

export const CategoryLabel = styled.div`
  font-size: ${({ theme }) => theme.fontSize.xs};
  font-weight: ${({ theme }) => theme.fontWeight.medium};
  color: ${({ theme }) => theme.colors.textSecondary};

  @media (max-width: 1440px) {
    font-size: 0.6rem;
  }
`;

export const CategoryCount = styled.div`
  font-size: ${({ theme }) => theme.fontSize.xl};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  color: ${({ theme }) => theme.colors.textPrimary};

  @media (max-width: 1440px) {
    font-size: 0.95rem;
  }
`;

export const StatusGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: ${({ theme }) => theme.spacing.md};
  margin: ${({ theme }) => theme.spacing.lg} 0;

  @media (max-width: 1440px) {
    gap: 8px;
    margin: 8px 0;
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

export const StatusCard = styled.div`
  background: ${({ theme }) => theme.colors.background};
  padding: ${({ theme }) => theme.spacing.md};
  border-radius: ${({ theme }) => theme.borderRadius.xxl};
  border: 1px solid ${({ theme }) => theme.colors.border};

  @media (max-width: 1440px) {
    padding: 8px;
  }
`;

export const StatusCardTop = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  margin-bottom: ${({ theme }) => theme.spacing.sm};

  @media (max-width: 1440px) {
    gap: 6px;
    margin-bottom: 6px;
  }
`;

export const StatusIcon = styled.div`
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }

  @media (max-width: 1440px) {
    width: 24px;
    height: 24px;
  }
`;

export const StatusTextContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
`;

export const StatusLabel = styled.div`
  font-size: ${({ theme }) => theme.fontSize.xs};
  font-weight: ${({ theme }) => theme.fontWeight.medium};
  color: ${({ theme }) => theme.colors.textSecondary};

  @media (max-width: 1440px) {
    font-size: 0.6rem;
  }
`;

export const StatusCount = styled.div`
  font-size: ${({ theme }) => theme.fontSize.xl};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  color: ${({ theme }) => theme.colors.textPrimary};

  @media (max-width: 1440px) {
    font-size: 0.95rem;
  }
`;

export const StatusDescription = styled.div`
  font-size: ${({ theme }) => theme.fontSize.xs};
  color: ${({ theme }) => theme.colors.textSecondary};
  line-height: 1.4;

  @media (max-width: 1440px) {
    font-size: 0.6rem;
    line-height: 1.3;
  }
`;

export const ProgressText = styled.p`
  font-size: ${({ theme }) => theme.fontSize.sm};
  color: ${({ theme }) => theme.colors.textSecondary};
  margin: ${({ theme }) => theme.spacing.md} 0 0 0;
  text-align: center;

  @media (max-width: 1440px) {
    font-size: 0.7rem;
    margin: 8px 0 0 0;
  }
`;
