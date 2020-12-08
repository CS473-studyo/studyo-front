import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Header from 'components/header';
import Footer from 'components/footer';
import LectureHeader from 'components/lectureHeader';
import { Row, Col } from 'react-bootstrap';

import AnswerList from 'components/answerList.js';
import * as questionAPI from 'api/question';
import * as answerAPI from 'api/answer';

import getServerSideProps from 'utils/checkAuth';
export { getServerSideProps };

const Quiz = (props) => {
  const router = useRouter();
  const { courseId, lectureId } = router.query;

  const [answer, setAnswer] = useState('');
  const onInput = ({ target: { value } }) => setAnswer(value);

  const [displayQuiz, setDisplayQuiz] = useState(-1);

  function changeQuiz(offset) {
    setDisplayQuiz((prevQuizNumber) => prevQuizNumber + offset);
  }

  function previousQuiz() {
    changeQuiz(-1);
  }

  function nextQuiz() {
    changeQuiz(1);
  }

  function nextQuizwithSubmit() {
    // console.log(quizzes[displayQuiz].id);
    // console.log(answer);
    answerAPI.submit(quizzes[displayQuiz].id, answer).then((res) => {
      console.log(answer);
    });
    nextQuiz();
  }

  const [quizzes, setQuizzes] = useState([]);

  useEffect(() => {
    if (lectureId) {
      getQuestions();
    }
  }, [lectureId]);

  const getQuestions = () => {
    questionAPI.quizList(lectureId).then(({ data }) => {
      setQuizzes(data);
      setDisplayQuiz(0);
    });
  };

  const [answers, setAnswers] = useState([]);

  useEffect(() => {
    if (quizzes[displayQuiz] && quizzes[displayQuiz].id) {
      console.log(quizzes[displayQuiz].id);
      answerAPI.answers(quizzes[displayQuiz].id).then(({ data }) => {
        setAnswers(data);
        console.log(data);
      });
    }
  }, [displayQuiz]);

  const ButtonsGroup = () => {
    if (displayQuiz === 0) {
      return (
        <div>
          <div id="buttongroup" class="float-right">
            <button
              type="submit"
              class="btn btn-primary mr-2"
              onClick={() => nextQuizwithSubmit()}
            >
              Submit
            </button>
            <button
              type="pass"
              class="btn btn-secondary"
              onClick={() => nextQuiz()}
            >
              Pass
            </button>
          </div>
        </div>
      );
    }
    return (
      <div>
        <button
          type="prev"
          class="btn btn-primary mr-2"
          onClick={() => previousQuiz()}
        >
          Prev
        </button>
        <div id="buttongroup" class="float-right">
          <button
            type="submit"
            class="btn btn-primary mr-2"
            onClick={() => nextQuizwithSubmit()}
          >
            Submit
          </button>
          <button
            type="pass"
            class="btn btn-secondary"
            onClick={() => nextQuiz()}
          >
            Pass
          </button>
        </div>
      </div>
    );
  };

  console.log('quiz length: ' + quizzes.length);
  console.log('display quiz: ' + displayQuiz);

  if (quizzes.length === 0) {
    return (
      <div
        style={{
          minHeight: '100vh',
        }}
        className="d-flex flex-column"
      >
        <Header name={props.name} badge={props.badge} />
        <LectureHeader courseId={courseId} lectureId={lectureId} />
        <div className="container h-100 mt-5 mb-5 flex-grow-1">
          <div className="title-text text-center">
            No Quizzes Exist Yet!
          </div>
          <div className="body-text text-center mt-1">
            Please wait until your friends ask some quiestions.
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (quizzes.length <= displayQuiz) {
    return (
      <div
        style={{
          minHeight: '100vh',
        }}
        className="d-flex flex-column"
      >
        <Header name={props.name} badge={props.badge} />
        <LectureHeader courseId={courseId} lectureId={lectureId} />
        <div className="container mb-3 flex-grow-1">
          <div class="progress mt-4 mb-4">
            <div
              class="progress-bar"
              role="progressbar"
              aria-valuenow="100"
              aria-valuemin="0"
              aria-valuemax="100"
              style={{ width: '100%' }}
            >
              All quiz completed
            </div>
          </div>
          <div class="h-100 mt-5 align-items-center">
            <div class="title-text text-center">
              You completed all review quiz!
            </div>
            <div class="d-flex justify-content-center mt-5">
              <Link href={`/course/${courseId}`}>
                <a className="custom-btn mr-2 align-middle">
                  Back to home
                </a>
              </Link>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const QuizContent = () => {
    if (quizzes && quizzes[displayQuiz])
      return (
        <div>
          <div class="subtitle-text mb-2" style={{ color: '#234382' }}>
            {quizzes[displayQuiz].title}
          </div>
          <div
            class="subtitle-text mb-5"
            style={{ whiteSpace: 'pre-wrap' }}
          >
            {quizzes[displayQuiz].content}
          </div>
        </div>
      );
    return null;
  };

  return (
    <div
      style={{
        minHeight: '100vh',
      }}
      className="d-flex flex-column"
    >
      <Header name={props.name} badge={props.badge} />
      <LectureHeader courseId={courseId} lectureId={lectureId} />
      <div class="container mb-3 flex-grow-1">
        <div class="progress mt-4 mb-4">
          <div
            class="progress-bar progress-bar-striped progress-bar-animated"
            role="progressbar"
            aria-valuenow={((displayQuiz + 1) * 100) / quizzes.length}
            aria-valuemin="0"
            aria-valuemax="100"
            style={{
              width: ((displayQuiz + 1) * 100) / quizzes.length + '%',
            }}
          >
            {displayQuiz + 1} / {quizzes.length} quiz in progress
          </div>
        </div>
        <div class="title-text mb-2">Quiz {displayQuiz + 1}.</div>
        <Row>
          <div class="col-lg-6">
            <QuizContent />
            <form>
              <div class="form-group">
                <label class="body-text" for="exampleInputEmail1">
                  Enter your answer
                </label>
                <textarea
                  type="text"
                  class="form-control"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  placeholder="Your Answer"
                  onChange={onInput}
                />
                <small id="emailHelp" class="form-text text-muted">
                  Your answer will be shared to your classmates.
                </small>
              </div>
              <ButtonsGroup />
            </form>
          </div>
          <div class="col-lg-6">
            <div class="subtitle-text mb-3 mt-3 mt-lg-0">
              Answers from course students
            </div>
            <div className="pl-3">
              <AnswerList answers={answers} admin={props.admin} />
            </div>
          </div>
        </Row>
      </div>
      <Footer />
    </div>
  );
};

export default Quiz;
