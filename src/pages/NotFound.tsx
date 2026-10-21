import { Link } from 'react-router';
import styles from './NotFound.module.css';

const NotFound = () => {
  return (
    <section
      className={styles.notFoundContainer}
      aria-labelledby='not-found-title'
    >
      <div className={styles.notFoundCard}>
        <div className={styles.iconWrapper} aria-hidden='true'>
          🔍
        </div>
        <span className={styles.statusCode}>404 Error</span>

        <h1 id='not-found-title' className={styles.title}>
          Page Not Found
        </h1>
        <p className={styles.subtitle}>
          Oops! The page or developer profile you are looking for doesn’t exist
          or has been moved.
        </p>

        <div className={styles.actionContainer}>
          <Link to='/' className={styles.homeButton}>
            Back to Search
          </Link>
        </div>
      </div>
    </section>
  );
};

export default NotFound;
