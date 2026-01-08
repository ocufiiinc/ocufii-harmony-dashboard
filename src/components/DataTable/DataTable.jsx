import React from "react";
import { useNavigate } from "react-router-dom";
import {
  TableContainer,
  Table,
  TableHeader,
  TableHeaderCell,
  TableBody,
  TableRow,
  TableCell,
  StatusBadge,
  AvatarWrapper,
  Avatar,
  StatusIndicator,
  SettingsButton,
} from "../../styles/Table.styled";
import { ROUTE } from "../../common/Routes";

const DataTable = ({ columns, data, title, clientInfo, className }) => {
  const navigate = useNavigate();

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case "online":
        return "online";
      case "offline":
        return "offline";
      case "snooze":
      case "snoozed":
        return "snoozed";
      default:
        return "default";
    }
  };

  const handleSettingsClick = (item) => {
    console.log("Navigating to device details for item:", item);
    navigate(ROUTE.DEVICEDETAILS, { state: { device: item } });
  };

  const renderCellContent = (item, column) => {
    const value = item[column.key];

    if (column.key === "avatar") {
      return (
        <AvatarWrapper>
          <Avatar src={value} alt={item.name} />
          <StatusIndicator status={item.status?.toLowerCase()} />
        </AvatarWrapper>
      );
    }

    if (column.key === "status" || column.key === "beaconStatus") {
      return <StatusBadge status={getStatusColor(value)}>{value}</StatusBadge>;
    }

    if (column.key === "NotificationSnooze") {
      const snoozeStatus =
        value?.toLowerCase() === "enabled" ? "online" : "offline";
      return <StatusBadge status={snoozeStatus}>{value}</StatusBadge>;
    }

    // Render Settings button for any column ending with "Settings"
    if (column.key.endsWith("Settings")) {
      return (
        <SettingsButton onClick={() => handleSettingsClick(item)}>
          Settings
        </SettingsButton>
      );
    }

    return value;
  };

  return (
    <TableContainer className={className}>
      {title && (
        <div className="table-header">
          <h2 className="table-title">
            {title}
            <span className="count-badge">{data.length}</span>
          </h2>
        </div>
      )}

      <div className="table-wrapper">
        {data.length === 0 ? (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              padding: "40px 20px",
              fontSize: "16px",
              color: "#666",
              fontFamily: "'Decimal', sans-serif",
            }}
          >
            No records available
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                {columns.map((column) => (
                  <TableHeaderCell key={column.key}>
                    {column.title}
                  </TableHeaderCell>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.map((item, index) => (
                <TableRow key={item.id || index}>
                  {columns.map((column) => (
                    <TableCell key={column.key}>
                      {renderCellContent(item, column)}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </div>
    </TableContainer>
  );
};

export default DataTable;
