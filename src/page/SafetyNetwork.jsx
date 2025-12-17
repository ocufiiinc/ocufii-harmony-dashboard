import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "../Layout/DashboardLayout";
import { DashboardContent } from "../styles/Dashboard.styled";
import { MdEmail, MdDelete, MdLink, MdChevronRight } from "react-icons/md";
import { HiLink } from "react-icons/hi";
import {
  SafetyNetworkContainer,
  PageTitle,
  ButtonGroup,
  ActionButton,
  MembersCard,
  EmptyState,
  EmptyStateText,
  MemberItem,
  MemberHeader,
  AccordionIcon,
  MemberLeft,
  MemberIcon,
  MemberInfo,
  MemberName,
  MemberNameText,
  StatusBadge,
  MemberEmail,
  MemberRight,
  DeleteButton,
  AccordionContent,
  AccordionBody,
} from "../styles/SafetyNetwork.styled";
import sendEmail from "../assets/images/sendEmail.png";
import receiveEmail from "../assets/images/recieveEmail.png";
import { ROUTE } from "../common/Routes";

const SafetyNetwork = () => {
  const navigate = useNavigate();
  const [openAccordion, setOpenAccordion] = useState(null);

  // Sample data - replace with API call later
  const [members, setMembers] = useState([
    {
      id: 1,
      name: "Leslie W.",
      email: "lwinters@ocufii.com",
      status: "PENDING",
    },
  ]);

  const toggleAccordion = (id) => {
    setOpenAccordion(openAccordion === id ? null : id);
  };

  const handleInvite = () => {
    navigate(ROUTE.INVITE_CONTACT);
  };

  const handleAcceptInvitation = () => {
    navigate(ROUTE.ACCEPT_INVITE);
  };

  const handleDelete = (id) => {
    // Add delete functionality later
    console.log("Delete member:", id);
  };

  return (
    <DashboardLayout>
      <DashboardContent>
        <SafetyNetworkContainer>
          <PageTitle>My Safety Network</PageTitle>

          <ButtonGroup>
            <ActionButton onClick={handleInvite}>
              <img src={sendEmail} alt="Send Email" />
              <div style={{ textAlign: "left" }}>
                <div>Invite Someone</div>
                <div>to My Safety Network</div>
              </div>
            </ActionButton>
            <ActionButton onClick={handleAcceptInvitation}>
              <img src={receiveEmail} alt="Receive Email" />
              <div style={{ textAlign: "left" }}>
                <div>Accept Invitation</div>
                <div>to Join a Safety Network</div>
              </div>
            </ActionButton>
          </ButtonGroup>

          {members.length === 0 ? (
            <EmptyState>
              <EmptyStateText>No Members in Your List</EmptyStateText>
            </EmptyState>
          ) : (
            <MembersCard>
              {members.map((member) => (
                <MemberItem key={member.id}>
                  <MemberHeader>
                    <MemberLeft onClick={() => toggleAccordion(member.id)}>
                      <AccordionIcon $isOpen={openAccordion === member.id}>
                        <MdChevronRight />
                      </AccordionIcon>
                      <MemberIcon>
                        <HiLink />
                      </MemberIcon>
                      <MemberInfo>
                        <MemberName>
                          <MemberNameText>{member.name}</MemberNameText>
                          <StatusBadge status={member.status}>
                            {member.status}
                          </StatusBadge>
                        </MemberName>
                        <MemberEmail>{member.email}</MemberEmail>
                      </MemberInfo>
                    </MemberLeft>
                    <MemberRight>
                      <DeleteButton onClick={() => handleDelete(member.id)}>
                        <MdDelete />
                      </DeleteButton>
                    </MemberRight>
                  </MemberHeader>
                  <AccordionContent $isOpen={openAccordion === member.id}>
                    <AccordionBody>
                      {/* Accordion content will be added later */}
                      <p>Member details will go here...</p>
                    </AccordionBody>
                  </AccordionContent>
                </MemberItem>
              ))}
            </MembersCard>
          )}
        </SafetyNetworkContainer>
      </DashboardContent>
    </DashboardLayout>
  );
};

export default SafetyNetwork;
