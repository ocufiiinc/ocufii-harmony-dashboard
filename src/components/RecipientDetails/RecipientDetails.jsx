import React, { useState } from "react";
import Switch from "react-ios-switch";
import {
  DetailsContainer,
  EmailField,
  DescriptionText,
  PermissionSection,
  PermissionHeader,
  PermissionTitle,
  PermissionBadge,
  PermissionRow,
  TestAlertSection,
  TestAlertText,
  TestAlertButton,
  TestAlertLink,
} from "../../styles/Recipients.styled";

const RecipientDetails = ({ recipient }) => {
  const [safetyAlerts, setSafetyAlerts] = useState(true);
  const [locationSharing, setLocationSharing] = useState(true);
  const [securityAlerts, setSecurityAlerts] = useState(true);

  const handleSendTestAlert = () => {
    console.log("Send test alert to:", recipient.name);
    // Add API call here
  };

  return (
    <DetailsContainer>
      <EmailField>muhammedfaizankhalil@gmail.com</EmailField>

      <DescriptionText>
        Enabling this feature allows the recipient to receive safety alerts.
      </DescriptionText>

      <PermissionSection>
        <PermissionHeader>
          <PermissionTitle>Safety Alerts</PermissionTitle>
          <PermissionRow>
            <PermissionBadge>ACCEPTED</PermissionBadge>
            <Switch
              checked={safetyAlerts}
              onChange={setSafetyAlerts}
              onColor="rgb(76, 217, 100)"
              offColor="rgb(200, 199, 204)"
            />
          </PermissionRow>
        </PermissionHeader>
      </PermissionSection>

      <PermissionSection>
        <PermissionRow>
          <PermissionTitle>Location Sharing Permission</PermissionTitle>
          <Switch
            checked={locationSharing}
            onChange={setLocationSharing}
            onColor="rgb(76, 217, 100)"
            offColor="rgb(200, 199, 204)"
          />
        </PermissionRow>
      </PermissionSection>

      <DescriptionText>
        Enabling this feature allows the recipient to view your location only
        when a safety alert is triggered.
      </DescriptionText>

      <DescriptionText>
        Enabling this feature allows the recipient to receive security alerts.
      </DescriptionText>

      <PermissionSection>
        <PermissionHeader>
          <PermissionTitle>Security Alerts</PermissionTitle>
          <PermissionRow>
            <PermissionBadge>ACCEPTED</PermissionBadge>
            <Switch
              checked={securityAlerts}
              onChange={setSecurityAlerts}
              onColor="rgb(76, 217, 100)"
              offColor="rgb(200, 199, 204)"
            />
          </PermissionRow>
        </PermissionHeader>
      </PermissionSection>

      <TestAlertSection>
        <TestAlertText>
          This is a <strong>test alert</strong> from the Ocufii Safety System.
          No action is required.
        </TestAlertText>
        <TestAlertButton onClick={handleSendTestAlert}>
          Send a Test Alert
        </TestAlertButton>
      </TestAlertSection>

      <TestAlertLink href="#test-alert">
        Test Alert Message Sent to Recipient.
      </TestAlertLink>
    </DetailsContainer>
  );
};

export default RecipientDetails;
