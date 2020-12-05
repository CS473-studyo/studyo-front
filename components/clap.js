import { useEffect, useState } from 'react';
import { clap, getClap } from 'api/note';
import { Spinner } from 'react-bootstrap';

import ClapButton from 'react-clap-button';

const Clap = ({ LectureId, UserId, page }) => {
  const [totalCount, setTotalCount] = useState(-1);

  useEffect(() => {
    getClap(LectureId, UserId, page).then(({ data }) => {
      setTotalCount(data);
    });
  }, [LectureId, UserId, page]);

  const clapNote = () => {
    clap(LectureId, UserId, page).then((res) => {
      setTotalCount(totalCount + 1);
    });
  };

  return totalCount === -1 ? (
    <Spinner animation="border" />
  ) : (
    <div
      style={{ margin: '8px 8px' }}
      className="d-flex justify-content-between align-items-center"
    >
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
