import React, { useState } from "react";
import styled from "styled-components";
import Input from "../components/Input/Input";

const DemoContainer = styled.div`
  padding: 2rem;
  max-width: 800px;
  margin: 0 auto;
`;

const Section = styled.div`
  margin-bottom: 3rem;
`;

const Title = styled.h2`
  color: ${({ theme }) => theme.colors.textPrimary};
  margin-bottom: 1rem;
`;

const SubTitle = styled.h3`
  color: ${({ theme }) => theme.colors.textSecondary};
  margin-bottom: 1rem;
  font-size: 1.2rem;
`;

const InputGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-bottom: 2rem;
`;

const CodeBlock = styled.pre`
  background: ${({ theme }) => theme.colors.backgroundSecondary};
  padding: 1rem;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  overflow-x: auto;
  font-size: 0.9rem;
  color: ${({ theme }) => theme.colors.textPrimary};
  margin-bottom: 2rem;
`;

// Demo icons
const EmailIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.89 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
  </svg>
);

const PasswordIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z" />
  </svg>
);

const SearchIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
  </svg>
);

const InputDemo = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
    phone: "",
    website: "",
    search: "",
    description: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: null,
      }));
    }
  };

  const handleBlur = (e) => {
    const { name, value, type } = e.target;
    let error = null;

    switch (name) {
      case "email":
        if (!value) {
          error = "Email is required";
        } else if (!/\S+@\S+\.\S+/.test(value)) {
          error = "Please enter a valid email address";
        }
        break;
      case "password":
        if (!value) {
          error = "Password is required";
        } else if (value.length < 8) {
          error = "Password must be at least 8 characters";
        }
        break;
      case "name":
        if (!value) {
          error = "Name is required";
        } else if (value.length < 2) {
          error = "Name must be at least 2 characters";
        }
        break;
      case "phone":
        // Optional field - only validate if not empty
        if (value && !/^[\+]?[1-9][\d]{0,15}$/.test(value)) {
          error = "Please enter a valid phone number";
        }
        break;
      case "website":
        // Optional field - only validate if not empty
        if (value && !/^https?:\/\/.+/.test(value)) {
          error = "Please enter a valid URL";
        }
        break;
      default:
        break;
    }

    if (error) {
      setErrors((prev) => ({
        ...prev,
        [name]: error,
      }));
    }
  };

  return (
    <DemoContainer>
      <Title>Input Component Demo</Title>

      {/* Basic Inputs */}
      <Section>
        <SubTitle>Basic Input Types</SubTitle>
        <InputGrid>
          <Input
            label="Full Name"
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="Enter your full name"
            error={errors.name}
            required
          />

          <Input
            label="Email Address"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="john@example.com"
            error={errors.email}
            required
          />
        </InputGrid>

        <CodeBlock>
          {`<Input
  label="Full Name"
  type="text"
  name="name"
  value={formData.name}
  onChange={handleChange}
  placeholder="Enter your full name"
  error={errors.name}
  required
/>`}
        </CodeBlock>
      </Section>

      {/* Input with Icons */}
      <Section>
        <SubTitle>Inputs with Icons</SubTitle>
        <InputGrid>
          <Input
            label="Email with Icon"
            type="email"
            name="emailIcon"
            placeholder="Email address"
            leftIcon={<EmailIcon />}
          />

          <Input
            label="Password with Icon"
            type="password"
            name="passwordIcon"
            placeholder="Password"
            leftIcon={<PasswordIcon />}
          />
        </InputGrid>

        <CodeBlock>
          {`<Input
  label="Email with Icon"
  type="email"
  leftIcon={<EmailIcon />}
  placeholder="Email address"
/>`}
        </CodeBlock>
      </Section>

      {/* Input Sizes */}
      <Section>
        <SubTitle>Input Sizes</SubTitle>
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <Input
            label="Small Input"
            size="small"
            placeholder="Small size input"
          />
          <Input
            label="Medium Input (Default)"
            size="medium"
            placeholder="Medium size input"
          />
          <Input
            label="Large Input"
            size="large"
            placeholder="Large size input"
          />
        </div>

        <CodeBlock>
          {`<Input label="Small Input" size="small" />
<Input label="Medium Input" size="medium" />
<Input label="Large Input" size="large" />`}
        </CodeBlock>
      </Section>

      {/* Input Variants */}
      <Section>
        <SubTitle>Input Variants</SubTitle>
        <InputGrid>
          <Input
            label="Default Variant"
            variant="default"
            placeholder="Default styling"
          />

          <Input
            label="Dark Variant"
            variant="dark"
            placeholder="Dark styling"
          />

          <Input
            label="Light Variant"
            variant="light"
            placeholder="Light styling"
          />
        </InputGrid>

        <CodeBlock>
          {`<Input label="Default" variant="default" />
<Input label="Dark" variant="dark" />
<Input label="Light" variant="light" />`}
        </CodeBlock>
      </Section>

      {/* Input States */}
      <Section>
        <SubTitle>Input States</SubTitle>
        <InputGrid>
          <Input
            label="Input with Error"
            placeholder="This field has an error"
            error="This field is required"
          />

          <Input
            label="Input with Success"
            placeholder="This field is valid"
            success="Great! This looks good"
            value="valid@email.com"
          />

          <Input
            label="Disabled Input"
            placeholder="This input is disabled"
            disabled
          />
        </InputGrid>

        <CodeBlock>
          {`<Input
  label="Input with Error"
  error="This field is required"
/>

<Input
  label="Input with Success"
  success="Great! This looks good"
/>

<Input
  label="Disabled Input"
  disabled
/>`}
        </CodeBlock>
      </Section>

      {/* Helper Text */}
      <Section>
        <SubTitle>Helper Text and Validation</SubTitle>
        <InputGrid>
          <Input
            label="Password"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="Enter strong password"
            error={errors.password}
            helperText="Password must contain uppercase, lowercase, number and special character"
            required
          />

          <Input
            label="Phone Number"
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="+1 (555) 123-4567"
            error={errors.phone}
            helperText="International format preferred"
          />
        </InputGrid>

        <CodeBlock>
          {`<Input
  label="Password"
  type="password"
  error={errors.password}
  helperText="Password requirements..."
  required
/>`}
        </CodeBlock>
      </Section>

      {/* Custom Styling */}
      <Section>
        <SubTitle>Custom Styling</SubTitle>
        <Input
          label="Custom Styled Input"
          placeholder="This input has custom styling"
          customStyles={`
            border: 2px solid #ff6b35;
            border-radius: 20px;
            background: linear-gradient(135deg, #ff6b35, #f7931e);
            color: white;
            &::placeholder {
              color: rgba(255, 255, 255, 0.7);
            }
            &:focus {
              box-shadow: 0 0 20px rgba(255, 107, 53, 0.5);
            }
          `}
        />

        <CodeBlock>
          {`<Input
  label="Custom Styled Input"
  customStyles={\`
    border: 2px solid #ff6b35;
    border-radius: 20px;
    background: linear-gradient(135deg, #ff6b35, #f7931e);
    &:focus {
      box-shadow: 0 0 20px rgba(255, 107, 53, 0.5);
    }
  \`}
/>`}
        </CodeBlock>
      </Section>
    </DemoContainer>
  );
};

export default InputDemo;
