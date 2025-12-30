import React, { useMemo } from "react";
import {
  RightSection,
  DeleteConfirmationContainer,
  DeleteConfirmationIcon,
  DeleteConfirmationTitle,
  DeleteConfirmationText,
  DeleteConfirmationQuestion,
  ActionButtons,
  CancelButton,
  DeleteConfirmButton,
} from "../../styles/DeviceDetails.styled";
import warningIcon from "../../assets/images/warning.svg";
import deleteIcon from "../../assets/images/delete.svg";

const DeleteDevice = ({ deviceType, deviceName, onCancel, onConfirm }) => {
  const message = useMemo(() => {
    switch ((deviceType || "").toLowerCase()) {
      case "hub":
        return `Once deleted, associated beacons will no longer be able to communicate, and you will stop receiving notifications from them.`;
      case "beacon":
        return `Once deleted, you will stop receiving notifications fom this beacon.`;
      case "lock":
        return `Once deleted, you will stop receiving notifications fom this lock.`;
      case "card":
        return `Once deleted, you will stop receiving notifications fom this safety card.`;
      default:
        return `Once deleted, you will stop receiving notifications fom this flexiband.`;
    }
  }, [deviceType]);

  return (
    <RightSection>
      <DeleteConfirmationContainer>
        <DeleteConfirmationIcon>
          <img src={warningIcon} alt="Warning" />
        </DeleteConfirmationIcon>

        <DeleteConfirmationTitle>
          YOU ARE ABOUT TO DELETE THIS {deviceType.toUpperCase()} FROM YOUR
          ACCOUNT
        </DeleteConfirmationTitle>

        <DeleteConfirmationText>{message}</DeleteConfirmationText>

        <DeleteConfirmationQuestion>
          Are you sure you want to proceed with deleting this {deviceType}?
        </DeleteConfirmationQuestion>

        <ActionButtons>
          <CancelButton onClick={onCancel}>Cancel</CancelButton>
          <DeleteConfirmButton onClick={onConfirm}>
            <img src={deleteIcon} alt="Delete" />
            Delete {deviceType}
          </DeleteConfirmButton>
        </ActionButtons>
      </DeleteConfirmationContainer>
    </RightSection>
  );
};

export default DeleteDevice;
