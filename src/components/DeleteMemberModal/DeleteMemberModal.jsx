import React from "react";
import styled from "styled-components";
import warningIcon from "../../assets/images/warning.svg";
import {
  Overlay,
  Modal,
  Icon,
  Title,
  Message,
  Actions,
  Cancel,
  Delete,
} from "../../styles/DeleteMemberModal.styled";

const DeleteMemberModal = ({ isOpen, member, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <Overlay>
      <Modal
        role="dialog"
        aria-modal="true"
        aria-labelledby="delete-member-title"
      >
        <Icon>
          <img src={warningIcon} alt="Warning" />
        </Icon>

        <Title id="delete-member-title">DELETE MEMBER</Title>

        <Message>Are you sure you want to delete this member?</Message>

        <Actions>
          <Cancel onClick={onClose}>Cancel</Cancel>
          <Delete onClick={() => onConfirm(member?.id)}>Delete Member</Delete>
        </Actions>
      </Modal>
    </Overlay>
  );
};

export default DeleteMemberModal;
