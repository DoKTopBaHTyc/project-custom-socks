import React from 'react';
import { Outlet } from 'react-router';
import NavBar from './ui/NavBar';
import Footer from './Footer';

export default function Layout({ children, logoutHandler, user }) {
  return (
    <>
<header>
<NavBar logoutHandler={logoutHandler} user={user} />
{children}
</header>
<main>
  <Outlet/>
  <Footer/>
</main>

    </>
  );
}
