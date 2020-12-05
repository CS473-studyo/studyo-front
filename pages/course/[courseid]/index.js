import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Card } from 'react-bootstrap';
import Link from 'next/link';
import Header from 'components/header';
import CourseHeader from 'components/courseHeader';
import Footer from 'components/footer';
import * as courseAPI from 'api/course';

import getServerSideProps from 'utils/checkAuth';
export { getServerSideProps };

const Course = (props) => {
  const [lectures, setLectures] = useState([]);

  const router = useRouter();
  const { courseid } = router.query;

  // console.log(router.query)
  useEffect(() => {
    if (courseid) {
      courseAPI.courseLectures(courseid).then(({ data }) => {
        setLectures(data);
      });
    }
  }, [courseid]);

  const Hashtag = (props) => {
    return <div className="hashtag body-text">#{props.keyword}</div>;
  };

  const LectureElem = (props) => {
    const date = new Date(props.date).toLocaleDateString('en-US');
    return (
      <Card className="w-100 mb-2 border-0">
        <Card.Body>
          <div className="row">
            <div className="title-text mr-2">Lecture {props.number}</div>
            <div className="body-text-light mt-2">{date}</div>
          </div>
          <div className="mt-2 body-text row">
            {props.keywords
              .sort((a, b) => b.votes - a.votes)
              .slice(0, 3)
              .map((keyword) => (
                <Hashtag keyword={keyword.word} />
              ))}
            <Link href={`/course/${courseid}/keyword/${props.id}`}>
              <a
                className="ml-2 align-self-center"
                style={{ fontWeight: '600' }}
              >
                Vote keywords here
              </a>
            </Link>
          </div>
          <div className="row">
            <Link href={`/course/${courseid}/note/${props.id}`}>
              <a className="mt-4 custom-btn mr-3">Lecture Note</a>
            </Link>
            <Link href={`/course/${courseid}/quiz/${props.id}`}>
              <a className="mt-4 custom-btn">Review</a>
            </Link>
          </div>
        </Card.Body>
      </Card>
    );
  };

  const rows = lectures.map((lecture) => (
    <>
      <LectureElem
        number={lecture.number}
        keywords={lecture.Keywords || []}
        date={lecture.date}
        id={lecture.id}
      />
      <div className="divider" />
      <hr />
    </>
  ));

  return (
    <>
      <Header name={props.name} />
      <CourseHeader courseid={courseid} />
      <div className="container mt-2">{rows}</div>
      {/* <Footer courseid={courseid} /> */}
    </>
  );
};

export default Course;
