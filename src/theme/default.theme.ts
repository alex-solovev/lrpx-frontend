import { createGlobalStyle } from 'styled-components';
import { getCSSTokens, tokens } from './utils';

export default createGlobalStyle`
  :root {
    ${getCSSTokens(tokens)}
  }

  html {
    background-color: var(--bg-color);
  }

  body {
    font-family: sans-serif;
  }
`;
