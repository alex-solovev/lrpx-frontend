import styled from 'styled-components';

type GridProps = {
  width?: string | number;
  height?: string | number;
  rows?: string;
  columns?: string;
  gap?: 'small' | 'medium' | 'large';
};

export const Grid = styled.div<GridProps>`
  display: grid;
  grid-gap: ${(props) => `var(--${props.gap}-gap)` || 0};
  grid-template-rows: ${(props) => props.rows || 'auto'};
  grid-template-columns: ${(props) => props.columns || 'auto'};
  width: ${({ width = '100%' }) => (typeof width === 'number' ? `${width}px` : width)};
  height: ${({ height = '100%' }) => (typeof height === 'number' ? `${height}px` : height)};
`;

export default {};
