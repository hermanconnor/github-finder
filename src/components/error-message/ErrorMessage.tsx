import { Link } from 'react-router';
import styles from './ErrorMessage.module.css';

interface Props {
  title?: string;
  message?: string;
  onRetry?: () => void;
  showBackLink?: boolean;
  backTo?: string;
}

const ErrorMessage = ({
  title = 'Unable to Load Profiles',
  message = 'An unexpected error occurred while fetching GitHub profiles. You may have exceeded the API rate limit.',
  onRetry,
  showBackLink = false,
  backTo = '/',
}: Props) => {
  return (
    <div className={styles.errorContainer} role='alert'>
      <div className={styles.errorIconWrapper} aria-hidden='true'>
        <svg
          width='1.5rem'
          height='1.5rem'
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

      <h3 className={styles.errorTitle}>{title}</h3>
      <p className={styles.errorMessageText}>{message}</p>

      <div className={styles.actionContainer}>
        {showBackLink && (
          <Link to={backTo} className={styles.backLink}>
            <span aria-hidden='true'>&larr;</span> Back to Search
          </Link>
        )}

        {onRetry && (
          <button
            onClick={onRetry}
            className={styles.retryButton}
            type='button'
          >
            Try Again
          </button>
        )}
      </div>
    </div>
  );
};

export default ErrorMessage;
