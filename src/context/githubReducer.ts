import type { GitHubAction, GitHubState } from '@/types';

export const initialState: GitHubState = {
  users: [],
  user: {},
  repos: [],
  loading: false,
  error: null,
};

export const githubReducer = (
  state: GitHubState,
  action: GitHubAction,
): GitHubState => {
  switch (action.type) {
    case 'SEARCH_USERS':
      return { ...state, users: action.payload, loading: false, error: null };
    case 'GET_USER':
      return { ...state, user: action.payload, loading: false, error: null };
    case 'CLEAR_USERS':
      return { ...state, users: [], loading: false, error: null };
    case 'GET_REPOS':
      return { ...state, repos: action.payload, loading: false, error: null };
    case 'SET_LOADING':
      return { ...state, loading: true, error: null };
    case 'SET_ERROR':
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};
