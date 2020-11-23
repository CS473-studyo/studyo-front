import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

import Header from 'components/header';
import CourseHeader from 'components/courseHeader';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import * as questionAPI from 'api/question';
import * as answerAPI from 'api/answer';

const QuestionDetail = () => {
  const router = useRouter();
  const { courseid, questionid } = router.query;

  const [question, setQuestion] = useState({
    num: '1',
    title: 'Introductory Question',
    content: 'What is you name? Also, what is the next alphabet for ‘a’?',
    date: 'Aug. 8',
    lecture: '4',
    id: '123',
  }); //Todo: questionid 이용해서 question 가져오기

  const [answers, setAnswers] = useState([
    {
      name: 'Daeun Choi',
      title: 'Introductory Question',
      content:
        'What is you name? Also, what is the next alphabet for ‘a’?',
    },
    {
      name: 'Dan Choi',
      title: 'Introductory Question',
      content:
        'What is you name? Also, what is the next alphabet for ‘a’?',
    },
  ]); //Todo: questionid 이용해서 answers 가져오기

  let Qresult;
  let Aresult;

  const getQuestionList = async () => {
    Qresult = await questionAPI.question(questionid);
    setQuestion(Qresult.data);
  };

  useEffect(() => {
    getQuestionList();
  }, []);

  const getAnswerList = async () => {
    Aresult = await answerAPI.answers(questionid);
    setAnswers(Aresult.data);
    console.log(Aresult.data);
  };

  useEffect(() => {
    getAnswerList();
  }, []);

  return (
    <>
      <Header />
      <CourseHeader courseid={courseid} />
      <div className="container">
        <div className="title-text mt-5 mb-2" style={{ color: '#234382' }}>
          <Link href={`/course/${courseid}/question`}>
            <a style={{ textDecoration: 'none', color: '#234382' }}>
              <ArrowBackIcon
                fontSize="large"
                classNmae="mr-1"
              ></ArrowBackIcon>
              Questions #{question.num}
            </a>
          </Link>
        </div>
        <div class="w-100 ml-2">
          <div class="subtitle-text mb-2" style={{ color: '#234382' }}>
            {question.title}
          </div>
          <div class="body-text mb-2">{question.content}</div>
          <hr />
          <div class="subtitle-text" style={{ color: '#234382' }}>
            Answers from course students
          </div>
        </div>
      </div>
    </>
  );
};

export default QuestionDetail;
