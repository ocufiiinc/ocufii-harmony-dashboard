import styled from "styled-components";

export const LoginContainer = styled.div`
  width: 100vw;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: #000000;
  position: relative;
  overflow: hidden;
  margin: 0;
  padding: 0;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: url("/src/assets/images/black.jpg");
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    opacity: 0.3;
    z-index: 1;
  }

  > * {
    position: relative;
    z-index: 2;
  }
`;

export const Header = styled.header`
  width: 100%;
  padding: ${({ theme }) => theme.spacing.lg} ${({ theme }) => theme.spacing.xl};
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: rgba(0, 0, 0, 0.8);
  backdrop-filter: blur(10px);
  border-bottom: 3px solid #f7941d;
  box-sizing: border-box;

  @media (max-width: 768px) {
    padding: ${({ theme }) => theme.spacing.md}
      ${({ theme }) => theme.spacing.lg};
  }
`;

export const HeaderLogo = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};

  img {
    height: 40px;
    width: auto;

    @media (max-width: 768px) {
      height: 32px;
    }
  }

  h1 {
    color: #ffffff;
    font-size: ${({ theme }) => theme.fontSize.xl};
    font-weight: ${({ theme }) => theme.fontWeight.semibold};
    margin: 0;

    @media (max-width: 768px) {
      font-size: ${({ theme }) => theme.fontSize.lg};
    }
  }
`;

export const HeaderNav = styled.nav`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.lg};

  @media (max-width: 768px) {
    gap: ${({ theme }) => theme.spacing.md};
  }
`;

export const HeaderLink = styled.a`
  color: rgba(255, 255, 255, 0.8);
  text-decoration: none;
  font-size: ${({ theme }) => theme.fontSize.sm};
  font-weight: ${({ theme }) => theme.fontWeight.medium};
  transition: color ${({ theme }) => theme.transitions.fast};

  &:hover {
    color: #ffffff;
  }

  @media (max-width: 768px) {
    font-size: ${({ theme }) => theme.fontSize.xs};
  }
`;

export const MainContent = styled.main`
  flex: 1;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: ${({ theme }) => theme.spacing.xl};
  min-height: calc(100vh - 200px);
  box-sizing: border-box;
  background: url("/src/assets/images/background.png");
  border-bottom: 3px solid #f7941d;
  position: relative;
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: url("/src/assets/images/background.png");
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    opacity: 0.2;
    z-index: 1;
  }

  > * {
    position: relative;
    z-index: 2;
  }

  @media (max-width: 768px) {
    padding: ${({ theme }) => theme.spacing.lg};
    min-height: calc(100vh - 160px);
  }
`;

export const LoginSection = styled.section`
  width: 100%;
  max-width: 600px;
  text-align: center;

  @media (max-width: 768px) {
    max-width: 90%;
  }
`;

export const BrandLogo = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing.xl};

  h1 {
    font-size: 4rem;
    font-weight: ${({ theme }) => theme.fontWeight.bold};
    margin: 0;
    color: #ffffff;

    .ocu {
      color: #f7941d;
    }

    .fii {
      color: #ffffff;
    }

    @media (max-width: 768px) {
      font-size: 3rem;
    }

    @media (max-width: 576px) {
      font-size: 2.5rem;
    }
  }
`;

export const Description = styled.p`
  color: #ffffff;
  font-size: ${({ theme }) => theme.fontSize.lg};
  line-height: 1.6;
  margin-bottom: ${({ theme }) => theme.spacing.xxl};
  max-width: 550px;
  margin-left: auto;
  margin-right: auto;

  @media (max-width: 768px) {
    font-size: ${({ theme }) => theme.fontSize.sm};
    margin-bottom: ${({ theme }) => theme.spacing.xl};
  }
`;

export const LoginForm = styled.form`
  width: 100%;
  max-width: 400px;
  margin: 0 auto;

  @media (max-width: 768px) {
    max-width: 100%;
  }
`;

export const Logo = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing.xl};
  display: flex;
  justify-content: center;
  align-items: center;

  img {
    max-width: 200px;
    height: auto;

    @media (max-width: 768px) {
      max-width: 150px;
    }
  }
`;

export const LinksContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing.lg};
  margin-top: ${({ theme }) => theme.spacing.lg};
  align-items: center;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    gap: ${({ theme }) => theme.spacing.md};
    flex-direction: column;

    span {
      display: none;
    }
  }
`;

export const Link = styled.a`
  color: #cccccc;
  font-size: ${({ theme }) => theme.fontSize.sm};
  text-decoration: none;
  transition: color ${({ theme }) => theme.transitions.fast};

  &:hover {
    color: #f7941d;
    text-decoration: underline;
  }

  @media (max-width: 768px) {
    font-size: ${({ theme }) => theme.fontSize.xs};
  }
`;

export const Footer = styled.footer`
  width: 100%;
  background: rgba(0, 0, 0, 0.8);
  backdrop-filter: blur(10px);
  padding: ${({ theme }) => theme.spacing.lg} ${({ theme }) => theme.spacing.xl};
  text-align: center;
  box-sizing: border-box;

  @media (max-width: 768px) {
    padding: ${({ theme }) => theme.spacing.md}
      ${({ theme }) => theme.spacing.lg};
  }
`;

export const FooterContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: ${({ theme }) => theme.spacing.md};
  }
`;

export const FooterText = styled.p`
  color: rgba(255, 255, 255, 0.7);
  font-size: ${({ theme }) => theme.fontSize.sm};
  margin: 0;

  @media (max-width: 768px) {
    font-size: ${({ theme }) => theme.fontSize.xs};
    text-align: center;
  }
`;

export const FooterLinks = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.lg};

  @media (max-width: 768px) {
    gap: ${({ theme }) => theme.spacing.md};
    flex-wrap: wrap;
    justify-content: center;
  }
`;

export const FooterLink = styled.a`
  color: rgba(255, 255, 255, 0.7);
  text-decoration: none;
  font-size: ${({ theme }) => theme.fontSize.sm};
  transition: color ${({ theme }) => theme.transitions.fast};

  &:hover {
    color: #ffffff;
  }

  @media (max-width: 768px) {
    font-size: ${({ theme }) => theme.fontSize.xs};
  }
`;
