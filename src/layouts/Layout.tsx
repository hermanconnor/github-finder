import { Outlet } from 'react-router';
import Navbar from '@/components/nav/Navbar';
import styles from './Layout.module.css';

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
