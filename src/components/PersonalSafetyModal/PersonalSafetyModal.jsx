import React from "react";
import { MdInfo, MdClose } from "react-icons/md";
import {
  ModalOverlay,
  ModalContainer,
  ModalContent,
  ModalIconWrapper,
  ModalTitle,
  ModalDescription,
  ModalList,
  ModalListItem,
  ModalSection,
  ModalSectionTitle,
  ModalButton,
  CloseButton,
} from "../../styles/PersonalSafety.styled";

const PersonalSafetyModal = ({ isOpen, onClose, isProfessional = false }) => {
  if (!isOpen) return null;

  return (
    <ModalOverlay onClick={onClose}>
      <ModalContainer onClick={(e) => e.stopPropagation()}>
        <ModalContent>
          <ModalIconWrapper>
            <MdInfo />
          </ModalIconWrapper>

          <ModalTitle>
            {isProfessional
              ? "PROFESSIONAL MONITORED SAFETY ALERTS"
              : "PERSONAL MONITORED SAFETY ALERTS"}
          </ModalTitle>

          {!isProfessional ? (
            <>
              <ModalDescription>
                Personal-monitored safety alerts let you instantly notify a
                trusted contact when you're in danger or need help. This feature
                and the associated service are included at no cost as part of
                your Ocufii Standard Service and can be customized to fit your
                personal safety needs.
              </ModalDescription>

              <ModalDescription style={{ fontWeight: 500 }}>
                Included with your app:
              </ModalDescription>

              <ModalList>
                <ModalListItem>
                  Personal Safety Service with safety alerts for Emergency,
                  Active Shooter Event, Feeling Unsafe, Auto-Dial 911, and
                  Auto-Dial 988.
                </ModalListItem>
                <ModalListItem>
                  Send personal safety alerts to{" "}
                  <strong>ONE trusted recipient in My Recipients.</strong>
                </ModalListItem>
                <ModalListItem>
                  Send personal safety alerts to{" "}
                  <strong>
                    up to THREE trusted members of My Safety Network.
                  </strong>
                </ModalListItem>
                <ModalListItem>
                  Customize how your safety alert buttons work.
                </ModalListItem>
                <ModalListItem>
                  No professional monitoring included.
                </ModalListItem>
              </ModalList>

              <ModalSection>
                <ModalSectionTitle>Want more coverage?</ModalSectionTitle>
                <ModalList>
                  <ModalListItem>Upgrade to add more recipients.</ModalListItem>
                  <ModalListItem>
                    Upgrade to add professional monitoring service.
                  </ModalListItem>
                  <ModalListItem>
                    To upgrade, go to{" "}
                    <strong>Manage Your Subscriptions.</strong>
                  </ModalListItem>
                </ModalList>
              </ModalSection>
            </>
          ) : (
            <>
              <ModalDescription>
                Professional-monitored safety alerts provide 24/7 emergency
                response through our certified dispatch center. When you trigger
                a safety alert, trained professionals immediately assess the
                situation and coordinate appropriate emergency services.
              </ModalDescription>

              <ModalDescription style={{ fontWeight: 500 }}>
                Professional monitoring includes:
              </ModalDescription>

              <ModalList>
                <ModalListItem>
                  24/7 live monitoring by certified dispatch professionals.
                </ModalListItem>
                <ModalListItem>
                  Immediate emergency service coordination.
                </ModalListItem>
                <ModalListItem>
                  Direct communication with local authorities.
                </ModalListItem>
                <ModalListItem>
                  All features of Personal Monitored Safety Alerts.
                </ModalListItem>
              </ModalList>

              <ModalSection>
                <ModalSectionTitle>
                  Upgrade to Professional Monitoring
                </ModalSectionTitle>
                <ModalList>
                  <ModalListItem>
                    To enable professional monitored safety alerts, go to{" "}
                    <strong>Manage Your Subscriptions</strong> and purchase
                    Professional Monitoring Service under Service Upgrades.
                  </ModalListItem>
                </ModalList>
              </ModalSection>
            </>
          )}

          <ModalButton onClick={onClose}>OK</ModalButton>
        </ModalContent>
      </ModalContainer>
    </ModalOverlay>
  );
};

export default PersonalSafetyModal;
