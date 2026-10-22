import { createBrowserRouter, RouterProvider } from 'react-router';
import { Toaster } from 'sonner';
import { GitHubProvider } from './context/GitHubProvider';
import Layout from '@/Layout';
import Home from '@/pages/Home';
import About from '@/pages/About';
import UserPage from '@/pages/UserPage';
import NotFound from '@/pages/NotFound';

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/about',
        element: <About />,
      },
      {
        path: '/user/:username',
        element: <UserPage />,
      },
      {
        path: '*',
        element: <NotFound />,
      },
    ],
  },
]);

function App() {
  return (
    <GitHubProvider>
      <RouterProvider router={router} />;
      <Toaster richColors position='top-right' />
    </GitHubProvider>
  );
}

export default App;
