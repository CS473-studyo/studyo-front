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

import getServerSideProps from 'utils/checkAuth';
export { getServerSideProps };

const QuestionDetail = (props) => {
  const router = useRouter();
  const { courseid, questionid } = router.query;

  const [question, setQuestion] = useState({});
  const [answers, setAnswers] = useState([]);

  const getQuestionList = () => {
    questionAPI.question(questionid).then(({ data }) => setQuestion(data));
  };

  useEffect(() => {
    getQuestionList();
  }, []);

  const getAnswerList = async () => {
    answerAPI.answers(questionid).then(({ data }) => setAnswers(data));
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
      <Header name={props.name} badge={props.badge} />
      <CourseHeader courseid={courseid} />
      <div className="container">
        <div className="title-text mt-5 mb-2" style={{ color: '#234382' }}>
          <Link href={`/course/${courseid}/question`}>
            <a style={{ textDecoration: 'none', color: '#234382' }}>
              <ArrowBackIcon
                fontSize="large"
                className="mr-1"
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
