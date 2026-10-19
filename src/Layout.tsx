import { Outlet } from 'react-router';
import styles from '@/Layout.module.css';
import Navbar from '@/components/Navbar';

const Layout = () => {
  return (
    <div className={styles.appLayout}>
      <Navbar />

      <main className={styles.mainContent}>
        <Outlet />
      </main>

      {/* TODO: FOOTER */}
    </div>
  );
};

export default Layout;
