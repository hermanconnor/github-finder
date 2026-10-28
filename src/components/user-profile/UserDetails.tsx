import { useEffect } from 'react';
import { useParams, Link } from 'react-router';
import { useGithub } from '@/context/github/GitHubContext';
import Spinner from '../Spinner';
import ErrorMessage from '../error-message/ErrorMessage';
import styles from './UserDetails.module.css';
import RepoList from '../repos/RepoList';

const UserDetails = () => {
  const { username } = useParams<{ username: string }>();
  const { user, repos, loading, error, getUser, getUserRepos } = useGithub();

  const fetchUserData = async () => {
    if (username) {
      await getUser(username);
      await getUserRepos(username);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, [username]);

  if (loading) {
    return <Spinner message={`Loading profile for @${username}...`} />;
  }

  if (error) {
    return <ErrorMessage message={error} onRetry={fetchUserData} />;
  }

  if (!user || !user.login) {
    return null;
  }

  return (
    <article className={styles.detailContainer}>
      <Link to='/' className={styles.backButton}>
        <span aria-hidden='true'>&larr;</span> Back to Search
      </Link>

      <div className={styles.profileCard}>
        <div className={styles.profileHeader}>
          <img
            src={user.avatar_url}
            alt={`${user.name || user.login}'s avatar`}
            className={styles.avatar}
          />
          <div className={styles.headerContent}>
            <div className={styles.nameRow}>
              <h1 className={styles.name}>{user.name || user.login}</h1>
              {user.hireable && (
                <span className={styles.hireableBadge}>Available for hire</span>
              )}
            </div>
            <p className={styles.username}>@{user.login}</p>
            <p className={styles.bio}>
              {user.bio || 'This developer has not added a bio yet.'}
            </p>

            <ul className={styles.metaList}>
              {user.company && (
                <li className={styles.metaItem}>
                  <span aria-hidden='true'>🏢</span> {user.company}
                </li>
              )}

              {user.location && (
                <li className={styles.metaItem}>
                  <span aria-hidden='true'>📍</span> {user.location}
                </li>
              )}

              {user.blog && (
                <li className={styles.metaItem}>
                  <span aria-hidden='true'>🔗</span>
                  <a
                    href={
                      user.blog.startsWith('http')
                        ? user.blog
                        : `https://${user.blog}`
                    }
                    target='_blank'
                    rel='noopener noreferrer'
                    className={styles.metaLink}
                  >
                    Website
                  </a>
                </li>
              )}
            </ul>
          </div>
        </div>

        <section aria-label='Developer statistics' className={styles.statsGrid}>
          <div className={styles.statItem}>
            <span className={styles.statLabel}>Public Repos</span>
            <span className={styles.statValue}>{user.public_repos ?? 0}</span>
          </div>

          <div className={styles.statItem}>
            <span className={styles.statLabel}>Public Gists</span>
            <span className={styles.statValue}>{user.public_gists ?? 0}</span>
          </div>

          <div className={styles.statItem}>
            <span className={styles.statLabel}>Followers</span>
            <span className={styles.statValue}>{user.followers ?? 0}</span>
          </div>

          <div className={styles.statItem}>
            <span className={styles.statLabel}>Following</span>
            <span className={styles.statValue}>{user.following ?? 0}</span>
          </div>
        </section>
      </div>

      {repos && repos.length > 0 && <RepoList repos={repos} />}
    </article>
  );
};

export default UserDetails;
