import styled from 'styled-components';
import { getShapeStyles, getTextStyles, getColorStyles, BaseElementProps } from 'theme/utils';

export const TextInput = styled.input<BaseElementProps>`
  ${(props) => getShapeStyles(props)}
  ${(props) => getTextStyles(props)} 
  ${(props) => getColorStyles(props)}
  
  outline: none;

  ::placeholder {
    opacity: 0.45;
  }
`;

TextInput.defaultProps = {
  intent: 'primary',
  padding: 'small',
  border: 'small',
  radius: 'small',
  text: 'body',
  filled: false,
};

export default {};
