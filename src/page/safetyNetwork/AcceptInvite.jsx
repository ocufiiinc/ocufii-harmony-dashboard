import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "../../Layout/DashboardLayout";
import { DashboardContent } from "../../styles/Dashboard.styled";
import { ROUTE } from "../../common/Routes";
import {
  InviteContainer,
  InviteCard,
  InviteTitle,
  InviteIcon,
  InviteDescription,
  InviteInputField,
  InviteButtonGroup,
  CancelButton,
  VerifyButton,
} from "../../styles/SafetyNetwork.styled";
import emailIcon from "../../assets/images/inviteAccept.png";
import checkIcon from "../../assets/images/check-badge.svg";

const AcceptInvite = () => {
  const navigate = useNavigate();
  const [contactName, setContactName] = useState("");
  const [code, setCode] = useState("");

  const handleCancel = () => {
    navigate(ROUTE.SAFETY_NETWORK);
  };

  const handleVerify = () => {
    // Handle verification logic here
    console.log("Verifying code:", { contactName, code });

    navigate(ROUTE.DASHBOARD);
  };

  return (
    <DashboardLayout>
      <DashboardContent>
        <InviteContainer>
          <InviteCard>
            <InviteTitle>ENTER INVITATION CODE</InviteTitle>

            <InviteIcon>
              <img src={emailIcon} alt="Email Icon" style={{ width: "80px" }} />
            </InviteIcon>

            <InviteDescription>
              Enter the invitation code to link your account with this Safety
              Network. Once linked, you'll have the option to send and receive
              safety alerts, security alerts, and share location.
            </InviteDescription>

            <InviteInputField
              type="text"
              placeholder="Contacts Name / Nickname"
              value={contactName}
              onChange={(e) => setContactName(e.target.value)}
            />

            <InviteInputField
              type="text"
              placeholder="Code"
              value={code}
              onChange={(e) => setCode(e.target.value)}
            />

            <InviteButtonGroup>
              <CancelButton onClick={handleCancel}>Cancel</CancelButton>
              <VerifyButton onClick={handleVerify}>Verify</VerifyButton>
            </InviteButtonGroup>
          </InviteCard>
        </InviteContainer>
      </DashboardContent>
    </DashboardLayout>
  );
};

export default AcceptInvite;
