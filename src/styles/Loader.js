import React from "react";
import styled, { keyframes } from "styled-components";

const shadowPulse = keyframes`
  33% {
    background: #FFF;
    box-shadow: -24px 0 #D87A15, 24px 0 #FFF;
  }
  66% {
    background: #F7941D;
    box-shadow: -24px 0 #FFF, 24px 0 #FFF;
  }
  100% {
    background: #FFF;
    box-shadow: -24px 0 #FFF, 24px 0 #FFB84D;
  }
`;

export const Loader = styled.span`
  width: ${({ size }) => size || "16px"};
  height: ${({ size }) => size || "16px"};
  border-radius: 50%;
  display: block;
  margin: 15px auto;
  position: relative;
  background: #fff;
  box-shadow: -24px 0 #fff, 24px 0 #fff;
  box-sizing: border-box;
  animation: ${shadowPulse} 2s linear infinite;
`;
