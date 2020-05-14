import styled from 'styled-components';

export const TextInput = styled.input`
  border: 1px solid #93b7be;
  border-radius: var(--default-radius);
  padding: var(--small-gap) calc(var(--small-gap) * 2);
  outline: none;

  ::placeholder {
    opacity: 0.45;
  }
`;

export default {};
