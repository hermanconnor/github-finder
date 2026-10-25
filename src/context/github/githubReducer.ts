import type { GitHubAction, GitHubState } from '@/context/github/github.types';

export const initialState: GitHubState = {
  users: [],
  user: null,
  repos: [],
  loading: false,
  error: null,
  lastQuery: '',
};

export const githubReducer = (
  state: GitHubState,
  action: GitHubAction,
): GitHubState => {
  switch (action.type) {
    case 'SEARCH_USERS':
      return {
        ...state,
        users: action.payload.items,
        lastQuery: action.payload.query,
        loading: false,
        error: null,
      };
    case 'GET_USER':
      return { ...state, user: action.payload, loading: false, error: null };
    case 'CLEAR_USERS':
      return {
        ...state,
        users: [],
        lastQuery: '',
        loading: false,
        error: null,
      };
    case 'GET_REPOS':
      return { ...state, repos: action.payload, loading: false, error: null };
    case 'SET_LOADING':
      return { ...state, loading: true, error: null };
    case 'SET_ERROR':
      return { ...state, loading: false, error: action.payload };
    default:
      const _exhaustiveCheck: never = action;
      throw new Error(`Unsupported action type: ${_exhaustiveCheck}`);
  }
};
