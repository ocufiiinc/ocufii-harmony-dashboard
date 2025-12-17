import React, { useState } from "react";
import { useUser } from "../../context/UserContext";
import { useNavigate } from "react-router-dom";
import { PrimaryButton } from "../../components/Button";
import Input from "../../components/Input";
import { loginSchema } from "../../validations/LoginValidations";
import { loginAPI } from "../../api/AuthApi";
import ocufiiLogo from "../../assets/images/ocufii_logo.svg";
import {
  LoginContainer,
  Header,
  HeaderLogo,
  HeaderNav,
  HeaderLink,
  MainContent,
  LoginSection,
  BrandLogo,
  Description,
  LoginForm,
  LinksContainer,
  Link,
  Footer,
  FooterContent,
  FooterText,
  FooterLinks,
  FooterLink,
} from "../../styles/Login.styled";
import { AppVersion } from "../../common/AppVersion";
import { ROUTE } from "../../common/Routes";

const Login = () => {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useUser();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials({
      ...credentials,
      [name]: value,
    });

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: null,
      });
    }
  };

  const handleBlur = (e) => {
    // Validation logic removed - using Yup validation pattern instead
    // You can add Yup validation here if needed
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrors({});

    try {
      // Validate form with Yup schema
      await loginSchema.validate(credentials, { abortEarly: false });

      // Call login API with hardcoded roleId "3"
      const response = await loginAPI(
        credentials.email,
        credentials.password,
        "3"
      );

      // Check if response indicates email doesn't exist
      if (
        !response ||
        response === "Email does not exists" ||
        response.message === "Email does not exists" ||
        response.error === "Email does not exists" ||
        !response.access_Token
      ) {
        setErrors({
          general: "Email does not exists",
        });
        return;
      }

      // Response structure:
      // {
      //   "roleId": "string",
      //   "firstName": "string",
      //   "lastName": "string",
      //   "secretKey": "string",
      //   "accessKey": "string",
      //   "access_Token": "string"
      // }

      // Store user data in context (tab-specific sessionStorage)
      const user = {
        email: credentials.email,
        ...response,
      };
      login(user);

      // Navigate to dashboard
      navigate(ROUTE.DASHBOARD);
    } catch (error) {
      if (error.name === "ValidationError") {
        // Handle Yup validation errors
        const validationErrors = {};
        error.inner.forEach((err) => {
          validationErrors[err.path] = err.message;
        });
        setErrors(validationErrors);
      } else if (error.response) {
        // Handle API errors
        console.error("Login API error:", error.response);
        const errorMessage =
          error.response.data?.message ||
          error.response.data?.error ||
          "Login failed. Please check your credentials and try again.";
        setErrors({
          general: errorMessage,
        });
      } else if (error.request) {
        // Request made but no response received
        console.error("No response from server:", error.request);
        setErrors({
          general:
            "Unable to connect to the server. Please check your internet connection and try again.",
        });
      } else {
        // Something else happened
        console.error("Login error:", error);
        setErrors({
          general: "An unexpected error occurred. Please try again.",
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <LoginContainer>
      <Header>
        <HeaderLogo>
          <img src={ocufiiLogo} alt="Ocufii" />
        </HeaderLogo>
        <HeaderNav>
          <HeaderLink href="#" onClick={(e) => e.preventDefault()}>
            EN
          </HeaderLink>
        </HeaderNav>
      </Header>

      <MainContent>
        <LoginSection>
          <BrandLogo>
            <img src={ocufiiLogo} alt="Ocufii" />
          </BrandLogo>

          <Description>
            Advanced technology solutions designed to improve the safety of
            individuals, safeguard valuable assets, and ensure responsible
            firearm management.
          </Description>

          <LoginForm onSubmit={handleSubmit}>
            <Input
              label="Login / Email"
              type="email"
              name="email"
              value={credentials.email}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Enter your email"
              error={errors.email}
              variant="dark"
              required
            />

            <Input
              label="Password"
              type="password"
              name="password"
              value={credentials.password}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Enter your password"
              error={errors.password}
              variant="dark"
              required
            />

            {errors.general && (
              <div
                style={{
                  color: "#dc3545",
                  fontSize: "0.875rem",
                  marginBottom: "1rem",
                  textAlign: "center",
                }}
              >
                {errors.general}
              </div>
            )}

            <PrimaryButton
              type="submit"
              color="#F7941D"
              hoverColor="#E8850B"
              size="large"
              width="full"
              isLoading={isLoading}
              disabled={isLoading}
            >
              {isLoading ? "LOGGING IN..." : "LOGIN"}
            </PrimaryButton>

            <LinksContainer>
              <Link href="#forgot-password">Forgot Password?</Link>
              {/* <span style={{ color: "#666" }}>|</span> */}
              {/* <Link href="#request-access">Request Access</Link> */}
            </LinksContainer>
          </LoginForm>
        </LoginSection>
      </MainContent>

      <Footer>
        <FooterContent>
          <FooterText>Ocufii 2025, All rights reserved</FooterText>
          <FooterLinks>
            <FooterLink href="#">v {AppVersion}</FooterLink>
            <FooterLink href="#terms">Terms of Use</FooterLink>
            <FooterLink href="#privacy">
              Personal Data Processing Policy
            </FooterLink>
          </FooterLinks>
        </FooterContent>
      </Footer>
    </LoginContainer>
  );
};

export default Login;
