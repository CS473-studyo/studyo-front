import React, { useEffect, useState } from 'react';

import { useRouter } from 'next/router';

import getServerSideProps from 'utils/checkAuth';
export { getServerSideProps };

import Logo from 'public/Logo2.svg';

const Home = () => {
  const router = useRouter();
  const buttonStyle = {
    fontSize: '20px',
    fontWeight: '600',
    fontFamily: 'NanumSquare',
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundColor: '#234382',
      }}
      className="d-flex flex-column justify-content-center align-items-center"
    >
      <Logo style={{ width: '30%' }} />
      <span className="title-text" style={{ color: 'white' }}>
        Study by sharing.
      </span>
      <div
        className="d-flex justify-content-between"
        style={{ paddingTop: '50px', width: '340px' }}
      >
        <button
          className="btn btn-outline-light"
          style={{ width: '160px' }}
          onClick={() => router.push('/login')}
        >
          <span style={buttonStyle}>Login</span>
        </button>
        <button
          className="btn btn-light"
          style={{ width: '160px' }}
          onClick={() => router.push('/register')}
        >
          <span style={buttonStyle}>Register</span>
        </button>
      </div>
    </div>
  );
};

export default Home;
