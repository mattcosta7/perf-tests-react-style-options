import { Box } from '@primer/react';
import { PropsWithChildren, useEffect } from 'react';
import styles from './style.module.css';
import {
  StyledCol,
  StyledColumnWithPropsGetter,
  StyledColumnWithPropsGetterUnstable,
  StyledColWithDynamicProps,
  StyledColWithDynamicPropsStyle,
  StyledColWithSomeSystemProps,
  StyledColWithSx,
  StyledColWithUnusedDynamicProp,
  StyledColWithUnusedDynamicProp5x,
  StyledColWithUnusedDynamicProp5xStringOnly,
  StyledRow,
  StyledRowWithDynamicProps,
  StyledRowWithDynamicPropsStyle,
  StyledRowWithPropsGetter,
  StyledRowWithPropsGetterUnstable,
  StyledRowWithSomeSystemProps,
  StyledRowWithSx,
  StyledRowWithUnusedDynamicProp,
  StyledRowWithUnusedDynamicProp5x,
  StyledRowWithUnusedDynamicProp5xStringOnly,
} from './styled';
import { colStyle, rowStyle } from './styles';
import { columnStyledVanilla, rowStyleVanilla } from './styles.css';

const makeCounter = () => {
  let counter = 0;
  return () => {
    const _count = counter;
    useEffect(() => {
      counter++;
    });
    return _count;
  };
};
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

export const StyledColUnusedDynamicProp = () => <StyledColWithUnusedDynamicProp />;
export const StyledRowUnusedDynamicProp = ({ children }: PropsWithChildren) => (
  <StyledRowWithUnusedDynamicProp>{children}</StyledRowWithUnusedDynamicProp>
);
export const StyledColUnusedDynamicProp5x = () => <StyledColWithUnusedDynamicProp5x />;
export const StyledRowUnusedDynamicProp5x = ({ children }: PropsWithChildren) => (
  <StyledRowWithUnusedDynamicProp5x>{children}</StyledRowWithUnusedDynamicProp5x>
);

export const StyledColUnusedDynamicProp5xStringOnly = () => (
  <StyledColWithUnusedDynamicProp5xStringOnly />
);
export const StyledRowUnusedDynamicProp5xStringOnly = ({ children }: PropsWithChildren) => (
  <StyledRowWithUnusedDynamicProp5xStringOnly>
    {children}
  </StyledRowWithUnusedDynamicProp5xStringOnly>
);
const useRowCount1 = makeCounter();
const useColumnCount1 = makeCounter();
export const StyledColDynamicProps = () => {
  const maxWidth = useColumnCount1();
  return <StyledColWithDynamicProps sx={colStyle} $maxWidth={maxWidth} />;
};
export const StyledRowDynamicProps = ({ children }: PropsWithChildren) => {
  const maxWidth = useRowCount1();
  return (
    <StyledRowWithDynamicProps sx={rowStyle} $maxWidth={maxWidth}>
      {' '}
      {children}
    </StyledRowWithDynamicProps>
  );
};

const useRowCount2 = makeCounter();
const useColumnCount2 = makeCounter();
export const StyledColDynamicPropsStyle = () => {
  const maxWidth = useColumnCount2();
  return <StyledColWithDynamicPropsStyle sx={colStyle} $maxWidth={maxWidth} />;
};
export const StyledRowDynamicPropsStyle = ({ children }: PropsWithChildren) => {
  const maxWidth = useRowCount2();
  return (
    <StyledRowWithDynamicPropsStyle sx={rowStyle} $maxWidth={maxWidth}>
      {' '}
      {children}
    </StyledRowWithDynamicPropsStyle>
  );
};
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

const useRowCount = makeCounter();
const useColumnCount = makeCounter();

export const InlineSXBoxRowNewStyleProp = ({ children }: PropsWithChildren) => {
  const size = useRowCount();
  return <Box sx={{ ...rowStyle, maxWidth: size }}>{children}</Box>;
};

export const InlineSXBoxColumnNewStyleProp = () => {
  const size = useColumnCount();
  return <Box sx={{ ...colStyle, maxWidth: size }} />;
};
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

export const BaseStyledRowWithPropsGetterUnstable = ({ children }: PropsWithChildren) => (
  <StyledRowWithPropsGetterUnstable>{children}</StyledRowWithPropsGetterUnstable>
);
export const BaseStyledColumnWithPropsGetterUnstable = () => (
  <StyledColumnWithPropsGetterUnstable />
);

export const BaseStyledRowWithSomeSystemPropsUnused = ({ children }: PropsWithChildren) => (
  <StyledRowWithSomeSystemProps>{children}</StyledRowWithSomeSystemProps>
);
export const BaseStyledColumnWithSomeSystemPropsUnused = () => (
  <StyledColWithSomeSystemProps />
);

export const BaseStyledRowWithSomeSystemPropsUsed = ({ children }: PropsWithChildren) => (
  <StyledRowWithSomeSystemProps gridArea={[]} sx={{}}>{children}</StyledRowWithSomeSystemProps>
);
export const BaseStyledColumnWithSomeSystemPropsUsed = () => (
  <StyledColWithSomeSystemProps gridArea={[]} sx={{}} />
);
