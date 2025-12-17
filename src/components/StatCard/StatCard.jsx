import React from "react";
import styled from "styled-components";
import {
  CardContainer,
  CardHeader,
  IconWrapper,
  CardTitle,
  CardValue,
} from "../../styles/StatsCard.styled";

const StatCard = ({ image, title, value, color, onClick }) => {
  return (
    <CardContainer onClick={onClick}>
      <CardHeader>
        <IconWrapper>{image && <img src={image} alt={title} />}</IconWrapper>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardValue>{value}</CardValue>
    </CardContainer>
  );
};

export default StatCard;
