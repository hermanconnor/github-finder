import { useState, useRef, type ChangeEvent, type SubmitEvent } from 'react';
import { toast } from 'sonner';
import { useGithub } from '@/context/github/GitHubProvider';
import styles from './SearchBar.module.css';

const SearchBar = () => {
  const [query, setQuery] = useState<string>('');
  const inputRef = useRef<HTMLInputElement>(null);

  const { searchUsers, clearUsers, users } = useGithub();

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const handleClear = () => {
    setQuery('');
    inputRef.current?.focus();
    clearUsers();
  };

  const handleSubmit = (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (query.trim() === '') {
      toast.error('Please enter something to search');
      return;
    }

    searchUsers(query.trim());
  };

  return (
    <div className={styles.searchContainer}>
      <form
        role='search'
        aria-label='Site Search'
        className={styles.searchForm}
        onSubmit={handleSubmit}
      >
        <div className={styles.inputWrapper}>
          <svg
            className={styles.searchIcon}
            aria-hidden='true'
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth={2}
            stroke='currentColor'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z'
            />
          </svg>

          <label htmlFor='search-input' className={styles.srOnly}>
            Site Search
          </label>

          <input
            ref={inputRef}
            id='search-input'
            type='search'
            placeholder='Search...'
            value={query}
            onChange={handleInputChange}
            className={styles.searchInput}
            autoComplete='off'
            aria-autocomplete='none'
          />
        </div>

        <button type='submit' className={styles.submitButton}>
          Search
        </button>

        {users.length > 0 && (
          <button
            type='button'
            onClick={handleClear}
            className={styles.clearButton}
            aria-label='Clear search query'
          >
            Clear
          </button>
        )}
      </form>
    </div>
  );
};

export default SearchBar;
