import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Button, Form, Modal } from 'react-bootstrap';
import Logo from '../public/Logo.svg';
import * as loginAPI from 'api/user';
import Link from 'next/link';

import getServerSideProps from 'utils/checkAuth';
export { getServerSideProps };

const AdminLoginPage = () => {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [modal, setModal] = useState('');

  const handleClose = () => setShowModal(false);

  const tryLogin = (e) => {
    e.preventDefault();
    loginAPI
      .login({ email, password })
      .then((res) => {
        router.push('/');
      })
      .catch((err) => {
        setShowModal(true);
        setModal(err.response.data);
      });
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        // backgroundColor: "#eee",
      }}
      className="d-flex align-items-center"
    >
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Body>{modal}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
      <div className="d-flex login-content">
        <div className="flex-grow-1 login-module d-flex flex-column">
          <Link href="/home">
            <a className="align-self-center login-logo">
              <Logo />
            </a>
          </Link>
          <Form className="login-form" onSubmit={tryLogin}>
            <Form.Group>
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="text"
                onChange={(value) => setEmail(value.target.value)}
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                onChange={(value) => setPassword(value.target.value)}
              />
            </Form.Group>
            <Button
              type="submit"
              className="login-button"
              variant="primary"
            >
              Login
            </Button>
            <Form.Text className="text-muted">
              New to Studyo? <Link href="/register">Register</Link>
            </Form.Text>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default AdminLoginPage;
