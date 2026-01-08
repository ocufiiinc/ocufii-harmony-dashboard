import React, { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import DashboardLayout from "../Layout/DashboardLayout";
import Switch from "react-ios-switch";
import { useUser } from "../context/UserContext";
import { getUserSettings } from "../api/SettingsApi";
import {
  SettingsContainer,
  SettingsHeader,
  PageTitle,
  LanguageSection,
  LanguageIcon,
  LanguageSelect,
  SettingsCard,
  SettingsSection,
  SectionTitle,
  SettingItem,
  SettingLabel,
  AutoLogoutDescription,
  RadioGroup,
  RadioOption,
  RadioInput,
  RadioLabel,
} from "../styles/Settings.styled";
import LanguageImg from "../assets/images/language.png";

const Settings = () => {
  const { user } = useUser();
  const [language, setLanguage] = useState("English");
  const [notifications, setNotifications] = useState({
    urgentBeaconMovementSound: true,
    defaultTone: true,
    fireAlarm: false,
    emergencyAlarm: false,
    urgentBeaconMovementVibration: true,
  });
  const [autoLogout, setAutoLogout] = useState(true);
  const [logoutTime, setLogoutTime] = useState("5");

  // Fetch user settings
  const { data: userSettingsData } = useQuery({
    queryKey: ["userSettings", user?.email],
    queryFn: () => getUserSettings(user?.email),
    enabled: !!user?.email,
    refetchInterval: 60000,
    staleTime: 30000,
  });

  // Update state when API data is loaded
  useEffect(() => {
    if (userSettingsData?.data) {
      const settings = userSettingsData.data;

      // Update auto logout settings
      setAutoLogout(settings.autoLogout === "1");
      if (settings.autoLogoutInterval) {
        setLogoutTime(settings.autoLogoutInterval);
      }

      // Update notification settings
      setNotifications((prev) => ({
        ...prev,
        urgentBeaconMovementSound: settings.movementSound === "1",
        defaultTone: settings.sound === "DEFAULT" || settings.sound === null,
        fireAlarm: settings.sound === "FIRE",
        emergencyAlarm: settings.sound === "EMERGENCY",
        urgentBeaconMovementVibration:
          settings.movementVibration === "1" ||
          settings.movementVibration === true,
      }));
    }
  }, [userSettingsData]);

  const handleNotificationToggle = (key) => {
    setNotifications({
      ...notifications,
      [key]: !notifications[key],
    });
  };

  return (
    <DashboardLayout>
      <SettingsContainer>
        <SettingsHeader>
          <PageTitle>Settings</PageTitle>
          <LanguageSection>
            <LanguageIcon>
              <img src={LanguageImg} alt="Language" />
              Language:
            </LanguageIcon>
            <LanguageSelect
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
            >
              <option value="English">English</option>
            </LanguageSelect>
          </LanguageSection>
        </SettingsHeader>

        <SettingsCard>
          {/* Notifications: Sound */}
          <SettingsSection>
            <SectionTitle>NOTIFICATIONS: (SOUND)</SectionTitle>
            <SettingItem>
              <SettingLabel>Urgent: Beacon Movement</SettingLabel>
              <Switch
                checked={notifications.urgentBeaconMovementSound}
                onChange={() =>
                  handleNotificationToggle("urgentBeaconMovementSound")
                }
                onColor="rgb(76, 217, 100)"
                disabled={true}
              />
            </SettingItem>
          </SettingsSection>

          {/* Notifications: Tone */}
          <SettingsSection>
            <SectionTitle>NOTIFICATIONS: (TONE)</SectionTitle>
            <SettingItem>
              <SettingLabel>Default</SettingLabel>
              <Switch
                checked={notifications.defaultTone}
                onChange={() => handleNotificationToggle("defaultTone")}
                onColor="rgb(76, 217, 100)"
                disabled={true}
              />
            </SettingItem>
            <SettingItem>
              <SettingLabel>Fire Alarm</SettingLabel>
              <Switch
                checked={notifications.fireAlarm}
                onChange={() => handleNotificationToggle("fireAlarm")}
                onColor="rgb(76, 217, 100)"
                disabled={true}
              />
            </SettingItem>
            <SettingItem>
              <SettingLabel>Emergency Alarm</SettingLabel>
              <Switch
                checked={notifications.emergencyAlarm}
                onChange={() => handleNotificationToggle("emergencyAlarm")}
                onColor="rgb(76, 217, 100)"
                disabled={true}
              />
            </SettingItem>
          </SettingsSection>

          {/* Notifications: Vibration */}
          <SettingsSection>
            <SectionTitle>NOTIFICATIONS: (VIBRATION)</SectionTitle>
            <SettingItem>
              <SettingLabel>Urgent: Beacon Movement</SettingLabel>
              <Switch
                checked={notifications.urgentBeaconMovementVibration}
                onChange={() =>
                  handleNotificationToggle("urgentBeaconMovementVibration")
                }
                onColor="rgb(76, 217, 100)"
                disabled={true}
              />
            </SettingItem>
          </SettingsSection>

          {/* Auto Logout */}
          <SettingsSection>
            <SettingItem>
              <SettingLabel>AUTO LOGOUT</SettingLabel>
              <Switch
                checked={autoLogout}
                onChange={() => setAutoLogout(!autoLogout)}
                onColor="rgb(76, 217, 100)"
                disabled={true}
              />
            </SettingItem>
            <AutoLogoutDescription>
              Enabling this feature will automatically log you out of the app
              after 5, 10, or 15 minutes of inactivity.
            </AutoLogoutDescription>
            {autoLogout && (
              <RadioGroup>
                <RadioOption>
                  <RadioInput
                    type="radio"
                    name="logoutTime"
                    value="5"
                    checked={logoutTime === "5"}
                    onChange={(e) => setLogoutTime(e.target.value)}
                    disabled={true}
                  />
                  <RadioLabel>5 Minutes</RadioLabel>
                </RadioOption>
                <RadioOption>
                  <RadioInput
                    type="radio"
                    name="logoutTime"
                    value="10"
                    checked={logoutTime === "10"}
                    onChange={(e) => setLogoutTime(e.target.value)}
                    disabled={true}
                  />
                  <RadioLabel>10 Minutes</RadioLabel>
                </RadioOption>
                <RadioOption>
                  <RadioInput
                    type="radio"
                    name="logoutTime"
                    value="15"
                    checked={logoutTime === "15"}
                    onChange={(e) => setLogoutTime(e.target.value)}
                    disabled={true}
                  />
                  <RadioLabel>15 Minutes</RadioLabel>
                </RadioOption>
              </RadioGroup>
            )}
          </SettingsSection>
        </SettingsCard>
      </SettingsContainer>
    </DashboardLayout>
  );
};

export default Settings;
