import { sx, SxProp } from '@primer/react';
import styled, { css } from 'styled-components/macro';
import { colStyle, rowStyle } from './styles';
import {
  background,
  BackgroundProps,
  border,
  BorderProps,
  color,
  ColorProps,
  flexbox,
  FlexboxProps,
  grid,
  GridProps,
  layout,
  LayoutProps,
  position,
  PositionProps,
  shadow,
  ShadowProps,
  space,
  SpaceProps,
  typography,
  TypographyProps,
} from 'styled-system';

export const StyledRow = styled.div(rowStyle);

export const StyledCol = styled.div(colStyle);

export const StyledRowWithSomeSystemProps = styled.div<SxProp & BackgroundProps & BorderProps & ColorProps & FlexboxProps & GridProps & LayoutProps & PositionProps & ShadowProps & SpaceProps & TypographyProps>(
  background,
  border,
  color,
  flexbox,
  grid,
  layout,
  position,
  shadow,
  space,
  typography,
  sx
);

export const StyledColWithSomeSystemProps = styled.div<SxProp & BackgroundProps & BorderProps & ColorProps & FlexboxProps & GridProps & LayoutProps & PositionProps & ShadowProps & SpaceProps & TypographyProps>(
  background,
  border,
  color,
  flexbox,
  grid,
  layout,
  position,
  shadow,
  space,
  typography,
  sx
);

export const StyledRowWithUnusedDynamicProp = styled.div(rowStyle, () => css``);

export const StyledColWithUnusedDynamicProp = styled.div(colStyle, () => css``);

export const StyledRowWithUnusedDynamicProp5x = styled.div(
  rowStyle,
  () => css``,
  () => css``,
  () => css``,
  () => css``,
  () => css``,
);

export const StyledColWithUnusedDynamicProp5x = styled.div(
  colStyle,
  () => css``,
  () => css``,
  () => css``,
  () => css``,
  () => css``,
);

export const StyledRowWithUnusedDynamicProp5xStringOnly = styled.div(
  rowStyle,
  () => '',
  () => '',
  () => '',
  () => '',
  () => '',
);

export const StyledColWithUnusedDynamicProp5xStringOnly = styled.div(
  colStyle,
  () => '',
  () => '',
  () => '',
  () => '',
  () => '',
);

export const StyledColWithDynamicProps = styled.div<SxProp & { $maxWidth: number }>`
  ${sx}
  max-width: ${(props) => props.$maxWidth}px;
`;

export const StyledRowWithDynamicProps = styled.div<SxProp & { $maxWidth: number }>`
  ${sx}
  max-width: ${(props) => props.$maxWidth}px;
`;

export const StyledColWithDynamicPropsStyle = styled.div.attrs<SxProp & { $maxWidth: number }>(
  (props) => {
    return {
      style: {
        maxWidth: (props.$maxWidth || 1) + 'px',
      },
    };
  },
) <SxProp & { $maxWidth: number }>`
  ${sx}
`;

export const StyledRowWithDynamicPropsStyle = styled.div.attrs<SxProp & { $maxWidth: number }>(
  (props) => {
    return {
      style: {
        maxWidth: (props.$maxWidth ?? 1) + 'px',
      },
    };
  },
) <SxProp & { $maxWidth: number }>`
  ${sx}
`;

export const StyledRowWithPropsGetter = styled.div`
  ${(props) => css(rowStyle)}
`;

export const StyledColumnWithPropsGetter = styled.div`
  ${(props) => css(colStyle)}
`;

export const StyledRowWithPropsGetterUnstable = styled.div`
  ${(props) => css({ ...rowStyle })}
`;

export const StyledColumnWithPropsGetterUnstable = styled.div`
  ${(props) => css({ ...colStyle })}
`;

export const StyledRowWithSx = styled.div<SxProp>`
  ${sx}
`;

export const StyledColWithSx = styled.div<SxProp>`
  ${sx}
`;
