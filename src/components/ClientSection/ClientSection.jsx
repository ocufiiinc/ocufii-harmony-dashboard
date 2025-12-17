import React from "react";
import {
  ClientSectionContainer,
  ClientHeader,
  ClientTitle,
  ClientName,
  DeviceSection,
  DeviceTitle,
  DeviceList,
  DeviceItem,
  DeviceStatus,
  DeviceName,
  DeviceAddress,
} from "../../styles/Alert.styled";

const ClientSection = ({ clientName, devices }) => {
  const renderDevicesByType = (type, devices) => {
    const filteredDevices = devices.filter((device) => device.type === type);

    if (filteredDevices.length === 0) return null;

    return (
      <DeviceSection key={type}>
        <DeviceTitle>{type.toUpperCase()}</DeviceTitle>
        <DeviceList>
          {filteredDevices.map((device, index) => (
            <DeviceItem key={`${type}-${index}`}>
              <DeviceStatus $status={device.status} />
              <div>
                <DeviceName>{device.name}</DeviceName>
                <DeviceAddress>{device.address}</DeviceAddress>
              </div>
            </DeviceItem>
          ))}
        </DeviceList>
      </DeviceSection>
    );
  };

  const deviceTypes = ["hubs", "beacons", "tapassist apps", "tapassist cards"];

  return (
    <ClientSectionContainer>
      <ClientHeader>
        <ClientTitle>CLIENT</ClientTitle>
        <ClientName>{clientName}</ClientName>
      </ClientHeader>

      {deviceTypes.map((type) => renderDevicesByType(type, devices))}
    </ClientSectionContainer>
  );
};

export default ClientSection;
