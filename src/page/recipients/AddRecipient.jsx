import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Switch from "react-ios-switch";
import DashboardLayout from "../../Layout/DashboardLayout";
import { DashboardContent } from "../../styles/Dashboard.styled";
import { ROUTE } from "../../common/Routes";
import EmailInvitation from "../../components/EmailInvitation";
import LocationSharingModal from "../../components/LocationSharingModal";
import {
  AddRecipientContainer,
  Breadcrumb,
  BreadcrumbLink,
  FormCard,
  FormTitle,
  DescriptionText,
  ToggleSection,
  ToggleRow,
  ToggleLabel,
  InputField,
  InfoText,
  SectionTitle,
  BoldText,
  SendButton,
} from "../../styles/AddRecipient.styled";

const AddRecipient = () => {
  const navigate = useNavigate();
  const [safetyAlerts, setSafetyAlerts] = useState(true);
  const [locationSharing, setLocationSharing] = useState(false);
  const [securityAlerts, setSecurityAlerts] = useState(false);
  const [recipientName, setRecipientName] = useState("");
  const [senderName, setSenderName] = useState("");
  const [email, setEmail] = useState("");
  const [showLocationModal, setShowLocationModal] = useState(false);

  const handleLocationSharingToggle = (checked) => {
    if (checked) {
      // Show consent modal when trying to enable
      setShowLocationModal(true);
    } else {
      // Allow disabling without modal
      setLocationSharing(false);
    }
  };

  const handleLocationConsent = () => {
    setLocationSharing(true);
    setShowLocationModal(false);
  };

  const handleLocationCancel = () => {
    setLocationSharing(false);
    setShowLocationModal(false);
  };

  const handleSendInvitation = () => {
    const enabledToggles = {
      safetyAlerts,
      locationSharing,
      securityAlerts,
    };

    // Handle sending invitation
    console.log({
      recipientName,
      senderName,
      email,
      enabledToggles,
    });
  };

  return (
    <DashboardLayout>
      <DashboardContent>
        <AddRecipientContainer>
          <Breadcrumb>
            <BreadcrumbLink onClick={() => navigate(ROUTE.RECIPIENTS)}>
              My Recipients
            </BreadcrumbLink>
            <span> / </span>
            <span>Add My Recipients</span>
          </Breadcrumb>

          <FormCard>
            <FormTitle>Recipient - 1</FormTitle>

            <DescriptionText>
              Enabling the Safety Alerts feature allows the recipient to receive
              real-time personal safety alerts when you need help. If Location
              Sharing Permission is also enabled, the recipient will be able to
              view your location only when a safety alert is triggered.
            </DescriptionText>

            <ToggleSection>
              <ToggleRow>
                <ToggleLabel>Safety Alerts</ToggleLabel>
                <Switch
                  checked={safetyAlerts}
                  onChange={(checked) => setSafetyAlerts(checked)}
                  onColor="#22c55e"
                />
              </ToggleRow>

              <ToggleRow>
                <ToggleLabel>Location Sharing Permission</ToggleLabel>
                <Switch
                  checked={locationSharing}
                  onChange={handleLocationSharingToggle}
                  onColor="#22c55e"
                />
              </ToggleRow>
            </ToggleSection>

            <DescriptionText>
              Enabling the Security Alerts feature allows the recipient to
              receive real-time security alerts when movement is detected on a
              monitored asset.
            </DescriptionText>

            <ToggleSection>
              <ToggleRow>
                <ToggleLabel>Security Alerts</ToggleLabel>
                <Switch
                  checked={securityAlerts}
                  onChange={(checked) => setSecurityAlerts(checked)}
                  onColor="#22c55e"
                />
              </ToggleRow>
            </ToggleSection>

            <InputField
              type="text"
              placeholder="Optional Recipient's Name (optional)"
              value={recipientName}
              onChange={(e) => setRecipientName(e.target.value)}
            />

            <InfoText>
              This name is displayed in the Alert Recipient's List.
            </InfoText>

            <EmailInvitation
              safetyAlerts={safetyAlerts}
              locationSharing={locationSharing}
              securityAlerts={securityAlerts}
              senderName={senderName}
              setSenderName={setSenderName}
              email={email}
              setEmail={setEmail}
              onSendInvitation={handleSendInvitation}
            />
          </FormCard>
        </AddRecipientContainer>

        <LocationSharingModal
          isOpen={showLocationModal}
          onCancel={handleLocationCancel}
          onConsent={handleLocationConsent}
        />
      </DashboardContent>
    </DashboardLayout>
  );
};

export default AddRecipient;
