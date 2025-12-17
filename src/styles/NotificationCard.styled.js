import styled from "styled-components";

export const NotificationCardContainer = styled.div`
  background: ${({ theme, type }) =>
    type === "urgent"
      ? "linear-gradient(135deg, rgba(255, 99, 99, 0.1) 0%, rgba(255, 99, 99, 0.05) 100%)"
      : "linear-gradient(135deg, rgba(255, 193, 7, 0.1) 0%, rgba(255, 193, 7, 0.05) 100%)"};
  border: 1px solid
    ${({ theme, type }) =>
      type === "urgent" ? "rgba(255, 99, 99, 0.2)" : "rgba(255, 193, 7, 0.2)"};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  padding: ${({ theme }) => theme.spacing.xl};
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.lg};
  transition: all ${({ theme }) => theme.transitions.normal};
  min-height: 120px;
  position: relative;
  overflow: hidden;

  &:before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: ${({ theme, type }) =>
      type === "urgent"
        ? "linear-gradient(90deg, #ff6363 0%, #ff4757 100%)"
        : "linear-gradient(90deg, #ffc107 0%, #ffb300 100%)"};
  }

  &:hover {
    transform: translateY(-2px);
    box-shadow: ${({ theme }) => theme.shadows.lg};
    border-color: ${({ theme, type }) =>
      type === "urgent" ? "rgba(255, 99, 99, 0.4)" : "rgba(255, 193, 7, 0.4)"};
  }

  @media (max-width: 768px) {
    padding: ${({ theme }) => theme.spacing.lg};
    min-height: 100px;
    gap: ${({ theme }) => theme.spacing.md};
  }

  @media (max-width: 576px) {
    padding: ${({ theme }) => theme.spacing.md};
    min-height: 80px;
    gap: ${({ theme }) => theme.spacing.sm};
  }
`;

export const NotificationIcon = styled.div`
  width: 64px;
  height: 64px;
  border-radius: ${({ theme }) => theme.borderRadius.full};
  background: ${({ theme, type }) =>
    type === "urgent"
      ? "linear-gradient(135deg, #ff6363 0%, #ff4757 100%)"
      : "linear-gradient(135deg, #ffc107 0%, #ffb300 100%)"};
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.colors.white};
  font-size: 28px;
  box-shadow: ${({ theme }) => theme.shadows.md};
  flex-shrink: 0;

  @media (max-width: 768px) {
    width: 56px;
    height: 56px;
    font-size: 24px;
  }

  @media (max-width: 576px) {
    width: 48px;
    height: 48px;
    font-size: 20px;
  }
`;

export const NotificationContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.sm};
  flex: 1;
`;

export const NotificationCount = styled.div`
  font-size: ${({ theme }) => theme.fontSize.xxxl};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  color: ${({ theme }) => theme.colors.textPrimary};
  line-height: 1;

  @media (max-width: 768px) {
    font-size: ${({ theme }) => theme.fontSize.xxl};
  }

  @media (max-width: 576px) {
    font-size: ${({ theme }) => theme.fontSize.xl};
  }
`;

export const NotificationLabel = styled.div`
  font-size: ${({ theme }) => theme.fontSize.md};
  font-weight: ${({ theme }) => theme.fontWeight.medium};
  color: ${({ theme }) => theme.colors.textSecondary};
  text-transform: uppercase;
  letter-spacing: 0.5px;

  @media (max-width: 768px) {
    font-size: ${({ theme }) => theme.fontSize.sm};
  }

  @media (max-width: 576px) {
    font-size: ${({ theme }) => theme.fontSize.xs};
  }
`;

export const NotificationCardsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: ${({ theme }) => theme.spacing.xl};
  margin-top: ${({ theme }) => theme.spacing.xl};

  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: ${({ theme }) => theme.spacing.lg};
    margin-top: ${({ theme }) => theme.spacing.lg};
  }

  @media (max-width: 576px) {
    grid-template-columns: 1fr;
    gap: ${({ theme }) => theme.spacing.md};
    margin-top: ${({ theme }) => theme.spacing.md};
  }
`;
