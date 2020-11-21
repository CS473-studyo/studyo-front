import React, { useState } from 'react';
import { Card } from 'react-bootstrap';
import Header from 'components/header.js';
import ClapButton from 'react-clap-button';
import Clap from 'public/clap.svg';

export default function Home() {
  const [totalCount, setTotalCount] = useState(0);

  return (
    <div className="pt-5">
      <ClapButton
        count={0}
        countTotal={totalCount}
        isClicked={false}
        maxCount={3}
        onCountChange={function onCountChange() {
          setTotalCount((totalCount) => totalCount + 1);
        }}
        theme={{
          secondaryColor: '#234382',
        }}
      />
      <div>{totalCount}</div>
    </div>
  );
}
