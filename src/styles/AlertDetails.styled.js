import styled from "styled-components";

export const AlertDetailsContainer = styled.div`
  display: flex;
  gap: 24px;
  padding: 24px;
  height: calc(100vh - 160px);
  overflow: hidden;

  @media (max-width: 1024px) {
    flex-direction: column;
    height: auto;
    overflow-y: auto;
  }
`;

export const AlertDetailsLeft = styled.div`
  flex: 0 0 400px;
  display: flex;
  flex-direction: column;
  gap: 16px;

  @media (max-width: 1024px) {
    flex: 1;
    min-height: auto;
  }
`;

export const AlertDetailsRight = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  background: ${({ theme }) => theme.colors.background};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  overflow: hidden;
  box-shadow: ${({ theme }) => theme.shadows.md};

  @media (max-width: 1024px) {
    min-height: 500px;
  }
`;

export const AlertDetailsHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;

  h1 {
    font-size: 28px;
    font-weight: 600;
    color: ${({ theme }) => theme.colors.textPrimary};
    margin: 0;
  }
`;

export const BackButton = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 20px;
  background: ${({ theme }) => theme.colors.background};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  color: ${({ theme }) => theme.colors.textPrimary};
  font-size: 14px;
  font-weight: 400;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background: ${({ theme }) => theme.colors.backgroundSecondary};
    border-color: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.primary};
  }

  svg {
    font-size: 18px;
  }
`;

export const AlertCardWrapper = styled.div`
  background: ${({ theme }) => theme.colors.background};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  overflow: hidden;
  box-shadow: ${({ theme }) => theme.shadows.md};
`;
