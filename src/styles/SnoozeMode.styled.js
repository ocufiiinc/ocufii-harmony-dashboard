import styled from "styled-components";

export const SnoozeContainer = styled.div`
  padding: 24px 0;
`;

export const SnoozeCard = styled.div`
  background: #fff3e0;
  border-radius: 12px;
  padding: 48px 32px;
  text-align: center;
  margin-bottom: 32px;
`;

export const SnoozeIcon = styled.div`
  margin-bottom: 24px;
  display: flex;
  justify-content: center;
`;

export const SnoozeTitle = styled.h3`
  font-size: 20px;
  font-weight: 600;
  color: #333;
  margin-bottom: 8px;
  font-family: "Decimal", sans-serif;
`;

export const SnoozeTime = styled.div`
  font-size: 24px;
  font-weight: 600;
  color: #ff9800;
  margin-bottom: 8px;
  font-family: "Decimal", sans-serif;
`;

export const SnoozeSubtitle = styled.div`
  font-size: 14px;
  color: #ff9800;
  font-family: "Decimal", sans-serif;
`;

export const TimePickerContainer = styled.div`
  background: #ffffff;
  border: 1px solid #e0e0e0;
  border-radius: 12px;
  padding: 48px 32px;
  display: flex;
  justify-content: center;
  gap: 48px;
  margin-bottom: 32px;
`;

export const TimeColumn = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
`;

export const TimeValue = styled.input`
  font-size: 48px;
  font-weight: 600;
  color: #333;
  font-family: "Decimal", sans-serif;
  width: 120px;
  text-align: center;
  border: none;
  background: transparent;
  outline: none;

  /* Hide number input arrows */
  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  &[type="number"] {
    -moz-appearance: textfield;
  }
`;

export const TimeLabel = styled.div`
  font-size: 16px;
  color: #666;
  font-weight: 500;
  font-family: "Decimal", sans-serif;
`;

export const SnoozeButtons = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 16px;
  padding-top: 24px;
  border-top: 1px solid #e0e0e0;
`;

export const BackButton = styled.button`
  background: #6c757d;
  color: white;
  border: none;
  border-radius: 8px;
  padding: 12px 32px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  font-family: "Decimal", sans-serif;
  transition: background 0.2s;

  &:hover {
    background: #5a6268;
  }
`;

export const SnoozeActionButton = styled.button`
  background: ${(props) => (props.cancel ? "#dc3545" : "#28a745")};
  color: white;
  border: none;
  border-radius: 8px;
  padding: 12px 24px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  font-family: "Decimal", sans-serif;
  display: flex;
  align-items: center;
  transition: background 0.2s;

  &:hover {
    background: ${(props) => (props.cancel ? "#c82333" : "#218838")};
  }

  svg {
    flex-shrink: 0;
  }
`;
