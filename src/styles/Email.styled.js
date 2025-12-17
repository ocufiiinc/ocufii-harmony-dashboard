import styled from "styled-components";

export const EmailContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 70vh;
  padding: 20px;
`;

export const EmailCard = styled.div`
  background: white;
  border-radius: 12px;
  padding: 48px;
  max-width: 600px;
  width: 100%;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  text-align: center;
`;

export const EmailTitle = styled.h1`
  font-size: 24px;
  font-weight: 600;
  color: #1a1a1a;
  margin-bottom: 32px;
`;

export const EmailIcon = styled.div`
  width: 80px;
  height: 80px;
  margin: 0 auto 32px;
  background: linear-gradient(135deg, #4a9eff 0%, #1e7cff 100%);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 40px;
  color: white;
`;

export const EmailText = styled.p`
  font-size: 16px;
  color: #1a1a1a;
  margin-bottom: 24px;
  font-weight: ${(props) => (props.bold ? "600" : "400")};
`;

export const EmailInstructions = styled.p`
  font-size: 14px;
  color: #666;
  line-height: 1.6;
  margin-bottom: 24px;
`;

export const EmailNote = styled.p`
  font-size: 14px;
  color: #1a1a1a;
  font-weight: 600;
  margin-bottom: 32px;
`;

export const EmailHelpText = styled.p`
  font-size: 14px;
  color: #ff8800;
  line-height: 1.6;
  font-weight: 500;
  margin-bottom: 24px;
`;

export const ResendButton = styled.button`
  background: #ff8800;
  color: white;
  border: none;
  border-radius: 6px;
  padding: 14px 32px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s;

  &:hover {
    background: #e67700;
  }

  &:active {
    transform: scale(0.98);
  }
`;

export const VerifiedIcon = styled.div`
  width: 80px;
  height: 80px;
  margin: 0 auto 24px;
  background: #22c55e;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 40px;
  color: white;
`;

export const VerifiedTitle = styled.h2`
  font-size: 20px;
  font-weight: 600;
  color: #1a1a1a;
  margin-bottom: 24px;
`;

export const VerifiedText = styled.p`
  font-size: 14px;
  color: #1a1a1a;
  line-height: 1.6;
  margin-bottom: 24px;
`;

export const ContinueButton = styled.button`
  background: #ff8800;
  color: white;
  border: none;
  border-radius: 6px;
  padding: 14px 48px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s;

  &:hover {
    background: #e67700;
  }

  &:active {
    transform: scale(0.98);
  }
`;
