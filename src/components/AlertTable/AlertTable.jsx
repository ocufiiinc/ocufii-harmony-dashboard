import React from "react";
import styled from "styled-components";
import PrimaryButton from "../Button/PrimaryButton";
import {
  TableContainer,
  TableHeader,
  HeaderIcon,
  TitleWrapper,
  TableTitle,
  CountBadge,
  StyledTable,
  TableHead,
  TableRow,
  TableHeaderCell,
  TableCell,
  AlertCell,
  PaginationWrapper,
  PaginationInfo,
  PaginationControls,
  PageInfo,
  PaginationButton,
} from "../../styles/AlertTable.styled";

const AlertTable = ({
  icon,
  title,
  count,
  headerColor = "#dc3545",
  data = [],
  onAction,
  onView,
  actionButtonText = "Action",
  actionButtonColor = "#007bff",
}) => {
  const [currentPage, setCurrentPage] = React.useState(1);
  const itemsPerPage = 10;

  // Calculate pagination
  const totalPages = Math.ceil(data.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = data.slice(startIndex, endIndex);

  // Reset to page 1 when data changes
  React.useEffect(() => {
    setCurrentPage(1);
  }, [data.length]);

  const handlePrevPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  const renderAlertIcon = (alertIcon) => {
    if (typeof alertIcon === "object" && alertIcon !== null) {
      if (alertIcon.type === "image") {
        return (
          <img
            src={alertIcon.src}
            alt={alertIcon.alt}
            style={{ width: "24px", height: "24px" }}
          />
        );
      } else if (alertIcon.type === "icon" && alertIcon.Component) {
        const IconComponent = alertIcon.Component;
        return (
          <IconComponent
            style={{ fontSize: "24px" }}
            color="rgba(0, 181, 226, 1)"
          />
        );
      }
    }

    // Check if it's a string that's an image path or data URI
    if (typeof alertIcon === "string") {
      // Check if it's a data URI (starts with data:image/)
      const isDataURI = alertIcon.startsWith("data:image/");

      // Check if it's a regular image path
      const imageExtensions = [
        ".png",
        ".jpg",
        ".jpeg",
        ".svg",
        ".gif",
        ".webp",
      ];
      const isImagePath = imageExtensions.some((ext) =>
        alertIcon.toLowerCase().includes(ext)
      );

      if (isDataURI || isImagePath) {
        return (
          <img
            src={alertIcon}
            alt="Alert Icon"
            style={{ width: "24px", height: "24px", objectFit: "contain" }}
          />
        );
      }
    }

    return alertIcon; // Return string emojis as-is
  };

  return (
    <TableContainer>
      <TableHeader>
        <HeaderIcon>
          <img src={icon} alt={title} />
        </HeaderIcon>
        <TitleWrapper>
          <TableTitle>{title}</TableTitle>
          <CountBadge $bgColor={headerColor}>{count}</CountBadge>
        </TitleWrapper>
      </TableHeader>

      <StyledTable>
        <TableHead>
          <TableRow>
            <TableHeaderCell>Sender</TableHeaderCell>
            <TableHeaderCell>Alert</TableHeaderCell>
            <TableHeaderCell>Time</TableHeaderCell>
            <TableHeaderCell>Date</TableHeaderCell>
            <TableHeaderCell>Action Button</TableHeaderCell>
          </TableRow>
        </TableHead>
        <tbody>
          {currentData.length > 0 ? (
            currentData.map((row, index) => (
              <TableRow key={index}>
                <TableCell>{row.sender}</TableCell>
                <AlertCell>
                  <span className="alert-icon">
                    {renderAlertIcon(row.alertIcon)}
                  </span>
                  <span>{row.alert}</span>
                </AlertCell>
                <TableCell>{row.time}</TableCell>
                <TableCell>{row.date}</TableCell>
                <TableCell>
                  <div style={{ display: "flex", gap: "12px" }}>
                    {onView && (
                      <PrimaryButton
                        size="small"
                        color={actionButtonColor}
                        onClick={() =>
                          onView && onView(row, startIndex + index)
                        }
                      >
                        View
                      </PrimaryButton>
                    )}
                    <PrimaryButton
                      size="small"
                      color={actionButtonColor}
                      onClick={() =>
                        onAction && onAction(row, startIndex + index)
                      }
                    >
                      {actionButtonText}
                    </PrimaryButton>
                  </div>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell
                colSpan={5}
                style={{ textAlign: "center", padding: "2rem" }}
              >
                No alerts available
              </TableCell>
            </TableRow>
          )}
        </tbody>
      </StyledTable>

      {data.length > itemsPerPage && (
        <PaginationWrapper>
          <PaginationInfo>
            Showing {startIndex + 1} to {Math.min(endIndex, data.length)} of{" "}
            {data.length} entries
          </PaginationInfo>
          <PaginationControls>
            <PaginationButton
              onClick={handlePrevPage}
              disabled={currentPage === 1}
            >
              Previous
            </PaginationButton>
            <PageInfo>
              Page {currentPage} of {totalPages}
            </PageInfo>
            <PaginationButton
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
            >
              Next
            </PaginationButton>
          </PaginationControls>
        </PaginationWrapper>
      )}
    </TableContainer>
  );
};

export default AlertTable;
