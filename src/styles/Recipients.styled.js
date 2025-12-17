import styled from "styled-components";

export const RecipientsContainer = styled.div`
  padding: 24px;
  max-width: 1600px;
  margin: 0 auto;
`;

export const PageTitle = styled.h1`
  font-size: 28px;
  font-weight: 450;
  color: #212529;
  margin: 0 0 24px 0;
  font-family: "Decimal", sans-serif;
`;

export const RecipientsCard = styled.div`
  background: white;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
`;

export const EmptyState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 60px 20px;
  text-align: center;
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  margin-bottom: 24px;
`;

export const EmptyStateText = styled.p`
  font-size: 18px;
  font-weight: 450;
  color: #212529;
  margin: 0;
  font-family: "Decimal", sans-serif;
`;

export const AccordionItem = styled.div`
  border: 1px solid #e9ecef;
  border-radius: 8px;
  margin-bottom: 12px;
  overflow: hidden;
  transition: all 0.3s ease;

  &:hover {
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  }
`;

export const AccordionHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 20px;
  background: white;
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #f8f9fa;
  }
`;

export const AccordionLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  flex: 1;
`;

export const AccordionIcon = styled.div`
  font-size: 20px;
  color: #6c757d;
  transition: transform 0.3s ease;
  transform: ${(props) => (props.$isOpen ? "rotate(90deg)" : "rotate(0deg)")};
`;

export const RecipientName = styled.span`
  font-size: 16px;
  font-weight: 450;
  color: #212529;
  font-family: "Decimal", sans-serif;
`;

export const AccordionRight = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

export const StatusBadge = styled.span`
  padding: 4px 12px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 500;
  text-transform: uppercase;
  font-family: "Decimal", sans-serif;
  background-color: ${(props) => {
    switch (props.status) {
      case "ACCEPTED":
        return "#d4edda";
      case "SNOOZED":
        return "rgba(237, 139, 0, 0.32)";
      case "BLOCKED":
        return "#9C9B9A";
      default:
        return "#e9ecef";
    }
  }};
  color: ${(props) => {
    switch (props.status) {
      case "ACCEPTED":
        return "#155724";
      case "SNOOZED":
        return "rgba(237, 139, 0, 1)";
      case "BLOCKED":
        return "#3b3a3a";
      default:
        return "#495057";
    }
  }};
`;

export const DeleteButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #dc3545;
  transition: all 0.2s ease;

  &:hover {
    transform: scale(1.1);
    color: #c82333;
  }

  svg {
    width: 20px;
    height: 20px;
  }
`;

export const AccordionContent = styled.div`
  max-height: ${(props) => (props.$isOpen ? "500px" : "0")};
  overflow: hidden;
  transition: max-height 0.3s ease;
  background: #f8f9fa;
  border-top: ${(props) => (props.$isOpen ? "1px solid #e9ecef" : "none")};
`;

export const AccordionBody = styled.div`
  padding: 20px;
`;

export const AddRecipientButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 14px 32px;
  background: #ff9800;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 450;
  cursor: pointer;
  font-family: "Decimal", sans-serif;
  margin: 0 auto;
  transition: all 0.3s ease;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);

  &:hover {
    background: #fb8c00;
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }

  &:active {
    transform: translateY(0);
  }
`;

// RecipientDetails Component Styles
export const DetailsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const EmailField = styled.div`
  padding: 12px 16px;
  background: white;
  border: 1px solid #e9ecef;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 400;
  color: #212529;
  font-family: "Decimal", sans-serif;
`;

export const DescriptionText = styled.p`
  font-size: 13px;
  color: #6c757d;
  margin: 0;
  line-height: 1.5;
  font-family: "Decimal", sans-serif;
`;

export const PermissionSection = styled.div`
  padding: 16px;
  background: white;
  border: 1px solid #e9ecef;
  border-radius: 8px;
`;

export const PermissionHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const PermissionRow = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  justify-content: space-between;
`;

export const PermissionTitle = styled.span`
  font-size: 15px;
  font-weight: 450;
  color: #212529;
  font-family: "Decimal", sans-serif;
`;

export const PermissionBadge = styled.span`
  padding: 4px 12px;
  border-radius: 12px;
  font-size: 11px;
  font-weight: 500;
  text-transform: uppercase;
  font-family: "Decimal", sans-serif;
  background-color: #d4edda;
  color: #155724;
`;

export const TestAlertSection = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 16px;
  background: white;
  border: 1px solid #e9ecef;
  border-radius: 8px;
  gap: 16px;
`;

export const TestAlertText = styled.span`
  font-size: 13px;
  color: #212529;
  font-family: "Decimal", sans-serif;
  flex: 1;

  strong {
    font-weight: 600;
  }
`;

export const TestAlertButton = styled.button`
  padding: 8px 20px;
  background: #007bff;
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 13px;
  font-weight: 400;
  cursor: pointer;
  font-family: "Decimal", sans-serif;
  transition: all 0.2s ease;
  white-space: nowrap;

  &:hover {
    background: #0056b3;
  }
`;

export const TestAlertLink = styled.a`
  font-size: 13px;
  color: #007bff;
  text-decoration: none;
  font-family: "Decimal", sans-serif;

  &:hover {
    text-decoration: underline;
  }
`;

// Location Sharing Modal Styles
export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

export const ModalContent = styled.div`
  background: white;
  border-radius: 12px;
  padding: 32px;
  max-width: 500px;
  width: 90%;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);
  text-align: center;

  @media (max-width: 1440px) {
    padding: 24px;
    max-width: 450px;
  }
`;

export const IconWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 20px;

  svg {
    width: 80px;
    height: 80px;
    color: #ff9800;
  }

  @media (max-width: 1440px) {
    margin-bottom: 16px;

    svg {
      width: 64px;
      height: 64px;
    }
  }
`;

export const ModalTitle = styled.h2`
  font-size: 22px;
  font-weight: 600;
  color: #212529;
  margin: 0 0 16px 0;
  font-family: "Decimal", sans-serif;

  @media (max-width: 1440px) {
    font-size: 18px;
    margin-bottom: 12px;
  }
`;

export const ModalDescription = styled.p`
  font-size: 15px;
  color: #495057;
  line-height: 1.6;
  margin: 0 0 28px 0;
  font-family: "Decimal", sans-serif;

  @media (max-width: 1440px) {
    font-size: 14px;
    margin-bottom: 20px;
  }
`;

export const ButtonGroup = styled.div`
  display: flex;
  gap: 12px;
  justify-content: center;

  @media (max-width: 1440px) {
    gap: 10px;
  }
`;

export const ModalButton = styled.button`
  padding: 12px 32px;
  font-size: 15px;
  font-weight: 600;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-family: "Decimal", sans-serif;
  transition: all 0.2s ease;

  @media (max-width: 1440px) {
    padding: 10px 28px;
    font-size: 14px;
  }
`;

export const CancelButton = styled(ModalButton)`
  background: #6c757d;
  color: white;

  &:hover {
    background: #5a6268;
  }
`;

export const ConsentButton = styled(ModalButton)`
  background: #007bff;
  color: white;

  &:hover {
    background: #0056b3;
  }
`;
