/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { withKnobs } from '@storybook/addon-knobs';
import { ThemeDecorator, KnobDecorator } from 'theme/decorators';
import {
  Text,
  Heading1,
  Heading2,
  Heading3,
  Heading4,
  Heading5,
  TextLabel,
  TextBold,
} from './Text';

export default {
  component: Text,
  title: 'Text',
  decorators: [withKnobs, ThemeDecorator],
};

export const Default = () => (
  <KnobDecorator>
    <Text>Default text that uses div as an html tag.</Text>
  </KnobDecorator>
);

export const Label = () => (
  <KnobDecorator {...TextLabel.defaultProps}>
    <Text tag="label">Form label text</Text>
  </KnobDecorator>
);

export const Bold = () => (
  <KnobDecorator {...TextBold.defaultProps}>
    <Text tag="b">Bold text</Text>
  </KnobDecorator>
);

export const HeadingLevel1 = () => (
  <KnobDecorator {...Heading1.defaultProps}>
    <Text tag="h1">Level one heading</Text>
  </KnobDecorator>
);

export const HeadingLevel2 = () => (
  <KnobDecorator {...Heading2.defaultProps}>
    <Text tag="h2">Level two heading</Text>
  </KnobDecorator>
);

export const HeadingLevel3 = () => (
  <KnobDecorator {...Heading3.defaultProps}>
    <Text tag="h3">Level three heading</Text>
  </KnobDecorator>
);

export const HeadingLevel4 = () => (
  <KnobDecorator {...Heading4.defaultProps}>
    <Text tag="h4">Level four heading</Text>
  </KnobDecorator>
);

export const HeadingLevel5 = () => (
  <KnobDecorator {...Heading5.defaultProps}>
    <Text tag="h5">Level five heading</Text>
  </KnobDecorator>
);
