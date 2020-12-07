import { useRouter } from 'next/router';
import Link from 'next/link';
import Header from 'components/header';
import Footer from 'components/footer';
import CourseHeader from 'components/courseHeader';
import React, { useEffect, useState } from 'react';
import * as questionAPI from 'api/question';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

import getServerSideProps from 'utils/checkAuth';
export { getServerSideProps };

const Question = (props) => {
  let result;
  const [questions, setQuestions] = useState([]);

  const router = useRouter();
  const { courseId } = router.query;

  const getQuestionList = async () => {
    result = await questionAPI.list();
    console.log(result.data);
    setQuestions(result.data);
  };

  useEffect(() => {
    getQuestionList();
  }, []);

  const QuestionElem = (props) => {
    return (
      <div>
        <Link href={`/course/${courseId}/question/${props.id}`}>
          <a style={{ textDecoration: 'none', color: 'black' }}>
            <div className="row mt-3 body-text ml-2 mr-2">
              <div className="col-2" style={{ fontWeight: '600' }}>
                Lecture {props.lecture}
              </div>
              <div className="col-8 row align-items-center">
                {props.title}
              </div>
              <div className="col-2">{props.date}</div>
            </div>
          </a>
        </Link>
      </div>
    );
  };

  const rows = questions.map((question) => (
    <div>
      <QuestionElem
        title={question.title}
        date={question.date}
        lecture={question.Lecture.number}
        id={question.id}
      />
      <hr />
    </div>
  ));

  return (
    <div
      style={{
        minHeight: '100vh',
      }}
      className="d-flex flex-column"
    >
      <Header name={props.name} badge={props.badge} />
      <CourseHeader courseId={courseId} />
      <div className="container mb-2 flex-grow-1">
        <div className="title-text mt-5" style={{ color: '#234382' }}>
          <Link href={`/course/${courseId}`}>
            <div style={{ cursor: 'pointer' }}>
              <ArrowBackIcon
                fontSize="large"
                className="mr-1"
              ></ArrowBackIcon>
              My Questions
            </div>
          </Link>
        </div>
        <div className="row mt-4 subtitle-text ml-2 mr-2">
          <div className="col-2">Lecture</div>
          <div className="col-8 row align-items-center">Title</div>
          <div className="col-2">Date</div>
        </div>
        <hr />
        <div className="mt-2">{rows}</div>
        <div className="d-flex flex-row justify-content-between student-note">
          <h1 className="title-text"></h1>
          <Link href={`/course/${courseId}/question/new`}>
            <a className="custom-btn float-right">New Question</a>
          </Link>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Question;
