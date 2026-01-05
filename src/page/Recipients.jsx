import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import DashboardLayout from "../Layout/DashboardLayout";
import { useUser } from "../context/UserContext";
import { getRecipients } from "../api/RecipientsApi";
import { DashboardContent } from "../styles/Dashboard.styled";
import { MdChevronRight, MdDelete } from "react-icons/md";
import RecipientDetails from "../components/RecipientDetails";
import { ROUTE } from "../common/Routes";
import {
  RecipientsContainer,
  PageTitle,
  RecipientsCard,
  EmptyState,
  EmptyStateText,
  AccordionItem,
  AccordionHeader,
  AccordionLeft,
  AccordionIcon,
  RecipientName,
  AccordionRight,
  StatusBadge,
  DeleteButton,
  AccordionContent,
  AccordionBody,
  AddRecipientButton,
} from "../styles/Recipients.styled";

const Recipients = () => {
  const navigate = useNavigate();
  const { user } = useUser();
  const [openAccordion, setOpenAccordion] = useState(null);

  // Fetch recipients data
  const {
    data: recipientsData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["recipients", user?.email],
    queryFn: () => getRecipients(user?.email),
    enabled: !!user?.email,
  });

  // Transform API data to component format
  const recipients =
    recipientsData?.userNotify?.map((item, index) => ({
      id: index + 1,
      email: item.recipient,
      name: item.recipientName || item.recipient,
      enableSafety: item.enableSafety,
      enableSecurity: item.enableSecurity,
      enableLocation: item.enableLocation,
      safetyStatus: item.safetyStatus,
      securityStatus: item.securityStatus,
      notificationStatus: item.notificationStatus,
      userStatus: item.userStatus,
      senderName: item.senderName,
      dateCreated: item.dateCreated,
      mobileDevice: item.mobileDevice,
      freeUser: item.freeUser,
    })) || [];

  const toggleAccordion = (id) => {
    setOpenAccordion(openAccordion === id ? null : id);
  };

  const handleDelete = (id) => {
    // Add delete functionality later
    console.log("Delete recipient:", id);
  };

  const handleAddRecipient = () => {
    navigate(ROUTE.ADD_RECIPIENT);
  };

  return (
    <DashboardLayout>
      <DashboardContent>
        <RecipientsContainer>
          <PageTitle>Alert My Recipients</PageTitle>

          {isLoading ? (
            <EmptyState>
              <EmptyStateText>Loading recipients...</EmptyStateText>
            </EmptyState>
          ) : error ? (
            <EmptyState>
              <EmptyStateText>Error loading recipients</EmptyStateText>
            </EmptyState>
          ) : recipients.length === 0 ? (
            <EmptyState>
              <EmptyStateText>No My Recipients in Your List</EmptyStateText>
            </EmptyState>
          ) : (
            <RecipientsCard>
              {recipients.map((recipient) => (
                <AccordionItem key={recipient.id}>
                  <AccordionHeader>
                    <AccordionLeft
                      onClick={() => toggleAccordion(recipient.id)}
                    >
                      <AccordionIcon $isOpen={openAccordion === recipient.id}>
                        <MdChevronRight />
                      </AccordionIcon>
                      <RecipientName>{recipient.name}</RecipientName>
                    </AccordionLeft>
                    <AccordionRight>
                      <DeleteButton onClick={() => handleDelete(recipient.id)}>
                        <MdDelete />
                      </DeleteButton>
                    </AccordionRight>
                  </AccordionHeader>
                  <AccordionContent $isOpen={openAccordion === recipient.id}>
                    <AccordionBody>
                      <RecipientDetails recipient={recipient} />
                    </AccordionBody>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </RecipientsCard>
          )}

          <div style={{ marginTop: "24px", textAlign: "center" }}>
            <AddRecipientButton onClick={handleAddRecipient} disabled={true}>
              + Add Recipient
            </AddRecipientButton>
          </div>
        </RecipientsContainer>
      </DashboardContent>
    </DashboardLayout>
  );
};

export default Recipients;
