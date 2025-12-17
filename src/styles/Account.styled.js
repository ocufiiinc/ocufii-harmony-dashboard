import styled from "styled-components";

export const AccountContainer = styled.div`
  width: 100%;
  padding: 24px;
`;

export const PageTitle = styled.h1`
  font-size: 24px;
  font-weight: 700;
  color: ${(props) => props.theme.colors.textPrimary};
  margin: 0 0 8px 0;
  font-family: "Decimal", sans-serif;
`;

export const BeaconDetailsLink = styled.a`
  display: inline-block;
  font-size: 14px;
  font-weight: 600;
  color: #2196f3;
  text-decoration: none;
  margin-bottom: 24px;
  font-family: "Decimal", sans-serif;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;

export const AccountCard = styled.div`
  display: grid;
  grid-template-columns: 280px 1fr;
  gap: 0;
  background: ${(props) => props.theme.colors.white};
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  min-height: 500px;
`;

export const LeftSection = styled.div`
  display: flex;
  flex-direction: column;
  background: ${(props) => props.theme.colors.background};
  border-right: 1px solid ${(props) => props.theme.colors.border};
  padding: 40px 24px;
  align-items: center;
`;

export const ProfileAvatarWrapper = styled.div`
  position: relative;
  margin-bottom: 16px;
`;

export const ProfileAvatar = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: #4caf50;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

export const AvatarPlaceholder = styled.div`
  width: 45px;
  height: 45px;
  background: #ffffff;
  border-radius: 50% 50% 0 0;
  position: relative;

  &::after {
    content: "";
    position: absolute;
    bottom: -25px;
    left: 50%;
    transform: translateX(-50%);
    width: 60px;
    height: 60px;
    background: #ffffff;
    border-radius: 50%;
  }
`;

export const UserName = styled.h2`
  font-size: 18px;
  font-weight: 700;
  color: ${(props) => props.theme.colors.textPrimary};
  margin: 0;
  font-family: "Decimal", sans-serif;
  text-align: center;
`;

export const RightSection = styled.div`
  display: flex;
  flex-direction: column;
  background: ${(props) => props.theme.colors.white};
`;

export const ProfileSection = styled.div`
  padding: 24px;
  flex: 1;
`;

export const SectionTitle = styled.div`
  font-size: 11px;
  font-weight: 600;
  color: ${(props) => props.theme.colors.textSecondary};
  letter-spacing: 0.5px;
  margin-bottom: 16px;
  font-family: "Decimal", sans-serif;
`;

export const ProfileList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0;
`;

export const ProfileItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 0;
  border-bottom: 1px solid ${(props) => props.theme.colors.border};
  cursor: pointer;
  transition: background 0.2s;

  &:hover {
    background: ${(props) => props.theme.colors.background};
    margin: 0 -16px;
    padding: 16px;
    border-radius: 8px;
  }

  &:last-child {
    border-bottom: none;
  }
`;

export const ProfileItemLeft = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export const ProfileItemTitle = styled.div`
  font-size: 14px;
  font-weight: 600;
  color: ${(props) => props.theme.colors.textPrimary};
  font-family: "Decimal", sans-serif;
`;

export const ProfileItemSubtitle = styled.div`
  font-size: 12px;
  color: ${(props) => props.theme.colors.textSecondary};
  font-family: "Decimal", sans-serif;
`;

export const ProfileItemRight = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  color: ${(props) => props.theme.colors.textSecondary};
  font-family: "Decimal", sans-serif;

  .arrow {
    color: ${(props) => props.theme.colors.textSecondary};
  }
`;

export const ActionButtons = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  padding: 24px;
  border-top: 1px solid ${(props) => props.theme.colors.border};
`;

export const CancelButton = styled.button`
  padding: 12px 24px;
  background: ${(props) => props.theme.colors.background};
  border: 1px solid ${(props) => props.theme.colors.border};
  border-radius: 8px;
  color: ${(props) => props.theme.colors.textPrimary};
  font-size: 14px;
  font-weight: 600;
  font-family: "Decimal", sans-serif;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background: ${(props) => props.theme.colors.border};
  }
`;

export const SaveButton = styled.button`
  padding: 12px 24px;
  background: #2196f3;
  border: none;
  border-radius: 8px;
  color: white;
  font-size: 14px;
  font-weight: 600;
  font-family: "Decimal", sans-serif;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background: #1976d2;
  }
`;

export const DeleteAccountSection = styled.div`
  padding: 24px;
  margin-top: auto;
`;

export const DeleteAccountButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  width: 100%;
  max-width: 200px;
  padding: 12px;
  background: transparent;
  border: 2px solid #f44336;
  border-radius: 8px;
  color: #f44336;
  font-size: 14px;
  font-weight: 600;
  font-family: "Decimal", sans-serif;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background: #f443361a;
  }

  img {
    width: 20px;
    height: 20px;
  }
`;
