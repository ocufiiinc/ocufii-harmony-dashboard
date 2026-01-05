import React, { useState } from "react";
import DashboardLayout from "../Layout/DashboardLayout";
import { useUser } from "../context/UserContext";
import UserProfile from "../components/Profile/UserProfile";
import ChangePassword from "../components/Profile/ChangePassword";
import deleteIcon from "../assets/images/delete.svg";
import {
  AccountContainer,
  PageTitle,
  BeaconDetailsLink,
  AccountCard,
  LeftSection,
  ProfileAvatarWrapper,
  ProfileAvatar,
  AvatarPlaceholder,
  UserName,
  DeleteAccountSection,
  DeleteAccountButton,
} from "../styles/Account.styled";
import { deleteUserAccount } from "../api/AccountApi";
import { useNavigate } from "react-router-dom";
import { ROUTE } from "../common/Routes";

const Account = () => {
  const { user } = useUser();
  const navigate = useNavigate();
  const [profileData, setProfileData] = useState({
    userName: user?.firstName
      ? `${user.firstName} ${user.lastName || ""}`
      : "John Doe",
    userEmail: user?.email || "johndoe@example.com",
  });

  const [showChangePassword, setShowChangePassword] = useState(false);

  const handleSave = (updatedProfileData) => {
    console.log("Saving profile data:", updatedProfileData);
    setProfileData(updatedProfileData);
    // Add your save logic here
  };

  const handleCancel = () => {
    console.log("Cancel changes");
    setShowChangePassword(false);
    // Add your cancel logic here
  };

  const handleChangePasswordClick = () => {
    setShowChangePassword(true);
  };

  const handleUpdatePassword = (passwordData) => {
    console.log("Updating password:", passwordData);
    setShowChangePassword(false);
    // Add your password update logic here
  };

  const handleDeleteAccount = async () => {
    const deleteConfirmed = await deleteUserAccount(profileData?.userEmail);
    if (deleteConfirmed) {
      navigate(ROUTE.LOGIN);
    }
  };

  return (
    <DashboardLayout>
      <AccountContainer>
        <PageTitle>Profile</PageTitle>

        <AccountCard>
          {/* Left Section - Profile Avatar */}
          <LeftSection>
            <ProfileAvatarWrapper>
              <ProfileAvatar>
                <AvatarPlaceholder />
              </ProfileAvatar>
            </ProfileAvatarWrapper>
            <UserName>{user?.name || "John Doe"}</UserName>

            <DeleteAccountSection>
              <DeleteAccountButton disabled onClick={handleDeleteAccount}>
                <img src={deleteIcon} alt="Delete" />
                Delete Account
              </DeleteAccountButton>
            </DeleteAccountSection>
          </LeftSection>

          {/* Right Section - User Profile Settings */}
          {showChangePassword ? (
            <ChangePassword
              onCancel={handleCancel}
              onUpdate={handleUpdatePassword}
            />
          ) : (
            <UserProfile
              profileData={profileData}
              onCancel={handleCancel}
              onSave={handleSave}
              onChangePasswordClick={handleChangePasswordClick}
            />
          )}
        </AccountCard>
      </AccountContainer>
    </DashboardLayout>
  );
};

export default Account;
