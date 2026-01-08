import styled from "styled-components";

export const SettingsContainer = styled.div`
  width: 100%;
  padding: 24px;
`;

export const SettingsHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
`;

export const PageTitle = styled.h1`
  font-size: 24px;
  font-weight: 700;
  color: ${(props) => props.theme.colors.textPrimary};
  margin: 0;
  font-family: "Decimal", sans-serif;
`;

export const LanguageSection = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

export const LanguageIcon = styled.span`
  font-size: 14px;
  color: ${(props) => props.theme.colors.textSecondary};
  display: flex;
  align-items: center;
  gap: 4px;
  font-family: "Decimal", sans-serif;

  img {
    width: 20px;
  }
`;

export const LanguageSelect = styled.select`
  padding: 8px 32px 8px 12px;
  border: 1px solid ${(props) => props.theme.colors.border};
  border-radius: 6px;
  font-size: 14px;
  font-family: "Decimal", sans-serif;
  color: ${(props) => props.theme.colors.textPrimary};
  background: ${(props) => props.theme.colors.white};
  cursor: pointer;
  outline: none;

  &:focus {
    border-color: #2196f3;
  }
`;

export const SettingsCard = styled.div`
  background: ${(props) => props.theme.colors.white};
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  padding: 32px;
`;

export const SettingsSection = styled.div`
  margin-bottom: 32px;

  &:last-child {
    margin-bottom: 0;
  }
`;

export const SectionTitle = styled.div`
  font-size: 11px;
  font-weight: 600;
  color: ${(props) => props.theme.colors.textSecondary};
  letter-spacing: 0.5px;
  margin-bottom: 16px;
  font-family: "Decimal", sans-serif;
  text-transform: uppercase;
  background: ${(props) => props.theme.colors.background};
  padding: 8px 12px;
  border-radius: 6px;
`;

export const SettingItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 20px;
  background: ${(props) => props.theme.colors.background};
  border-radius: 8px;
  margin-bottom: 12px;

  &:last-child {
    margin-bottom: 0;
  }
`;

export const SettingLabel = styled.div`
  font-size: 14px;
  font-weight: 600;
  color: ${(props) => props.theme.colors.textPrimary};
  font-family: "Decimal", sans-serif;
`;

export const AutoLogoutDescription = styled.p`
  font-size: 13px;
  color: ${(props) => props.theme.colors.textSecondary};
  margin: 8px 0 16px 0;
  font-family: "Decimal", sans-serif;
  line-height: 1.5;
`;

export const RadioGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-top: 16px;
`;

export const RadioOption = styled.label`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  border-radius: 8px;
  cursor: pointer;
  transition: background 0.2s;
  font-family: "Decimal", sans-serif;

  &:hover {
    background: ${(props) => props.theme.colors.background};
  }

  &:has(input:disabled) {
    cursor: not-allowed;
  }
`;

export const RadioInput = styled.input`
  width: 20px;
  height: 20px;
  cursor: pointer;
  accent-color: #ff9800;

  &:disabled {
    cursor: not-allowed;
  }

  &:disabled:not(:checked) {
    opacity: 0.5;
    accent-color: #d3d3d3;
  }
`;

export const RadioLabel = styled.span`
  font-size: 14px;
  color: ${(props) => props.theme.colors.textPrimary};
  font-family: "Decimal", sans-serif;
`;
