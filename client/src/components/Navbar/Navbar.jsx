import React from 'react'
import "./navbar.css"
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { NavLink, useNavigate } from 'react-router-dom';

const NavbaR = () => {
  const navigate = useNavigate();
  const handleLogin =() => {
    navigate("/user/login");
  }
const handleLogOut = () => {
  localStorage.clear();
navigate("/user/login");
}

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
              {!localStorage.getItem("username") ? (
                <NavLink className="navlink" onClick={handleLogin}>
                  Login
                </NavLink>
              ) : (
                <>
                  <NavLink className="navlink" to="/add-blog">
                    Create blog
                  </NavLink>

                  <NavLink className="navlink" onClick={handleLogOut}>
                    Log Out {localStorage.getItem("username")}
                  </NavLink>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}

export default NavbaR