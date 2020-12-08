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
  const [secondPassword, setSecondPassword] = useState('');
  const [name, setName] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [modal, setModal] = useState('');

  const handleClose = () => setShowModal(false);

  const tryRegister = (e) => {
    e.preventDefault();
    if (password !== secondPassword) {
      setShowModal(true);
      setModal('Your passwords do not match.');
      return;
    }
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
          <Form className="login-form" onSubmit={tryRegister}>
            <Form.Group>
              <Form.Label>Name (English) </Form.Label>
              <Form.Control
                type="name"
                onChange={(value) => setName(value.target.value)}
              />
              <Form.Text className="body-text">
                실명을 영어로 써 주세요. (ex. Gildong Hong)
              </Form.Text>
            </Form.Group>
            <Form.Group>
              <Form.Label>Email (KAIST)</Form.Label>
              <Form.Control
                type="text"
                onChange={(value) => setEmail(value.target.value)}
              />
              <Form.Text className="body-text">
                본인의 카이스트 메일을 사용해주세요.
              </Form.Text>
            </Form.Group>

            <Form.Group>
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                onChange={(value) => setPassword(value.target.value)}
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Retype password</Form.Label>
              <Form.Control
                type="password"
                onChange={(value) => setSecondPassword(value.target.value)}
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
