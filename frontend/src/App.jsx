import React, { useState } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import HackathonDetails from './pages/HackathonDetails';
import LoginPage from './pages/LoginPage';

export default function App() {
  const [isLoginOpen, setLoginOpen] = useState(false);
  const [isSignupOpen, setSignupOpen] = useState(false);

  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <Layout setLoginOpen={setLoginOpen} setSignupOpen={setSignupOpen} />
      ),
      children: [
        {
          path: "/",
          element: <HomePage />,
        },
        {
          path: "/hackathon/:id",
          element: <HackathonDetails />,
        },
      ],
    },
    {
      path: "/login",
      element: <LoginPage /> // Route for standalone login page
    },
  ]);

  return (
    <RouterProvider router={router} />
  );
}
