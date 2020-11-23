import React, { useState } from 'react';
import Footer from 'components/footer';

export default function Home() {
  const [totalCount, setTotalCount] = useState(0);

  return (
    <div className="pt-5">
      <Footer />
    </div>
  );
}
