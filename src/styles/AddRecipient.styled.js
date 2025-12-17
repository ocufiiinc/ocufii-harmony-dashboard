import styled from "styled-components";

export const AddRecipientContainer = styled.div`
  padding: 24px;
  max-width: 800px;
  margin: 0 auto;

  @media (max-width: 1440px) {
    padding: 16px;
  }
`;

export const Breadcrumb = styled.div`
  font-size: 14px;
  color: #6c757d;
  margin-bottom: 24px;
  font-family: "Decimal", sans-serif;

  span {
    color: #6c757d;
  }

  @media (max-width: 1440px) {
    font-size: 12px;
    margin-bottom: 16px;
  }
`;

export const BreadcrumbLink = styled.span`
  color: #ff9800;
  cursor: pointer;
  transition: color 0.2s ease;

  &:hover {
    color: #fb8c00;
    text-decoration: underline;
  }
`;

export const FormCard = styled.div`
  background: white;
  border-radius: 12px;
  padding: 32px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  border: 1px solid #e9ecef;

  @media (max-width: 1440px) {
    padding: 20px;
    border-radius: 8px;
  }
`;

export const FormTitle = styled.h2`
  font-size: 22px;
  font-weight: 600;
  color: #212529;
  margin: 0 0 24px 0;
  font-family: "Decimal", sans-serif;

  @media (max-width: 1440px) {
    font-size: 18px;
    margin-bottom: 16px;
  }
`;

export const DescriptionText = styled.p`
  font-size: 14px;
  color: #212529;
  line-height: 1.6;
  margin: 0 0 20px 0;
  font-family: "Decimal", sans-serif;

  @media (max-width: 1440px) {
    font-size: 13px;
    margin-bottom: 16px;
  }
`;

export const ToggleSection = styled.div`
  background: #f8f9fa;
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 20px;

  @media (max-width: 1440px) {
    padding: 16px;
    margin-bottom: 16px;
  }
`;

export const ToggleRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 0;

  &:not(:last-child) {
    border-bottom: 1px solid #e9ecef;
  }

  @media (max-width: 1440px) {
    padding: 10px 0;
  }
`;

export const ToggleLabel = styled.span`
  font-size: 15px;
  font-weight: 450;
  color: #212529;
  font-family: "Decimal", sans-serif;

  @media (max-width: 1440px) {
    font-size: 14px;
  }
`;

export const ToggleSwitch = styled.label`
  position: relative;
  display: inline-block;
  width: 50px;
  height: 26px;

  @media (max-width: 1440px) {
    width: 44px;
    height: 22px;
  }
`;

export const ToggleInput = styled.input`
  opacity: 0;
  width: 0;
  height: 0;

  &:checked + span {
    background-color: #22c55e;
  }

  &:checked + span:before {
    transform: translateX(24px);
  }

  @media (max-width: 1440px) {
    &:checked + span:before {
      transform: translateX(22px);
    }
  }
`;

export const ToggleSlider = styled.span`
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  transition: 0.4s;
  border-radius: 34px;

  &:before {
    position: absolute;
    content: "";
    height: 20px;
    width: 20px;
    left: 3px;
    bottom: 3px;
    background-color: white;
    transition: 0.4s;
    border-radius: 50%;
  }

  @media (max-width: 1440px) {
    &:before {
      height: 16px;
      width: 16px;
    }
  }
`;

export const InputField = styled.input`
  width: 100%;
  padding: 14px 16px;
  font-size: 14px;
  color: #212529;
  background: white;
  border: 1px solid #ced4da;
  border-radius: 8px;
  font-family: "Decimal", sans-serif;
  margin-bottom: 16px;
  transition: border-color 0.2s ease;

  &::placeholder {
    color: #6c757d;
  }

  &:focus {
    outline: none;
    border-color: #ff9800;
    box-shadow: 0 0 0 3px rgba(255, 152, 0, 0.1);
  }

  @media (max-width: 1440px) {
    padding: 12px 14px;
    font-size: 13px;
    margin-bottom: 12px;
  }
`;

export const InfoText = styled.p`
  font-size: 13px;
  color: #007bff;
  margin: -8px 0 24px 0;
  font-family: "Decimal", sans-serif;

  @media (max-width: 1440px) {
    font-size: 12px;
    margin: -6px 0 16px 0;
  }
`;

export const SectionTitle = styled.h3`
  font-size: 18px;
  font-weight: 600;
  color: #212529;
  margin: 28px 0 12px 0;
  font-family: "Decimal", sans-serif;

  @media (max-width: 1440px) {
    font-size: 16px;
    margin: 20px 0 10px 0;
  }
`;

export const BoldText = styled.strong`
  font-weight: 700;
  color: #212529;
  font-family: "Decimal", sans-serif;
  display: block;
  margin-bottom: 8px;

  @media (max-width: 1440px) {
    font-size: 14px;
  }
`;

export const SendButton = styled.button`
  padding: 14px 48px;
  background: #ff9800;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 15px;
  font-weight: 600;
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

  @media (max-width: 1440px) {
    padding: 12px 40px;
    font-size: 14px;
  }
`;
