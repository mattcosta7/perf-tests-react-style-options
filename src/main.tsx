import { StrictMode } from 'react';
import * as ReactDOMClient from 'react-dom/client';
import App from './App';
import { ErrorBoundary } from './ErrorBoundary';

/**
 * The profiling build of react is not properly setting this property, which is fun, so i'm doing it here
 */
//@ts-ignore
ReactDOMClient.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.usingClientEntryPoint = true;

ReactDOMClient.createRoot(document.getElementById('root') as HTMLElement).render(
  <StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </StrictMode>,
);
