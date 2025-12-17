import React from "react";
import {
  ModalOverlay,
  ModalContent,
  IconWrapper,
  ModalTitle,
  ModalDescription,
  ButtonGroup,
  CancelButton,
  ConsentButton,
} from "../../styles/Recipients.styled";
import warningImg from "../../assets/images/warning2.svg";

const LocationSharingModal = ({ isOpen, onCancel, onConsent }) => {
  if (!isOpen) return null;

  return (
    <ModalOverlay onClick={onCancel}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <IconWrapper>
          <img src={warningImg} alt="Warning" />
        </IconWrapper>
        <ModalTitle>Location Sharing Permission</ModalTitle>
        <ModalDescription>
          By enabling this feature, you consent to allow My Recipients to view
          your location only when a safety alert is initiated.
        </ModalDescription>
        <ButtonGroup>
          <CancelButton onClick={onCancel}>Cancel</CancelButton>
          <ConsentButton onClick={onConsent}>Consent</ConsentButton>
        </ButtonGroup>
      </ModalContent>
    </ModalOverlay>
  );
};

export default LocationSharingModal;
