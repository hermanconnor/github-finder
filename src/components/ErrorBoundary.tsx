import { Link, useRouteError, isRouteErrorResponse } from 'react-router';
import styles from './ErrorBoundary.module.css';

const ErrorBoundary = () => {
  const error = useRouteError();

  let title = 'Unexpected Application Error';
  let message = 'An unexpected error occurred while rendering this page.';
  let statusText = 'Error';
  let stackTrace: string | undefined = undefined;

  if (isRouteErrorResponse(error)) {
    statusText = `${error.status} Error`;
    title = error.statusText || title;
    message = error.data?.message || error.statusText || message;

    if (error.data instanceof Error) {
      stackTrace = error.data.stack;
    }
  } else if (error instanceof Error) {
    message = error.message;
    stackTrace = error.stack;
  }

  const isDev = import.meta.env.DEV;

  return (
    <main className={styles.errorBoundaryContainer} role='alert'>
      <div className={styles.errorBoundaryCard}>
        <div className={styles.iconWrapper} aria-hidden='true'>
          <svg
            width='2rem'
            height='2rem'
            viewBox='0 0 24 24'
            fill='none'
            stroke='currentColor'
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
          >
            <circle cx='12' cy='12' r='10' />
            <line x1='12' y1='8' x2='12' y2='12' />
            <line x1='12' y1='16' x2='12.01' y2='16' />
          </svg>
        </div>

        <span className={styles.statusCode}>{statusText}</span>
        <h1 className={styles.title}>{title}</h1>
        <p className={styles.subtitle}>{message}</p>

        {isDev && stackTrace && (
          <details className={styles.stackDetails}>
            <summary className={styles.stackSummary}>
              Developer Details: View Stack Trace
            </summary>
            <pre className={styles.stackPre}>
              <code>{stackTrace}</code>
            </pre>
          </details>
        )}

        <div className={styles.actionContainer}>
          <button
            type='button'
            className={styles.primaryButton}
            onClick={() => window.location.reload()}
          >
            Reload Page
          </button>

          <Link to='/' className={styles.secondaryButton}>
            Back to Search
          </Link>
        </div>
      </div>
    </main>
  );
};

export default ErrorBoundary;
