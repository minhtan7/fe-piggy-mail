import React from "react";
import { Navbar, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { authActions } from "../redux/actions/auth.actions";

const PublicNavbar = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const loading = useSelector((state) => state.auth.loading);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  const handleLogout = () => {
    dispatch(authActions.logout());
  };
  const authLinks = (
    <>
      <Nav.Link as={Link} to="/admin/profile">
        {user?.name}
      </Nav.Link>
      <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
    </>
  );
  const publicLinks = (
    <>
      <Nav.Link as={Link} to="/register">
        Register
      </Nav.Link>
      <Nav.Link as={Link} to="/login">
        Login
      </Nav.Link>
    </>
  );
  return (
    <Navbar bg="light" expand="lg">
      <Navbar.Brand as={Link} to="/">
        Piggy mail
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          {!loading && <>{isAuthenticated ? authLinks : publicLinks}</>}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default PublicNavbar;
