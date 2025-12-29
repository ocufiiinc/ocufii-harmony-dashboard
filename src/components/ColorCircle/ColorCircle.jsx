import React from "react";
import styled from "styled-components";

const Circle = styled.div`
  width: ${({ size }) => size || "10px"};
  height: ${({ size }) => size || "10px"};
  border-radius: 50%;
  background: ${({ color }) => color || "#ccc"};
  flex-shrink: 0;
`;

const ColorCircle = ({ color, size }) => {
  return <Circle color={color} size={size} />;
};

export default ColorCircle;
