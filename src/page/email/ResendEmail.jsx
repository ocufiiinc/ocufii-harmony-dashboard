import React, { useEffect } from "react";
import DashboardLayout from "../../Layout/DashboardLayout";
import { DashboardContent } from "../../styles/Dashboard.styled";
import { useNavigate, useLocation } from "react-router-dom";
import { ROUTE } from "../../common/Routes";
import {
  EmailContainer,
  EmailCard,
  EmailTitle,
  EmailIcon,
  EmailText,
  EmailInstructions,
  EmailNote,
  EmailHelpText,
  ResendButton,
} from "../../styles/Email.styled";
import { MdEmail } from "react-icons/md";
import emailImg from "../../assets/images/email.png";

const ResendEmail = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const message = location.state?.message;

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate(ROUTE.EMAIL_VERIFIED, { state: { message } });
    }, 5000);

    return () => clearTimeout(timer);
  }, [navigate, message]);

  const handleResendEmail = () => {
    // Handle resend email logic here
    console.log("Resending verification email...");
  };

  return (
    <DashboardLayout>
      <DashboardContent>
        <EmailContainer>
          <EmailCard>
            <EmailTitle>Two-Step Email Verification</EmailTitle>

            <img src={emailImg} alt="Email Icon" width={80} />

            <EmailText bold>This action requires your authorization.</EmailText>

            <EmailInstructions>
              Check your inbox and follow the instructions in the email. Once
              verified, you'll be able to continue.
            </EmailInstructions>

            <EmailNote>
              Note: The verification link expires in 10 minutes.
            </EmailNote>

            <EmailHelpText>
              Didn't receive an email?
              <br />
              Check your spam folder, or click
              <br />
              "Resend Verification Email" below to send it again.
            </EmailHelpText>

            <ResendButton onClick={handleResendEmail}>
              Resend Verification Email
            </ResendButton>
          </EmailCard>
        </EmailContainer>
      </DashboardContent>
    </DashboardLayout>
  );
};

export default ResendEmail;
