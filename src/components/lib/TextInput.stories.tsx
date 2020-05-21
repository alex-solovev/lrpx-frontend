/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { withKnobs } from '@storybook/addon-knobs';
import { ThemeDecorator, KnobDecorator } from 'theme/decorators';
import { TextInput } from './TextInput';

export default {
  component: TextInput,
  title: 'TextInput',
  decorators: [withKnobs, ThemeDecorator],
};

export const Default = () => (
  <KnobDecorator {...TextInput.defaultProps}>
    <TextInput placeholder="Text input..." />
  </KnobDecorator>
);

export const Rounded = () => (
  <KnobDecorator {...TextInput.defaultProps} radius="large" padding={['small', 'medium']}>
    <TextInput placeholder="Text input..." />
  </KnobDecorator>
);
