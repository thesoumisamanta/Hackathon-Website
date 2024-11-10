import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Layout from './components/Layout'; 
import HomePage from './pages/HomePage'; 
import HackathonCard from './components/HackathonCard'; 
import HackathonDetails from './pages/HackathonDetails'; 

export default function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />, 
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
  ]);

  return <RouterProvider router={router} />;
}
