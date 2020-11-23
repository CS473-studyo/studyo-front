import { useRouter } from 'next/router';
import Link from 'next/link';
import Header from 'components/header';
import CourseHeader from 'components/courseHeader';
import React, { useEffect, useState } from 'react';
import * as questionAPI from 'api/question';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

const Course = () => {
  let result;
  const [questions, setQuestions] = useState([]);

  const router = useRouter();
  const { courseid } = router.query;

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
        <Link href={`/course/${courseid}/question/${props.id}`}>
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
    <>
      <Header />
      <CourseHeader courseid={courseid} />
      <div className="container">
        <div className="title-text mt-5" style={{ color: '#234382' }}>
          <Link href={`/course/${courseid}`}>
            <div style={{ cursor: 'pointer' }}>
              <ArrowBackIcon
                fontSize="large"
                classNmae="mr-1"
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
        <Link href={`/course/${courseid}/question/new`}>
          <a className="mt-4 custom-btn float-right">New Question</a>
        </Link>
      </div>
    </>
  );
};

export default Course;
