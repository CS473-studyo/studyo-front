import React, { useState, useEffect, useCallback } from 'react';
import { Container, Navbar, Nav } from 'react-bootstrap';
import styles from 'components/header.module.css';
import { withRouter } from 'react-router-dom';
import Logo from 'public/Logo.svg';
import * as userAPI from 'api/user.js';

const Header = ({ history, ...props }) => {
  const [auth, setAuth] = useState(false);
  const [authButtonBar, setAuthButtonBar] = useState(<div />);

  const checkAuth = async () => {
    const access = await userAPI.check();
    setAuth(access.data ? true : false);
  };

  useEffect(() => {
    checkAuth();
  }, []);

  const tryLogout = () => {
    userAPI.logout().then((res) => setAuth(false));
  };

  useEffect(() => {
    if (auth)
      setAuthButtonBar(
        <div className="d-flex ml-auto">
          <Nav>
            <div className="header-logout" onClick={tryLogout}>
              Logout
            </div>
          </Nav>
        </div>
      );
    else
      setAuthButtonBar(
        <div className="d-flex ml-auto">
          <Nav>
            <Nav.Link className="header-login" href="/login">
              Login
            </Nav.Link>
          </Nav>
          <Nav>
            <Nav.Link className="header-login" href="/register">
              Register
            </Nav.Link>
          </Nav>
        </div>
      );
  }, [auth]);

  return (
    <div style={{ backgroundColor: '#fff' }}>
      <Navbar as={Container} collapseOnSelect expand="lg">
        <Navbar.Brand href="/main">
          <Logo />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          {authButtonBar}
        </Navbar.Collapse>
      </Navbar>
      <div style={{ height: '1px', backgroundColor: '#ddd' }} />
    </div>
  );
};

export default Header;
