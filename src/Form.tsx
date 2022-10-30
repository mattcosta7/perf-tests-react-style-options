import { memo } from 'react';
import { Modes } from './params';

interface FormProps {
  defaultMode: Modes;
  defaultRowsCount: number;
  defaultColsCount: number;
  iterations: number;
  onSubmit?: React.FormEventHandler<HTMLFormElement>;
}
export const Form = memo(function Form({
  defaultRowsCount,
  defaultColsCount,
  iterations,
  defaultMode,
  onSubmit,
}: FormProps) {
  return (
    <form onSubmit={onSubmit} style={{ border: '1px solid', padding: 4 }}>
      <fieldset style={{ padding: 0, margin: 0, border: 'none' }}>
        <legend>Configuration</legend>
        <p>Adding too many rows/columns will slow the page down.</p>
        <div>
          <label>
            Rendering mode{' '}
            <select name="mode" defaultValue={defaultMode}>
              <option value="update">Update</option>
              <option value="mount">Mount</option>
            </select>
          </label>
        </div>
        <div>
          <label>
            Row count <input type="number" name="rows" defaultValue={defaultRowsCount} />
          </label>
        </div>
        <div>
          <label>
            Column count <input type="number" name="cols" defaultValue={defaultColsCount} />
          </label>
        </div>
        <div>
          <label>
            Iterations <input type="number" name="iterations" defaultValue={iterations} />
          </label>
        </div>
        <button type="submit">Submit</button>
      </fieldset>
    </form>
  );
});
