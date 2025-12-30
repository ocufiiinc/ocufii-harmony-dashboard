import styled from "styled-components";
export const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.45);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
`;

export const Modal = styled.div`
  width: 540px;
  max-width: calc(100% - 32px);
  background: #fff;
  border-radius: 12px;
  padding: 36px 40px;
  text-align: center;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
`;

export const Icon = styled.div`
  margin-bottom: 12px;
  img {
    width: 56px;
    height: 56px;
    object-fit: contain;
  }
`;

export const Title = styled.h3`
  margin: 8px 0 18px;
  font-size: 20px;
  letter-spacing: 0.4px;
`;

export const Message = styled.p`
  color: #333;
  margin-bottom: 28px;
  font-size: 15px;
`;

export const Actions = styled.div`
  display: flex;
  gap: 12px;
  justify-content: center;
`;

export const Cancel = styled.button`
  background: #9b9b9b;
  color: #fff;
  border: none;
  padding: 10px 26px;
  border-radius: 6px;
  cursor: pointer;
`;

export const Delete = styled.button`
  background: #d90012;
  color: #fff;
  border: none;
  padding: 10px 26px;
  border-radius: 6px;
  cursor: pointer;
`;
