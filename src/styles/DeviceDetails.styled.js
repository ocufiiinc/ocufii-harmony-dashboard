import styled from "styled-components";

export const DeviceDetailsContainer = styled.div`
  width: 100%;
  padding: 24px;
`;

export const Breadcrumb = styled.div`
  font-size: 12px;
  color: ${(props) => props.theme.colors.textSecondary};
  margin-bottom: 16px;
  font-family: "Decimal", sans-serif;

  span {
    color: ${(props) => props.theme.colors.textPrimary};
  }

  .separator {
    margin: 0 8px;
    color: ${(props) => props.theme.colors.textSecondary};
  }

  .active {
    color: #ff9800;
  }
`;

export const PageTitle = styled.h1`
  font-size: 24px;
  font-weight: 700;
  color: ${(props) => props.theme.colors.textPrimary};
  margin: 0 0 24px 0;
  font-family: "Decimal", sans-serif;
`;

export const DeviceDetailsCard = styled.div`
  display: grid;
  grid-template-columns: 400px 1fr;
  gap: 0;
  background: ${(props) => props.theme.colors.white};
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;
`;

export const LeftSection = styled.div`
  display: flex;
  flex-direction: column;
  background: ${(props) => props.theme.colors.background};
  border-right: 1px solid ${(props) => props.theme.colors.border};\n`;

export const RightSection = styled.div`
  display: flex;
  flex-direction: column;
  background: ${(props) => props.theme.colors.white};
`;

export const DeviceHeader = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 24px 16px;
  border-bottom: 1px solid ${(props) => props.theme.colors.border};
`;

export const DeviceImageWrapper = styled.div`
  position: relative;
  margin-bottom: 16px;
`;

export const DeviceImage = styled.img`
  width: 80px;
  height: 80px;
  object-fit: contain;
`;

export const OnlineIndicator = styled.div`
  position: absolute;
  bottom: 0;
  right: 0;
  width: 20px;
  height: 20px;
  background: #4caf50;
  border: 3px solid ${(props) => props.theme.colors.white};
  border-radius: 50%;
`;

export const DeviceName = styled.h2`
  font-size: 18px;
  font-weight: 700;
  color: ${(props) => props.theme.colors.textPrimary};
  margin: 0 0 4px 0;
  font-family: "Decimal", sans-serif;
`;

export const DeviceStatus = styled.div`
  font-size: 13px;
  font-weight: 600;
  color: #4caf50;
  font-family: "Decimal", sans-serif;
`;

export const DeviceInfoGrid = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 24px 16px;
  border-bottom: 1px solid ${(props) => props.theme.colors.border};
`;

export const DeviceInfoItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export const DeviceInfoLabel = styled.div`
  font-size: 12px;
  color: ${(props) => props.theme.colors.textSecondary};
  font-family: "Decimal", sans-serif;
`;

export const DeviceInfoValue = styled.div`
  font-size: 14px;
  font-weight: 600;
  color: ${(props) => props.theme.colors.textPrimary};
  font-family: "Decimal", sans-serif;
`;

export const SettingsSection = styled.div`
  padding: 24px;
`;

export const SectionTitle = styled.div`
  font-size: 11px;
  font-weight: 600;
  color: ${(props) => props.theme.colors.textSecondary};
  letter-spacing: 0.5px;
  margin-bottom: 16px;
  font-family: "Decimal", sans-serif;
`;

export const SettingsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0;
`;

export const SettingItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 0;
  border-bottom: 1px solid ${(props) => props.theme.colors.border};
  cursor: pointer;
  transition: background 0.2s;

  &:hover {
    background: ${(props) => props.theme.colors.background};
    margin: 0 -16px;
    padding: 16px;
    border-radius: 8px;
  }

  &:last-child {
    border-bottom: none;
  }
`;

export const SettingItemLeft = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export const SettingItemTitle = styled.div`
  font-size: 14px;
  font-weight: 600;
  color: ${(props) => props.theme.colors.textPrimary};
  font-family: "Decimal", sans-serif;
`;

export const SettingItemSubtitle = styled.div`
  font-size: 12px;
  color: ${(props) => props.theme.colors.textSecondary};
  font-family: "Decimal", sans-serif;
`;

export const SettingItemRight = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  color: ${(props) => props.theme.colors.textSecondary};
  font-family: "Decimal", sans-serif;

  .arrow {
    color: ${(props) => props.theme.colors.textSecondary};
  }
`;

export const AdvancedSection = styled.div`
  padding: 24px 16px;
  margin-top: auto;
`;

export const DeleteButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  width: 100%;
  padding: 12px;
  background: transparent;
  border: 2px solid #f44336;
  border-radius: 8px;
  color: #f44336;
  font-size: 14px;
  font-weight: 600;
  font-family: "Decimal", sans-serif;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background: #f443361a;
  }
`;

export const ActionButtons = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  padding: 24px;
  margin-top: auto;
`;

export const CancelButton = styled.button`
  padding: 12px 24px;
  background: ${(props) => props.theme.colors.background};
  border: 1px solid ${(props) => props.theme.colors.border};
  border-radius: 8px;
  color: ${(props) => props.theme.colors.textPrimary};
  font-size: 14px;
  font-weight: 600;
  font-family: "Decimal", sans-serif;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background: ${(props) => props.theme.colors.border};
  }
`;

export const SaveButton = styled.button`
  padding: 12px 24px;
  background: #2196f3;
  border: none;
  border-radius: 8px;
  color: white;
  font-size: 14px;
  font-weight: 600;
  font-family: "Decimal", sans-serif;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background: #1976d2;
  }
`;

export const DeleteConfirmationContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 60px 40px;
  text-align: center;
  min-height: 400px;
`;

export const DeleteConfirmationIcon = styled.div`
  margin-bottom: 24px;

  img {
    width: 80px;
    height: 80px;
  }
`;

export const DeleteConfirmationTitle = styled.h2`
  font-size: 16px;
  font-weight: 700;
  color: ${(props) => props.theme.colors.textPrimary};
  margin: 0 0 24px 0;
  font-family: "Decimal", sans-serif;
  max-width: 500px;
`;

export const DeleteConfirmationText = styled.p`
  font-size: 14px;
  color: ${(props) => props.theme.colors.textPrimary};
  margin: 0 0 24px 0;
  font-family: "Decimal", sans-serif;
  max-width: 500px;
  line-height: 1.6;
`;

export const DeleteConfirmationQuestion = styled.p`
  font-size: 14px;
  font-weight: 600;
  color: ${(props) => props.theme.colors.textPrimary};
  margin: 0 0 32px 0;
  font-family: "Decimal", sans-serif;
`;

export const DeleteConfirmButton = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 24px;
  background: #e10600;
  border: none;
  border-radius: 8px;
  color: white;
  font-size: 14px;
  font-weight: 600;
  font-family: "Decimal", sans-serif;
  cursor: pointer;
  transition: all 0.2s;

  img {
    width: 16px;
    height: 16px;
    filter: brightness(0) invert(1);
  }

  &:hover {
    background: #c00500;
  }
`;

export const BeaconsTable = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

export const BeaconsTableHeader = styled.thead`
  background: ${(props) => props.theme.colors.background};
`;

export const BeaconsTableHeaderCell = styled.th`
  padding: 12px 16px;
  text-align: left;
  font-size: 12px;
  font-weight: 600;
  color: ${(props) => props.theme.colors.textPrimary};
  font-family: "Decimal", sans-serif;
  border-bottom: 1px solid ${(props) => props.theme.colors.border};
`;

export const BeaconsTableBody = styled.tbody``;

export const BeaconsTableRow = styled.tr`
  &:hover {
    background: ${(props) => props.theme.colors.background};
  }
`;

export const BeaconsTableCell = styled.td`
  padding: 16px;
  font-size: 14px;
  color: ${(props) => props.theme.colors.textPrimary};
  font-family: "Decimal", sans-serif;
  border-bottom: 1px solid ${(props) => props.theme.colors.border};
`;

export const BeaconAvatar = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
`;

export const BeaconStatusIndicator = styled.div`
  position: absolute;
  bottom: 2px;
  right: 2px;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  border: 2px solid ${(props) => props.theme.colors.white};
  background: ${(props) => {
    switch (props.status) {
      case "online":
        return "#4CAF50";
      case "offline":
        return "#F44336";
      default:
        return "#9E9E9E";
    }
  }};
`;

export const BeaconStatusBadge = styled.span`
  padding: 4px 12px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 600;
  font-family: "Decimal", sans-serif;
  background: ${(props) => {
    switch (props.status) {
      case "online":
        return "#E8F5E9";
      case "offline":
        return "#FFEBEE";
      default:
        return "#F5F5F5";
    }
  }};
  color: ${(props) => {
    switch (props.status) {
      case "online":
        return "#4CAF50";
      case "offline":
        return "#F44336";
      default:
        return "#9E9E9E";
    }
  }};
`;
