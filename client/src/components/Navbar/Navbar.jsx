import React from 'react'
import "./navbar.css"
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { NavLink } from 'react-router-dom';

const NavbaR = () => {

  // console.log(localStorage)

  return (
    <>
        <Navbar
          expand="lg"
          data-bs-theme="dark"
          className="navBar top-0 fixed-top p-3"
        >
          <Container fluid>
            <Navbar.Brand href="/">Blogger</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="ms-auto">
                <NavLink className="navlink" to="/">
                  Home
                </NavLink>
                <NavLink className="navlink" to="/about">
                  About
                </NavLink>
                <NavLink className="navlink" to="/add-blog">
                  Create blog
                </NavLink>
                <NavLink className="navlink" to="/logout">
                  Log Out
                </NavLink>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
    </>
  );
}

export default NavbaR