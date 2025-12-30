import React, { useState } from "react";
import styled from "styled-components";
import checkImg from "../../assets/images/check-badge.svg";
import emailImg from "../../assets/images/email.png";
import {
  Container,
  Header,
  ContentCard,
  Title,
  IconWrapper,
  ImageCircle,
  SubTitle,
  Description,
  Note,
  ResendInfo,
  ResendButton,
  VerifiedText,
  SuccessMessage,
  InfoText,
  ContinueButton,
} from "../../styles/TwoFactor.styled";

const TwoFactor = ({ deviceType, deviceName, onCancel, onSuccess }) => {
  const [isVerified, setIsVerified] = useState(true);

  const handleResendEmail = () => {
    console.log("Resending verification email...");
    // Add your email sending logic here
  };

  const handleVerification = () => {
    // Simulate email verification - in real app, this would be triggered by clicking email link
    setIsVerified(true);
  };

  const handleContinue = () => {
    onSuccess();
  };

  if (isVerified) {
    return (
      <Container>
        <Header>TWO FACTOR AUTHENTICATION</Header>
        <ContentCard>
          <Title>Two-Step Email Verification</Title>

          <ImageCircle>
            <img
              src={checkImg}
              alt="Email"
              style={{ width: 80, height: 60, objectFit: "contain" }}
            />
          </ImageCircle>

          <VerifiedText>Verified!</VerifiedText>

          <SuccessMessage>
            Your email has been confirmed, and your {deviceType.toLowerCase()}{" "}
            has been
            <br />
            successfully deleted from your account.
          </SuccessMessage>

          <InfoText>
            Click <strong>"Continue"</strong> to finish the deletion process and
            return to the main
            <br />
            dashboard.
          </InfoText>

          <ContinueButton onClick={handleContinue}>Continue</ContinueButton>
        </ContentCard>
      </Container>
    );
  }

  return (
    <Container>
      <Header>TWO FACTOR AUTHENTICATION</Header>
      <ContentCard>
        <Title>Two-Step Email Verification</Title>

        <IconWrapper>
          <img
            src={emailImg}
            alt="Email"
            style={{ width: 100, height: 100, objectFit: "contain" }}
          />
        </IconWrapper>

        <SubTitle>This action requires your authorization.</SubTitle>

        <Description>
          Check your inbox and follow the instructions in the email. Once
          <br />
          verified, you'll be able to continue.
        </Description>

        <Note>
          <strong>Note: The verification link expires in 10 minutes.</strong>
        </Note>

        <ResendInfo>
          Didn't receive an email?
          <br />
          Check your spam folder, or click
          <br />
          <em>"Resend Verification Email"</em> below to send it again.
        </ResendInfo>

        <ResendButton onClick={handleResendEmail}>
          Resend Verification Email
        </ResendButton>
      </ContentCard>
    </Container>
  );
};

export default TwoFactor;
