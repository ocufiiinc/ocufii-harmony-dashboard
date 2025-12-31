import React, { useState } from "react";
import Switch from "react-ios-switch";
import { Container,Section,SectionTitle,Row,TestRow,TestInput,PrimaryButton,StatusPill ,ActionGroup,SecondaryButton,UnlinkButton,Note} from "../styles/MemberDetails.styled";

const MemberDetails = ({ member, onUnlink = () => {} }) => {
  const [safetyAlerts, setSafetyAlerts] = useState(true);
  const [locationShare, setLocationShare] = useState(true);
  const [securityAlerts, setSecurityAlerts] = useState(true);
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

  return (
    <Container>
      <Section>
        <SectionTitle>Alerts You Share (Outgoing)</SectionTitle>

        <Row>
          <div>Safety Alerts</div>
          <Switch checked={safetyAlerts} onChange={(v) => setSafetyAlerts(v)} />
        </Row>

        <Row>
          <div>Location Sharing Permission</div>
          <Switch
            checked={locationShare}
            onChange={(v) => setLocationShare(v)}
          />
        </Row>

        <Row>
          <div>Security Alerts</div>
          <Switch
            checked={securityAlerts}
            onChange={(v) => setSecurityAlerts(v)}
          />
        </Row>

        <TestRow>
          <TestInput
            value={testMessage}
            onChange={(e) => setTestMessage(e.target.value)}
          />
          <PrimaryButton onClick={sendTestAlert}>
            Send a Test Alert
          </PrimaryButton>
        </TestRow>
      </Section>

      <Section>
        <SectionTitle>Alerts You Receive (Incoming)</SectionTitle>

        <Row>
          <div>Safety Alerts</div>
          <StatusPill>ACTIVE</StatusPill>
        </Row>

        <Row>
          <div>Security Alerts</div>
          <StatusPill>ACTIVE</StatusPill>
        </Row>

        <ActionGroup>
          <SecondaryButton>Snooze</SecondaryButton>
          <SecondaryButton>Block</SecondaryButton>
        </ActionGroup>

        <UnlinkButton onClick={handleUnlink}>Unlink</UnlinkButton>
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
