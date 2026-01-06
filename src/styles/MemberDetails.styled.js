import styled from "styled-components";
export const Container = styled.div`
  padding: 20px;
  background: #fff;
  border-radius: 8px;
  box-shadow: none;
`;

export const Section = styled.div`
  margin-bottom: 24px;

  &:last-child {
    margin-bottom: 0;
  }
`;

export const SectionTitle = styled.div`
  font-weight: 600;
  font-size: 16px;
  margin-bottom: 12px;
  color: #212529;
  font-family: "Decimal", sans-serif;
`;

export const SectionSubtitle = styled.div`
  font-size: 14px;
  color: #6c757d;
  margin-bottom: 16px;
  line-height: 1.5;
  font-family: "Decimal", sans-serif;
`;

export const Row = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 14px 16px;
  border-radius: 8px;
  background: #f8f9fa;
  margin-bottom: 12px;
`;

export const StatusRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 14px 16px;
  border-radius: 8px;
  background: #fff;
  border: 1px solid #e9ecef;
  margin-bottom: 12px;
`;

export const RowLabel = styled.div`
  font-size: 15px;
  font-weight: 500;
  color: #212529;
  font-family: "Decimal", sans-serif;
`;

export const AlertIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
`;

export const TestRow = styled.div`
  display: flex;
  gap: 12px;
  align-items: center;
  margin-top: 16px;
`;

export const TestInput = styled.input`
  flex: 1;
  padding: 12px 14px;
  border-radius: 8px;
  border: 1px solid #dee2e6;
  background: #fff;
  font-size: 14px;
  font-family: "Decimal", sans-serif;

  &:focus {
    outline: none;
    border-color: #2f80ed;
  }
`;

export const PrimaryButton = styled.button`
  background: #2f80ed;
  color: #fff;
  border: none;
  padding: 12px 20px;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 500;
  font-size: 14px;
  white-space: nowrap;
  font-family: "Decimal", sans-serif;

  &:hover {
    background: #1e6fdb;
  }
`;

export const ActionGroup = styled.div`
  display: flex;
  gap: 12px;
  margin: 16px 0;
  justify-content: center;
`;

export const SecondaryButton = styled.button`
  background: #2b9cff;
  color: #fff;
  border: none;
  padding: 12px 32px;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 500;
  font-size: 14px;
  font-family: "Decimal", sans-serif;
  width: 250px;

  &:hover {
    background: #1a8ae6;
  }
`;

export const UnlinkButton = styled.button`
  background: #dc3545;
  color: #fff;
  border: none;
  padding: 14px 40px;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
  font-size: 15px;
  margin: 16px auto 0;
  display: block;
  width:500px;
  }
`;

export const Note = styled.p`
  color: #6c757d;
  font-size: 13px;
  margin-top: 12px;
  line-height: 1.6;
  text-align: center;
  font-family: "Decimal", sans-serif;
`;

export const StatusPill = styled.span`
  background: ${(props) => (props.$isActive ? "#d4edda" : "#f8d7da")};
  color: ${(props) => (props.$isActive ? "#155724" : "#F00")};
  padding: 6px 14px;
  border-radius: 12px;
  font-weight: 600;
  font-size: 12px;
  text-transform: uppercase;
  font-family: "Decimal", sans-serif;
`;
