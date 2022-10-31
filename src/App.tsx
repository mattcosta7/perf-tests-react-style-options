import { theme } from '@primer/react';
import {
  ProfilerOnRenderCallback,
  useEffect,
  useReducer,
  useRef,
  useCallback,
  startTransition,
} from 'react';
import { ProfiledGrid } from './grid';
import { ThemeProvider } from 'styled-components';
import { createRoot, Root } from 'react-dom/client';
import { columnsCount, iterations, mode, rowsCount } from './params';
import { Form } from './Form';
import {
  InlineStyleDivRowStable,
  InlineStyleDivColumnStable,
  InlineStyleDivRow,
  InlineStyleDivColumn,
  ModStyleDivRow,
  ModStyleDivColumn,
  VanillaStyleDivRow,
  VanillaStyleDivColumn,
  BaseStyledRow,
  BaseStyledCol,
  BaseStyledRowWithPropsGetter,
  BaseStyledColumnWithPropsGetter,
  InlineSXStyledRow,
  InlineSXStyledColumn,
  StyledRowWithPropsGetterWithStableSx,
  StyledColumnWithPropsGetterWithStableSx,
  InlineSXBoxRow,
  InlineSXBoxColumn,
  InlineSXBoxRowStable,
  InlineSXBoxColumnStable,
  InlineStyleBoxRow,
  InlineStyleBoxColumn,
  GlobalCssDivRowStable,
  GlobalCssDivColumnStable,
} from './renderers';
import './global.css';
import { Table } from './Table';

function reducer(count: number): number {
  return count + 1;
}

function App() {
  const outputRef = useRef<HTMLDivElement>(null);
  const [renderCount, forceRender] = useReducer(reducer, 1);
  const renderHistory = useRef<
    Record<string, Array<{ id: string; phase: string; duration: number }>>
  >({});
  const outputRoot = useRef<Root | null>(null);

  const handleRender: ProfilerOnRenderCallback = useCallback((id, phase, duration) => {
    if (!renderHistory.current[id]) {
      renderHistory.current[id] = [];
    }

    renderHistory.current[id].push({
      id,
      phase,
      duration,
    });
  }, []);

  useEffect(() => {
    if (!outputRef.current) return;
    outputRoot.current = createRoot(outputRef.current);
  }, []);

  useEffect(() => {
    if (!outputRoot.current) return;
    const eachType = Object.values(renderHistory.current).map((hist) => {
      const last = hist.at(-1)!;
      const durationTotal = hist.reduce((acc, { duration }) => acc + duration, 0);
      return {
        id: last.id,
        phase: last.phase,
        duration: last.duration,
        count: hist.length,
        durationTotal,
        durationAverage: hist.reduce((acc, curr) => acc + curr.duration, 0) / hist.length,
      };
    });

    let fastestRender = eachType[0];
    for (const render of eachType) {
      if (render.durationAverage < fastestRender.durationAverage) {
        fastestRender = render;
      }
    }

    const output = eachType.map((hist) => {
      return {
        ...hist,
        difference: hist.durationAverage - fastestRender.durationAverage,
        differenceAverage:
          ((hist.durationAverage - fastestRender.durationAverage) / fastestRender.durationAverage) *
          100,
      };
    });

    outputRoot.current.render(
      <Table
        mode={mode}
        iterations={iterations}
        renderHistories={output}
        renderCount={renderCount}
        onForceRenderClick={forceRender}
      />,
    );
  });

  useEffect(() => {
    if (outputRoot.current == null) return;
    if (renderCount < iterations) {
      /**
       * using transition to keep the form input interactive
       */
      startTransition(() => {
        forceRender();
      });
    }
  }, [renderCount]);

  return (
    <div>
      <p>A small app to measure render performance of various style combinations. Two modes:</p>
      <ul>
        <li>
          Update mode (default): mounts once, then re-renders update the react tree. This most
          closely mirrors production behavior
        </li>
        <li>
          Mount mode: forces the react tree to unmount/remount by changing a top level key prop
        </li>
      </ul>
      <div style={{ display: 'flex' }}>
        <div ref={outputRef}>loading</div>
        <Form
          defaultMode={mode}
          iterations={iterations}
          defaultColsCount={columnsCount}
          defaultRowsCount={rowsCount}
          onSubmit={() => {
            outputRoot.current?.unmount();
            outputRoot.current = null;
          }}
        />
      </div>
      <ul key={mode === 'mount' ? renderCount : undefined}>
        <ProfiledGrid
          name="[Inline styles] - stable object"
          handleRender={handleRender}
          getRow={InlineStyleDivRowStable}
          getCol={InlineStyleDivColumnStable}
        />
        <ProfiledGrid
          name="[Inline styles] - dynamic object"
          handleRender={handleRender}
          getRow={InlineStyleDivRow}
          getCol={InlineStyleDivColumn}
        />
        <ProfiledGrid
          name="[Static CSS] - Global"
          handleRender={handleRender}
          getRow={GlobalCssDivRowStable}
          getCol={GlobalCssDivColumnStable}
        />
        <ProfiledGrid
          name="[Static CSS] - CSS Modules"
          handleRender={handleRender}
          getRow={ModStyleDivRow}
          getCol={ModStyleDivColumn}
        />
        <ProfiledGrid
          name="[Static CSS] - Vanilla extract"
          handleRender={handleRender}
          getRow={VanillaStyleDivRow}
          getCol={VanillaStyleDivColumn}
        />
        <ProfiledGrid
          name="[Styled components] - static styles only"
          handleRender={handleRender}
          getRow={BaseStyledRow}
          getCol={BaseStyledCol}
        />
        <ProfiledGrid
          name="[Styled components] - dynamic style creation ${props => css(obj)}"
          handleRender={handleRender}
          getRow={BaseStyledRowWithPropsGetter}
          getCol={BaseStyledColumnWithPropsGetter}
        />

        <ProfiledGrid
          name="[Styled components] - SX prop, dynamic object"
          handleRender={handleRender}
          getRow={InlineSXStyledRow}
          getCol={InlineSXStyledColumn}
        />
        <ProfiledGrid
          name="[Styled components] - SX prop, stable object"
          handleRender={handleRender}
          getRow={StyledRowWithPropsGetterWithStableSx}
          getCol={StyledColumnWithPropsGetterWithStableSx}
        />
        <ProfiledGrid
          name="[Box] - SX prop, dynamic object"
          handleRender={handleRender}
          getRow={InlineSXBoxRow}
          getCol={InlineSXBoxColumn}
        />
        <ProfiledGrid
          name="[Box] - SX prop, stable object"
          handleRender={handleRender}
          getRow={InlineSXBoxRowStable}
          getCol={InlineSXBoxColumnStable}
        />
        <ProfiledGrid
          name="[Box] - inline style"
          handleRender={handleRender}
          getRow={InlineStyleBoxRow}
          getCol={InlineStyleBoxColumn}
        />
        <ThemeProvider theme={theme}>
          <ProfiledGrid
            name="[Box] - SX prop, inside `ThemeProvider`"
            handleRender={handleRender}
            getRow={InlineSXBoxRow}
            getCol={InlineSXBoxColumn}
          />
        </ThemeProvider>
        <ThemeProvider theme={theme}>
          <ProfiledGrid
            name="[Box] - inline style, inside `ThemeProvider`"
            handleRender={handleRender}
            getRow={InlineStyleBoxRow}
            getCol={InlineStyleBoxColumn}
          />
        </ThemeProvider>
      </ul>
    </div>
  );
}

export default App;
