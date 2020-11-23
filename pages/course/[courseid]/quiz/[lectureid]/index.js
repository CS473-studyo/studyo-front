import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Header from 'components/header.js';
import LectureHeader from 'components/lectureheader.js';

import AnswerList from 'components/answerList.js';
import * as questionAPI from 'api/question';
import * as answerAPI from 'api/answer';

const QuizPage = () => {
  const router = useRouter();
  const { courseid, lectureid } = router.query;

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
    if (lectureid) {
      getQuestions();
    }
  }, [lectureid]);

  const getQuestions = () => {
    questionAPI.quizList(lectureid).then((res) => {
      setQuizzes(res.data);
      setDisplayQuiz(0);
    });
  };

  const [answers, setAnswers] = useState([]);

  useEffect(() => {
    if (quizzes[displayQuiz] && quizzes[displayQuiz].id) {
      console.log(quizzes[displayQuiz].id);
      answerAPI.answers(quizzes[displayQuiz].id).then((res) => {
        setAnswers(res.data);
        console.log(res.data);
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

  // console.log(quizzes.length);

  if (quizzes.length === 0) {
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
        <div class="h-100 mt-5">
          <div class="title-text text-center">No Quizzes Exist Yet!</div>
          <div class="body-text text-center mt-1">
            Please wait until your friends ask some quiestions.
          </div>
        </div>
      </div>
    );
  }

  if (quizzes.length <= displayQuiz) {
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
        <div className="container">
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
              <a
                type="submit"
                className="custom-btn mr-2 align-middle"
                href={`/course/${courseid}`}
              >
                Back to home
              </a>
            </div>
          </div>
        </div>
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
          <div class="subtitle-text mb-5">
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
        fontFamily: 'NanumSquare',
      }}
      className="d-flex flex-column"
    >
      <Header />
      <LectureHeader courseid={courseid} lectureid={lectureid} />
      <div class="container">
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
        <div class="row w-100">
          <div class="col">
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
          <div class="col">
            <div class="subtitle-text">Answers from course students</div>
            <AnswerList answers={answers} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuizPage;
