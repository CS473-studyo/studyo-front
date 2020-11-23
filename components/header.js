import React, { useState, useEffect, useCallback } from 'react';
import { Container, Navbar, Nav, NavDropdown } from 'react-bootstrap';
import styles from 'components/header.module.css';
import { withRouter } from 'react-router-dom';
import Logo from 'public/Logo.svg';
import * as userAPI from 'api/user.js';

const Header = ({ history, ...props }) => {
  const [auth, setAuth] = useState(false);
  const [authButtonBar, setAuthButtonBar] = useState(<div />);
  const [name, setName] = useState('');

  const checkAuth = async () => {
    const user = await userAPI.check();

    const newName = user.data.name || 'NoName';
    const id = user.data.id ? true : false;

    setAuth(id);
    setName(newName);
  };

  useEffect(() => {
    checkAuth();
  }, []);

  console.log(auth);

  const tryLogout = () => {
    userAPI.logout().then((res) => setAuth(false));
  };

  useEffect(() => {
    if (auth)
      setAuthButtonBar(
        <div className="d-flex ml-auto">
          <NavDropdown
            alignRight
            title={name}
            id="user-name"
            className="body-text"
          >
            <NavDropdown.Item className="header-logout">
              Mypage
            </NavDropdown.Item>
            <NavDropdown.Item
              onClick={tryLogout}
              className="header-logout"
            >
              Logout
            </NavDropdown.Item>
          </NavDropdown>
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
  }, [auth, name]);

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
