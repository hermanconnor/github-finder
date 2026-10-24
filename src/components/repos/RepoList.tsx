import type { GitHubRepository } from '@/types';
import styles from './RepoList.module.css';
import RepoItem from './RepoItem';

interface Props {
  repos: GitHubRepository[];
}

const RepoList = ({ repos }: Props) => {
  return (
    <section className={styles.sectionContainer}>
      <h2 className={styles.sectionTitle}>Latest Repositories</h2>
      <div className={styles.repoGrid}>
        {repos.map((repo) => (
          <RepoItem key={repo.id} repo={repo} />
        ))}
      </div>
    </section>
  );
};

export default RepoList;
