import React from 'react';
import styles from './footer.module.scss';
import { Container, Navbar, Nav } from 'react-bootstrap';
import Link from 'next/link';

const Footer = (props) => (
  // <div className={styles['footer']}>
  //   <p>This is some content in sticky footer</p>
  // </div>
  <div className={styles['footer']}>
    <Navbar as={Container} className="justify-content-end">
      <Nav>
        <Link href={`/course/${props.courseid}/question`}>
          <a
            className="custom-btn-outline"
            style={{ textDecoration: 'none' }}
          >
            My Questions
          </a>
        </Link>
      </Nav>
    </Navbar>
  </div>
);

export default Footer;
