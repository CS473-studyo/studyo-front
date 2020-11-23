import React from 'react';
import styles from './footer.module.scss';
import { Container, Navbar, Nav } from 'react-bootstrap';

const Footer = (props) => (
  // <div className={styles['footer']}>
  //   <p>This is some content in sticky footer</p>
  // </div>
  <div className={styles['footer']}>
    <Navbar as={Container} className="justify-content-end">
      <Nav>
        <a
          className="custom-btn"
          href={`/course/${props.courseid}/question`}
        >
          My Questions
        </a>
      </Nav>
    </Navbar>
  </div>
);

export default Footer;
