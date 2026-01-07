import React from "react";
import {
  RightSection,
  SettingsSection,
  SectionTitle,
  BeaconsTable,
  BeaconsTableHeader,
  BeaconsTableHeaderCell,
  BeaconsTableBody,
  BeaconsTableRow,
  BeaconsTableCell,
  BeaconAvatar,
  BeaconStatusIndicator,
  BeaconStatusBadge,
  ActionButtons,
  CancelButton,
} from "../../styles/DeviceDetails.styled";
import { getDeviceIcon } from "../../utility/DeviceMapping";

const ConnectedBeacons = ({ beacons, onBack }) => {
  console.log("Connected beacons:", beacons);
  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case "online":
        return "online";
      case "offline":
        return "offline";
      default:
        return "default";
    }
  };

  return (
    <RightSection>
      <SettingsSection>
        <SectionTitle>BEACONS</SectionTitle>
        <BeaconsTable>
          <BeaconsTableHeader>
            <BeaconsTableRow>
              <BeaconsTableHeaderCell></BeaconsTableHeaderCell>
              <BeaconsTableHeaderCell>Name</BeaconsTableHeaderCell>
              <BeaconsTableHeaderCell>Status</BeaconsTableHeaderCell>
              <BeaconsTableHeaderCell>Location</BeaconsTableHeaderCell>
              <BeaconsTableHeaderCell>MAC Address</BeaconsTableHeaderCell>
              <BeaconsTableHeaderCell>Battery</BeaconsTableHeaderCell>
            </BeaconsTableRow>
          </BeaconsTableHeader>
          <BeaconsTableBody>
            {beacons.map((beacon, index) => (
              <BeaconsTableRow key={index}>
                <BeaconsTableCell>
                  <div
                    style={{ position: "relative", display: "inline-block" }}
                  >
                    <BeaconAvatar
                      src={getDeviceIcon(beacon.beaconType.toString())}
                      alt={beacon.name}
                    />
                    <BeaconStatusIndicator
                      status={beacon.status?.toLowerCase()}
                    />
                  </div>
                </BeaconsTableCell>
                <BeaconsTableCell>{beacon.name}</BeaconsTableCell>
                <BeaconsTableCell>
                  <BeaconStatusBadge status={getStatusColor(beacon.status)}>
                    {beacon.status}
                  </BeaconStatusBadge>
                </BeaconsTableCell>
                <BeaconsTableCell>
                  {beacon.location === "" ? "N/A" : beacon.location}
                </BeaconsTableCell>
                <BeaconsTableCell>{beacon.macAddress}</BeaconsTableCell>
                <BeaconsTableCell>
                  {beacon.battery ? `${beacon.battery} %` : "N/A"}
                </BeaconsTableCell>
              </BeaconsTableRow>
            ))}
          </BeaconsTableBody>
        </BeaconsTable>
      </SettingsSection>

      <ActionButtons>
        <CancelButton onClick={onBack}>Back</CancelButton>
      </ActionButtons>
    </RightSection>
  );
};

export default ConnectedBeacons;
