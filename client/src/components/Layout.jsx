import React from 'react';
import { Outlet } from 'react-router';
import NavBar from './ui/NavBar';

export default function Layout({ children, logoutHandler, user }) {
  return (
    <>
      <NavBar logoutHandler={logoutHandler} user={user} />
      {children}
    </>
  );
}
