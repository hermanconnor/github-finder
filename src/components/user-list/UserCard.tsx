import type { GitHubUser } from '@/context/github/github.types';
import styles from './UserCard.module.css';
import { Link } from 'react-router';

interface Props {
  user: GitHubUser;
}

const UserCard = ({ user }: Props) => {
  const { avatar_url, login, html_url, site_admin } = user;

  return (
    <article className={styles.userCard}>
      <div className={styles.cardHeader}>
        <img
          src={avatar_url}
          alt={`${login}'s avatar`}
          className={styles.avatar}
        />

        <div className={styles.userInfo}>
          <Link to={`/user/${login}`} className={styles.usernameLink}>
            {login}
          </Link>

          <div className={styles.badgeRow}>
            <span className={styles.typeBadge}>
              {site_admin && <span className={styles.adminBadge}>Staff</span>}
            </span>
          </div>
        </div>
      </div>

      <div className={styles.cardActions}>
        <a
          href={html_url}
          target='_blank'
          rel='noopener noreferrer'
          className={styles.githubLink}
          aria-label={`View ${login} on GitHub (opens in a new tab)`}
        >
          GitHub ↗
        </a>

        <Link to={`/user/${login}`} className={styles.viewProfileButton}>
          View Full Profile
        </Link>
      </div>
    </article>
  );
};

export default UserCard;
