import { useReducer } from 'react';
import axios from 'axios';
import { toast } from 'sonner';
import { githubReducer, initialState } from './githubReducer';
import type {
  GitHubRepository,
  GitHubSearchResponse,
  GitHubUserProfile,
} from '@/context/github/github.types';
import { GitHubContext } from './GitHubContext';

interface Props {
  children: React.ReactNode;
}

const BASE_URL = 'https://api.github.com';

export const GitHubProvider = ({ children }: Props) => {
  const [state, dispatch] = useReducer(githubReducer, initialState);

  // SET LOADING
  const setLoading = () => dispatch({ type: 'SET_LOADING' });
  // CLEAR USERS
  const clearUsers = () => dispatch({ type: 'CLEAR_USERS' });
  // CLEAR ERROR
  const clearError = () => dispatch({ type: 'CLEAR_ERROR' });

  // SEARCH USERS
  const searchUsers = async (text: string) => {
    setLoading();

    try {
      const response = await axios.get<GitHubSearchResponse>(
        `${BASE_URL}/search/users?q=${text}`,
      );
      dispatch({
        type: 'SEARCH_USERS',
        payload: { items: response.data.items, query: text },
      });
    } catch (error: unknown) {
      let message = 'Failed to search users';

      if (axios.isAxiosError(error)) {
        message = error.response?.data?.message || error.message;
      } else if (error instanceof Error) {
        message = error.message;
      }

      dispatch({ type: 'SET_ERROR', payload: message });
      toast.error(message);
    }
  };

  // GET USER (Returns boolean indicating success)
  const getUser = async (username: string): Promise<boolean> => {
    setLoading();

    try {
      const response = await axios.get<GitHubUserProfile>(
        `${BASE_URL}/users/${username}`,
      );

      dispatch({ type: 'GET_USER', payload: response.data });

      return true;
    } catch (error: unknown) {
      let message = 'Failed to fetch user';
      let is404 = false;

      if (axios.isAxiosError(error)) {
        if (error.response?.status === 404) {
          message = `User "@${username}" does not exist or could not be found.`;
        } else {
          message = error.response?.data?.message || error.message;
        }
      } else if (error instanceof Error) {
        message = error.message;
      }

      dispatch({ type: 'SET_ERROR', payload: message });

      // Only show toast for unexpected errors (skip toast for 404s since UI handles it inline)
      if (!is404) {
        toast.error(message);
      }

      return false;
    }
  };

  // GET REPOS
  const getUserRepos = async (username: string) => {
    setLoading();

    try {
      const response = await axios.get<GitHubRepository[]>(
        `${BASE_URL}/users/${username}/repos?per_page=5&sort=created:asc`,
      );

      dispatch({ type: 'GET_REPOS', payload: response.data });
    } catch (error: unknown) {
      // If user wasn't found, getUser already handled the error state
      if (axios.isAxiosError(error) && error.response?.status === 404) {
        return;
      }

      let message = 'Failed to fetch repositories';

      if (axios.isAxiosError(error)) {
        message = error.response?.data?.message || error.message;
      } else if (error instanceof Error) {
        message = error.message;
      }

      dispatch({ type: 'SET_ERROR', payload: message });
      toast.error(message);
    }
  };

  return (
    <GitHubContext.Provider
      value={{
        users: state.users,
        user: state.user,
        repos: state.repos,
        loading: state.loading,
        error: state.error,
        lastQuery: state.lastQuery,
        searchUsers,
        clearUsers,
        getUser,
        getUserRepos,
        clearError,
      }}
    >
      {children}
    </GitHubContext.Provider>
  );
};
