import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Header from 'components/header.js';
import LectureHeader from 'components/lectureheader.js';
import { Button } from 'react-bootstrap';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';

const QuizPage = () => {
  console.log('rerender');
  const router = useRouter();
  const { courseid, lectureid } = router.query;

  const [keywordSelection, setKeywordSelection] = useState([]);

  const selectKeyword = (keyword) => {
    const newKeywordSelection = keywordSelection.slice();
    newKeywordSelection.push(keyword);
    setKeywordSelection(newKeywordSelection);
  };

  const unselectKeyword = (keyword) => {
    const newKeywordSelection = keywordSelection.slice();
    const idx = newKeywordSelection.indexOf(keyword);
    if (idx > -1) newKeywordSelection.splice(idx, 1);
    setKeywordSelection(newKeywordSelection);
  };

  const Keyword = ({ keyword }) => {
    console.log(keywordSelection.includes(keyword));
    if (keywordSelection.includes(keyword))
      return (
        <div className="card">
          <div className="card-body d-flex justify-content-between">
            <div className="body-text p-2">{keyword}</div>
            <Button
              className="body-text"
              onClick={() => unselectKeyword(keyword)}
            >
              <CheckCircleIcon className="mr-2" />
              Selected
            </Button>
          </div>
        </div>
      );
    else
      return (
        <div className="card">
          <div className="card-body d-flex justify-content-between">
            <div className="body-text p-2">{keyword}</div>
            <Button
              className="body-text"
              onClick={() => selectKeyword(keyword)}
            >
              <CheckCircleOutlineIcon className="mr-2" />
              Select
            </Button>
          </div>
        </div>
      );
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        fontFamily: 'NanumSquare',
      }}
      className="d-flex flex-column"
    >
      <Header />
      <LectureHeader courseid={courseid} lectureid={lectureid} />
      <div class="container">
        <div class="title-text mb-2 mt-5">Keyword</div>
        <div class="w-100">
          <div>
            <div class="subtitle-text mb-2" style={{ color: '#234382' }}>
              Vote for this lecture's keyword.
            </div>
            <Keyword keyword="hello" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuizPage;
