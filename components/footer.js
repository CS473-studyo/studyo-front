import React from 'react';

const Footer = (props) => (
  <div style={{ backgroundColor: '#eaeaea' }}>
    <div className="container">
      <div
        className="d-flex align-items-center"
        style={{ height: '80px' }}
      >
        <div className="col text-left body-text"></div>
        <div
          className="col text-center body-text"
          style={{ color: '#888888' }}
        >
          Made with ❤️ & 🔥 by{' '}
          <a
            target="_blank"
            href="https://github.com/CS473-studyo"
            style={{ textDecoration: 'none', fontWeight: '400' }}
          >
            STUDYO team
          </a>
          <br /> Design Project for 2020 Fall KAIST CS473
        </div>
        <div className="col text-right body-text">
          <div style={{ color: '#888888' }}>
            Feedback{' '}
            <a
              target="_blank"
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
