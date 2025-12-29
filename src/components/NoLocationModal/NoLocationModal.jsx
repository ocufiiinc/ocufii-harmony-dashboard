import React from "react";

const NoLocationModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: "rgba(0,0,0,0.7)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 10000,
        fontFamily: "'Decimal', sans-serif",
      }}
      onClick={onClose}
    >
      <div
        style={{
          background: "white",
          padding: "32px",
          borderRadius: "12px",
          maxWidth: "400px",
          width: "90%",
          boxShadow: "0 8px 32px rgba(0,0,0,0.3)",
          textAlign: "center",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <svg
          width="64"
          height="64"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#FFC107"
          strokeWidth="2"
          style={{ marginBottom: "16px" }}
        >
          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
          <circle cx="12" cy="10" r="3"></circle>
        </svg>
        <h3
          style={{
            margin: "0 0 12px 0",
            color: "#212529",
            fontSize: "20px",
            fontWeight: "400",
          }}
        >
          No Location Available
        </h3>
        <p
          style={{
            margin: "0 0 24px 0",
            color: "#6c757d",
            fontSize: "14px",
            lineHeight: "1.6",
          }}
        >
          This alert does not have valid GPS coordinates. The location
          information is unavailable or incomplete.
        </p>
        <button
          onClick={onClose}
          style={{
            padding: "12px 32px",
            background: "#00BCD4",
            color: "white",
            border: "none",
            borderRadius: "8px",
            fontSize: "14px",
            fontWeight: "450",
            cursor: "pointer",
            fontFamily: "'Decimal', sans-serif",
            boxShadow: "0 2px 4px rgba(0,0,0,0.2)",
            transition: "all 0.3s ease",
          }}
          onMouseOver={(e) => (e.target.style.background = "#00a5bd")}
          onMouseOut={(e) => (e.target.style.background = "#00BCD4")}
        >
          OK
        </button>
      </div>
    </div>
  );
};

export default NoLocationModal;
