import styled from "styled-components";

export const Container = styled.div`
  flex: 1;
  padding: 40px;
  background: ${({ theme }) => theme.colors.cardBackground || "#fff"};
`;

export const Header = styled.div`
  font-size: 12px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.textSecondary || "#666"};
  margin-bottom: 20px;
  letter-spacing: 1px;
`;

export const ContentCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40px;
  text-align: center;
`;

export const Title = styled.h2`
  font-size: 24px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text || "#000"};
  margin-bottom: 30px;
`;

export const IconWrapper = styled.div`
  width: 80px;
  height: 80px;
  margin-bottom: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const ImageCircle = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background-color: #26a769;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 10px;
`;

export const SubTitle = styled.p`
  font-size: 16px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text || "#000"};
  margin-bottom: 20px;
`;

export const Description = styled.p`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.textSecondary || "#666"};
  line-height: 1.6;
  margin-bottom: 20px;
`;

export const Note = styled.p`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.text || "#000"};
  margin-bottom: 20px;
`;

export const ResendInfo = styled.p`
  font-size: 14px;
  color: #ff9800;
  line-height: 1.6;
  margin-bottom: 30px;

  em {
    font-style: italic;
  }
`;

export const ResendButton = styled.button`
  background: #ff9800;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 12px 40px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.3s ease;

  &:hover {
    background: #f57c00;
  }
`;

export const VerifiedText = styled.h3`
  font-size: 20px;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.text || "#000"};
  margin-bottom: 20px;
`;

export const SuccessMessage = styled.p`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.text || "#000"};
  line-height: 1.6;
  margin-bottom: 20px;
`;

export const InfoText = styled.p`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.textSecondary || "#666"};
  line-height: 1.6;
  margin-bottom: 30px;
`;

export const ContinueButton = styled.button`
  background: #ff9800;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 12px 60px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.3s ease;

  &:hover {
    background: #f57c00;
  }
`;
