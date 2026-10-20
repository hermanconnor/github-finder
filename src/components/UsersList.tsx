import ErrorMessage from './ErrorMessage';
import Spinner from './Spinner';
import { useGithub } from '@/context/GitHubProvider';

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

  return <div>UsersList</div>;
};

export default UsersList;
