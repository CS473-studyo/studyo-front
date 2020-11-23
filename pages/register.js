import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Button, Form, Modal } from 'react-bootstrap';
import Logo from '../public/Logo.svg';
import * as loginAPI from 'api/user';

const AdminLoginPage = () => {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [modal, setModal] = useState('');

  const handleClose = () => setShowModal(false);

  const tryRegister = (e) => {
    e.preventDefault();
    loginAPI
      .register({ name, email, password })
      .then((res) => {
        router.push('/login');
      })
      .catch((err) => {
        setShowModal(true);
        setModal(err.response.data);
      });
  };

  useEffect(() => {
    loginAPI
      .check()
      .then((res) => {
        alert('Please log out before registering.');
        router.push('/main');
      })
      .catch((err) => {});
  });

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
          <a href="/main" className="align-self-center login-logo">
            <Logo />
          </a>
          <Form className="login-form" onSubmit={tryRegister}>
            <Form.Group>
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="name"
                onChange={(value) => setName(value.target.value)}
              />
            </Form.Group>
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
              disabled={!(name && email && password)}
              type="submit"
              className="login-button"
              variant="primary"
            >
              Register
            </Button>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default AdminLoginPage;
