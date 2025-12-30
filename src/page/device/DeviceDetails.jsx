import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import DashboardLayout from "../../Layout/DashboardLayout";
import GeneralSettings from "../../components/DeviceSettings/GeneralSettings";
import DeleteDevice from "../../components/DeviceSettings/DeleteDevice";
import ConnectedBeacons from "../../components/DeviceSettings/ConnectedBeacons";
import SnoozeMode from "../../components/DeviceSettings/SnoozeMode";
import TwoFactor from "../email/TwoFactor";
import { useUser } from "../../context/UserContext";
import { getAllDevices } from "../../api/DevicesApi";
import deleteIcon from "../../assets/images/delete.svg";
import {
  DeviceDetailsContainer,
  Breadcrumb,
  PageTitle,
  DeviceDetailsCard,
  LeftSection,
  DeviceHeader,
  DeviceImageWrapper,
  DeviceImage,
  OnlineIndicator,
  DeviceName,
  DeviceStatus,
  DeviceInfoGrid,
  DeviceInfoItem,
  DeviceInfoLabel,
  DeviceInfoValue,
  SectionTitle,
  AdvancedSection,
  DeleteButton,
} from "../../styles/DeviceDetails.styled";

const DeviceDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useUser();
  const deviceData = location.state?.device || {};

  const { data: devicesData } = useQuery({
    queryKey: ["devices", user?.email],
    queryFn: () => getAllDevices(user?.email),
    enabled: !!user?.email,
  });

  const [formData, setFormData] = useState({
    name: deviceData.hubName || deviceData.beaconName || deviceData.name || "",
    location: deviceData.location || "",
    information: "",
  });

  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [showConnectedBeacons, setShowConnectedBeacons] = useState(false);
  const [showSnoozeMode, setShowSnoozeMode] = useState(false);
  const [showTwoFactor, setShowTwoFactor] = useState(false);

  // Filter beacons connected to this hub
  const getConnectedBeacons = () => {
    if (!devicesData?.data?.beacons?.devices || !deviceData.macAddress)
      return [];
    return devicesData.data.beacons.devices.filter(
      (beacon) => beacon.gatewayMAC === deviceData.macAddress
    );
  };

  // Create enhanced device data with actual connected beacons count
  const enhancedDeviceData = {
    ...deviceData,
    connectedBeacons: getConnectedBeacons().length,
  };

  const handleCancel = () => {
    navigate(-1);
  };

  const handleSave = (updatedFormData) => {
    console.log("Saving device data:", updatedFormData);
    setFormData(updatedFormData);
    // Add your save logic here
    // navigate(-1); // Uncomment to navigate back after save
  };

  const handleDeleteClick = () => {
    setShowDeleteConfirmation(true);
  };

  const handleCancelDelete = () => {
    setShowDeleteConfirmation(false);
  };

  const handleConfirmDelete = () => {
    console.log("Deleting device:", formData.name);
    setShowDeleteConfirmation(false);
    setShowTwoFactor(true);
  };

  const handleTwoFactorSuccess = () => {
    console.log("Device deleted successfully after verification");
    // Add your actual delete API call here
    setShowTwoFactor(false);
  };

  const handleBeaconsClick = () => {
    setShowConnectedBeacons(true);
  };

  const handleBackFromBeacons = () => {
    setShowConnectedBeacons(false);
  };

  const handleSnoozeClick = () => {
    setShowSnoozeMode(true);
  };

  const handleBackFromSnooze = () => {
    setShowSnoozeMode(false);
  };

  const getDeviceType = () => {
    if (deviceData.hub) return "Hub";
    if (deviceData.beacon) return "Beacon";
    if (deviceData.lock) return "Lock";
    if (deviceData.safetyCard) return "Card";
    return "Device";
  };

  const deviceType = getDeviceType();

  return (
    <DashboardLayout>
      <DeviceDetailsContainer>
        <Breadcrumb>
          <span>Devices</span>
          <span className="separator">/</span>
          <span>{deviceType}s</span>
          <span className="separator">/</span>
          <span className="active">Settings</span>
        </Breadcrumb>

        <PageTitle>Devices</PageTitle>

        <DeviceDetailsCard>
          {/* Left Section - Device Info */}
          <LeftSection>
            <DeviceHeader>
              <DeviceImageWrapper>
                <DeviceImage
                  src={deviceData.avatar || deviceData.image}
                  alt={formData.name}
                />
                {deviceData.status?.toLowerCase() === "online" && (
                  <OnlineIndicator />
                )}
              </DeviceImageWrapper>
              <DeviceName>{formData.name}</DeviceName>
              <DeviceStatus>{deviceData.status || "Online"}</DeviceStatus>
            </DeviceHeader>

            <DeviceInfoGrid>
              <DeviceInfoItem>
                <DeviceInfoLabel>Location:</DeviceInfoLabel>
                <DeviceInfoValue>
                  {deviceData.location || "N/A"}
                </DeviceInfoValue>
              </DeviceInfoItem>
              <DeviceInfoItem>
                <DeviceInfoLabel>WiFi Network:</DeviceInfoLabel>
                <DeviceInfoValue>
                  {deviceData.wifiNetwork || deviceData.network || "N/A"}
                </DeviceInfoValue>
              </DeviceInfoItem>
              <DeviceInfoItem>
                <DeviceInfoLabel>MAC Address:</DeviceInfoLabel>
                <DeviceInfoValue>
                  {deviceData.macAddress || deviceData.mac || "N/A"}
                </DeviceInfoValue>
              </DeviceInfoItem>
            </DeviceInfoGrid>

            <AdvancedSection>
              <SectionTitle>ADVANCED SETTINGS</SectionTitle>
              <DeleteButton onClick={handleDeleteClick}>
                <img src={deleteIcon} alt="Delete" />
                Delete {deviceType.toUpperCase()}
              </DeleteButton>
            </AdvancedSection>
          </LeftSection>

          {/* Right Section - General Settings or Delete Confirmation */}
          {console.log("show two factor", showTwoFactor)}
          {showTwoFactor ? (
            <TwoFactor
              deviceType={deviceType}
              deviceName={formData.name}
              onCancel={() => setShowTwoFactor(false)}
              onSuccess={handleTwoFactorSuccess}
            />
          ) : showDeleteConfirmation ? (
            <DeleteDevice
              deviceType={deviceType}
              deviceName={formData.name}
              onCancel={handleCancelDelete}
              onConfirm={handleConfirmDelete}
            />
          ) : showConnectedBeacons ? (
            <ConnectedBeacons
              beacons={getConnectedBeacons()}
              onBack={handleBackFromBeacons}
            />
          ) : showSnoozeMode ? (
            <SnoozeMode
              deviceType={deviceType}
              deviceData={{
                ...enhancedDeviceData,
                snoozeEndTime: formData.snoozeEndTime,
              }}
              onBack={handleBackFromSnooze}
            />
          ) : (
            <GeneralSettings
              deviceType={deviceType}
              formData={formData}
              deviceData={enhancedDeviceData}
              onCancel={handleCancel}
              onSave={handleSave}
              onBeaconsClick={handleBeaconsClick}
              onSnoozeClick={handleSnoozeClick}
            />
          )}
        </DeviceDetailsCard>
      </DeviceDetailsContainer>
    </DashboardLayout>
  );
};

export default DeviceDetails;
