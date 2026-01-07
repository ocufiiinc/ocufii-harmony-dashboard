import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "../Layout/DashboardLayout";
import { DashboardContent } from "../styles/Dashboard.styled";
import { MdChevronRight, MdInfo } from "react-icons/md";
import PersonalSafetyModal from "../components/PersonalSafetyModal";
import {
  SafetyContainer,
  PageTitle,
  ServiceCard,
  ServiceLeft,
  InfoIcon,
  ServiceText,
  StatusBadge,
  OptionItem,
  OptionText,
  AlertSection,
  AlertHeader,
  AlertRight,
  AlertTitle,
  AlertTitleText,
  AlertDescription,
  InfoText,
  ManageContactsCard,
  SectionTitle,
  SectionDescription,
  ContactSection,
  ContactLeft,
  ContactTitle,
  ContactDescription,
  ManageButton,
  NameEditCard,
  NameEditRow,
  NameEditLeft,
  NameEditTitle,
  NameEditDescription,
  NameInputWrapper,
  NameInput,
  NameEditArrow,
  NameSubtext,
} from "../styles/PersonalSafety.styled";
import { ROUTE } from "../common/Routes";
import { useUser } from "../context/UserContext";

const PersonalSafetyService = () => {
  const navigate = useNavigate();
  const { user } = useUser();
  const [isEditingName, setIsEditingName] = useState(false);
  const [userName, setUserName] = useState(user?.firstName || "");
  const [showNameMessage, setShowNameMessage] = useState(false);
  const [showPersonalModal, setShowPersonalModal] = useState(false);
  const [showProfessionalModal, setShowProfessionalModal] = useState(false);

  const handleChangeName = () => {
    setIsEditingName(true);
    setShowNameMessage(false);
  };

  const handleNameChange = (e) => {
    setUserName(e.target.value);
  };

  const handleNameComplete = () => {
    if (userName.trim()) {
      setIsEditingName(false);
      setShowNameMessage(true);
      // Optionally save to backend here
      console.log("Name changed to:", userName);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleNameComplete();
    }
  };

  const handleManageRecipients = () => {
    navigate(ROUTE.RECIPIENTS);
  };

  const handleManageSafetyNetwork = () => {
    navigate(ROUTE.SAFETY_NETWORK);
  };

  return (
    <DashboardLayout>
      <DashboardContent>
        <SafetyContainer>
          <PageTitle>Personal Safety Alert Service</PageTitle>

          {/* Service Status Card */}
          <ServiceCard>
            <ServiceLeft>
              <ServiceText>Personal Safety Alert Service</ServiceText>
            </ServiceLeft>
            <StatusBadge>ACTIVE</StatusBadge>
          </ServiceCard>

          {/* Change Name Option */}
          {!isEditingName ? (
            <>
              <OptionItem onClick={handleChangeName}>
                <OptionText>
                  Change Your Name
                  {showNameMessage && userName && (
                    <NameSubtext>
                      Your name will appear as "{userName}" on any safety alerts
                      sent to recipients.
                    </NameSubtext>
                  )}
                </OptionText>
                <MdChevronRight size={24} color="#6c757d" />
              </OptionItem>
            </>
          ) : (
            <NameEditCard>
              <NameEditRow>
                <NameEditLeft>
                  <NameEditTitle>Enter Your Name</NameEditTitle>
                  <NameEditDescription>
                    Your name is required so recipients can identify who is
                    requesting help during a safety alert.
                  </NameEditDescription>
                </NameEditLeft>
                <NameInputWrapper>
                  <NameInput
                    type="text"
                    placeholder="Enter Your Name"
                    value={userName}
                    onChange={handleNameChange}
                    onKeyDown={handleKeyDown}
                    autoFocus
                  />
                  <NameEditArrow>
                    <MdChevronRight size={24} color="#6c757d" />
                  </NameEditArrow>
                </NameInputWrapper>
              </NameEditRow>
            </NameEditCard>
          )}

          {/* Personal Monitored Safety Alerts - People */}
          <AlertSection style={{ cursor: "pointer" }}>
            <AlertHeader>
              <AlertTitle>
                <AlertTitleText>
                  Personal Monitored Safety Alerts
                </AlertTitleText>
              </AlertTitle>
              <AlertRight>
                <InfoIcon onClick={() => setShowPersonalModal(true)}>
                  <MdInfo />
                </InfoIcon>
                <MdChevronRight size={24} color="#6c757d" />
              </AlertRight>
            </AlertHeader>
            <AlertDescription>
              Monitored by people you invite to assist you.
            </AlertDescription>
          </AlertSection>

          {/* Professional Monitored Safety Alerts - Dispatch */}
          <AlertSection style={{ cursor: "pointer" }}>
            <AlertHeader>
              <AlertTitle>
                <AlertTitleText>
                  Professional Monitored Safety Alerts
                </AlertTitleText>
              </AlertTitle>
              <AlertRight>
                <InfoIcon onClick={() => setShowProfessionalModal(true)}>
                  <MdInfo />
                </InfoIcon>
                <MdChevronRight size={24} color="#6c757d" />
              </AlertRight>
            </AlertHeader>
            <AlertDescription>
              Monitored by a dispatch center when you upgrade.
            </AlertDescription>
          </AlertSection>

          {/* Info Text */}
          <InfoText>
            To enable professional monitored safety alerts, go to{" "}
            <a href="#subscriptions">Manage Your Subscriptions</a> and purchase
            Professional Monitoring Service under Service Upgrades.
          </InfoText>

          {/* Manage Monitoring Contacts Section */}
          <ManageContactsCard>
            <SectionTitle>Manage Monitoring Contacts</SectionTitle>
            <SectionDescription>
              Click one of the buttons below to add or remove trusted contacts
              who can receive your real-time safety alerts when you need help.
            </SectionDescription>

            {/* Recipients */}
            <ContactSection>
              <ContactLeft>
                <ContactTitle>Recipients</ContactTitle>
                <ContactDescription>
                  People using the NotifyMe app who receive your alerts.
                </ContactDescription>
              </ContactLeft>
              <ManageButton onClick={handleManageRecipients}>
                Manage My Recipients
              </ManageButton>
            </ContactSection>

            {/* Members */}
            <ContactSection>
              <ContactLeft>
                <ContactTitle>Members</ContactTitle>
                <ContactDescription>
                  Ocufii account holders linked to your account who can monitor
                  alerts.
                </ContactDescription>
              </ContactLeft>
              <ManageButton onClick={handleManageSafetyNetwork}>
                Manage My Safety Network
              </ManageButton>
            </ContactSection>
          </ManageContactsCard>
        </SafetyContainer>
      </DashboardContent>

      {/* Modals */}
      <PersonalSafetyModal
        isOpen={showPersonalModal}
        onClose={() => setShowPersonalModal(false)}
        isProfessional={false}
      />
      <PersonalSafetyModal
        isOpen={showProfessionalModal}
        onClose={() => setShowProfessionalModal(false)}
        isProfessional={true}
      />
    </DashboardLayout>
  );
};

export default PersonalSafetyService;
