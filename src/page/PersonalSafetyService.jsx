import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import DashboardLayout from "../Layout/DashboardLayout";
import { DashboardContent } from "../styles/Dashboard.styled";
import { MdChevronRight, MdInfo } from "react-icons/md";
import Switch from "react-ios-switch";
import PersonalSafetyModal from "../components/PersonalSafetyModal";
import AlertButtonsSettings from "../components/AlertButtonsSettings/AlertButtonsSettings";
import {
  SafetyContainer,
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
import { getUserSettings } from "../api/SettingsApi";
import ProfessionalSafetyButton from "../components/AlertButtonsSettings/ProfessionalSafetyButton";
import { PageTitle } from "../styles/SafetyNetwork.styled";

const PersonalSafetyService = () => {
  const navigate = useNavigate();
  const { user } = useUser();
  const [isEditingName, setIsEditingName] = useState(false);
  const [userName, setUserName] = useState(user?.firstName || "");
  const [showNameMessage, setShowNameMessage] = useState(false);
  const [showPersonalModal, setShowPersonalModal] = useState(false);
  const [showProfessionalModal, setShowProfessionalModal] = useState(false);
  const [isPersonalAlertsOpen, setIsPersonalAlertsOpen] = useState(false);
  const [isProfessionalAlertsOpen, setIsProfessionalAlertsOpen] =
    useState(false);
  const [alertSettings, setAlertSettings] = useState({
    autoDial911: false,
    autoDial988: false,
    emergency: false,
    activeShooter: false,
    feelingUnsafe: false,
  });
  const [professionalAlertSettings, setProfessionalAlertSettings] = useState({
    police: false,
    medicalService: false,
    fire: false,
    activeShooter: false,
    feelingUnsafe: false,
  });

  // Fetch user settings
  const { data: userSettingsData } = useQuery({
    queryKey: ["userSettings", user?.email],
    queryFn: () => getUserSettings(user?.email),
    enabled: !!user?.email,
    refetchInterval: 60000,
    staleTime: 30000,
  });

  // Parse and update alert settings from API
  useEffect(() => {
    if (userSettingsData?.data) {
      const settings = userSettingsData.data;
      console.log("settings", settings);

      try {
        // Parse personal alert settings
        const emergency911 = settings.emergency911
          ? JSON.parse(settings.emergency911)
          : {};
        const emergency988 = settings.emergency988
          ? JSON.parse(settings.emergency988)
          : {};
        const emergency = settings.emergency
          ? JSON.parse(settings.emergency)
          : {};
        const activeShooter = settings.activeShooter
          ? JSON.parse(settings.activeShooter)
          : {};
        const distress = settings.distress ? JSON.parse(settings.distress) : {};

        setAlertSettings({
          autoDial911: emergency911.isEnabled || false,
          autoDial988: emergency988.isEnabled || false,
          emergency: emergency.isEnabled || false,
          activeShooter: activeShooter.isEnabled || false,
          feelingUnsafe: distress.isEnabled || false,
        });

        // Parse professional alert settings
        const police = settings.police ? JSON.parse(settings.police) : {};
        const emergencyMedicalService = settings.emergencyMedicalService
          ? JSON.parse(settings.emergencyMedicalService)
          : {};
        const fireDepartment = settings.fireDepartment
          ? JSON.parse(settings.fireDepartment)
          : {};
        const proActiveShooter = settings.proActiveShooter
          ? JSON.parse(settings.proActiveShooter)
          : {};
        const proFeelingUnsafe = settings.proFeelingUnsafe
          ? JSON.parse(settings.proFeelingUnsafe)
          : {};

        setProfessionalAlertSettings({
          police: police.isEnabled || false,
          medicalService: emergencyMedicalService.isEnabled || false,
          fire: fireDepartment.isEnabled || false,
          activeShooter: proActiveShooter.isEnabled || false,
          feelingUnsafe: proFeelingUnsafe.isEnabled || false,
        });
      } catch (error) {
        console.error("Error parsing alert settings:", error);
      }
    }
  }, [userSettingsData]);

  const handleAlertToggle = (key) => {
    setAlertSettings({
      ...alertSettings,
      [key]: !alertSettings[key],
    });
    // TODO: Implement API call to update settings
    console.log(`Toggle ${key} to ${!alertSettings[key]}`);
  };

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
            <AlertHeader
              onClick={() => setIsPersonalAlertsOpen(!isPersonalAlertsOpen)}
            >
              <AlertTitle>
                <AlertTitleText>
                  Personal Monitored Safety Alerts
                </AlertTitleText>
              </AlertTitle>
              <AlertRight>
                <InfoIcon
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowPersonalModal(true);
                  }}
                >
                  <MdInfo />
                </InfoIcon>
                <MdChevronRight
                  size={24}
                  color="#6c757d"
                  style={{
                    transform: isPersonalAlertsOpen
                      ? "rotate(90deg)"
                      : "rotate(0deg)",
                    transition: "transform 0.3s ease",
                  }}
                />
              </AlertRight>
            </AlertHeader>
            <AlertDescription>
              Monitored by people you invite to assist you.
            </AlertDescription>

            {isPersonalAlertsOpen && (
              <AlertButtonsSettings
                alertSettings={alertSettings}
                onToggle={handleAlertToggle}
                settingsData={userSettingsData?.data}
              />
            )}
          </AlertSection>

          {/* Professional Monitored Safety Alerts - Dispatch */}
          <AlertSection style={{ cursor: "pointer" }}>
            <AlertHeader
              onClick={() =>
                setIsProfessionalAlertsOpen(!isProfessionalAlertsOpen)
              }
            >
              <AlertTitle>
                <AlertTitleText>
                  Professional Monitored Safety Alerts
                </AlertTitleText>
              </AlertTitle>
              <AlertRight>
                <InfoIcon onClick={() => setShowProfessionalModal(true)}>
                  <MdInfo />
                </InfoIcon>
                <MdChevronRight
                  size={24}
                  color="#6c757d"
                  style={{
                    transform: isProfessionalAlertsOpen
                      ? "rotate(90deg)"
                      : "rotate(0deg)",
                    transition: "transform 0.3s ease",
                  }}
                />
              </AlertRight>
            </AlertHeader>
            <AlertDescription>
              Monitored by a dispatch center when you upgrade.
            </AlertDescription>
            {isProfessionalAlertsOpen && (
              <ProfessionalSafetyButton
                alertSettings={professionalAlertSettings}
                onToggle={handleAlertToggle}
                settingsData={userSettingsData?.data}
              />
            )}
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
