import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Card, Badge } from 'react-bootstrap';
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
  const { courseId } = router.query;

  // console.log(router.query)
  useEffect(() => {
    if (courseId) {
      courseAPI.courseLectures(courseId).then(({ data }) => {
        setLectures(data);
      });
    }
  }, [courseId]);

  const Hashtag = (props) => {
    return (
      <Badge
        variant="secondary"
        style={{ paddingTop: '5px', marginRight: '4px' }}
      >
        #{props.keyword}
      </Badge>
    );
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
            <Link href={`/course/${courseId}/lecture/${props.id}/keyword`}>
              <a
                className="ml-2 align-self-center"
                style={{ fontWeight: '600' }}
              >
                Vote keywords here
              </a>
            </Link>
          </div>
          <div className="row">
            <Link href={`/course/${courseId}/lecture/${props.id}`}>
              <a className="mt-4 custom-btn mr-3">Lecture Note</a>
            </Link>
            <Link href={`/course/${courseId}/lecture/${props.id}/quiz`}>
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
    <div className="d-flex flex-column">
      <Header name={props.name} badge={props.badge} />
      <CourseHeader courseId={courseId} />
      <div className="container mt-2 flex-grow-1">{rows}</div>
      <Footer />
    </div>
  );
};

export default Course;
