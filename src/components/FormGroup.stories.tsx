import React from 'react';
import { withKnobs } from '@storybook/addon-knobs';
import { ThemeDecorator } from 'theme/decorators';
import FormGroup from './FormGroup';
import { TextInput } from './lib/TextInput';

export default {
  title: 'FormGroup',
  component: FormGroup,
  decorators: [withKnobs, ThemeDecorator],
};

export const Default = () => (
  <FormGroup label="Control label" error="Input invalid enter something else!">
    <TextInput placeholder="Placeholder..." />
  </FormGroup>
);
