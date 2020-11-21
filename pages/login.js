import { useState } from 'react';
import { useRouter } from 'next/router';
import { Button, Form } from 'react-bootstrap';
import Logo from '../public/Logo.svg';
import * as loginAPI from 'api/user';

const AdminLoginPage = () => {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const tryLogin = (e) => {
    e.preventDefault();
    loginAPI
      .login({ email, password })
      .then((res) => {
        router.push('/main');
      })
      .catch((err) => {
        alert('로그인 정보가 일치하지 않습니다.');
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
      <div className="d-flex login-content">
        <div className="flex-grow-1 login-module d-flex flex-column">
          <a href="/web" className="align-self-center login-logo">
            <Logo />
          </a>
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
          </Form>
        </div>
      </div>
    </div>
  );
};

export default AdminLoginPage;
