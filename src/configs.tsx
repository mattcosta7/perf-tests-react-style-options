import { theme, ThemeProvider } from '@primer/react';
import React from 'react';
import { ProfileGridProps } from './ProfileGrid';
import {
    BaseStyledCol,
    BaseStyledColumnWithPropsGetter,
    BaseStyledColumnWithPropsGetterUnstable,
    BaseStyledColumnWithSomeSystemPropsUnused,
    BaseStyledColumnWithSomeSystemPropsUsed,
    BaseStyledRow,
    BaseStyledRowWithPropsGetter,
    BaseStyledRowWithPropsGetterUnstable,
    BaseStyledRowWithSomeSystemPropsUnused,
    BaseStyledRowWithSomeSystemPropsUsed,
    GlobalCssDivColumnStable,
    GlobalCssDivRowStable,
    InlineStyleBoxColumn,
    InlineStyleBoxRow,
    InlineStyleDivColumn,
    InlineStyleDivColumnStable,
    InlineStyleDivRow,
    InlineStyleDivRowStable,
    InlineSXBoxColumn,
    InlineSXBoxColumnNewStyleProp,
    InlineSXBoxColumnStable,
    InlineSXBoxRow,
    InlineSXBoxRowNewStyleProp,
    InlineSXBoxRowStable,
    InlineSXStyledColumn,
    InlineSXStyledRow,
    ModStyleDivColumn,
    ModStyleDivRow,
    StyledColDynamicProps,
    StyledColDynamicPropsStyle,
    StyledColumnWithPropsGetterWithStableSx,
    StyledColUnusedDynamicProp,
    StyledColUnusedDynamicProp5x,
    StyledColUnusedDynamicProp5xStringOnly,
    StyledRowDynamicProps,
    StyledRowDynamicPropsStyle,
    StyledRowUnusedDynamicProp,
    StyledRowUnusedDynamicProp5x,
    StyledRowUnusedDynamicProp5xStringOnly,
    StyledRowWithPropsGetterWithStableSx,
    VanillaStyleDivColumn,
    VanillaStyleDivRow,
} from './renderers';

export const configs: Array<
    Omit<ProfileGridProps, 'handleRender'> & {
        getWrapper?: ({ children }: { children: React.ReactNode }) => JSX.Element;
    }
> = [
        {
            name: '[Inline styles] - stable object',
            getRow: InlineStyleDivRowStable,
            getCol: InlineStyleDivColumnStable,
        },
        {
            name: '[Inline styles] - dynamic object',
            getRow: InlineStyleDivRow,
            getCol: InlineStyleDivColumn,
        },
        {
            name: '[Static CSS] - Global',
            getRow: GlobalCssDivRowStable,
            getCol: GlobalCssDivColumnStable,
        },
        {
            name: '[Static CSS] - CSS Modules',
            getRow: ModStyleDivRow,
            getCol: ModStyleDivColumn,
        },
        {
            name: '[Static CSS] - Vanilla extract',
            getRow: VanillaStyleDivRow,
            getCol: VanillaStyleDivColumn,
        },
        {
            name: '[Styled components] - static styles only',
            getRow: BaseStyledRow,
            getCol: BaseStyledCol,
        },
        {
            name: '[Styled components] - static styles only unused dynamic ${props => css``}',
            getRow: StyledRowUnusedDynamicProp,
            getCol: StyledColUnusedDynamicProp,
        },
        {
            name: '[Styled components] - static styles only unused dynamic ${props => css``,props => css``,props => css``,props => css``,props => css``}',
            getRow: StyledRowUnusedDynamicProp5x,
            getCol: StyledColUnusedDynamicProp5x,
        },
        {
            name: "[Styled components] - static styles only unused dynamic ${props => '',props => '',props => '',props => '',props => ''}",
            getRow: StyledRowUnusedDynamicProp5xStringOnly,
            getCol: StyledColUnusedDynamicProp5xStringOnly,
        },
        {
            name: '[Styled components] - dynamic style creation ${props => css(obj)}',
            getRow: BaseStyledRowWithPropsGetter,
            getCol: BaseStyledColumnWithPropsGetter,
        },
        {
            name: '[Styled components] - dynamic, unstable style creation ${props => css({...obj})}',
            getRow: BaseStyledRowWithPropsGetterUnstable,
            getCol: BaseStyledColumnWithPropsGetterUnstable,
        },
        {
            name: '[Styled components] - SX prop, dynamic object',
            getRow: InlineSXStyledRow,
            getCol: InlineSXStyledColumn,
        },
        {
            name: '[Styled components] - SX prop, stable object',
            getRow: StyledRowWithPropsGetterWithStableSx,
            getCol: StyledColumnWithPropsGetterWithStableSx,
        },
        {
            name: '[Styled components] - SX prop + New css declaration per render {dynamic maxWidth}',
            getRow: StyledRowDynamicProps,
            getCol: StyledColDynamicProps,
        },
        {
            name: '[Styled components] - SX prop + Style update from dynamic prop attrs',
            getRow: StyledRowDynamicPropsStyle,
            getCol: StyledColDynamicPropsStyle,
        },
        {
            name: '[Styled components] - static styles, unused handful of unused system props',
            getRow: BaseStyledRowWithSomeSystemPropsUnused,
            getCol: BaseStyledColumnWithSomeSystemPropsUnused,
        },
        {
            name: '[Styled components] - static styles, unused handful of system props with object prop',
            getRow: BaseStyledRowWithSomeSystemPropsUsed,
            getCol: BaseStyledColumnWithSomeSystemPropsUsed,
        },
        {
            name: '[Box] - SX prop, dynamic object',
            getRow: InlineSXBoxRow,
            getCol: InlineSXBoxColumn,
        },
        {
            name: '[Box] - SX prop, stable object',
            getRow: InlineSXBoxRowStable,
            getCol: InlineSXBoxColumnStable,
        },
        {
            name: '[Box] - inline style',
            getRow: InlineStyleBoxRow,
            getCol: InlineStyleBoxColumn,
        },
        {
            name: '[Box] - SX prop, inside `ThemeProvider`',
            getRow: InlineSXBoxRow,
            getCol: InlineSXBoxColumn,
            getWrapper: ({ children }: { children: React.ReactNode }) => (
                <ThemeProvider theme={theme}>{children}</ThemeProvider>
            ),
        },
        {
            name: '[Box] - inline style, inside `ThemeProvider`',
            getRow: InlineStyleBoxRow,
            getCol: InlineStyleBoxColumn,
            getWrapper: ({ children }: { children: React.ReactNode }) => (
                <ThemeProvider theme={theme}>{children}</ThemeProvider>
            ),
        },
        {
            name: '[Box] - SX prop + New css declaration per render {dynamic maxWidth}',
            getRow: InlineSXBoxRowNewStyleProp,
            getCol: InlineSXBoxColumnNewStyleProp,
        },
    ];

if (new Set(configs.map((c) => c.name)).size !== configs.length) {
    throw new Error('Config names must be unique');
}
