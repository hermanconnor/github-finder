import { createBrowserRouter, RouterProvider } from 'react-router';
import Layout from './Layout';
import Home from './pages/Home';

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
