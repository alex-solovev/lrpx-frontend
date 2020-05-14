import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
  :root {
    --WHITE-color: #fff;
    --primary-color: #554348;
    --accent-color: #554348;
    --bg-color: #D4F5F5;
    --fg-color: var(--primary-color);

    --small-gap: 0.25rem;
    --medium-gap: 1rem;
    --large-gap: 1.5rem;

    --default-border: 2px;
    --default-radius: 2px;
  }

  html {
    background-color: var(--bg-color);
  }
`;
