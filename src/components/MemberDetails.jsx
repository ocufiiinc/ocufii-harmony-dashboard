import React, { useState } from "react";
import Switch from "react-ios-switch";
import { MdSecurity } from "react-icons/md";
import { GiBurningPassion } from "react-icons/gi";
import {
  Container,
  Section,
  SectionTitle,
  SectionSubtitle,
  Row,
  RowLabel,
  TestRow,
  TestInput,
  PrimaryButton,
  StatusPill,
  StatusRow,
  AlertIcon,
  ActionGroup,
  SecondaryButton,
  UnlinkButton,
  Note,
} from "../styles/MemberDetails.styled";
import safetAlertImg from "../assets/images/safety2.png";
import securityAlertImg from "../assets/images/security2.png";

const MemberDetails = ({ member, outbound, inbound, onUnlink = () => {} }) => {
  const [safetyAlerts, setSafetyAlerts] = useState(
    outbound?.enableSafety || false
  );
  const [locationShare, setLocationShare] = useState(
    outbound?.enableLocation || false
  );
  const [securityAlerts, setSecurityAlerts] = useState(
    outbound?.enableSecurity || false
  );
  const [testMessage, setTestMessage] = useState(
    "This is a test alert from the Ocufii Safety System. No action is required."
  );

  const sendTestAlert = () => {
    console.log("Send test alert to", member?.email, testMessage);
    // implement API call if needed
  };

  const handleUnlink = () => {
    onUnlink(member);
  };

  // Determine if incoming alerts are active
  const isSafetyActive = inbound?.enableSafety;
  const isSecurityActive = inbound?.enableSecurity;

  return (
    <Container>
      <Section>
        <SectionTitle>
          Alerts You Share{" "}
          <span style={{ color: "#9aa3ad", fontWeight: "400" }}>
            (Outgoing)
          </span>
        </SectionTitle>
        <SectionSubtitle>
          Enabling this feature allows the member to receive safety alerts.
        </SectionSubtitle>

        <Row>
          <RowLabel>Safety Alerts</RowLabel>
          <Switch
            checked={safetyAlerts}
            onChange={(v) => setSafetyAlerts(v)}
            disabled={true}
          />
        </Row>

        <Row>
          <RowLabel>Location Sharing Permission</RowLabel>
          <Switch
            checked={locationShare}
            onChange={(v) => setLocationShare(v)}
            disabled={true}
          />
        </Row>

        <SectionSubtitle>
          Enabling this feature allows the member to view your location only
          when a safety alert is triggered.
        </SectionSubtitle>

        <Row>
          <RowLabel>Security Alerts</RowLabel>
          <Switch
            checked={securityAlerts}
            onChange={(v) => setSecurityAlerts(v)}
            disabled={true}
          />
        </Row>

        <SectionSubtitle>
          Enabling this feature allows the member to receive security alerts.
        </SectionSubtitle>

        <TestRow>
          <TestInput
            value={testMessage}
            onChange={(e) => setTestMessage(e.target.value)}
          />
          <PrimaryButton onClick={sendTestAlert} disabled={true}>
            Send a Test Alert
          </PrimaryButton>
        </TestRow>
      </Section>

      <Section>
        <SectionTitle>
          Alerts You Receive{" "}
          <span style={{ color: "#9aa3ad", fontWeight: "400" }}>
            (Incoming)
          </span>
        </SectionTitle>

        <StatusRow>
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <AlertIcon>
              <img
                src={safetAlertImg}
                alt="Safety Alert"
                style={{ width: "24px", height: "24px" }}
              />
            </AlertIcon>
            <RowLabel>Safety Alerts</RowLabel>
          </div>
          <StatusPill $isActive={isSafetyActive}>
            {isSafetyActive ? "ACTIVE" : "DISABLED"}
          </StatusPill>
        </StatusRow>

        <StatusRow>
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <AlertIcon>
              <img
                src={securityAlertImg}
                alt="Security Alert"
                style={{ width: "24px", height: "24px" }}
              />
            </AlertIcon>
            <RowLabel>Security Alerts</RowLabel>
          </div>
          <StatusPill $isActive={isSecurityActive}>
            {isSecurityActive ? "ACTIVE" : "INACTIVE"}
          </StatusPill>
        </StatusRow>

        <ActionGroup>
          <SecondaryButton disabled>Snooze</SecondaryButton>
          <SecondaryButton disabled>Block</SecondaryButton>
        </ActionGroup>

        <UnlinkButton onClick={handleUnlink} disabled>
          Unlink
        </UnlinkButton>
        <Note>
          Unlinking temporarily pauses alert and location sharing between both
          accounts. The member remains in your Safety Network and can be
          relinked anytime.
        </Note>
      </Section>
    </Container>
  );
};

export default MemberDetails;
