import { memo } from 'react';
import { Modes } from './params';

interface TableProps {
  mode: Modes;
  renderCount: number;
  iterations: number;
  onForceRenderClick: () => void;
  renderHistories: Array<{
    difference: number;
    differenceAverage: number;
    id: string;
    phase: string;
    duration: number;
    count: number;
    durationTotal: number;
    durationAverage: number;
  }>;
}

export function Table({
  mode,
  iterations,
  renderCount,
  onForceRenderClick,
  renderHistories,
}: TableProps) {
  return (
    <table>
      <thead>
        <tr>
          <th colSpan={8} style={{ textAlign: 'center' }}>
            Mode: {mode}
            {renderCount < iterations ? (
              <div>
                <progress value={renderCount} max={iterations} />
                {renderCount}/{iterations}
              </div>
            ) : (
              <div>
                <button onClick={onForceRenderClick}>force a render</button>
              </div>
            )}
          </th>
        </tr>
        <tr>
          <th style={{ textAlign: 'left' }}>id</th>
          <th>last phase</th>
          <th>last duration in ms</th>
          <th>render count</th>
          <th>duration average in ms</th>
          <th>duration total in ms</th>
          <th>difference duration average</th>
          <th>% difference duration average</th>
        </tr>
      </thead>
      <tbody>
        {renderHistories
          .sort((a, b) => a.durationAverage - b.durationAverage)
          .map((row) => {
            return (
              <tr key={row.id}>
                <td style={{ textAlign: 'left' }}>{row.id}</td>
                <td>{row.phase}</td>
                <td>{row.duration}</td>
                <td>{row.count}</td>
                <td>{row.durationAverage}</td>
                <td>{row.durationTotal.toPrecision(5)}</td>
                <td>{row.difference === 0 ? '-' : `+${row.difference.toPrecision(5)}`}</td>
                <td>
                  {row.differenceAverage === 0 ? '-' : `+${row.differenceAverage.toPrecision(5)}%`}
                </td>
              </tr>
            );
          })}
      </tbody>
    </table>
  );
}
