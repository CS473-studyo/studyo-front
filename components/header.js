import React, { useState, useEffect, useCallback } from "react";
import { Container, Navbar, Nav } from "react-bootstrap";
import "components/header.module.css";
import { withRouter } from "react-router-dom";
import Logo from "public/Logo.svg"

const Header = ({ history, ...props }) => {
  const [hover1, setHover1] = useState(<div />);
  const [hover2, setHover2] = useState(<div />);
  const [hover3, setHover3] = useState(<div />);
  const [hover4, setHover4] = useState(<div />);
  const [adminAuth, setAdminAuth] = useState(false);
  const [authButtonBar, setAuthButtonBar] = useState(<div />);

  const active = (
    <div
      style={{
        height: "2px",
        backgroundColor: "#444",
        marginTop: "-2px"
      }}
    />
  );

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

  const enter = <div className="tab-hover-enter" />;
  const leave = <div className="tab-hover-leave" />;

  const tryLogout = useCallback(() => {
    setAdminAuth(false);
    delete window.sessionStorage["accessToken"];
    delete window.sessionStorage["email"];
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
              로그인
            </Nav.Link>
          </Nav>
          <Nav>
            <Nav.Link className="header-login" href="/web/auth/agreement">
              회원가입
            </Nav.Link>
          </Nav>
        </div>
      );
  }, [adminAuth, tryLogout]);

  return (
    <div style={{ backgroundColor: "#fff" }}>
      <Navbar as={Container} collapseOnSelect expand="lg">
        <Navbar.Brand href="/web/main">
          <Logo/>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          {authButtonBar}
        </Navbar.Collapse>
      </Navbar>
      <div style={{ height: "1px", backgroundColor: "#ddd" }} />
    </div>
  );
};

export default Header;
