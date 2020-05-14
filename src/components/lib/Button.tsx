import styled from 'styled-components';

export const Button = styled.button`
  background-color: var(--accent-color);
  border: 1px solid var(--accent-color);
  color: var(--WHITE-color);
  padding: var(--small-gap) calc(var(--small-gap) * 2);
  border-radius: var(--default-radius);
  cursor: pointer;

  &:active {
    transform: scale(1.025, 1.025) translate3d(0, 0, 0);
  }
`;

export default {};
