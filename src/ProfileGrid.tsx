import { Profiler, ProfilerOnRenderCallback, PropsWithChildren } from 'react';
import { rowsCount, columnsCount } from './params';

const rows = Array(rowsCount).fill(null);
const cols = Array(columnsCount).fill(null);
export interface ProfileGridProps {
  name: string;
  getRow: (props: PropsWithChildren) => JSX.Element;
  getCol: (props: PropsWithChildren) => JSX.Element;
  handleRender: ProfilerOnRenderCallback;
}

export function ProfiledGrid({ name, getRow: Row, getCol: Col, handleRender }: ProfileGridProps) {
  return (
    <li>
      <details>
        <summary>{name}</summary>
        <Profiler id={name} onRender={handleRender}>
          {rows.map((_, i) => {
            return (
              <Row key={`${name}-${i}`}>
                {cols.map((_, j) => {
                  return <Col key={`${name}-${i}-${j}`} />;
                })}
              </Row>
            );
          })}
        </Profiler>
      </details>
    </li>
  );
}

ProfiledGrid.displayName = 'ProfiledGrid';
