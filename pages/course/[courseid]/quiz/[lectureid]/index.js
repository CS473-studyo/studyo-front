import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Header from 'components/header.js';
import LectureHeader from 'components/lectureheader.js';
import AnswerList from 'components/answerList.js';

const QuizPage = () => {
  const router = useRouter();
  const { courseid, lectureid } = router.query;

  const [displayQuiz, setDisplayQuiz] = useState(1);
  function changeQuiz(offset) {
    setDisplayQuiz((prevQuizNumber) => prevQuizNumber + offset);
  }

  function previousQuiz() {
    changeQuiz(-1);
  }

  function nextQuiz() {
    changeQuiz(1);
  }

  let quizes = [
    {
      title: 'Introductory Question',
      content:
        'What is you name? Also, what is the next alphabet for ‘a’?',
    },
    {
      title: 'Introductory Question',
      content:
        'What is you name? Also, what is the next alphabet for ‘a’?',
    },
  ]; // Todo: get quizes that matches course & lecture (exclude my questions)
  let totalQuizCount = 2; //Todo: get total quiz count

  let answers = [
    {
      title: 'Introductory Question',
      content:
        'What is you name? Also, what is the next alphabet for ‘a’?',
    },
    {
      title: 'Introductory Question',
      content:
        'What is you name? Also, what is the next alphabet for ‘a’?',
    },
  ]; // Todo: get answers that matches course & lecture & current displayed quiz

  const ButtonsGroup = () => {
    if (displayQuiz === 0) {
      return (
        <div>
          <div id="buttongroup" class="float-right">
            <button
              type="submit"
              class="btn btn-primary mr-2"
              onClick={() => nextQuiz()}
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
            onClick={() => nextQuiz()}
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

  console.log(quizes[0].title);
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
            aria-valuenow={((displayQuiz + 1) * 100) / totalQuizCount}
            aria-valuemin="0"
            aria-valuemax="100"
            style={{
              width: ((displayQuiz + 1) * 100) / totalQuizCount + '%',
            }}
          >
            {displayQuiz + 1} / {totalQuizCount} quiz in progress
          </div>
        </div>
        <div class="title-text mb-2">Quiz {displayQuiz + 1}.</div>
        <div class="row w-100">
          <div class="col">
            <div class="subtitle-text mb-2" style={{ color: '#234382' }}>
              {quizes[displayQuiz].title}
            </div>
            <div class="subtitle-text mb-5">
              {quizes[displayQuiz].content}
            </div>
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
            <AnswerList />
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuizPage;
