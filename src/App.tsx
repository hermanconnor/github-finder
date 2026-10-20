import { createBrowserRouter, RouterProvider } from 'react-router';
import Layout from '@/Layout';
import Home from '@/pages/Home';
import About from '@/pages/About';
import { GitHubProvider } from './context/GitHubProvider';
import { Toaster } from 'sonner';

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
