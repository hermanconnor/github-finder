import styles from './Spinner.module.css';

interface Props {
  size?: string;
  message?: string;
}

const Spinner = ({
  size = 'medium',
  message = 'Loading GitHub profiles...',
}: Props) => {
  const sizeClass =
    {
      small: styles.small,
      medium: '',
      large: styles.large,
    }[size] || '';

  return (
    <div className={styles.spinnerContainer} role='status' aria-busy='true'>
      <div className={`${styles.spinner} ${sizeClass}`} aria-hidden='true' />

      <span className={styles.srOnly}>{message}</span>
    </div>
  );
};

export default Spinner;
