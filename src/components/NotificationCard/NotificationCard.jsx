import React from "react";
import { FaRegBell } from "react-icons/fa";
import { TbInfoTriangle } from "react-icons/tb";
import {
  NotificationCardContainer,
  NotificationIcon,
  NotificationContent,
  NotificationCount,
  NotificationLabel,
} from "../../styles/NotificationCard.styled";
import { useNavigate } from "react-router-dom";
import { ROUTE } from "../../common/Routes";

const NotificationCard = ({ type, count, label }) => {
  const navigate = useNavigate();
  const getIcon = () => {
    switch (type) {
      case "urgent":
        return <FaRegBell />;
      case "general":
        return <TbInfoTriangle />;
      default:
        return <FaRegBell />;
    }
  };

  return (
    <NotificationCardContainer
      type={type}
      onClick={() => navigate(ROUTE.ALERT)}
    >
      <NotificationIcon type={type}>{getIcon()}</NotificationIcon>
      <NotificationContent>
        <NotificationCount>{count}</NotificationCount>
        <NotificationLabel>{label}</NotificationLabel>
      </NotificationContent>
    </NotificationCardContainer>
  );
};

export default NotificationCard;
