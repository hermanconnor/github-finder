import { createBrowserRouter, RouterProvider } from 'react-router';
import { Toaster } from 'sonner';
import { GitHubProvider } from './context/GitHubProvider';
import Layout from '@/layouts/Layout';
import Home from '@/pages/Home';
import About from '@/pages/About';
import UserPage from '@/pages/UserPage';
import NotFound from '@/pages/NotFound';
import ErrorBoundary from '@/components/ErrorBoundary';

const router = createBrowserRouter([
  {
    element: <Layout />,
    errorElement: <ErrorBoundary />,
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
