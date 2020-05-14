import React from 'react';
import DefaultTheme from 'theme/default.theme';
import { TextInput } from './TextInput';

export default {
  component: TextInput,
  title: 'TextInput',
  decorators: [
    (story: any): JSX.Element => (
      <>
        <DefaultTheme />
        {story()}
      </>
    ),
  ],
};

export const Default = (): JSX.Element => <TextInput placeholder="Text input..." />;
