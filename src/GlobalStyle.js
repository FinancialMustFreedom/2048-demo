import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  html, body, div {
    padding: 0;
  }

  html {
    min-height: 100vh;
  }

  body {
    background: ${({ theme }) => theme.gradient};
    color: ${({ theme }) => theme.text};
    transition: all 0.20s linear;
    font-family: "open sans extra bold", helvetica, arial, sans serif;
    // font-family:  "Helvetica Neue", Helvetica, Arial, sans-serif;
  }
`;

export default GlobalStyle;
