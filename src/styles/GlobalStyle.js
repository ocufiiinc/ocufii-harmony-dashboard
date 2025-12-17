// src/styles/GlobalStyle.js
import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: 'Decimal';
    src: url('./src/assets/fonts/decimal-light.ttf') format('truetype');
    font-weight: 300;
    font-style: normal;
    font-display: swap;
  }

  @font-face {
    font-family: 'Decimal';
    src: url('./src/assets/fonts/decimal-book.ttf') format('truetype');
    font-weight: 400;
    font-style: normal;
    font-display: swap;
  }

  @font-face {
    font-family: 'Decimal';
    src: url('./src/assets/fonts/decimal-medium.ttf') format('truetype');
    font-weight: 500;
    font-style: normal;
    font-display: swap;
  }

  @font-face {
    font-family: 'Decimal';
    src: url('./src/assets/fonts/decimal-semibold.ttf') format('truetype');
    font-weight: 600;
    font-style: normal;
    font-display: swap;
  }

  @font-face {
    font-family: 'Decimal';
    src: url('./src/assets/fonts/decimal-bold.otf') format('opentype');
    font-weight: 700;
    font-style: normal;
    font-display: swap;
  }

  @font-face {
    font-family: 'Decimal';
    src: url('./src/assets/fonts/decimal-extrablack.otf') format('opentype');
    font-weight: 800;
    font-style: normal;
    font-display: swap;
  }

  @font-face {
    font-family: 'Decimal';
    src: url('./src/assets/fonts/decimal-black.ttf') format('truetype');
    font-weight: 900;
    font-style: normal;
    font-display: swap;
  }

  @font-face {
    font-family: 'Decimal';
    src: url('./src/assets/fonts/decimal-ultra.ttf') format('truetype');
    font-weight: 950;
    font-style: normal;
    font-display: swap;
  }

  @font-face {
    font-family: 'Decimal';
    src: url('./src/assets/fonts/decimal-ultra-italic.ttf') format('truetype');
    font-weight: 950;
    font-style: italic;
    font-display: swap;
  }

  *, *::before, *::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  body {
    margin: 0;
    background-color: ${({ theme }) => theme.colors.background};
    color: ${({ theme }) => theme.colors.textPrimary};
    font-family: ${({ theme }) => theme.fontFamily.primary};
    font-weight: 400;
    line-height: 1.5;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    font-feature-settings: "kern" 1;
    text-rendering: optimizeLegibility;
    transition: background-color 0.3s ease, color 0.3s ease;
  }

  #root {
    font-family: ${({ theme }) => theme.fontFamily.primary};
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  button {
    font-family: ${({ theme }) => theme.fontFamily.primary};
  }

  input, textarea, select {
    font-family: ${({ theme }) => theme.fontFamily.primary};
  }

  h1, h2, h3, h4, h5, h6 {
    font-family: ${({ theme }) => theme.fontFamily.primary};
    font-weight: 600;
    line-height: 1.2;
  }

  p {
    font-family: ${({ theme }) => theme.fontFamily.primary};
    line-height: 1.6;
  }
`;

export default GlobalStyle;
