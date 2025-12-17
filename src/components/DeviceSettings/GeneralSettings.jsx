import React, { useState } from "react";
import {
  RightSection,
  SettingsSection,
  SectionTitle,
  SettingsList,
  SettingItem,
  SettingItemLeft,
  SettingItemTitle,
  SettingItemSubtitle,
  SettingItemRight,
  ActionButtons,
  CancelButton,
  SaveButton,
} from "../../styles/DeviceDetails.styled";

const GeneralSettings = ({
  deviceType,
  formData,
  deviceData,
  onCancel,
  onSave,
  onBeaconsClick,
}) => {
  const [editingField, setEditingField] = useState(null);
  const [localFormData, setLocalFormData] = useState(formData);

  const handleFieldClick = (fieldName) => {
    setEditingField(fieldName);
  };

  const handleInputChange = (fieldName, value) => {
    setLocalFormData({
      ...localFormData,
      [fieldName]: value,
    });
  };

  const handleInputBlur = () => {
    setEditingField(null);
  };

  const handleSave = () => {
    onSave(localFormData);
  };

  return (
    <RightSection>
      <SettingsSection>
        <SectionTitle>GENERAL SETTINGS</SectionTitle>
        <SettingsList>
          <SettingItem onClick={() => handleFieldClick("name")}>
            <SettingItemLeft>
              <SettingItemTitle>{deviceType} Name</SettingItemTitle>
              <SettingItemSubtitle>
                Enter {deviceType.toLowerCase()}'s name
              </SettingItemSubtitle>
            </SettingItemLeft>
            <SettingItemRight>
              {editingField === "name" ? (
                <input
                  type="text"
                  value={localFormData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  onBlur={handleInputBlur}
                  autoFocus
                  style={{
                    border: "1px solid #ccc",
                    borderRadius: "4px",
                    padding: "8px 12px",
                    fontSize: "14px",
                    width: "200px",
                    outline: "none",
                  }}
                  onClick={(e) => e.stopPropagation()}
                />
              ) : (
                <>
                  {localFormData.name}
                  <span className="arrow">›</span>
                </>
              )}
            </SettingItemRight>
          </SettingItem>

          <SettingItem onClick={() => handleFieldClick("location")}>
            <SettingItemLeft>
              <SettingItemTitle>{deviceType} Location</SettingItemTitle>
              <SettingItemSubtitle>
                Enter {deviceType.toLowerCase()}'s location
              </SettingItemSubtitle>
            </SettingItemLeft>
            <SettingItemRight>
              {editingField === "location" ? (
                <input
                  type="text"
                  value={localFormData.location}
                  onChange={(e) =>
                    handleInputChange("location", e.target.value)
                  }
                  onBlur={handleInputBlur}
                  autoFocus
                  placeholder="Optional"
                  style={{
                    border: "1px solid #ccc",
                    borderRadius: "4px",
                    padding: "8px 12px",
                    fontSize: "14px",
                    width: "200px",
                    outline: "none",
                  }}
                  onClick={(e) => e.stopPropagation()}
                />
              ) : (
                <>
                  {localFormData.location || "(Optional)"}
                  <span className="arrow">›</span>
                </>
              )}
            </SettingItemRight>
          </SettingItem>

          <SettingItem onClick={() => handleFieldClick("information")}>
            <SettingItemLeft>
              <SettingItemTitle>{deviceType} Information</SettingItemTitle>
              <SettingItemSubtitle>
                Enter general information about this {deviceType.toLowerCase()}
              </SettingItemSubtitle>
            </SettingItemLeft>
            <SettingItemRight>
              {editingField === "information" ? (
                <input
                  type="text"
                  value={localFormData.information}
                  onChange={(e) =>
                    handleInputChange("information", e.target.value)
                  }
                  onBlur={handleInputBlur}
                  autoFocus
                  placeholder="Optional"
                  style={{
                    border: "1px solid #ccc",
                    borderRadius: "4px",
                    padding: "8px 12px",
                    fontSize: "14px",
                    width: "200px",
                    outline: "none",
                  }}
                  onClick={(e) => e.stopPropagation()}
                />
              ) : (
                <>
                  {localFormData.information || "(Optional)"}
                  <span className="arrow">›</span>
                </>
              )}
            </SettingItemRight>
          </SettingItem>

          {deviceType === "Hub" && (
            <SettingItem onClick={onBeaconsClick}>
              <SettingItemLeft>
                <SettingItemTitle>Connected Beacons</SettingItemTitle>
                <SettingItemSubtitle>
                  These are beacons connected to this hub
                </SettingItemSubtitle>
              </SettingItemLeft>
              <SettingItemRight>
                {deviceData.connectedBeacons || 0}
                <span className="arrow">›</span>
              </SettingItemRight>
            </SettingItem>
          )}
        </SettingsList>
      </SettingsSection>

      <ActionButtons>
        <CancelButton onClick={onCancel}>Cancel</CancelButton>
        <SaveButton onClick={handleSave}>Save Changes</SaveButton>
      </ActionButtons>
    </RightSection>
  );
};

export default GeneralSettings;
