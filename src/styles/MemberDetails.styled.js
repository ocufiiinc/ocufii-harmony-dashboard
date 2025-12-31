import styled from "styled-components";
export const Container = styled.div`
  padding: 18px;
  background: #fff;
  border-radius: 8px;
  box-shadow: none;
`;

export const Section = styled.div`
  margin-bottom: 18px;
`;

export const SectionTitle = styled.div`
  font-weight: 600;
  margin-bottom: 8px;
`;

export const Row = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 10px;
  border-radius: 8px;
  background: #f7f9fb;
  margin-bottom: 8px;
`;

export const TestRow = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
  margin-top: 8px;
`;

export const TestInput = styled.input`
  flex: 1;
  padding: 10px 12px;
  border-radius: 6px;
  border: 1px solid #e6e9ee;
  background: #fff;
`;

export const PrimaryButton = styled.button`
  background: #2f80ed;
  color: #fff;
  border: none;
  padding: 10px 14px;
  border-radius: 6px;
  cursor: pointer;
`;

export const ActionGroup = styled.div`
  display: flex;
  gap: 12px;
  margin: 12px 0;
`;

export const SecondaryButton = styled.button`
  background: #2b9cff;
  color: #fff;
  border: none;
  padding: 10px 18px;
  border-radius: 6px;
  cursor: pointer;
`;

export const UnlinkButton = styled.button`
  background: #d90012;
  color: #fff;
  border: none;
  width: 100%;
  padding: 12px 18px;
  border-radius: 8px;
  cursor: pointer;
  margin-top: 12px;
`;

export const Note = styled.p`
  color: #9aa3ad;
  font-size: 13px;
  margin-top: 8px;
`;

export const StatusPill = styled.span`
  background: #e6fff0;
  color: #1f8f5b;
  padding: 6px 10px;
  border-radius: 999px;
  font-weight: 600;
  font-size: 13px;
`;
