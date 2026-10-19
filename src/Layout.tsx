import { Outlet } from 'react-router';

const Layout = () => {
  return (
    <div>
      {/* TODO: NAVBAR */}

      <main>
        <Outlet />
      </main>

      {/* TODO: FOOTER */}
    </div>
  );
};

export default Layout;
