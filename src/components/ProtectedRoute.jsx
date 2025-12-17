import React from "react";
import { Navigate } from "react-router-dom";
import { useUser } from "../context/UserContext";
import styled from "styled-components";
import { ROUTE } from "../common/Routes";

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  font-size: ${({ theme }) => theme.fontSize.lg};
  color: ${({ theme }) => theme.colors.textSecondary};
  background-color: ${({ theme }) => theme.colors.background};
`;

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, isLoading } = useUser();

  if (isLoading) {
    return <LoadingContainer>Loading...</LoadingContainer>;
  }

  if (!isAuthenticated) {
    return <Navigate to={ROUTE.LOGIN} replace />;
  }

  return children;
};

export default ProtectedRoute;
