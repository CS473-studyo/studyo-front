import { useRouter } from 'next/router';
import { Card } from 'react-bootstrap';
import Link from 'next/link';
import Header from '../../../components/header';
import CourseHeader from '../../../components/courseHeader';
import { Divider } from '@material-ui/core';

const Course = () => {
  let lectures = [
    {
      num: '1',
      date: 'Aug. 8',
      keywords: new Array('zero', 'one', 'tow'),
    },
    {
      num: '2',
      date: 'Aug. 10',
      keywords: new Array('zero', 'one', 'tow'),
    },
  ];

  const router = useRouter();
  const { courseid } = router.query;

  const Hashtag = (props) => {
    return <div className="hashtag body-text">#{props.keyword}</div>;
  };

  const LectureElem = (props) => {
    return (
      <Card className="w-100 mb-2 border-0">
        <Card.Body>
          <div className="row">
            <div className="title-text mr-2">Lecture{props.num}</div>
            <div className="body-text-light mt-2">{props.date}</div>
          </div>
          <div className="mt-2 body-text row">
            <Hashtag keyword={props.keywords[0]} />
            <Hashtag keyword={props.keywords[1]} />
            <Hashtag keyword={props.keywords[2]} />
          </div>
          <div className="row">
            <a
              href={`/course/${courseid}/${props.num}/note`}
              type="button"
              className="mt-4 custom-btn mr-3"
            >
              Lecture Note
            </a>
            <a
              onclick={`/course/${courseid}/${props.num}/review`}
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
        num={lecture.num}
        keywords={lecture.keywords}
        date={lecture.date}
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
