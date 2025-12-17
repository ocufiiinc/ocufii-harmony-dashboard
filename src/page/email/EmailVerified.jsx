import React from "react";
import DashboardLayout from "../../Layout/DashboardLayout";
import { DashboardContent } from "../../styles/Dashboard.styled";
import { useNavigate, useLocation } from "react-router-dom";
import { ROUTE } from "../../common/Routes";
import {
  EmailContainer,
  EmailCard,
  EmailTitle,
  VerifiedIcon,
  VerifiedTitle,
  VerifiedText,
  ContinueButton,
} from "../../styles/Email.styled";
import { MdVerified } from "react-icons/md";
import checkImg from "../../assets/images/check-badge.svg";

const EmailVerified = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const message = location.state?.message || {
    line1:
      "Your email has been confirmed, and your beacon has been successfully deleted from your account.",
    line2:
      'Click "Continue" to finish the deletion process and return to the main dashboard.',
  };

  const handleContinue = () => {
    navigate(ROUTE.DASHBOARD);
  };

  return (
    <DashboardLayout>
      <DashboardContent>
        <EmailContainer>
          <EmailCard>
            <EmailTitle>Two-Step Email Verification</EmailTitle>

            <VerifiedIcon>
              <img src={checkImg} alt="Verified Icon" width={50} />
            </VerifiedIcon>

            <VerifiedTitle>Verified!</VerifiedTitle>

            <VerifiedText>{message.line1}</VerifiedText>

            <VerifiedText>{message.line2}</VerifiedText>

            <ContinueButton onClick={handleContinue}>Continue</ContinueButton>
          </EmailCard>
        </EmailContainer>
      </DashboardContent>
    </DashboardLayout>
  );
};

export default EmailVerified;
