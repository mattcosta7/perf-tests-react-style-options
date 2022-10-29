import { Box, theme } from '@primer/react';
import { ProfilerOnRenderCallback, useEffect, useReducer, useRef, PropsWithChildren, useCallback } from 'react'
import { ProfiledGrid } from './grid';
import { StyledCol, StyledRowWithPropsGetter, StyledColumnWithPropsGetter, StyledColWithSx, StyledRow, StyledRowWithSx } from './styled';
import { colStyle, rowStyle } from './styles';
import { columnStyledVanilla, rowStyleVanilla } from './styles.css';
import styles from './style.module.css'
import { ThemeProvider } from 'styled-components';
import { createRoot, Root } from 'react-dom/client';
import { columnsCount, rowsCount } from './params';

const InlineStyleDivRow = ({ children }: PropsWithChildren) => <div style={{ ...rowStyle }}>{children}</div>
const InlineStyleDivColumn = () => <div style={{ ...colStyle }} />
const VanillaStyleDivRow = ({ children }: PropsWithChildren) => <div className={rowStyleVanilla}>{children}</div>
const VanillaStyleDivColumn = () => <div className={columnStyledVanilla} />
const ModStyleDivRow = ({ children }: PropsWithChildren) => <div className={styles.rowStyleModule}>{children}</div>
const ModStyleDivColumn = () => <div className={styles.colStyleModule} />
const InlineSXStyledRow = ({ children }: PropsWithChildren) => <StyledRowWithSx sx={{ ...rowStyle }}>{children}</StyledRowWithSx>
const InlineSXStyledColumn = () => <StyledColWithSx sx={{ ...colStyle }} />
const InlineStyleBoxRow = ({ children }: PropsWithChildren) => <Box style={{ ...rowStyle }}>{children}</Box>
const InlineStyleBoxColumn = () => <Box style={{ ...colStyle }} />
const InlineSXBoxRow = ({ children }: PropsWithChildren) => <Box sx={{ ...rowStyle }}>{children}</Box>
const InlineSXBoxColumn = () => <Box sx={{ ...colStyle }} />

function reducer(state: {
  renderCount: number
  mode: 'mount' | 'update'
}, action: 'increment' | 'switch-mode'): {
  renderCount: number
  mode: 'mount' | 'update'
} {
  switch (action) {
    case 'increment': {
      return {
        ...state,
        renderCount: state.renderCount + 1
      }
    }
    case 'switch-mode': {
      return {
        renderCount: 0,
        mode: state.mode === 'mount' ? 'update' : 'mount',
      }
    }
  }
}
function App() {
  const outputRef = useRef<HTMLDivElement>(null)
  const [state, dispatch] = useReducer(reducer, { renderCount: 1, mode: 'update' as const });

  const renderHistory = useRef<Record<string, Array<{ id: string; phase: string; duration: number }>>>({});

  /**
   * When we switch mode, clear the history first to avoid confusion
   */
  const switchMode = () => {
    renderHistory.current = {};
    dispatch('switch-mode');
  }

  const handleRender: ProfilerOnRenderCallback = useCallback((
    id,
    phase,
    duration,
  ) => {
    if (!renderHistory.current[id]) {
      renderHistory.current[id] = [];
    }

    renderHistory.current[id].push({
      id,
      phase,
      duration
    })
  }, [])

  const outputRoot = useRef<Root | null>(null);
  useEffect(() => {
    if (!outputRef.current) return
    outputRoot.current = createRoot(outputRef.current)
  }, [])

  useEffect(() => {
    if (!outputRoot.current) return
    const eachType = Object.values(renderHistory.current).map((hist) => {
      const last = hist.at(-1)!
      return {
        id: last.id,
        phase: last.phase,
        duration: last.duration,
        count: hist.length,
        durationAverage: hist.reduce((acc, curr) => acc + curr.duration, 0) / hist.length
      }
    })

    let fastestRender = eachType[0]
    for (const render of eachType) {
      if (render.durationAverage < fastestRender.durationAverage) {
        fastestRender = render
      }
    }

    const output = eachType.map((hist) => {
      return {
        ...hist,
        difference: (((hist.durationAverage - fastestRender.durationAverage) / fastestRender.durationAverage) * 100)
      }
    })


    outputRoot.current.render(
      <table>
        <thead>
          <tr>
            <th colSpan={6} style={{ textAlign: 'center' }}>
              Mode: {state.mode}
            </th>
          </tr>
          <tr>
            <th>id</th>
            <th>phase</th>
            <th>duration</th>
            <th>count</th>
            <th>durationAverage</th>
            <th>% difference from fastest (avg)</th>
          </tr>
        </thead>
        <tbody>
          {output.sort((a, b) => b.durationAverage - a.durationAverage).map((row) => {
            return (
              <tr key={row.id}>
                <td>{row.id}</td>
                <td>{row.phase}</td>
                <td>{row.duration.toFixed(3)}</td>
                <td>{row.count}</td>
                <td>{row.durationAverage.toFixed(3)}</td>
                <td>{row.difference.toFixed(3)}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
    )
  });

  return (
    <div>
      <p>
        A small app to measure render performance of various style combinations.
        Two modes:
        <ul>
          <li>Update mode (default): mounts once, then re-renders update the react tree. This most closely mirrors production behavior</li>
          <li>Mount mode: forces the react tree to unmount/remount by changing a top level key prop</li>
        </ul>
      </p>
      <div>


        <form>
          <fieldset>
            <legend>Grid size (submitting forces a refresh)</legend>
            <div>
              <label>
                rows:
                <input type="number" name="rows" defaultValue={rowsCount} />
              </label>
            </div>
            <div>
              <label>
                columns:
                <input type="number" name="cols" defaultValue={columnsCount} />
              </label>
            </div>
            <button type="submit">
              Change size
            </button>
          </fieldset>
        </form>
      </div>

      <button onClick={() => dispatch('increment')}>force render</button>
      <button onClick={() => switchMode()}>Switch to {state.mode === 'mount' ? 'update' : 'mount'} mode</button>
      <button onClick={() => window.location.reload()}>reset history</button>

      <div ref={outputRef} />
      <ul key={state.mode === 'mount' ? state.renderCount : undefined}>
        <ProfiledGrid name="Inline styles"
          handleRender={handleRender}
          getRow={InlineStyleDivRow}
          getCol={InlineStyleDivColumn}
        />
        <ProfiledGrid name="CSS Modules"
          handleRender={handleRender}
          getRow={ModStyleDivRow}
          getCol={ModStyleDivColumn}
        />
        <ProfiledGrid name="Vanilla extract"
          handleRender={handleRender}
          getRow={VanillaStyleDivRow}
          getCol={VanillaStyleDivColumn}
        />
        <ProfiledGrid name="Styled components without dynamic styles"
          handleRender={handleRender}
          getRow={StyledRow}
          getCol={StyledCol}
        />
        <ProfiledGrid name="Styled components with a dynamic style, but consistent"
          handleRender={handleRender}
          getRow={StyledRowWithPropsGetter}
          getCol={StyledColumnWithPropsGetter}
        />
        <ProfiledGrid name="Styled components, using SX prop (like primer)"
          handleRender={handleRender}
          getRow={InlineSXStyledRow}
          getCol={InlineSXStyledColumn}
        />
        <ProfiledGrid name="Box component, using SX Prop"
          handleRender={handleRender}
          getRow={InlineSXBoxRow}
          getCol={InlineSXBoxColumn}
        />
        <ProfiledGrid name="Box component, with inline style (no sx prop)"
          handleRender={handleRender}
          getRow={InlineStyleBoxRow}
          getCol={InlineStyleBoxColumn}
        />
        <ThemeProvider theme={theme}>
          <ProfiledGrid name="Box component, using SX Prop, wrapped in a theme"
            handleRender={handleRender}
            getRow={InlineSXBoxRow}
            getCol={InlineSXBoxColumn}
          />
          <ProfiledGrid name="Box component, using inline styles, wrapped in a theme"
            handleRender={handleRender}
            getRow={InlineStyleBoxRow}
            getCol={InlineStyleBoxColumn}
          />
        </ThemeProvider>
      </ul>
    </div>
  )
}

export default App
