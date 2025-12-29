import styled from "styled-components";

// Main Alerts Container
export const AlertsContainer = styled.div`
  width: 100%;

  .alerts-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: ${({ theme }) => theme.spacing.xl};
    flex-wrap: wrap;
    gap: ${({ theme }) => theme.spacing.md};

    h1 {
      color: ${({ theme }) => theme.colors.textPrimary};
      font-size: ${({ theme }) => theme.fontSize.xxxl};
      font-weight: ${({ theme }) => theme.fontWeight.semibold};
      margin: 0;
      text-transform: uppercase;
      letter-spacing: 1px;

      @media (max-width: 1440px) {
        font-size: 1.4rem;
        letter-spacing: 0.5px;
      }

      @media (max-width: 768px) {
        font-size: ${({ theme }) => theme.fontSize.xl};
      }

      @media (max-width: 576px) {
        font-size: ${({ theme }) => theme.fontSize.lg};
      }
    }

    .filters-section {
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

        @media (max-width: 1440px) {
          padding: 6px 10px;
          font-size: 0.75rem;
          min-width: 120px;
          border-width: 1.5px;
        }
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
    }

    p {
      color: ${({ theme }) => theme.colors.textSecondary};
      font-size: ${({ theme }) => theme.fontSize.md};
      line-height: 1.6;
      margin: 0;
      width: 100%;

      @media (max-width: 768px) {
        font-size: ${({ theme }) => theme.fontSize.sm};
      }
    }

    @media (max-width: 768px) {
      .filters-section {
        label {
          font-size: ${({ theme }) => theme.fontSize.sm};
        }

        .filter-dropdown {
          min-width: 120px;
          font-size: ${({ theme }) => theme.fontSize.xs};
        }
      }
    }
  }
`;

// Stats Grid for Cards
export const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: ${({ theme }) => theme.spacing.lg};
  margin-bottom: ${({ theme }) => theme.spacing.xl};

  @media (max-width: 1440px) {
    gap: 10px;
    margin-bottom: 16px;
  }

  @media (max-width: 1400px) {
    grid-template-columns: repeat(4, 1fr);
  }

  @media (max-width: 992px) {
    grid-template-columns: repeat(3, 1fr);
    gap: ${({ theme }) => theme.spacing.md};
  }

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 576px) {
    grid-template-columns: 1fr;
  }
`;

// Alerts Content Layout
export const AlertsContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xl};
  width: 100%;

  @media (max-width: 1440px) {
    gap: 12px;
  }
`;

// Left Column - Notifications and Map
export const AlertsMainContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xl};

  @media (max-width: 1440px) {
    gap: 14px;
  }

  .filters-section {
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
      font-size: ${({ theme }) => theme.fontSize.md};
      font-weight: ${({ theme }) => theme.fontWeight.normal};
      font-family: ${({ theme }) => theme.fontFamily.primary};
      cursor: pointer;
      outline: none;
      transition: all 0.3s ease;
      min-width: 150px;

      @media (max-width: 1440px) {
        padding: 6px 10px;
        font-size: 0.75rem;
        min-width: 120px;
        border-width: 1.5px;
      }

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
  }

  @media (max-width: 768px) {
    .filters-section {
      label {
        font-size: ${({ theme }) => theme.fontSize.sm};
      }

      .filter-dropdown {
        min-width: 120px;
        font-size: ${({ theme }) => theme.fontSize.xs};
      }
    }
  }
`;

// Map Section
export const MapSection = styled.div`
  background: ${({ theme }) => theme.colors.background};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  border: 1px solid ${({ theme }) => theme.colors.border};
  overflow: hidden;
  min-height: 400px;
  position: relative;

  @media (max-width: 768px) {
    min-height: 300px;
  }

  @media (max-width: 576px) {
    min-height: 250px;
  }

  .map-container {
    width: 100%;
    height: 400px;

    @media (max-width: 768px) {
      height: 300px;
    }

    @media (max-width: 576px) {
      height: 250px;
    }
  }

  .map-placeholder {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    color: ${({ theme }) => theme.colors.textSecondary};
    font-size: ${({ theme }) => theme.fontSize.md};
    text-align: center;
    padding: ${({ theme }) => theme.spacing.xl};

    @media (max-width: 768px) {
      font-size: ${({ theme }) => theme.fontSize.sm};
      padding: ${({ theme }) => theme.spacing.lg};
    }
  }
`;

// Client Section Styles
export const ClientSectionContainer = styled.div`
  background: ${({ theme }) => theme.colors.background};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  border: 1px solid ${({ theme }) => theme.colors.border};
  overflow: hidden;
  height: fit-content;
  max-height: calc(100vh - 200px);
  overflow-y: auto;

  @media (max-width: 992px) {
    max-height: none;
    order: -1;
  }
`;

export const ClientHeader = styled.div`
  padding: ${({ theme }) => theme.spacing.lg} ${({ theme }) => theme.spacing.xl};
  background: ${({ theme }) => theme.colors.backgroundSecondary};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};

  @media (max-width: 768px) {
    padding: ${({ theme }) => theme.spacing.md}
      ${({ theme }) => theme.spacing.lg};
  }
`;

export const ClientTitle = styled.div`
  font-size: ${({ theme }) => theme.fontSize.sm};
  color: ${({ theme }) => theme.colors.textSecondary};
  font-weight: ${({ theme }) => theme.fontWeight.medium};
  margin-bottom: ${({ theme }) => theme.spacing.xs};

  @media (max-width: 768px) {
    font-size: ${({ theme }) => theme.fontSize.xs};
  }
`;

export const ClientName = styled.div`
  font-size: ${({ theme }) => theme.fontSize.md};
  color: ${({ theme }) => theme.colors.textPrimary};
  font-weight: ${({ theme }) => theme.fontWeight.semibold};

  @media (max-width: 768px) {
    font-size: ${({ theme }) => theme.fontSize.sm};
  }
`;

export const DeviceSection = styled.div`
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};

  &:last-child {
    border-bottom: none;
  }
`;

export const DeviceTitle = styled.div`
  padding: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.xl};
  background: ${({ theme }) => theme.colors.backgroundSecondary};
  font-size: ${({ theme }) => theme.fontSize.sm};
  font-weight: ${({ theme }) => theme.fontWeight.semibold};
  color: ${({ theme }) => theme.colors.textPrimary};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};

  @media (max-width: 768px) {
    padding: ${({ theme }) => theme.spacing.sm}
      ${({ theme }) => theme.spacing.lg};
    font-size: ${({ theme }) => theme.fontSize.xs};
  }
`;

export const DeviceList = styled.div`
  padding: ${({ theme }) => theme.spacing.sm} 0;
`;

export const DeviceItem = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  padding: ${({ theme }) => theme.spacing.xs} ${({ theme }) => theme.spacing.xl};
  transition: background-color ${({ theme }) => theme.transitions.fast};

  &:hover {
    background: ${({ theme }) => theme.colors.backgroundSecondary};
  }

  @media (max-width: 768px) {
    padding: ${({ theme }) => theme.spacing.xs}
      ${({ theme }) => theme.spacing.lg};
  }
`;

export const DeviceStatus = styled.div`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  flex-shrink: 0;

  ${({ $status }) => {
    switch ($status) {
      case "online":
        return "background-color: #4cdb4c;";
      case "offline":
        return "background-color: #dd3e3e;";
      case "snoozed":
        return "background-color: #efef2d;";
      default:
        return "background-color: #cccccc;";
    }
  }}

  @media (max-width: 768px) {
    width: 6px;
    height: 6px;
  }
`;

export const DeviceName = styled.div`
  font-size: ${({ theme }) => theme.fontSize.sm};
  color: ${({ theme }) => theme.colors.textPrimary};
  font-weight: ${({ theme }) => theme.fontWeight.medium};
  line-height: 1.3;

  @media (max-width: 768px) {
    font-size: ${({ theme }) => theme.fontSize.xs};
  }
`;

export const DeviceAddress = styled.div`
  font-size: ${({ theme }) => theme.fontSize.xs};
  color: ${({ theme }) => theme.colors.textSecondary};
  line-height: 1.2;

  @media (max-width: 768px) {
    font-size: 10px;
  }
`;

// Map Marker Styles
export const MapMarker = styled.div`
  position: relative;

  .marker {
    width: 24px;
    height: 24px;
    background: ${({ isUrgent }) => (isUrgent ? "#dd3e3e" : "#4cdb4c")};
    border-radius: 50% 50% 50% 0;
    transform: rotate(-45deg);
    border: 2px solid white;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
    cursor: pointer;

    &::after {
      content: "";
      position: absolute;
      top: 50%;
      left: 50%;
      width: 8px;
      height: 8px;
      background: white;
      border-radius: 50%;
      transform: translate(-50%, -50%) rotate(45deg);
    }
  }
`;

export const MapInfoWindow = styled.div`
  background: white;
  padding: ${({ theme }) => theme.spacing.md};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  box-shadow: ${({ theme }) => theme.shadows.lg};
  min-width: 200px;
  max-width: 250px;

  .info-type {
    display: inline-block;
    padding: ${({ theme }) => theme.spacing.xs}
      ${({ theme }) => theme.spacing.sm};
    background: ${({ urgent }) =>
      urgent ? "rgba(221, 62, 62, 0.1)" : "rgba(128, 128, 128, 0.1)"};
    color: ${({ urgent }) => (urgent ? "#dd3e3e" : "#666666")};
    border-radius: ${({ theme }) => theme.borderRadius.sm};
    font-size: ${({ theme }) => theme.fontSize.xs};
    font-weight: ${({ theme }) => theme.fontWeight.medium};
    text-transform: uppercase;
    margin-bottom: ${({ theme }) => theme.spacing.sm};
  }

  .info-title {
    font-weight: ${({ theme }) => theme.fontWeight.semibold};
    color: ${({ theme }) => theme.colors.textPrimary};
    margin-bottom: ${({ theme }) => theme.spacing.xs};
  }

  .info-details {
    color: ${({ theme }) => theme.colors.textSecondary};
    font-size: ${({ theme }) => theme.fontSize.sm};
    margin-bottom: ${({ theme }) => theme.spacing.xs};
  }

  .info-location {
    color: ${({ theme }) => theme.colors.textSecondary};
    font-size: ${({ theme }) => theme.fontSize.xs};
  }
`;

// Styled components for custom dropdown
export const CustomDropdown = styled.div`
  position: relative;
  display: inline-block;
  margin-right: 10px;
`;

export const CustomDropdownButton = styled.div`
  padding: 4px 32px 4px 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  background-color: white;
  cursor: pointer;
  font-size: 14px;
  color: #333;
  position: relative;
  min-width: 150px;

  &::after {
    content: "▼";
    position: absolute;
    right: 12px;
    font-size: 10px;
    color: #666;
  }

  &:hover {
    border-color: #f7941d;
  }
`;

export const CustomDropdownMenu = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  margin-top: 4px;
  background-color: white;
  border: 1px solid #ddd;
  border-radius: 4px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  min-width: 100%;
`;

export const CustomDropdownItem = styled.div`
  padding: 10px 12px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  color: #333;
  background-color: ${({ $selected }) =>
    $selected ? "#f5f5f5" : "transparent"};

  &:hover {
    background-color: #f5f5f5;
  }
`;
