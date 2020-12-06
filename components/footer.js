import React from 'react';
import MailIcon from '@material-ui/icons/Mail';
import styles from './footer.module.scss';
import { Container, Navbar, Nav } from 'react-bootstrap';
import Link from 'next/link';

const Footer = (props) => (
  <div style={{ backgroundColor: '#eaeaea' }}>
    <div className="container">
      <div className="row py-4">
        <div className="col text-left body-text"></div>
        <div
          className="col text-center body-text"
          style={{ color: '#888888' }}
        >
          Made by the{' '}
          <a
            href="https://github.com/CS473-studyo"
            style={{ textDecoration: 'none', fontWeight: '400' }}
          >
            STUDYO team
          </a>{' '}
          as the <br /> Design Project for 2020 Fall KAIST CS473
        </div>
        <div className="col text-right body-text">
          <div style={{ color: '#888888' }}>
            Feedback{' '}
            <a
              href="https://forms.gle/sPPx6WmpKchMgN5z9"
              style={{ textDecoration: 'none', fontWeight: '400' }}
            >
              Here
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default Footer;
