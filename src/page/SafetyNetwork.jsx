import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useUser } from "../context/UserContext";
import {
  getSafetyNetworkMembers,
  getSafetyNetworkMemberDetails,
} from "../api/SafetyNetworkApi";
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
import deleteImg from "../assets/images/delete.svg";
import { ROUTE } from "../common/Routes";
import DeleteMemberModal from "../components/DeleteMemberModal/DeleteMemberModal";
import MemberDetails from "../components/MemberDetails";

const SafetyNetwork = () => {
  const navigate = useNavigate();
  const { user } = useUser();
  const [openAccordion, setOpenAccordion] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedMember, setSelectedMember] = useState(null);

  // Fetch safety network members
  const { data: safetyNetworkData, isLoading } = useQuery({
    queryKey: ["safetyNetworkMembers", user?.email],
    queryFn: () => getSafetyNetworkMembers(user?.email),
    enabled: !!user?.email,
    refetchInterval: 60000, // Refetch every 1 minute
    staleTime: 30000, // Cache for 30 seconds
  });

  // Transform API data to component format
  const members =
    safetyNetworkData?.safetyLinks?.map((link, index) => ({
      id: index + 1,
      name: link.recipientName || link.linkedMember,
      email: link.linkedMember,
      status:
        link.userStatus === 0
          ? "PENDING"
          : link.userStatus === 1
          ? "LINKED"
          : "NOT LINKED",
      enableLocation: link.enableLocation,
      enableSafety: link.enableSafety,
      enableSecurity: link.enableSecurity,
      userType: link.userType,
      dateCreated: link.dateCreated,
      dateUpdated: link.dateUpdated,
      notificationStatus: link.notificationStatus,
      senderName: link.senderName,
      snoozeEndTime: link.snoozeEndTime,
      snoozeStartTime: link.snoozeStartTime,
    })) || [];

  // Fetch member details when accordion opens
  const openMember = members.find((m) => m.id === openAccordion);
  const { data: memberDetails, isLoading: isLoadingDetails } = useQuery({
    queryKey: ["safetyNetworkMemberDetails", user?.email, openMember?.email],
    queryFn: () =>
      getSafetyNetworkMemberDetails(user?.email, openMember?.email),
    enabled: !!user?.email && !!openMember?.email,
    staleTime: 30000,
  });

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
    const member = members.find((m) => m.id === id);
    setSelectedMember(member);
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = (id) => {
    // TODO: Implement API call to delete member
    console.log("Delete member with id:", id);
    setSelectedMember(null);
    setShowDeleteModal(false);
  };

  const handleCloseDelete = () => {
    setSelectedMember(null);
    setShowDeleteModal(false);
  };

  return (
    <DashboardLayout>
      <DashboardContent>
        <SafetyNetworkContainer>
          <PageTitle>My Safety Network</PageTitle>
          <DeleteMemberModal
            isOpen={showDeleteModal}
            member={selectedMember}
            onClose={handleCloseDelete}
            onConfirm={handleConfirmDelete}
          />
          <ButtonGroup>
            <ActionButton onClick={handleInvite} disabled={true}>
              <img src={sendEmail} alt="Send Email" />
              <div style={{ textAlign: "left" }}>
                <div>Invite Someone</div>
                <div>to My Safety Network</div>
              </div>
            </ActionButton>
            <ActionButton onClick={handleAcceptInvitation} disabled={true}>
              <img src={receiveEmail} alt="Receive Email" />
              <div style={{ textAlign: "left" }}>
                <div>Accept Invitation</div>
                <div>to Join a Safety Network</div>
              </div>
            </ActionButton>
          </ButtonGroup>

          {isLoading ? (
            <EmptyState>
              <EmptyStateText>Loading members...</EmptyStateText>
            </EmptyState>
          ) : members.length === 0 ? (
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
                      <DeleteButton
                        onClick={() => handleDelete(member.id)}
                        disabled
                      >
                        <img
                          src={deleteImg}
                          alt="delete"
                          style={{
                            width: 20,
                            height: 20,
                            objectFit: "contain",
                          }}
                        />
                      </DeleteButton>
                    </MemberRight>
                  </MemberHeader>
                  <AccordionContent $isOpen={openAccordion === member.id}>
                    <AccordionBody>
                      {isLoadingDetails ? (
                        <div style={{ padding: "20px", textAlign: "center" }}>
                          Loading details...
                        </div>
                      ) : (
                        <MemberDetails
                          member={member}
                          outbound={memberDetails?.data?.outbound}
                          inbound={memberDetails?.data?.inbound}
                          onUnlink={() => {
                            // TODO: Implement API call to unlink member
                            console.log("Unlink member:", member.email);
                          }}
                        />
                      )}
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
