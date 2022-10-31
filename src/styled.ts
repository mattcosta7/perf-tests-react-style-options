import styled, { css } from 'styled-components/macro';
import { colStyle, rowStyle } from './styles';
import { sx, SxProp } from '@primer/react';

export const StyledRow = styled.div(rowStyle);

export const StyledCol = styled.div(colStyle);

export const StyledColWithDynamicProps = styled.div<SxProp & { $maxWidth: number }>`
  ${sx}
  font-weight: ${(props) => props.$maxWidth};
`

export const StyledRowWithDynamicProps = styled.div<SxProp & { $maxWidth: number }>`
  ${sx}
  font-weight: ${(props) => props.$maxWidth};
`

export const StyledColWithDynamicPropsStyle = styled.div.attrs<SxProp & { $maxWidth: number }>(props => {
  return {
    style: {
      maxWidth: props.$maxWidth
    }
  }
}) <SxProp & { $maxWidth: number }>`
  ${sx}
`

export const StyledRowWithDynamicPropsStyle = styled.div.attrs<SxProp & { $maxWidth: number }>(props => {
  return {
    style: {
      maxWidth: props.$maxWidth
    }
  }
}) <SxProp & { $maxWidth: number }>`
  ${sx}
`

export const StyledRowWithPropsGetter = styled.div`
  ${(props) => css(rowStyle)}
`;

export const StyledColumnWithPropsGetter = styled.div`
  ${(props) => css(colStyle)}
`;

export const StyledRowWithSx = styled.div<SxProp>`
  ${sx}
`;

export const StyledColWithSx = styled.div<SxProp>`
  ${sx}
`;
