import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { Card } from 'react-bootstrap';

import Header from 'components/header';
import CourseHeader from 'components/courseHeader';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import * as questionAPI from 'api/question';
import * as answerAPI from 'api/answer';

const QuestionDetail = () => {
  const router = useRouter();
  const { courseid, questionid } = router.query;

  const [question, setQuestion] = useState({}); //Todo: questionid 이용해서 question 가져오기

  const [answers, setAnswers] = useState([]);

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
  }, [question]);

  const AnswerCard = ({ username, content, clap }) => {
    return (
      <div className="col-sm-4 mb-2">
        <Card style={{ width: '100%' }}>
          <Card.Body>
            <Card.Title className="row container align-items-center">
              <AccountCircleIcon className="mr-2"></AccountCircleIcon>
              <div className="subtitle-text">{username}</div>
            </Card.Title>
            <Card.Text className="body-text mb-2">{content}</Card.Text>
            <Card.Text className="body-text" style={{ color: '#234382' }}>
              {clap} claps for this answer!
            </Card.Text>
          </Card.Body>
        </Card>
      </div>
    );
  };

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
              Question{question.num}
            </a>
          </Link>
        </div>
        <div class="w-100 ml-2">
          <div class="subtitle-text mb-2" style={{ color: '#234382' }}>
            {question.title}
          </div>
          <div class="body-text mb-2">{question.content}</div>
          <hr />
          <div class="subtitle-text mb-4" style={{ color: '#234382' }}>
            Answers from course students
          </div>
          <div className="row">
            {answers.map((answer) => (
              <AnswerCard
                username={answer.User.name}
                content={answer.content}
                clap={answer.clap}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default QuestionDetail;
