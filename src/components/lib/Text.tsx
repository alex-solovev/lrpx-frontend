import React, { ComponentProps } from 'react';
import styled, { StyledComponent } from 'styled-components';
import { getColorStyles, getTextStyles, getShapeStyles, BaseElementProps } from 'theme/utils';

export const Paragraph = styled.p<BaseElementProps>`
  ${(props) => getShapeStyles(props)}
  ${(props) => getTextStyles(props)}
  ${(props) => getColorStyles(props)}
`;

Paragraph.defaultProps = {
  text: 'body',
  margin: 'none',
};

export const Heading1 = styled.h1<BaseElementProps>`
  ${(props) => getShapeStyles(props)}
  ${(props) => getTextStyles(props)}
  ${(props) => getColorStyles(props)}
`;

Heading1.defaultProps = {
  text: 'heading1',
  weight: 'bold',
  margin: 'none',
};

export const Heading2 = styled.h2<BaseElementProps>`
  ${(props) => getShapeStyles(props)}
  ${(props) => getTextStyles(props)}
  ${(props) => getColorStyles(props)}
`;

Heading2.defaultProps = {
  text: 'heading2',
  weight: 'bold',
  margin: 'none',
};

export const Heading3 = styled.h3<BaseElementProps>`
  ${(props) => getShapeStyles(props)}
  ${(props) => getTextStyles(props)}
  ${(props) => getColorStyles(props)}
`;

Heading3.defaultProps = {
  text: 'heading3',
  weight: 'bold',
  margin: 'none',
};

export const Heading4 = styled.h4<BaseElementProps>`
  ${(props) => getShapeStyles(props)}
  ${(props) => getTextStyles(props)}
  ${(props) => getColorStyles(props)}
`;

Heading4.defaultProps = {
  text: 'heading4',
  weight: 'bold',
  margin: 'none',
};

export const Heading5 = styled.h5<BaseElementProps>`
  ${(props) => getShapeStyles(props)}
  ${(props) => getTextStyles(props)}
  ${(props) => getColorStyles(props)}
`;

Heading5.defaultProps = {
  text: 'heading5',
  weight: 'bold',
  margin: 'none',
};

export const TextBold = styled.b<BaseElementProps>`
  ${(props) => getShapeStyles(props)}
  ${(props) => getTextStyles(props)}
  ${(props) => getColorStyles(props)}
`;

TextBold.defaultProps = {
  weight: 'bold',
};

export const Italic = styled.i<BaseElementProps>`
  ${(props) => getShapeStyles(props)}
  ${(props) => getTextStyles(props)}
  ${(props) => getColorStyles(props)}
`;
export const TextLabel = styled.label<BaseElementProps>`
  ${(props) => getShapeStyles(props)}
  ${(props) => getTextStyles(props)}
  ${(props) => getColorStyles(props)}
`;

TextLabel.defaultProps = {
  text: 'label',
  weight: 'normal',
};

export const TextSpan = styled.span<BaseElementProps>`
  ${(props) => getShapeStyles(props)}
  ${(props) => getTextStyles(props)}
  ${(props) => getColorStyles(props)}
`;
export const TextDiv = styled.div<BaseElementProps>`
  ${(props) => getShapeStyles(props)}
  ${(props) => getTextStyles(props)}
  ${(props) => getColorStyles(props)}
`;

type AllowedTextTags =
  | 'p'
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'h5'
  | 'b'
  | 'i'
  | 'span'
  | 'div'
  | 'label';

type TextProps = {
  tag?: AllowedTextTags;
} & ComponentProps<AllowedTextTags> &
  BaseElementProps;

export const Text = ({
  tag,
  children,
  intent,
  padding,
  margin,
  border,
  radius,
  text,
  weight,
  filled,
  className,
}: TextProps) => {
  if (className) {
    throw new Error("You're not supposed to use classes on UI elements");
  }

  let Element: StyledComponent<AllowedTextTags, {}, BaseElementProps>;

  switch (tag) {
    case 'p':
      Element = Paragraph;
      break;
    case 'h1':
      Element = Heading1;
      break;
    case 'h2':
      Element = Heading2;
      break;
    case 'h3':
      Element = Heading3;
      break;
    case 'h4':
      Element = Heading4;
      break;
    case 'h5':
      Element = Heading5;
      break;
    case 'b':
      Element = TextBold;
      break;
    case 'i':
      Element = Italic;
      break;
    case 'span':
      Element = TextSpan;
      break;
    case 'div':
      Element = TextDiv;
      break;
    case 'label':
      Element = TextLabel;
      break;
    default:
      Element = TextDiv;
      break;
  }

  return (
    <Element
      intent={intent}
      padding={padding}
      margin={margin}
      border={border}
      radius={radius}
      text={text}
      weight={weight}
      filled={filled}
    >
      {children}
    </Element>
  );
};
