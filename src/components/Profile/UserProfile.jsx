import React, { useState } from "react";
import {
  RightSection,
  ProfileSection,
  SectionTitle,
  ProfileList,
  ProfileItem,
  ProfileItemLeft,
  ProfileItemTitle,
  ProfileItemSubtitle,
  ProfileItemRight,
  ActionButtons,
  CancelButton,
  SaveButton,
} from "../../styles/Account.styled";

const UserProfile = ({
  profileData,
  onCancel,
  onSave,
  onChangePasswordClick,
}) => {
  const [editingField, setEditingField] = useState(null);
  const [localProfileData, setLocalProfileData] = useState(profileData);

  const handleFieldClick = (fieldName) => {
    setEditingField(fieldName);
  };

  const handleInputChange = (fieldName, value) => {
    setLocalProfileData({
      ...localProfileData,
      [fieldName]: value,
    });
  };

  const handleInputBlur = () => {
    setEditingField(null);
  };

  const handleSave = () => {
    onSave(localProfileData);
  };

  return (
    <RightSection>
      <ProfileSection>
        <SectionTitle>USER PROFILE</SectionTitle>
        <ProfileList>
          <ProfileItem onClick={() => handleFieldClick("userName")}>
            <ProfileItemLeft>
              <ProfileItemTitle>User Name</ProfileItemTitle>
            </ProfileItemLeft>
            <ProfileItemRight>
              {editingField === "userName" ? (
                <input
                  type="text"
                  value={localProfileData.userName}
                  onChange={(e) =>
                    handleInputChange("userName", e.target.value)
                  }
                  onBlur={handleInputBlur}
                  autoFocus
                  placeholder="Enter Your Name"
                  style={{
                    border: "1px solid #ccc",
                    borderRadius: "4px",
                    padding: "8px 12px",
                    fontSize: "14px",
                    width: "250px",
                    outline: "none",
                  }}
                  onClick={(e) => e.stopPropagation()}
                />
              ) : (
                <>
                  {localProfileData.userName}
                  <span className="arrow">›</span>
                </>
              )}
            </ProfileItemRight>
          </ProfileItem>

          <ProfileItem onClick={() => handleFieldClick("userEmail")}>
            <ProfileItemLeft>
              <ProfileItemTitle>User Email</ProfileItemTitle>
              <ProfileItemSubtitle>Your email is your ID</ProfileItemSubtitle>
            </ProfileItemLeft>
            <ProfileItemRight>
              {editingField === "userEmail" ? (
                <input
                  type="email"
                  value={localProfileData.userEmail}
                  onChange={(e) =>
                    handleInputChange("userEmail", e.target.value)
                  }
                  onBlur={handleInputBlur}
                  autoFocus
                  style={{
                    border: "1px solid #ccc",
                    borderRadius: "4px",
                    padding: "8px 12px",
                    fontSize: "14px",
                    width: "250px",
                    outline: "none",
                  }}
                  onClick={(e) => e.stopPropagation()}
                />
              ) : (
                <>
                  {localProfileData.userEmail}
                  <span className="arrow">›</span>
                </>
              )}
            </ProfileItemRight>
          </ProfileItem>

          <ProfileItem onClick={onChangePasswordClick}>
            <ProfileItemLeft>
              <ProfileItemTitle>Change Password</ProfileItemTitle>
            </ProfileItemLeft>
            <ProfileItemRight>
              <span className="arrow">›</span>
            </ProfileItemRight>
          </ProfileItem>
        </ProfileList>
      </ProfileSection>

      <ActionButtons>
        <CancelButton onClick={onCancel}>Cancel</CancelButton>
        <SaveButton onClick={handleSave}>Save Changes</SaveButton>
      </ActionButtons>
    </RightSection>
  );
};

export default UserProfile;
