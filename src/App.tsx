import React, {
  ProfilerOnRenderCallback,
  startTransition,
  StrictMode,
  useCallback,
  useEffect,
  useReducer,
  useRef,
} from 'react';
import { createRoot, Root } from 'react-dom/client';
import { configs } from './configs';
import { ErrorBoundary } from './ErrorBoundary';
import { Form } from './Form';
import './global.css';
import { columnsCount, iterations, mode, rowsCount } from './params';
import { ProfiledGrid } from './ProfileGrid';
import { Table } from './Table';

function reducer(count: number): number {
  return count + 1;
}

const defaultWrapper = ({ children }: { children: React.ReactNode }) => <>{children}</>;

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
    /**
     * Only createRoot once (strict mode fix)
     */
    if (outputRoot.current) return;
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
      <StrictMode>
        <ErrorBoundary>
          <Table
            mode={mode}
            iterations={iterations}
            renderHistories={output}
            renderCount={renderCount}
            onForceRenderClick={forceRender}
          />
        </ErrorBoundary>
      </StrictMode>,
    );
  });

  useEffect(() => {
    if (outputRoot.current == null) return;
    if (renderCount >= iterations) return;
    /**
     * using transition to keep the form input interactive
     */
    startTransition(() => {
      forceRender();
    });
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
          onSubmit={useCallback(() => {
            outputRoot.current?.unmount();
            outputRoot.current = null;
          }, [])}
        />
      </div>
      <ul key={mode === 'mount' ? renderCount : undefined}>
        {configs.map(({ getWrapper: Wrapper = defaultWrapper, ...props }) => {
          return (
            <Wrapper key={props.name}>
              <ProfiledGrid {...props} handleRender={handleRender} />
            </Wrapper>
          );
        })}
      </ul>
    </div>
  );
}

export default App;

App.displayName = 'App';
