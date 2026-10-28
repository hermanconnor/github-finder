import { createContext, useContext } from 'react';
import type {
  GitHubRepository,
  GitHubUser,
  GitHubUserProfile,
} from './github.types';

interface ContextType {
  users: GitHubUser[];
  user: GitHubUserProfile | null;
  repos: GitHubRepository[];
  loading: boolean;
  error: string | null;
  lastQuery: string;
  searchUsers: (text: string) => Promise<void>;
  getUser: (username: string) => Promise<void>;
  getUserRepos: (username: string) => Promise<void>;
  clearUsers: () => void;
}

export const GitHubContext = createContext<ContextType | undefined>(undefined);

export const useGithub = (): ContextType => {
  const context = useContext(GitHubContext);

  if (!context) {
    throw new Error('useGithub must be used within a GithubState Provider');
  }

  return context;
};
