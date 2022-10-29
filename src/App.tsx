import { Box, theme } from '@primer/react';
import { ProfilerOnRenderCallback, Profiler, useEffect, useReducer, useRef, PropsWithChildren } from 'react'
import { ProfiledGrid } from './grid';
import { StyledCol, StyledColWithSx, StyledRow, StyledRowWithSx } from './styled';
import { colStyle, rowStyle } from './styles';
import { columnStyledVanilla, rowStyleVanilla } from './styles.css';
import styles from './style.module.css'
import { ThemeProvider } from 'styled-components';
import { createRoot } from 'react-dom/client';

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

function reducer(s: number) {
  return s + 1;
}
function App() {
  const [renders, forceRender] = useReducer(reducer, 1)
  const renderHistory = useRef<Record<string, Array<{ id: string; phase: string; duration: number }>>>({});

  const handleRender: ProfilerOnRenderCallback = (
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
  };

  useEffect(() => {
    const eachType = Object.values(renderHistory.current).map((hist) => {
      const last = hist.at(-1)
      return {
        id: last?.id,
        phase: last?.phase,
        duration: last?.duration,
        count: hist.length,
        durationAverage: hist.reduce((acc, curr) => acc + curr.duration, 0) / hist.length
      }
    }).sort((a, b) => b.durationAverage - a.durationAverage)

    const el = document.getElementById('output')
    if (!el) return

    const root = createRoot(el)
    root.render(<table>
      <thead>
        <tr>
          <th>id</th>
          <th>phase</th>
          <th>duration</th>
          <th>count</th>
          <th>durationAverage</th>
        </tr>
      </thead>
      <tbody>
        {eachType.map((row) => {
          return <tr key={row.id}>
            <td>{row.id}</td>
            <td>{row.phase}</td>
            <td>{row.duration}</td>
            <td>{row.count}</td>
            <td>{row.durationAverage}</td>
          </tr>
        })}
      </tbody>
    </table>)


  });

  return (
    <div>
      <div id="output"></div>

      <button onClick={() => forceRender()}>force render</button>
      <button onClick={() => window.location.reload()}>reset</button>
      <ul>
        <ProfiledGrid name="inline" handleRender={handleRender}
          getRow={InlineStyleDivRow}
          getCol={InlineStyleDivColumn}
        />
        <ProfiledGrid name="css-module" handleRender={handleRender}
          getRow={ModStyleDivRow}
          getCol={ModStyleDivColumn}
        />
        <ProfiledGrid name="vanilla-extract" handleRender={handleRender}
          getRow={VanillaStyleDivRow}
          getCol={VanillaStyleDivColumn}
        />
        <ProfiledGrid name="styled-component-with-static-style" handleRender={handleRender}
          getRow={StyledRow}
          getCol={StyledCol}
        />
        <ProfiledGrid name="styled-component-with-sx-style" handleRender={handleRender}
          getRow={InlineSXStyledRow}
          getCol={InlineSXStyledColumn}
        />
        <ProfiledGrid name="box-with-sx-style" handleRender={handleRender}
          getRow={InlineSXBoxRow}
          getCol={InlineSXBoxColumn}
        />
        <ProfiledGrid name="box-with-inline-style" handleRender={handleRender}
          getRow={InlineStyleBoxRow}
          getCol={InlineStyleBoxColumn}
        />
        <ThemeProvider theme={theme}>
          <ProfiledGrid name="theme-dbox-with-sx-style" handleRender={handleRender}
            getRow={InlineSXBoxRow}
            getCol={InlineSXBoxColumn}
          />
          <ProfiledGrid name="theme-dbox-with-inline-style" handleRender={handleRender}
            getRow={InlineStyleBoxRow}
            getCol={InlineStyleBoxColumn}
          />
        </ThemeProvider>

      </ul>
    </div>
  )
}

export default App
