/*  eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { withKnobs } from '@storybook/addon-knobs';
import { ThemeDecorator, KnobDecorator } from 'theme/decorators';
import { Button } from './Button';

export default {
  component: Button,
  title: 'Button',
  decorators: [withKnobs, ThemeDecorator],
};

export const Default = () => (
  <KnobDecorator {...Button.defaultProps}>
    <Button>Defaut Button</Button>
  </KnobDecorator>
);

export const Outlined = () => (
  <KnobDecorator {...Button.defaultProps} filled={false}>
    <Button>Defaut Button</Button>
  </KnobDecorator>
);

export const Rounded = () => (
  <KnobDecorator {...Button.defaultProps} radius="large" padding={['small', 'medium']}>
    <Button>Defaut Button</Button>
  </KnobDecorator>
);

export const RoundedOutlined = () => (
  <KnobDecorator
    {...Button.defaultProps}
    radius="large"
    filled={false}
    padding={['small', 'medium']}
  >
    <Button>Defaut Button</Button>
  </KnobDecorator>
);
