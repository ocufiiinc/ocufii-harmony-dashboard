import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "../Layout/DashboardLayout";
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
  const [openAccordion, setOpenAccordion] = useState(null);

  // Sample data - replace with API call later
  const [recipients, setRecipients] = useState([
    { id: 1, name: "Recipient - 1", status: "ACCEPTED" },
    { id: 2, name: "Recipient - 2", status: "SNOOZED" },
    { id: 3, name: "Recipient - 3", status: "BLOCKED" },
  ]);

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

          {recipients.length === 0 ? (
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
                      <StatusBadge status={recipient.status}>
                        {recipient.status}
                      </StatusBadge>
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
            <AddRecipientButton onClick={handleAddRecipient}>
              + Add Recipient
            </AddRecipientButton>
          </div>
        </RecipientsContainer>
      </DashboardContent>
    </DashboardLayout>
  );
};

export default Recipients;
