import React, { PropsWithChildren } from 'react';
import styled from 'styled-components';
import { Text } from './lib/Text';

const FormGroupWrapper = styled.div`
  display: grid;
  row-gap: var(--small-gap);
`;

type FormGroupProps = PropsWithChildren<{
  label: JSX.Element | string;
  error?: JSX.Element | string;
}>;

export default function FormGroup({ label, error, children }: FormGroupProps) {
  return (
    <FormGroupWrapper>
      <Text tag="label">{label}</Text>
      {children}
      {!!error && (
        <Text tag="div" intent="error">
          {error}
        </Text>
      )}
    </FormGroupWrapper>
  );
}
