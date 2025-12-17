import styled from "styled-components";

// System Overview Container
export const SystemOverviewSection = styled.section`
  margin-top: 32px;
  padding: 0 24px;

  @media (max-width: 1440px) {
    margin-top: 14px;
    padding: 0 10px;
  }
`;

export const SystemOverviewHeader = styled.h2`
  font-size: 24px;
  font-weight: 600;
  color: ${(props) => props.theme.colors.textPrimary};
  margin-bottom: 24px;
  font-family: "Decimal", sans-serif;

  @media (max-width: 1440px) {
    font-size: 1rem;
    margin-bottom: 10px;
  }
`;

export const SystemOverviewGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;

  @media (max-width: 1440px) {
    gap: 10px;
  }

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
  }
`;

// Device Health Styles
export const DeviceHealthContainer = styled.div`
  background: ${(props) => props.theme.colors.white};
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  border: 1px solid ${(props) => props.theme.colors.border};

  @media (max-width: 1440px) {
    padding: 16px;
    border-radius: 8px;
  }
`;

export const DeviceHealthHeader = styled.h3`
  font-size: 20px;
  font-weight: 600;
  color: ${(props) => props.theme.colors.textPrimary};
  margin-bottom: 20px;
  font-family: "Decimal", sans-serif;
  background: ${(props) => props.theme.colors.backgroundSecondary};
  padding: 12px 16px;
  border-radius: 8px;
  margin: -24px -24px 20px -24px;
  padding-left: 24px;

  @media (max-width: 1440px) {
    font-size: 0.9rem;
    padding: 6px 10px;
    margin: -12px -12px 8px -12px;
    padding-left: 12px;
  }
`;

export const DeviceHealthList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;

  @media (max-width: 1440px) {
    gap: 8px;
  }
`;

export const DeviceHealthItem = styled.div`
  display: grid;
  grid-template-columns: 50px 120px 1fr;
  align-items: center;
  gap: 16px;
  padding: 16px;
  background: ${(props) => props.theme.colors.white};
  border-radius: 8px;
  border: 1px solid ${(props) => props.theme.colors.border};
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);

  @media (max-width: 1440px) {
    grid-template-columns: 32px 90px 1fr;
    gap: 8px;
    padding: 8px;
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 12px;
  }
`;
export const DeviceIcon = styled.div`
  font-size: 32px;
  display: flex;
  align-items: center;
  justify-content: center;

  img {
    width: 50px;
    height: 50px;
    object-fit: contain;
  }

  @media (max-width: 1440px) {
    font-size: 24px;

    img {
      width: 40px;
      height: 40px;
    }
  }
`;

export const DeviceInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export const DeviceCount = styled.div`
  font-size: 24px;
  font-weight: 700;
  color: ${(props) => props.theme.colors.textPrimary};
  font-family: "Decimal", sans-serif;

  @media (max-width: 1440px) {
    font-size: 18px;
  }
`;

export const DeviceName = styled.div`
  font-size: 14px;
  font-weight: 600;
  color: ${(props) => props.theme.colors.textSecondary};
  text-transform: uppercase;
  font-family: "Decimal", sans-serif;

  @media (max-width: 1440px) {
    font-size: 11px;
  }
`;

export const DeviceStats = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;

  @media (max-width: 1440px) {
    gap: 6px;
  }

  @media (max-width: 768px) {
    gap: 12px;
  }
`;

export const StatColumn = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`;

export const StatLabel = styled.div`
  font-size: 12px;
  color: ${(props) => props.theme.colors.textSecondary};
  margin-bottom: 4px;
  font-family: "Decimal", sans-serif;

  @media (max-width: 1440px) {\n    font-size: 0.6rem;
    margin-bottom: 1px;
  }
`;

export const StatValue = styled.div`
  font-size: 24px;
  font-weight: 700;
  font-family: "Decimal", sans-serif;
  color: ${(props) => {
    if (props.$status === "online") return "#22c55e";
    if (props.$status === "offline") return "#ef4444";
    if (props.$status === "snooze") return "#f59e0b";
    return props.theme.colors.textPrimary;
  }};

  @media (max-width: 1440px) {
    font-size: 1rem;
  }
`;

export const StatTime = styled.div`
  font-size: 10px;
  color: ${(props) => props.theme.colors.textSecondary};
  margin-top: 2px;
  font-family: "Decimal", sans-serif;
`;

// Alert Summary Styles
export const AlertSummaryContainer = styled.div`
  background: ${(props) => props.theme.colors.white};
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  border: 1px solid ${(props) => props.theme.colors.border};

  @media (max-width: 1440px) {
    padding: 12px;
    border-radius: 6px;
  }
`;

export const AlertSummaryHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  background: ${(props) => props.theme.colors.backgroundSecondary};
  padding: 12px 16px;
  border-radius: 8px;
  margin: -24px -24px 20px -24px;
  padding-left: 24px;
  padding-right: 24px;

  h3 {
    font-size: 20px;
    font-weight: 600;
    color: ${(props) => props.theme.colors.textPrimary};
    margin: 0;
    font-family: "Decimal", sans-serif;
  }

  @media (max-width: 1440px) {
    padding: 6px 10px;
    margin: -12px -12px 8px -12px;
    padding-left: 12px;
    padding-right: 12px;

    h3 {
      font-size: 0.9rem;
    }
  }
`;

export const TimeDropdown = styled.select`
  padding: 8px 16px;
  border: 1px solid ${(props) => props.theme.colors.border};
  border-radius: 6px;
  background: ${(props) => props.theme.colors.background};
  color: ${(props) => props.theme.colors.textPrimary};
  font-size: 14px;
  font-family: "Decimal", sans-serif;
  cursor: pointer;
  outline: none;

  &:hover {
    border-color: ${(props) => props.theme.colors.primary};
  }

  &:focus {
    border-color: ${(props) => props.theme.colors.primary};
  }

  @media (max-width: 1440px) {
    padding: 5px 8px;
    font-size: 0.7rem;
  }
`;

export const TotalAlertsCard = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px;
  background: ${(props) => props.theme.colors.white};
  border-radius: 8px;
  border: 1px solid ${(props) => props.theme.colors.border};
  margin-bottom: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);

  @media (max-width: 1440px) {
    padding: 8px;
    gap: 6px;
  }
`;

export const AlertIcon = styled.div`
  font-size: 32px;
  display: flex;
  align-items: center;
  justify-content: center;

  img {
    width: 50px;
    height: 50px;
    object-fit: contain;
  }

  @media (max-width: 1440px) {
    font-size: 20px;

    img {
      width: 32px;
      height: 32px;
    }
  }
`;

export const AlertCount = styled.span`
  font-size: 28px;
  font-weight: 700;
  color: ${(props) => props.theme.colors.textPrimary};
  font-family: "Decimal", sans-serif;

  @media (max-width: 1440px) {
    font-size: 1.1rem;
  }
`;

export const AlertLabel = styled.span`
  font-size: 16px;
  font-weight: 500;
  color: ${(props) => props.theme.colors.textPrimary};
  font-family: "Decimal", sans-serif;

  @media (max-width: 1440px) {
    font-size: 0.75rem;
  }
`;

export const AlertDescription = styled.p`
  font-size: 13px;
  color: ${(props) => props.theme.colors.textSecondary};
  margin: 0 0 20px 0;
  font-family: "Decimal", sans-serif;
`;

export const CategoryGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
  margin-bottom: 8px;
`;

export const CategoryCard = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 12px;
  padding: 16px;
  background: ${(props) => props.theme.colors.white};
  border-radius: 8px;
  border: 1px solid ${(props) => props.theme.colors.border};
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);

  @media (max-width: 1440px) {
    padding: 8px;
    gap: 6px;
  }
`;

export const CategoryIcon = styled.div`
  font-size: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  border-radius: 50%;

  img {
    width: 50px;
    height: 50px;
    object-fit: contain;
  }

  @media (max-width: 1440px) {
    font-size: 18px;
    width: 30px;
    height: 30px;

    img {
      width: 30px;
      height: 30px;
    }
  }
`;

export const CategoryLabel = styled.div`
  font-size: 13px;
  color: ${(props) => props.theme.colors.textSecondary};
  font-family: "Decimal", sans-serif;

  @media (max-width: 1440px) {
    font-size: 0.65rem;
  }
`;

export const CategoryCount = styled.div`
  font-size: 24px;
  font-weight: 700;
  color: ${(props) => props.theme.colors.textPrimary};
  font-family: "Decimal", sans-serif;

  @media (max-width: 1440px) {
    font-size: 1rem;
  }
`;

export const CategoryTextContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export const StatusTextContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export const StatusCardTop = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 12px;
`;

export const StatusGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
  margin-bottom: 12px;
`;

export const StatusCard = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 16px;
  background: ${(props) => props.theme.colors.white};
  border-radius: 8px;
  border: 1px solid ${(props) => props.theme.colors.border};
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);

  @media (max-width: 1440px) {
    padding: 10px;
    gap: 6px;
  }
`;

export const StatusIcon = styled.div`
  font-size: 28px;
  display: flex;
  align-items: center;
  justify-content: center;

  img {
    width: 50px;
    height: 50px;
    object-fit: contain;
  }

  @media (max-width: 1440px) {
    font-size: 20px;

    img {
      width: 36px;
      height: 36px;
    }
  }
`;

export const StatusLabel = styled.div`
  font-size: 13px;
  font-weight: 600;
  color: ${(props) => props.theme.colors.textPrimary};
  font-family: "Decimal", sans-serif;

  @media (max-width: 1440px) {
    font-size: 11px;
  }
`;

export const StatusCount = styled.div`
  font-size: 24px;
  font-weight: 700;
  color: ${(props) => props.theme.colors.textPrimary};
  font-family: "Decimal", sans-serif;

  @media (max-width: 1440px) {
    font-size: 18px;
  }
`;

export const StatusDescription = styled.div`
  font-size: 11px;
  color: ${(props) => props.theme.colors.textSecondary};
  margin-top: 4px;
  font-family: "Decimal", sans-serif;

  @media (max-width: 1440px) {
    font-size: 9px;
    margin-top: 2px;
  }
`;

export const ProgressText = styled.p`
  font-size: 13px;
  color: ${(props) => props.theme.colors.textSecondary};
  margin: 0 0 8px 0;
  font-family: "Decimal", sans-serif;
`;

export const LifetimeText = styled.p`
  font-size: 14px;
  font-weight: 600;
  color: ${(props) => props.theme.colors.textPrimary};
  margin: 0;
  font-family: "Decimal", sans-serif;
`;
