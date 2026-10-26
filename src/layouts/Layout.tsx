import { Outlet } from 'react-router';
import Navbar from '@/components/nav/Navbar';
import styles from './Layout.module.css';
import Footer from '@/components/footer/Footer';

const Layout = () => {
  return (
    <div className={styles.appLayout}>
      <Navbar />

      <main className={styles.mainContent}>
        <Outlet />
      </main>

      <Footer />
    </div>
  );
};

export default Layout;
