import styled from "styled-components";

export const SafetyNetworkContainer = styled.div`
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

export const ButtonGroup = styled.div`
  display: flex;
  gap: 16px;
  justify-content: center;
  margin-bottom: 24px;
  flex-wrap: wrap;
`;

export const ActionButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  padding: 14px 24px;
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

  &:hover {
    background: #fb8c00;
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }

  &:active {
    transform: translateY(0);
  }

  img {
    width: 24px;
    height: 24px;
  }
`;

export const InviteContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 70vh;
  padding: 20px;
`;

export const InviteCard = styled.div`
  background: white;
  border-radius: 12px;
  padding: 48px;
  max-width: 500px;
  width: 100%;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  text-align: center;
`;

export const InviteTitle = styled.h1`
  font-size: 20px;
  font-weight: 700;
  color: #1a1a1a;
  margin-bottom: 32px;
  letter-spacing: 0.5px;
`;

export const InviteIcon = styled.div`
  margin: 0 auto 32px;

  img {
    width: 80px;
    height: auto;
  }
`;

export const InviteDescription = styled.p`
  font-size: 14px;
  color: #333;
  line-height: 1.6;
  margin-bottom: 32px;
  text-align: center;
`;

export const InviteInputField = styled.input`
  width: 100%;
  padding: 12px 16px;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 14px;
  margin-bottom: 16px;
  font-family: "Decimal", sans-serif;
  box-sizing: border-box;
  background-color: white;
  color: #000000;

  &::placeholder {
    color: #999;
  }

  &:focus {
    outline: none;
    border-color: #ff9800;
  }
`;

export const InviteButtonGroup = styled.div`
  display: flex;
  gap: 12px;
  justify-content: center;
  margin-top: 24px;
`;

export const CancelButton = styled.button`
  background: #999;
  color: white;
  border: none;
  border-radius: 6px;
  padding: 12px 32px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s;
  font-family: "Decimal", sans-serif;

  &:hover {
    background: #888;
  }

  &:active {
    transform: scale(0.98);
  }
`;
export const VerifyButton = styled.button`
  background: #ff9800;
  color: white;
  border: none;
  border-radius: 6px;
  padding: 12px 32px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s;
  font-family: "Decimal", sans-serif;

  &:hover {
    background: #fb8c00;
  }

  &:active {
    transform: scale(0.98);
  }
`;
export const SendInviteButton = styled.button`
  background: #ff9800;
  color: white;
  border: none;
  border-radius: 6px;
  padding: 12px 32px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s;
  font-family: "Decimal", sans-serif;

  &:hover {
    background: #fb8c00;
  }

  &:active {
    transform: scale(0.98);
  }

  svg,
  img {
    width: 24px;
    height: 24px;
    object-fit: contain;
  }
`;

export const MembersCard = styled.div`
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
`;

export const EmptyStateText = styled.p`
  font-size: 18px;
  font-weight: 450;
  color: #212529;
  margin: 0;
  font-family: "Decimal", sans-serif;
`;

export const MemberItem = styled.div`
  border: 1px solid #e9ecef;
  border-radius: 8px;
  margin-bottom: 12px;
  overflow: hidden;
  transition: all 0.3s ease;

  &:hover {
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  }
`;

export const MemberHeader = styled.div`
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

export const AccordionIcon = styled.div`
  font-size: 20px;
  color: #6c757d;
  transition: transform 0.3s ease;
  transform: ${(props) => (props.$isOpen ? "rotate(90deg)" : "rotate(0deg)")};
`;

export const MemberLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  flex: 1;
`;

export const MemberIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  color: #6c757d;
`;

export const MemberInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export const MemberName = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

export const MemberNameText = styled.span`
  font-size: 16px;
  font-weight: 450;
  color: #212529;
  font-family: "Decimal", sans-serif;
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
      case "PENDING":
        return "#fff3cd";
      case "BLOCKED":
        return "#f8d7da";
      default:
        return "#e9ecef";
    }
  }};
  color: ${(props) => {
    switch (props.status) {
      case "ACCEPTED":
        return "#155724";
      case "PENDING":
        return "#856404";
      case "BLOCKED":
        return "#721c24";
      default:
        return "#495057";
    }
  }};
`;

export const MemberEmail = styled.span`
  font-size: 14px;
  color: #6c757d;
  font-family: "Decimal", sans-serif;
`;

export const MemberRight = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
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
