import React, { useState, useEffect, useCallback } from 'react';
import { Container, Navbar, Nav } from 'react-bootstrap';
import styles from 'components/header.module.css';
import { withRouter } from 'react-router-dom';
import Logo from 'public/Logo.svg';

const Header = ({ history, ...props }) => {
  const [adminAuth, setAdminAuth] = useState(false);
  const [authButtonBar, setAuthButtonBar] = useState(<div />);

  const checkAdminAuth = async () => {
    const access = await adminsAPI.checkAdmin(
      window.sessionStorage.accessToken
    );
    console.log(access);
    setAdminAuth(access.data.access);
  };

  useEffect(() => {
    // checkAdminAuth();
  }, []);

  const tryLogout = useCallback(() => {
    setAdminAuth(false);
    delete window.sessionStorage['accessToken'];
    delete window.sessionStorage['email'];
  }, []);

  useEffect(() => {
    if (adminAuth)
      setAuthButtonBar(
        <div className="d-flex">
          <Nav>
            <div className="header-logout" onClick={tryLogout}>
              어드민 로그아웃
            </div>
          </Nav>
        </div>
      );
    else
      setAuthButtonBar(
        <div className="d-flex ml-auto">
          <Nav>
            <Nav.Link className="header-login" href="/web/api/auth/login">
              Login
            </Nav.Link>
          </Nav>
          <Nav>
            <Nav.Link className="header-login" href="/web/auth/agreement">
              Register
            </Nav.Link>
          </Nav>
        </div>
      );
  }, [adminAuth, tryLogout]);

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
