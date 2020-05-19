import { ThemedStyledProps } from 'styled-components';

export const tokens = {
  color: {
    white: '#ffffff',
    black: '#000000',
    primary: '#000000',
    secondary: '#00ff00',
    accent: '#0000ff',
    warning: 'orange',
    error: 'red',
    bg: '#FAFAFF',
    fg: '#1C1C1C',
  },
  gap: {
    small: '0.25rem',
    medium: '1rem',
    large: '1.5rem',
  },
  radius: {
    small: '2px',
    medium: '8px',
    large: '50%',
  },
  border: {
    small: '1px',
    medium: '2px',
    large: '3px',
  },
  textSize: {
    body: '1rem',
    heading1: '2rem',
    heading2: '1.8rem',
    heading3: '1.4rem',
    heading4: '1.2rem',
    heading5: '1rem',
    label: '0.85rem',
    small: '0.65rem',
  },
  textWeight: {
    normal: '400',
    bold: 'bold',
  },
};

export type ShorthandTokens = Exclude<keyof typeof tokens, 'color' | 'textSize' | 'textWeight'>;
export type TextSizeToken = keyof typeof tokens.textSize;
export type TextWeightToken = keyof typeof tokens.textWeight;
export type IntentToken = Exclude<keyof typeof tokens.color, 'white' | 'black' | 'bg' | 'fg'>;
export type Side = 'top' | 'right' | 'bottom' | 'left';
export type ShapeTokenProperties = 'margin' | 'padding' | 'border' | 'border-radius';

export type SizeToken = 'small' | 'medium' | 'large' | 'none';
export type SizeListToken =
  | [SizeToken, SizeToken]
  | [SizeToken, SizeToken, SizeToken]
  | [SizeToken, SizeToken, SizeToken, SizeToken];
export type SizeMapToken = {
  top?: SizeToken;
  right?: SizeToken;
  bottom?: SizeToken;
  left?: SizeToken;
};

export type BaseProps = {
  intent?: IntentToken;
};
export type BaseShapeProps = {
  padding?: SizeToken | SizeListToken | SizeMapToken;
  margin?: SizeToken | SizeListToken | SizeMapToken;
  radius?: SizeToken | SizeListToken | SizeMapToken;
  border?: SizeToken | SizeListToken | SizeMapToken;
  filled?: boolean;
};
export type BaseColorProps = {};
export type BaseTextProps = {
  weight?: 'normal' | 'bold';
  text?: TextSizeToken;
};

export type BaseElementProps = BaseProps & BaseShapeProps & BaseTextProps & BaseColorProps;

export type HelperArgs = ThemedStyledProps<BaseElementProps, any>;

const convertToDashCase = (str: string) => str.replace(/[A-Z]/g, (m) => `-${m.toLowerCase()}`);
// const convertToCamelCase = (str: string) => str.replace(/-[A-Z]/g, (m) => m[1]);

export const getCSSTokens = (map: typeof tokens) => {
  return Object.keys(map).reduce((acc, tokenKey) => {
    const dashedToken = convertToDashCase(tokenKey);
    const token = map[tokenKey as keyof typeof tokens];
    const tokenKeys = Object.keys(token);
    const tokenCSS = tokenKeys
      .map((key) => `--${key}-${dashedToken}:${token[key as keyof typeof token]};`)
      .join('\n');

    return `${acc}\n${tokenCSS}`;
  }, '');
};

const getRGBValues = (color: string): [number, number, number] => {
  const [r1, r2, g1, g2, b1, b2] = color.replace('#', '').split('');

  return [parseInt(r1 + r2, 16), parseInt(g1 + g2, 16), parseInt(b1 + b2, 16)] as [
    number,
    number,
    number,
  ];
};
const backgroundIsLight = (r: number, g: number, b: number): boolean => {
  const a = 1 - (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return a < 0.5;
};

// Text helpers
export const getTextSize = ({ text }: HelperArgs) => `font-size: var(--${text}-text-size);`;
export const getTextWeight = ({ weight }: HelperArgs) =>
  `font-weight: var(--${weight}-text-weight);`;

// Color helpers
export const getBackgroundColor = ({ intent }: HelperArgs) =>
  `background-color: var(--${intent}-color)};`;
export const getTextColor = ({ intent }: HelperArgs) => {
  return `color: var(--${intent}-color);`;
};
export const getBorderColor = ({ intent }: HelperArgs) => {
  return intent ? `border-color: var(--${intent}-color);` : 'border-color: inherit';
};

const getTokenCSSValue = (tokenKey: string, value?: SizeToken) => {
  if (!value) {
    return null;
  }

  return value === 'none' ? 0 : `var(--${value}-${tokenKey})`;
};
const getBorderCSSValue = (tokenKey: string, value?: SizeToken) => {
  if (!value) {
    return null;
  }

  return value === 'none' ? 0 : `var(--${value}-${tokenKey}) solid`;
};

export const getBorder = (args: HelperArgs) => {
  const property = 'border';
  const tokenKey = 'border';
  const tokenValue = args.border;

  if (!tokenValue) {
    return '';
  }

  if (tokenValue === 'none') {
    return `${property}: none;`;
  }

  if (Array.isArray(tokenValue)) {
    // TODO: handle this case properly
    return `${property}: ${tokenValue.map((t) => getBorderCSSValue(tokenKey, t)).join(' ')};`;
  }

  if (typeof tokenValue === 'object') {
    const isValueSet = (value: string | 0 | null) => value !== null;
    const top = getBorderCSSValue(tokenKey, tokenValue.top);
    const right = getBorderCSSValue(tokenKey, tokenValue.right);
    const bottom = getBorderCSSValue(tokenKey, tokenValue.bottom);
    const left = getBorderCSSValue(tokenKey, tokenValue.left);

    return `
      ${isValueSet(top) ? `${property}-top: ${top};` : ''}
      ${isValueSet(right) ? `${property}-right: ${right};` : ''}
      ${isValueSet(bottom) ? `${property}-bottom: ${bottom};` : ''}
      ${isValueSet(left) ? `${property}-left: ${left};` : ''}
    `;
  }

  return `${property}: ${getBorderCSSValue(tokenKey, tokenValue)};`;
};

export const getMargin = (args: HelperArgs) => {
  const property = 'margin';
  const tokenKey = 'gap';
  const tokenValue = args.margin;

  if (!tokenValue) {
    return '';
  }

  if (tokenValue === 'none') {
    return `${property}: 0;`;
  }

  if (Array.isArray(tokenValue)) {
    return `${property}: ${tokenValue.map((t) => getTokenCSSValue(tokenKey, t)).join(' ')};`;
  }

  if (typeof tokenValue === 'object') {
    const isValueSet = (value: string | 0 | null) => value !== null;
    const top = getTokenCSSValue(tokenKey, tokenValue.top);
    const right = getTokenCSSValue(tokenKey, tokenValue.right);
    const bottom = getTokenCSSValue(tokenKey, tokenValue.bottom);
    const left = getTokenCSSValue(tokenKey, tokenValue.left);

    if (isValueSet(top) && isValueSet(right) && isValueSet(bottom) && isValueSet(left)) {
      if (isValueSet(left)) {
        return `${property}: ${top} ${right} ${bottom} ${left};`;
      }

      return `${property}: ${top} ${right} ${bottom};`;
    }

    return `
      ${isValueSet(top) ? `${property}-top: ${top};` : ''}
      ${isValueSet(right) ? `${property}-right: ${right};` : ''}
      ${isValueSet(bottom) ? `${property}-bottom: ${bottom};` : ''}
      ${isValueSet(left) ? `${property}-left: ${left};` : ''}
    `;
  }

  return `${property}: var(--${tokenValue}-${tokenKey});`;
};

export const getPadding = (args: HelperArgs) => {
  const property = 'padding';
  const tokenKey = 'gap';
  const tokenValue = args.padding;

  if (!tokenValue) {
    return '';
  }

  if (tokenValue === 'none') {
    return `${property}: 0;`;
  }

  if (Array.isArray(tokenValue)) {
    return `${property}: ${tokenValue.map((t) => getTokenCSSValue(tokenKey, t)).join(' ')};`;
  }

  if (typeof tokenValue === 'object') {
    const isValueSet = (value: string | 0 | null) => value !== null;
    const top = getTokenCSSValue(tokenKey, tokenValue.top);
    const right = getTokenCSSValue(tokenKey, tokenValue.right);
    const bottom = getTokenCSSValue(tokenKey, tokenValue.bottom);
    const left = getTokenCSSValue(tokenKey, tokenValue.left);

    if (isValueSet(top) && isValueSet(right) && isValueSet(bottom) && isValueSet(left)) {
      if (isValueSet(left)) {
        return `${property}: ${top} ${right} ${bottom} ${left};`;
      }

      return `${property}: ${top} ${right} ${bottom};`;
    }

    return `
      ${isValueSet(top) ? `${property}-top: ${top};` : ''}
      ${isValueSet(right) ? `${property}-right: ${right};` : ''}
      ${isValueSet(bottom) ? `${property}-bottom: ${bottom};` : ''}
      ${isValueSet(left) ? `${property}-left: ${left};` : ''}
    `;
  }

  return `${property}: var(--${tokenValue}-${tokenKey});`;
};

export const getRadius = (args: HelperArgs) => {
  const property = 'border-radius';
  const tokenKey = 'radius';
  const tokenValue = args.radius;

  if (!tokenValue) {
    return '';
  }

  if (tokenValue === 'none') {
    return `${property}: 0;`;
  }

  if (Array.isArray(tokenValue)) {
    return `${property}: ${tokenValue.map((t) => getTokenCSSValue(tokenKey, t)).join(' ')};`;
  }

  if (typeof tokenValue === 'object') {
    const isValueSet = (value: string | 0 | null) => value !== null;
    const top = getTokenCSSValue(tokenKey, tokenValue.top);
    const right = getTokenCSSValue(tokenKey, tokenValue.right);
    const bottom = getTokenCSSValue(tokenKey, tokenValue.bottom);
    const left = getTokenCSSValue(tokenKey, tokenValue.left);

    if (isValueSet(top) && isValueSet(right) && isValueSet(bottom) && isValueSet(left)) {
      if (isValueSet(left)) {
        return `${property}: ${top} ${right} ${bottom} ${left};`;
      }

      return `${property}: ${top} ${right} ${bottom};`;
    }

    return `
      ${isValueSet(top) ? `${property}-top: ${top};` : ''}
      ${isValueSet(right) ? `${property}-right: ${right};` : ''}
      ${isValueSet(bottom) ? `${property}-bottom: ${bottom};` : ''}
      ${isValueSet(left) ? `${property}-left: ${left};` : ''}
    `;
  }

  return `${property}: var(--${tokenValue}-${tokenKey});`;
};

export const getShapeStyles = (args: HelperArgs) => `
  ${getPadding(args)}
  ${getMargin(args)}
  ${getRadius(args)}
  ${getBorder(args)}
`;

export const getTextStyles = (args: HelperArgs) => `
  ${getTextSize(args)}
  ${getTextWeight(args)}
`;

export const getColorStyles = (args: HelperArgs) => {
  const { filled, intent = 'primary' } = args;

  if (filled) {
    const rgb = getRGBValues(tokens.color[intent as keyof typeof tokens.color]);
    const color = backgroundIsLight(...rgb) ? 'var(--black-color)' : 'var(--white-color)';

    return `
      color: ${color};
      ${getBackgroundColor(args)}
      ${getBorderColor(args)}
    `;
  }

  return `
    background-color: transparent;
    ${getTextColor(args)}
    ${getBorderColor(args)}
  `;
};
