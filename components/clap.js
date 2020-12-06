import { useEffect, useState } from 'react';
import { clap, getClap } from 'api/note';
import { Spinner } from 'react-bootstrap';
import ClapIcon from '/public/clap.svg';

const Clap = ({ LectureId, UserId, page }) => {
  const [totalCount, setTotalCount] = useState(-1);
  const [clapOn, setClapOn] = useState(false);
  const toggleClap = () => setClapOn(!clapOn);

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
      <div
        className="col body-text align-center text-right"
        style={{ color: '#234382' }}
      >
        {totalCount} claps for this note!
      </div>
      <button
        className="clap-btn"
        onMouseEnter={toggleClap}
        onMouseLeave={toggleClap}
        onClick={clapNote}
      >
        {clapOn ? (
          <ClapIcon width="20px" fill="#ffffff" />
        ) : (
          <ClapIcon width="20px" fill="#234382" />
        )}
      </button>
    </div>
  );
};

export default Clap;
