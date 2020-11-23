import { useRouter } from 'next/router';
import Link from 'next/link';
import Header from 'components/header';
import CourseHeader from 'components/courseHeader';
import React, { useEffect, useState } from 'react';
import * as questionAPI from 'api/question';

const Course = () => {
  let result;
  const [questions, setQuestions] = useState([
    {
      num: '1',
      title: 'hello',
      date: 'Aug. 8',
      lecture: '4',
      id: '123',
    },
    {
      num: '2',
      title: 'bye',
      date: 'Aug. 10',
      lecture: '5',
      id: '234',
    },
  ]);

  const router = useRouter();
  const { courseid } = router.query;

  const getQuestionList = async () => {
    result = await questionAPI.list();
    setQuestions(result.data);
  };

  useEffect(() => {
    getQuestionList();
  }, []);

  const Hashtag = (props) => {
    return (
      <div className="hashtag body-text">Lecture {props.lecture}</div>
    );
  };

  const QuestionElem = (props) => {
    return (
      <div>
        <Link href={`/course/${courseid}/question/${props.id}`}>
          <a style={{ textDecoration: 'none', color: 'black' }}>
            <div className="row mt-3 body-text ml-2 mr-2">
              <div className="col-1">{props.num}</div>
              <div className="col-8 row align-items-center">
                <Hashtag lecture={props.lecture} />
                {props.title}
              </div>
              <div className="col-3">{props.date}</div>
            </div>
          </a>
        </Link>
      </div>
    );
  };

  const rows = questions.map((question) => (
    <div>
      <QuestionElem
        num={question.num}
        title={question.title}
        date={question.date}
        lecture={question.lecture}
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
          My Questions
        </div>
        <div className="row mt-4 subtitle-text ml-2 mr-2">
          <div className="col-1">#</div>
          <div className="col-8 row align-items-center">Title</div>
          <div className="col-3">Date</div>
        </div>
        <hr />
        <div className="mt-2">{rows}</div>
        <a
          href={`/course/${courseid}/question/new`}
          type="button"
          className="mt-4 custom-btn float-right"
        >
          New Question
        </a>
      </div>
    </>
  );
};

export default Course;
