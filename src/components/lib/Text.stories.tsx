import React from 'react';
import DefaultTheme from 'theme/default.theme';
import { Text } from './Text';

export default {
  component: Text,
  title: 'Text',
  decorators: [
    (story: any): JSX.Element => (
      <>
        <DefaultTheme />
        {story()}
      </>
    ),
  ],
};

export const Default = () => <Text>Default text that uses div as an html tag.</Text>;
export const Label = () => <Text tag="label">Form label text</Text>;
export const HeadingLevel1 = () => <Text tag="h1">Level one heading</Text>;
