import React from 'react'
import NavbaR from './components/Navbar/Navbar'
import { Outlet } from 'react-router-dom'
import Footer from './components/footer/Footer'
const RootLayout = () => {
  return (
    <>
      <NavbaR />
      <Outlet />
      <Footer />
    </>
  );
}

export default RootLayout