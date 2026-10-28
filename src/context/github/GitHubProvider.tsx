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

  // GET USER
  const getUser = async (username: string) => {
    setLoading();

    try {
      const response = await axios.get<GitHubUserProfile>(
        `${BASE_URL}/users/${username}`,
      );

      dispatch({ type: 'GET_USER', payload: response.data });
    } catch (error: unknown) {
      let message = 'Failed to fetch user';

      if (axios.isAxiosError(error)) {
        message = error.response?.data?.message || error.message;
      } else if (error instanceof Error) {
        message = error.message;
      }

      dispatch({ type: 'SET_ERROR', payload: message });
      toast.error(message);
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
      }}
    >
      {children}
    </GitHubContext.Provider>
  );
};
