import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Header from 'components/header.js';
import LectureHeader from 'components/lectureheader.js';

import AnswerList from 'components/answerList.js';
import * as questionAPI from 'api/question';
import * as answerAPI from 'api/answer';

const QuizPage = () => {
  const router = useRouter();
  const { courseid, lectureid } = router.query;
  // const courseid = "CS350"
  // const lectureid = "1"
  // console.log(courseid, lectureid)
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
      id: 'a',
      title: 'Introductory Question',
      content:
        'What is you name? Also, what is the next alphabet for ‘a’?',
    },
    {
      id: 'b',
      title: 'Introductory Question',
      content:
        'What is you name? Also, what is the next alphabet for ‘a’?',
    },
  ];
  let totalQuizCount = 2;
  if (lectureid) {
    questionAPI.quizList(parseInt(lectureid)).then((res) => {
      quizes = res.data;
      totalQuizCount = Object.keys(quizes).length;
    });
  }

  let answers = [
    {
      num: '1',
      content:
        'My name is JunSeoung Choi. The next alphabet for ‘a’ is ‘b’.',
      name: 'JunSeoung Choi',
      clap: '10',
    },
    {
      num: '2',
      content:
        'My name is JunSeoung Choi. The next alphabet for ‘a’ is ‘b’.',
      name: 'Dan Choi',
      clap: '1',
    },
  ]; // Todo: get notes list(현재 course,lecture, answer의 모든 note 가져오기)
  // To backend: 연결할 때 num이라는 property가 있는데,
  // 이거 그냥 처음 들어오는 순서대로 1부터 numbering 해주시면 됩니다!
  // 아니면 아무 숫자로 된 id같은 게 있으면 그냥 그걸 써도 되는데,
  // 어쨌든 answer별로 구분되는 고유의 무언가의 값이 들어있으면 됨.

  if (quizes[displayQuiz].id) {
    answerAPI.answers(quizes[displayQuiz].id).then((res) => {
      answers = res.data;
    });
  }

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
            <AnswerList answers={answers} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuizPage;
