import React from "react";
import { PrimaryButton, SecondaryButton, InfoButton } from "./index";

/**
 * Button Examples and Usage Guide
 *
 * This file demonstrates how to use the specific button components
 * with different configurations and props.
 */

const ButtonExamples = () => {
  return (
    <div
      style={{
        padding: "2rem",
        display: "flex",
        flexDirection: "column",
        gap: "2rem",
      }}
    >
      <h1>Button Components Examples</h1>

      {/* Primary Button Examples */}
      <section>
        <h2>Primary Button</h2>
        <div
          style={{
            display: "flex",
            gap: "1rem",
            flexWrap: "wrap",
            alignItems: "center",
          }}
        >
          {/* Default primary button */}
          <PrimaryButton>Default Primary</PrimaryButton>

          {/* Custom color */}
          <PrimaryButton color="#28a745" hoverColor="#218838">
            Success Green
          </PrimaryButton>

          {/* Different sizes */}
          <PrimaryButton size="small">Small</PrimaryButton>

          <PrimaryButton size="large">Large</PrimaryButton>

          {/* Full width */}
          <div style={{ width: "100%" }}>
            <PrimaryButton width="full">Full Width Button</PrimaryButton>
          </div>

          {/* Custom width */}
          <PrimaryButton width="200px">200px Width</PrimaryButton>

          {/* With icons */}
          <PrimaryButton leftIcon={<span>🚀</span>}>With Icon</PrimaryButton>

          {/* Loading state */}
          <PrimaryButton isLoading>Loading...</PrimaryButton>

          {/* Custom border radius */}
          <PrimaryButton borderRadius="20px">Rounded</PrimaryButton>
        </div>
      </section>

      {/* Secondary Button Examples */}
      <section>
        <h2>Secondary Button</h2>
        <div
          style={{
            display: "flex",
            gap: "1rem",
            flexWrap: "wrap",
            alignItems: "center",
          }}
        >
          {/* Default secondary button */}
          <SecondaryButton>Default Secondary</SecondaryButton>

          {/* Custom colors */}
          <SecondaryButton
            color="#007bff"
            hoverBackgroundColor="#007bff"
            hoverTextColor="#ffffff"
          >
            Blue Outline
          </SecondaryButton>

          {/* With background */}
          <SecondaryButton
            backgroundColor="#f8f9fa"
            color="#6c757d"
            borderColor="#dee2e6"
          >
            With Background
          </SecondaryButton>

          {/* Different sizes */}
          <SecondaryButton size="small">Small</SecondaryButton>

          <SecondaryButton size="large">Large</SecondaryButton>

          {/* Full width */}
          <div style={{ width: "100%" }}>
            <SecondaryButton width="full" color="#dc3545">
              Full Width Outline
            </SecondaryButton>
          </div>
        </div>
      </section>

      {/* Info Button Examples */}
      <section>
        <h2>Info Button</h2>
        <div
          style={{
            display: "flex",
            gap: "1rem",
            flexWrap: "wrap",
            alignItems: "center",
          }}
        >
          {/* Default info button */}
          <InfoButton>Default Info</InfoButton>

          {/* Outline variant */}
          <InfoButton variant="outline">Outline Info</InfoButton>

          {/* Soft variant */}
          <InfoButton variant="soft">Soft Info</InfoButton>

          {/* Icon variant */}
          <InfoButton variant="icon">ℹ️</InfoButton>

          {/* Custom color */}
          <InfoButton color="#6f42c1" textColor="#ffffff">
            Purple Info
          </InfoButton>

          {/* Different sizes */}
          <InfoButton size="small" variant="outline">
            Small
          </InfoButton>

          <InfoButton size="large" variant="soft">
            Large
          </InfoButton>

          {/* With icons */}
          <InfoButton leftIcon={<span>📋</span>}>With Icon</InfoButton>
        </div>
      </section>

      {/* Usage Examples */}
      <section>
        <h2>Common Usage Patterns</h2>
        <div
          style={{
            display: "flex",
            gap: "1rem",
            flexWrap: "wrap",
            alignItems: "center",
          }}
        >
          {/* Form buttons */}
          <PrimaryButton type="submit">Submit Form</PrimaryButton>

          <SecondaryButton type="button">Cancel</SecondaryButton>

          {/* Action buttons */}
          <InfoButton variant="outline" onClick={() => alert("Info clicked!")}>
            More Info
          </InfoButton>

          {/* Brand colors */}
          <PrimaryButton color="#ff6b35" hoverColor="#e55a2b">
            Ocufii Brand
          </PrimaryButton>
        </div>
      </section>

      {/* Responsive examples */}
      <section>
        <h2>Responsive Examples</h2>
        <div style={{ display: "grid", gap: "1rem" }}>
          <PrimaryButton width="full" size="large">
            Mobile-First Full Width
          </PrimaryButton>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "1rem",
            }}
          >
            <PrimaryButton>Save</PrimaryButton>
            <SecondaryButton>Cancel</SecondaryButton>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ButtonExamples;
