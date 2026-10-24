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

      <footer className={styles.footer}>
        <div className={styles.footerContainer}>
          <p className={styles.footerText}>
            GitHub Finder &bull; Built with React & React Router
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
