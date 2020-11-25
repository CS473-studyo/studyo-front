import React, { useState, useEffect } from 'react';
import { Container, Navbar, Nav, NavDropdown } from 'react-bootstrap';
import styles from 'components/header.module.css';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Logo from 'public/Logo.svg';
import * as userAPI from 'api/user.js';

const Header = (props) => {
  const [auth, setAuth] = useState(false);
  const [authButtonBar, setAuthButtonBar] = useState(<div />);
  const [name, setName] = useState(props.name || 'NoName');

  const router = useRouter();

  const tryLogout = () => {
    userAPI.logout().then((res) => router.reload());
  };

  useEffect(() => {
    if (name)
      setAuthButtonBar(
        <div className="d-flex ml-auto">
          <NavDropdown
            alignRight
            title={name}
            id="user-name"
            className="body-text"
          >
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
            <Nav.Link
              onClick={() => router.push('/login')}
              className="header-login"
            >
              Login
            </Nav.Link>
          </Nav>
          <Nav>
            <Nav.Link
              className="header-login"
              onClick={() => router.push('/register')}
            >
              Register
            </Nav.Link>
          </Nav>
        </div>
      );
  }, [name]);

  return (
    <div style={{ backgroundColor: '#fff' }}>
      <Navbar as={Container} collapseOnSelect expand="lg">
        <Navbar.Brand
          onClick={() => router.push('/')}
          style={{ cursor: 'pointer' }}
        >
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
