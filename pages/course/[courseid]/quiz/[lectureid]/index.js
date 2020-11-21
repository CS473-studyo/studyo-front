import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Header from 'components/header.js';
import LectureHeader from 'components/lectureheader.js';
import { Card } from 'react-bootstrap';
import SearchIcon from '@material-ui/icons/Search';

const QuizPage = () => {
  const router = useRouter();
  const { courseid, lectureid } = router.query;

  const [displayQuiz, setDisplayQuiz] = useState(1);

  let quizes = [
    {
      title: 'Introductory Question',
      content:
        'What is you name? Also, what is the next alphabet for ‘a’?',
    },
  ]; // Todo: get quizes that matches course & lecture (exclude my questions)
  let totalQuizCount = 3; //Todo: get total quiz count

  const QuizElem = (props) => {
    return (
      <Card className="w-100 mb-2">
        <Card.Body>
          <div className="container row">
            <div className="title-text mr-2">{props.title}</div>
          </div>
          <div className="mt-2 body-text">{props.content}</div>
          <a
            href={`/course/${props.code}`}
            type="button"
            className="mt-4 custom-btn"
          >
            Submit
          </a>
        </Card.Body>
      </Card>
    );
  };

  if (totalQuizCount === 0) {
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
        <div class="h-100">
          <div class="title-text text-center">No Quizes Exist Yet!</div>
          <div class="body-text text-center">
            Please wait until your friends ask some quiestions.
          </div>
        </div>
      </div>
    );
  }

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
        <div class="progress">
          <div
            class="progress-bar progress-bar-striped progress-bar-animated"
            role="progressbar"
            aria-valuenow={(displayQuiz * 100) / totalQuizCount}
            aria-valuemin="0"
            aria-valuemax="100"
            style={{ width: (displayQuiz * 100) / totalQuizCount + '%' }}
          >
            {displayQuiz} / {totalQuizCount} completed
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuizPage;
