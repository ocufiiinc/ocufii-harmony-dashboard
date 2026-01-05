import React, { useState } from "react";
import {
  RightSection,
  ProfileSection,
  SectionTitle,
  ActionButtons,
  CancelButton,
  SaveButton,
} from "../../styles/Account.styled";
import {
  ChangePasswordContainer,
  ChangePasswordTitle,
  ChangePasswordSubtitle,
  PasswordFormGroup,
  PasswordLabel,
  PasswordInput,
} from "../../styles/ChangePassword.styled";

const ChangePassword = ({ onCancel, onUpdate }) => {
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleInputChange = (field, value) => {
    setPasswordData({
      ...passwordData,
      [field]: value,
    });
  };

  const handleUpdate = () => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      alert("New password and confirm password do not match");
      return;
    }
    onUpdate(passwordData);
  };

  return (
    <RightSection>
      <ProfileSection>
        <SectionTitle>CHANGE PASSWORD</SectionTitle>
        <ChangePasswordContainer>
          <ChangePasswordTitle>Change Your Password</ChangePasswordTitle>
          <ChangePasswordSubtitle>
            Enter your new password, then Click "Change Password" to proceed.
          </ChangePasswordSubtitle>

          <PasswordFormGroup>
            <PasswordLabel>Current Password:</PasswordLabel>
            <PasswordInput
              type="password"
              placeholder="Enter Your Current Password"
              value={passwordData.currentPassword}
              onChange={(e) =>
                handleInputChange("currentPassword", e.target.value)
              }
            />
          </PasswordFormGroup>

          <PasswordFormGroup>
            <PasswordLabel>New Password:</PasswordLabel>
            <PasswordInput
              type="password"
              placeholder="Enter Your New Password"
              value={passwordData.newPassword}
              onChange={(e) => handleInputChange("newPassword", e.target.value)}
            />
          </PasswordFormGroup>

          <PasswordFormGroup>
            <PasswordLabel>Confirm Password:</PasswordLabel>
            <PasswordInput
              type="password"
              placeholder="Confirm Your New Password"
              value={passwordData.confirmPassword}
              onChange={(e) =>
                handleInputChange("confirmPassword", e.target.value)
              }
            />
          </PasswordFormGroup>
        </ChangePasswordContainer>
      </ProfileSection>

      <ActionButtons>
        <CancelButton onClick={onCancel}>Cancel</CancelButton>
        <SaveButton disabled onClick={handleUpdate}>
          Update Password
        </SaveButton>
      </ActionButtons>
    </RightSection>
  );
};

export default ChangePassword;
