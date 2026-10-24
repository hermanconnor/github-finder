import type { GitHubRepository } from '@/types';
import styles from './RepoItem.module.css';

interface Props {
  repo: GitHubRepository;
}

const RepoItem = ({ repo }: Props) => {
  return (
    <div className={styles.repoCard}>
      <div>
        <a
          href={repo.html_url}
          target='_blank'
          rel='noopener noreferrer'
          className={styles.repoName}
        >
          {repo.name}
        </a>
        <p className={styles.repoDesc}>
          {repo.description || 'No description provided.'}
        </p>
      </div>

      <div className={styles.repoFooter}>
        {repo.language ? (
          <span className={styles.repoLang}>
            <span className={styles.langDot} aria-hidden='true' />
            {repo.language}
          </span>
        ) : (
          <span />
        )}
        <div className={styles.repoStats}>
          <span>⭐ {repo.stargazers_count}</span>
          <span>🔀 {repo.forks_count}</span>
        </div>
      </div>
    </div>
  );
};

export default RepoItem;
