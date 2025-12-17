import styled from "styled-components";

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
`;

export const ModalContainer = styled.div`
  background: white;
  border-radius: 16px;
  width: 90%;
  max-width: 650px;
  max-height: 85vh;
  overflow-y: auto;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
`;

export const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 24px 32px;
  border-bottom: 1px solid #e0e0e0;

  span {
    font-size: 24px;
    font-weight: 400;
    color: #1a1a1a;
  }
`;

export const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 32px;
  color: #666;
  cursor: pointer;
  padding: 0;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: color 0.2s;

  &:hover {
    color: #1a1a1a;
  }
`;

export const AlertInfo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 24px 32px 16px;
`;

export const AlertName = styled.div`
  font-size: 18px;
  font-weight: 600;
  color: #1a1a1a;
`;

export const AlertDateTime = styled.div`
  display: flex;
  gap: 24px;
  align-items: center;
`;

export const AlertDate = styled.div`
  font-size: 16px;
  color: #666;
`;

export const AlertTime = styled.div`
  font-size: 16px;
  color: #666;
`;

export const StatusBadge = styled.div`
  padding: 4px 12px;
  border-radius: 12px;
  font-size: 13px;
  font-weight: 500;
  background: ${(props) => {
    switch (props.status) {
      case 1:
        return "linear-gradient(135deg, #4FC3F7, #00B0FF)";
      case 2:
        return "linear-gradient(135deg, #FFB74D, #FF9800)";
      case 3:
        return "linear-gradient(135deg, #81C784, #66BB6A)";
      default:
        return "linear-gradient(135deg, #E0E0E0, #BDBDBD)";
    }
  }};
  color: white;
`;

export const NotesSection = styled.div`
  padding: 0 32px 24px;
`;

export const NotesLabel = styled.div`
  font-size: 18px;
  font-weight: 600;
  color: #ff9800;
  margin-bottom: 16px;
`;

export const NotesList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-bottom: 16px;
`;

export const NoteItem = styled.div`
  background: #f8f9fa;
  border-radius: 8px;
  padding: 16px;
`;

export const NoteHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
`;

export const NoteAuthorInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export const NoteAuthorName = styled.div`
  font-size: 16px;
  font-weight: 600;
  color: #1a1a1a;
`;

export const NoteTimestamp = styled.div`
  font-size: 14px;
  color: #666;
`;

export const NoteText = styled.div`
  font-size: 14px;
  color: #666;
  line-height: 1.5;
`;

export const NoteInputContainer = styled.div`
  margin-top: 16px;
`;

export const NoteTextarea = styled.textarea`
  width: 100%;
  min-height: 100px;
  padding: 12px;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  font-size: 14px;
  font-family: inherit;
  resize: vertical;

  &:focus {
    outline: none;
    border-color: #00b3df;
  }

  &::placeholder {
    color: #999;
  }
`;

export const ActionButtons = styled.div`
  display: flex;
  gap: 16px;
  padding: 24px 32px;
  justify-content: center;
  border-top: 1px solid #e0e0e0;
`;

export const AcknowledgeButton = styled.button`
  padding: 12px 40px;
  border: 2px solid #00b3df;
  background: rgba(0, 179, 223, 0.1);
  color: #00b3df;
  font-size: 16px;
  font-weight: 600;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s;

  &:hover:not(:disabled) {
    background: #00b3df;
    color: white;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export const ResolvedButton = styled.button`
  padding: 12px 40px;
  border: 2px solid #66bb6a;
  background: rgba(102, 187, 106, 0.1);
  color: #66bb6a;
  font-size: 16px;
  font-weight: 600;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s;

  &:hover:not(:disabled) {
    background: #57a95b;
    border-color: #57a95b;
    color: white;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;
