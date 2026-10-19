import { Outlet } from 'react-router';
import styles from './Layout.module.css';

const Layout = () => {
  return (
    <div className={styles.appLayout}>
      {/* TODO: NAVBAR */}

      <main className={styles.mainContent}>
        <Outlet />
      </main>

      {/* TODO: FOOTER */}
    </div>
  );
};

export default Layout;
