import React from 'react';
import Navbar from './Navbar';
import { Outlet } from 'react-router-dom';

export default function Layout({ setLoginOpen, setSignupOpen }) {
  return (
    <>
      {/* Navbar with modal control props */}
      <Navbar setLoginOpen={setLoginOpen} setSignupOpen={setSignupOpen} />
      
      {/* Outlet renders the active child route component */}
      <Outlet />
    </>
  );
}
