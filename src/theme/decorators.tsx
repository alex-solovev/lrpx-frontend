import React, { ReactElement } from 'react';
import { select, boolean } from '@storybook/addon-knobs';
import DefaultTheme from './default.theme';
import {
  SizeToken,
  TextSizeToken,
  TextWeightToken,
  IntentToken,
  SizeListToken,
  SizeMapToken,
  BaseElementProps,
} from './utils';

export const ThemeDecorator = (story: any): JSX.Element => (
  <>
    <DefaultTheme />
    {story()}
  </>
);

const getSizeTokenSelect = (label: string, group: string, initialValue?: SizeToken) =>
  select<SizeToken>(
    label,
    { small: 'small', medium: 'medium', large: 'large', none: 'none' },
    initialValue || 'none',
    group,
  );

const getSizeTokenKnobsFromSingleValue = (group: string, value?: SizeToken) => {
  return [
    getSizeTokenSelect('Top', group, value),
    getSizeTokenSelect('Right', group, value),
    getSizeTokenSelect('Bottom', group, value),
    getSizeTokenSelect('Left', group, value),
  ];
};

const getSizeTokenKnobsFromList = (group: string, value: SizeListToken) => {
  switch (value.length) {
    case 4:
      return [
        getSizeTokenSelect('Top', group, value[0]),
        getSizeTokenSelect('Right', group, value[1]),
        getSizeTokenSelect('Bottom', group, value[2]),
        getSizeTokenSelect('Left', group, value[3]),
      ];
    case 3:
      return [
        getSizeTokenSelect('Top', group, value[0]),
        getSizeTokenSelect('Right', group, value[1]),
        getSizeTokenSelect('Bottom', group, value[2]),
        getSizeTokenSelect('Left', group, value[1]),
      ];
    case 2:
      return [
        getSizeTokenSelect('Top', group, value[0]),
        getSizeTokenSelect('Right', group, value[1]),
        getSizeTokenSelect('Bottom', group, value[0]),
        getSizeTokenSelect('Left', group, value[1]),
      ];
    default:
      return [];
  }
};

const getSizeTokenKnobsFromMap = (group: string, value: SizeMapToken) => {
  return Object.keys(value).map((key) =>
    getSizeTokenSelect(key, group, value[key as keyof SizeMapToken]),
  );
};

const getSizeTokenKnobs = (
  group: string,
  value: SizeToken | SizeListToken | SizeMapToken = 'none',
) => {
  if (Array.isArray(value)) {
    return getSizeTokenKnobsFromList(group, value);
  }

  if (typeof value === 'object') {
    return getSizeTokenKnobsFromMap(group, value);
  }

  return getSizeTokenKnobsFromSingleValue(group, value);
};

type KnobDecoratorProps = {
  children: ReactElement;
} & BaseElementProps;

export const KnobDecorator = ({
  children,
  border = 'none',
  intent = 'primary',
  margin = 'none',
  padding = 'none',
  radius = 'none',
  text = 'body',
  weight = 'normal',
  filled = false,
}: KnobDecoratorProps) => {
  const [topMargin, rightMargin, bottomMargin, leftMargin] = getSizeTokenKnobs('Margin', margin);
  const [topBorder, rightBorder, bottomBorder, leftBorder] = getSizeTokenKnobs('Border', border);
  const [topRadius, rightRadius, bottomRadius, leftRadius] = getSizeTokenKnobs('Radius', radius);
  const [topPadding, rightPadding, bottomPadding, leftPadding] = getSizeTokenKnobs(
    'Padding',
    padding,
  );

  const textSize = select<TextSizeToken>(
    'Text',
    ['body', 'heading1', 'heading2', 'heading3', 'heading4', 'heading5', 'label', 'small'],
    text,
    'Text',
  );

  const textWeight = select<TextWeightToken>('Weight', ['normal', 'bold'], weight, 'Text');

  const filledValue = boolean('filled', filled, 'Style');

  const intentValue = select<IntentToken>(
    'Intent',
    ['primary', 'secondary', 'accent', 'error', 'warning'],
    intent,
    'Style',
  );

  return React.cloneElement(children, {
    intent: intentValue,
    filled: filledValue,
    text: textSize,
    weight: textWeight,
    padding: { top: topPadding, right: rightPadding, bottom: bottomPadding, left: leftPadding },
    margin: { top: topMargin, right: rightMargin, bottom: bottomMargin, left: leftMargin },
    border: { top: topBorder, right: rightBorder, bottom: bottomBorder, left: leftBorder },
    radius: { top: topRadius, right: rightRadius, bottom: bottomRadius, left: leftRadius },
  });
};

export default {};
