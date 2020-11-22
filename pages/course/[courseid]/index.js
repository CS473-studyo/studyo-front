import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Card } from 'react-bootstrap';
import Link from 'next/link';
import Header from '../../../components/header';
import CourseHeader from '../../../components/courseHeader';
import * as courseAPI from 'api/course';

const Course = () => {
  const [lectures, setLectures] = useState([]);

  const router = useRouter();
  const { courseid } = router.query;

  // console.log(router.query)
  useEffect(() => {
    if (courseid) {
      courseAPI.courseLectures(courseid).then((res) => {
        setLectures(res.data);
        console.log(res.data);
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
            {props.keywords.map((keyword) => (
              <Hashtag keyword={keyword.word} />
            ))}
          </div>
          <div className="row">
            <a
              href={`/course/${courseid}/note/${props.id}`}
              type="button"
              className="mt-4 custom-btn mr-3"
            >
              Lecture Note
            </a>
            <a
              href={`/course/${courseid}/quiz/${props.id}`}
              type="button"
              className="mt-4 custom-btn"
            >
              Review Quiz
            </a>
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
      <Header />
      <CourseHeader courseid={courseid} />
      <div className="container mt-2">{rows}</div>
    </>
  );
};

export default Course;
