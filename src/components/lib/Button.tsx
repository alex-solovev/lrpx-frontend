import styled from 'styled-components';
import { getShapeStyles, getTextStyles, getColorStyles, BaseElementProps } from 'theme/utils';

export const Button = styled.button<BaseElementProps>`
  ${(props) => getShapeStyles(props)}
  ${(props) => getTextStyles(props)}
  ${(props) => getColorStyles(props)}
  
  cursor: pointer;

  &:active {
    transform: scale(1.025, 1.025) translate3d(0, 0, 0);
  }
`;

Button.defaultProps = {
  intent: 'accent',
  padding: ['small', 'medium'],
  border: 'small',
  radius: 'small',
  text: 'body',
  weight: 'bold',
  filled: true,
};

export default {};
