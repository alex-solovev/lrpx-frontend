import React from 'react';
import DefaultTheme from 'theme/default.theme';
import { Button } from './Button';

export default {
  component: Button,
  title: 'Button',
  decorators: [
    (story: any): JSX.Element => (
      <>
        <DefaultTheme />
        {story()}
      </>
    ),
  ],
};

export const Default = (): JSX.Element => <Button>Default button</Button>;
