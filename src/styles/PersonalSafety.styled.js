import styled from "styled-components";

export const SafetyContainer = styled.div`
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

export const ServiceCard = styled.div`
  background: white;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  margin-bottom: 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
`;

export const ServiceLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

export const InfoIcon = styled.div`
  width: 24px;
  height: 24px;
  background: #007bff;
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  font-weight: bold;
  flex-shrink: 0;
`;

export const ServiceText = styled.span`
  font-size: 16px;
  font-weight: 450;
  color: #212529;
  font-family: "Decimal", sans-serif;
`;

export const StatusBadge = styled.span`
  padding: 6px 16px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 500;
  text-transform: uppercase;
  font-family: "Decimal", sans-serif;
  background-color: #d4edda;
  color: #155724;
`;

export const OptionItem = styled.div`
  background: white;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  margin-bottom: 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.12);
  }
`;

export const OptionText = styled.span`
  font-size: 16px;
  font-weight: 400;
  color: #212529;
  font-family: "Decimal", sans-serif;
`;

export const AlertSection = styled.div`
  background: white;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  margin-bottom: 16px;
`;

export const AlertHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 8px;
`;

export const AlertRight = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

export const AlertTitle = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

export const AlertTitleText = styled.span`
  font-size: 16px;
  font-weight: 450;
  color: #212529;
  font-family: "Decimal", sans-serif;
  text-transform: uppercase;
`;

export const AlertDescription = styled.p`
  font-size: 14px;
  color: #6c757d;
  margin: 0;
  font-family: "Decimal", sans-serif;
`;

export const InfoText = styled.p`
  font-size: 14px;
  color: #6c757d;
  margin: 16px 0;
  font-family: "Decimal", sans-serif;
  line-height: 1.5;

  a {
    color: #767574;
    text-decoration: underline;
    font-weight: 500;

    &:hover {
      text-decoration: underline;
    }
  }
`;

export const SectionTitle = styled.h2`
  font-size: 16px;
  font-weight: 450;
  color: #212529;
  margin: 0 0 8px 0;
  text-transform: uppercase;
  font-family: "Decimal", sans-serif;
`;

export const SectionDescription = styled.p`
  font-size: 14px;
  color: #6c757d;
  margin: 0 0 16px 0;
  font-family: "Decimal", sans-serif;
  line-height: 1.5;
`;

export const ContactSection = styled.div`
  padding: 16px 0;
  margin-bottom: 12px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid #e9ecef;

  &:last-child {
    border-bottom: none;
    margin-bottom: 0;
    padding-bottom: 0;
  }
`;

export const ContactLeft = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export const ContactTitle = styled.span`
  font-size: 16px;
  font-weight: 450;
  color: #212529;
  font-family: "Decimal", sans-serif;
`;

export const ContactDescription = styled.span`
  font-size: 14px;
  color: #6c757d;
  font-family: "Decimal", sans-serif;
`;

export const ManageButton = styled.button`
  padding: 12px 24px;
  background: #ff9800;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 450;
  cursor: pointer;
  font-family: "Decimal", sans-serif;
  transition: all 0.3s ease;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  white-space: nowrap;

  &:hover {
    background: #fb8c00;
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }

  &:active {
    transform: translateY(0);
  }
`;

export const ManageContactsCard = styled.div`
  background: white;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  margin-bottom: 16px;
`;

export const NameEditCard = styled.div`
  background: white;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  margin-bottom: 16px;
`;

export const NameEditRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
  margin-bottom: 12px;
`;

export const NameEditLeft = styled.div`
  flex: 1;
`;

export const NameEditTitle = styled.h3`
  font-size: 17px;
  font-weight: 600;
  color: #212529;
  margin: 0 0 8px 0;
  font-family: "Decimal", sans-serif;
`;

export const NameEditDescription = styled.p`
  font-size: 14px;
  color: #6c757d;
  margin: 0;
  font-family: "Decimal", sans-serif;
  line-height: 1.5;
`;

export const NameInputWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  gap: 12px;
  min-width: 400px;

  @media (max-width: 768px) {
    min-width: 250px;
  }
`;

export const NameInput = styled.input`
  flex: 1;
  padding: 12px 16px;
  font-size: 16px;
  color: #212529;
  border: 1px solid #ced4da;
  border-radius: 8px;
  font-family: "Decimal", sans-serif;
  transition: border-color 0.2s ease;

  &:focus {
    outline: none;
    border-color: #007bff;
  }

  &::placeholder {
    color: #adb5bd;
  }
`;

export const NameEditArrow = styled.div`
  font-size: 24px;
  color: #6c757d;
`;

export const NameSubtext = styled.p`
  font-size: 13px;
  color: #6c757d;
  margin: 12px 0 0 0;
  font-family: "Decimal", sans-serif;
  line-height: 1.5;
`;

// Modal Styles
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
  z-index: 10000;
  padding: 20px;
`;

export const ModalContainer = styled.div`
  background: white;
  border-radius: 16px;
  max-width: 600px;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
`;

export const ModalContent = styled.div`
  padding: 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;

  @media (max-width: 768px) {
    padding: 24px;
  }
`;

export const ModalIconWrapper = styled.div`
  width: 80px;
  height: 80px;
  background: #2196f3;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 24px;

  svg {
    width: 48px;
    height: 48px;
    color: white;
  }
`;

export const ModalTitle = styled.h2`
  font-size: 20px;
  font-weight: 600;
  color: #212529;
  margin: 0 0 20px 0;
  font-family: "Decimal", sans-serif;
  letter-spacing: 0.5px;
`;

export const ModalDescription = styled.p`
  font-size: 15px;
  color: #212529;
  margin: 0 0 16px 0;
  font-family: "Decimal", sans-serif;
  line-height: 1.6;
  text-align: left;
  width: 100%;
`;

export const ModalList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0 0 24px 0;
  width: 100%;
`;

export const ModalListItem = styled.li`
  font-size: 15px;
  color: #212529;
  margin: 0 0 12px 0;
  font-family: "Decimal", sans-serif;
  line-height: 1.6;
  text-align: left;
  padding-left: 24px;
  position: relative;

  &:before {
    content: "•";
    position: absolute;
    left: 8px;
    color: #212529;
    font-weight: bold;
  }

  strong {
    font-weight: 600;
  }
`;

export const ModalSection = styled.div`
  width: 100%;
  margin-bottom: 24px;
`;

export const ModalSectionTitle = styled.h3`
  font-size: 16px;
  font-weight: 600;
  color: #212529;
  margin: 0 0 12px 0;
  font-family: "Decimal", sans-serif;
  text-align: left;
`;

export const ModalButton = styled.button`
  padding: 12px 48px;
  background: #2196f3;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  font-family: "Decimal", sans-serif;
  transition: all 0.2s ease;
  margin-top: 8px;

  &:hover {
    background: #1976d2;
  }

  &:active {
    transform: scale(0.98);
  }
`;

export const CloseButton = styled.button`
  position: absolute;
  top: 16px;
  right: 16px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 8px;
  color: #6c757d;
  transition: color 0.2s ease;

  &:hover {
    color: #212529;
  }

  svg {
    width: 24px;
    height: 24px;
  }
`;

export const AlertButtonsContainer = styled.div`
  margin-top: 16px;
  padding-top: 16px;
  border-top: 1px solid #e9ecef;
`;

export const AlertButtonsTitle = styled.div`
  font-size: 14px;
  font-weight: 500;
  color: #6c757d;
  margin-bottom: 12px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  font-family: "Decimal", sans-serif;
`;

export const AlertButtonsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const AlertButtonItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 0;
`;

export const AlertButtonLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

export const AlertButtonLabel = styled.span`
  font-size: 16px;
  color: #212529;
  font-family: "Decimal", sans-serif;
`;
