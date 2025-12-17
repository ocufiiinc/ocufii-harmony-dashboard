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
  SendInviteButton,
} from "../../styles/SafetyNetwork.styled";
import inviteIcon from "../../assets/images/invite.png";

const InviteContact = () => {
  const navigate = useNavigate();
  const [contactName, setContactName] = useState("");
  const [contactEmail, setContactEmail] = useState("");

  const handleCancel = () => {
    navigate(ROUTE.SAFETY_NETWORK);
  };

  const handleSendInvite = () => {
    // Handle send invite logic here
    console.log("Sending invite:", { contactName, contactEmail });

    const message = {
      line1:
        "Your email has been confirmed, and your contact has been successfully invited to your Safety Network list.",
      line2: 'Click "Continue" to finish setting up your alert members.',
    };

    navigate(ROUTE.RESEND_EMAIL, { state: { message } });
  };

  return (
    <DashboardLayout>
      <DashboardContent>
        <InviteContainer>
          <InviteCard>
            <InviteTitle>INVITE A CONTACT</InviteTitle>

            <InviteIcon>
              <img src={inviteIcon} alt="Invite Icon" />
            </InviteIcon>

            <InviteDescription>
              Enter the contact's details to send an invitation to join your
              Safety Network. Once they accept, both accounts will be linked,
              and you'll each have the option to send and receive safety alerts,
              security alerts, and share location.
            </InviteDescription>

            <InviteInputField
              type="text"
              placeholder="Contacts Name / Nickname"
              value={contactName}
              onChange={(e) => setContactName(e.target.value)}
            />

            <InviteInputField
              type="email"
              placeholder="Contacts Email"
              value={contactEmail}
              onChange={(e) => setContactEmail(e.target.value)}
            />

            <InviteButtonGroup>
              <CancelButton onClick={handleCancel}>Cancel</CancelButton>
              <SendInviteButton onClick={handleSendInvite}>
                Send Invite
              </SendInviteButton>
            </InviteButtonGroup>
          </InviteCard>
        </InviteContainer>
      </DashboardContent>
    </DashboardLayout>
  );
};

export default InviteContact;
