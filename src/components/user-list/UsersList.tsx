import ErrorMessage from '../error-message/ErrorMessage';
import Spinner from '../Spinner';
import { useGithub } from '@/context/GitHubProvider';
import styles from './UsersList.module.css';
import UserCard from './UserCard';

const UsersList = () => {
  const { loading, users, error, lastQuery, searchUsers } = useGithub();

  if (loading) {
    return (
      <Spinner
        message={
          lastQuery
            ? `Retrying search for "${lastQuery}"...`
            : 'Loading GitHub profiles...'
        }
      />
    );
  }

  if (error) {
    return (
      <ErrorMessage
        message={error}
        onRetry={lastQuery ? () => searchUsers(lastQuery) : undefined}
      />
    );
  }

  const hasUsers = users && users.length > 0;

  return (
    <section
      className={styles.resultContainer}
      aria-label='GitHub Search Results'
    >
      {lastQuery && (
        <div className={styles.resultsHeader}>
          <p className={styles.resultsCount} aria-live='polite'>
            {hasUsers
              ? `Found ${users.length} developer${users.length === 1 ? '' : 's'} for ${lastQuery}`
              : `No developers found for "${lastQuery}"`}
          </p>
        </div>
      )}

      {hasUsers ? (
        <div className={styles.userGrid}>
          {users.map((user) => (
            <UserCard key={user.id || user.login} user={user} />
          ))}
        </div>
      ) : (
        <div className={styles.emptyState}>
          <span className={styles.emptyIcon} aria-hidden='true'>
            🔍
          </span>
          <h3 className={styles.emptyTitle}>No profiles found</h3>
          <p className={styles.emptyDescription}>
            {lastQuery
              ? "We couldn't find anyone matching that username. Try searching for a different handle."
              : 'Start typing in the search bar above to look up GitHub developers.'}
          </p>
        </div>
      )}
    </section>
  );
};

export default UsersList;
