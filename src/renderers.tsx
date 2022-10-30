import { Box } from '@primer/react';
import { PropsWithChildren } from 'react';
import {
  StyledCol,
  StyledRowWithPropsGetter,
  StyledColumnWithPropsGetter,
  StyledColWithSx,
  StyledRow,
  StyledRowWithSx,
} from './styled';
import { colStyle, rowStyle } from './styles';
import { columnStyledVanilla, rowStyleVanilla } from './styles.css';
import styles from './style.module.css';

/**
 * Defining each of these as an line function call here.
 * We don't pass the styled component directly, to avoid
 * skewing the metrics in their favor from having one
 * fewer wrapper
 */
export const InlineStyleDivRowStable = ({ children }: PropsWithChildren) => (
  <div style={rowStyle}>{children}</div>
);
export const InlineStyleDivColumnStable = () => <div style={colStyle} />;
export const GlobalCssDivRowStable = ({ children }: PropsWithChildren) => (
  <div className="row">{children}</div>
);
export const GlobalCssDivColumnStable = () => <div className="col" />;
export const InlineStyleDivRow = ({ children }: PropsWithChildren) => (
  <div style={{ ...rowStyle }}>{children}</div>
);
export const InlineStyleDivColumn = () => <div style={{ ...colStyle }} />;
export const VanillaStyleDivRow = ({ children }: PropsWithChildren) => (
  <div className={rowStyleVanilla}>{children}</div>
);
export const VanillaStyleDivColumn = () => <div className={columnStyledVanilla} />;
export const BaseStyledCol = () => <StyledCol />;
export const BaseStyledRow = ({ children }: PropsWithChildren) => <StyledRow>{children}</StyledRow>;
export const ModStyleDivRow = ({ children }: PropsWithChildren) => (
  <div className={styles.rowStyleModule}>{children}</div>
);
export const ModStyleDivColumn = () => <div className={styles.colStyleModule} />;
export const InlineSXStyledRow = ({ children }: PropsWithChildren) => (
  <StyledRowWithSx sx={{ ...rowStyle }}>{children}</StyledRowWithSx>
);
export const InlineSXStyledColumn = () => <StyledColWithSx sx={{ ...colStyle }} />;
export const InlineStyleBoxRow = ({ children }: PropsWithChildren) => (
  <Box style={{ ...rowStyle }}>{children}</Box>
);
export const InlineStyleBoxColumn = () => <Box style={{ ...colStyle }} />;
export const InlineSXBoxRow = ({ children }: PropsWithChildren) => (
  <Box sx={{ ...rowStyle }}>{children}</Box>
);
export const InlineSXBoxColumn = () => <Box sx={{ ...colStyle }} />;
export const InlineSXBoxRowStable = ({ children }: PropsWithChildren) => (
  <Box sx={rowStyle}>{children}</Box>
);
export const InlineSXBoxColumnStable = () => <Box sx={colStyle} />;
export const StyledRowWithPropsGetterWithStableSx = ({ children }: PropsWithChildren) => (
  <StyledRowWithSx sx={rowStyle}>{children}</StyledRowWithSx>
);
export const StyledColumnWithPropsGetterWithStableSx = () => <StyledColWithSx sx={colStyle} />;
export const BaseStyledRowWithPropsGetter = ({ children }: PropsWithChildren) => (
  <StyledRowWithPropsGetter>{children}</StyledRowWithPropsGetter>
);
export const BaseStyledColumnWithPropsGetter = () => <StyledColumnWithPropsGetter />;
