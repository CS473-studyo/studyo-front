import { useEffect, useState } from 'react';
import { clap, getClap } from 'api/note';

import ClapButton from 'react-clap-button';

const Clap = ({ noteId }) => {
  const [totalCount, setTotalCount] = useState(0);

  useEffect(() => {
    getClap(noteId).then(({ data }) => {
      setTotalCount(data);
    });
  }, [noteId]);

  const clapNote = () => {
    clap(noteId).then((res) => {
      setTotalCount(totalCount + 1);
    });
  };

  return (
    <div className="w-100 row align-items-center">
      <div className="col body-text align-center">
        {totalCount} claps for this note!{' '}
      </div>
      <ClapButton
        className="col"
        count={false}
        countTotal={totalCount}
        isClicked={false}
        onCountChange={clapNote}
        theme={{
          secondaryColor: '#234382',
        }}
      />
    </div>
  );
};

export default Clap;
