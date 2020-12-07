import React, { useEffect, useState } from 'react';
import Header from 'components/header';
import Footer from 'components/footer';
import { Card, Modal } from 'react-bootstrap';
import SearchIcon from '@material-ui/icons/Search';
import Link from 'next/link';
import { useRouter } from 'next/router';

import * as courseAPI from 'api/course';
import * as userAPI from 'api/user';

import getServerSideProps from 'utils/checkAuth';
// import img1 from '../public/UserGuide1.png';

import ImageGallery from 'react-image-gallery';

export { getServerSideProps };

const MainPage = (props) => {
  const router = useRouter();
  const [courses, setCourses] = useState([]);
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [newCourses, setNewCourses] = useState([]);
  const [filteredNewCourses, setFilteredNewCourses] = useState([]);
  const [search, setSearch] = useState('');
  const [newSearch, setNewSearch] = useState('');

  const [tutorialShow, setTutorialShow] = useState(false);
  const [tutorialPage, setTutorialPage] = useState(1);

  const [showNew, setShowNew] = useState(false);

  const handleSearch = () => {
    setFilteredCourses(
      courses.filter(
        (course) =>
          course.code.toLowerCase().includes(search) ||
          course.name.toLowerCase().includes(search)
      )
    );
  };

  const CourseElem = (props) => {
    return (
      <Card className="w-100 mb-2">
        <Card.Body>
          <div className="container row">
            <div className="title-text mr-2">{props.code}</div>
            <div className="title-text-light">{props.name}</div>
          </div>
          <div className="my-3 body-text">Prof. {props.professor}</div>
          <Link href={`/course/${props.code}`}>
            <a className="custom-btn">Enter</a>
          </Link>
        </Card.Body>
      </Card>
    );
  };

  const rows = filteredCourses.map((post) => (
    <>
      <CourseElem
        code={post.code}
        name={post.name}
        professor={post.professor}
      />
      <div className="divider" />
    </>
  ));

  const getCourseList = async () => {
    courseAPI.userCourses().then(({ data }) => {
      data.sort((a, b) => (a.code < b.code ? -1 : 1));
      setCourses(data);
      setFilteredCourses(data);
    });
    courseAPI.newCourses().then(({ data }) => {
      data.sort((a, b) => (a.code < b.code ? -1 : 1));
      setNewCourses(data);
      setFilteredNewCourses(data);
    });
  };

  useEffect(() => {
    getCourseList();
    userAPI.getTutorial().then(({ data }) => {
      if (!data) setTutorialShow(true);
    });
  }, []);

  useEffect(() => {
    setFilteredNewCourses(
      newCourses.filter(
        (course) =>
          course.code.toLowerCase().includes(newSearch) ||
          course.name.toLowerCase().includes(newSearch)
      )
    );
  }, [newSearch]);

  const handleCheckTutorial = () => {
    userAPI.checkTutorial().then(() => {
      router.reload();
    });
  };

  const handleCloseNew = () => setShowNew(false);
  const handleOpenNew = () => setShowNew(true);

  const join = (id) => {
    courseAPI.join(id).then((_) => {
      router.reload();
    });
  };

  const images = [
    {
      original:
        'https://studyo-files.s3.ap-northeast-2.amazonaws.com/UserGuide1.png',
    },
    {
      original:
        'https://studyo-files.s3.ap-northeast-2.amazonaws.com/UserGuide2.png',
    },
    {
      original:
        'https://studyo-files.s3.ap-northeast-2.amazonaws.com/UserGuide3.png',
    },
    {
      original:
        'https://studyo-files.s3.ap-northeast-2.amazonaws.com/UserGuide4.png',
    },
  ];

  return (
    <div
      style={{
        minHeight: '100vh',
      }}
      className="d-flex flex-column"
    >
      {/* <Modal show={showNew} onHide={handleCloseNew}>
        <Modal.Header>
          <Modal.Title>Add new course</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <input
            type="search"
            placeholder="Find class by code or name"
            aria-describedby="button-addon1"
            className="body-text form-control border-0 bg-light"
            onChange={(value) => setNewSearch(value.target.value)}
          />
          {filteredNewCourses.map((course) => (
            <div
              className="d-flex justify-content-between align-items-center"
              style={{ padding: '10px 10px' }}
            >
              <div className="subtitle-text">{course.code}</div>
              <button
                className="custom-btn"
                onClick={() => join(course.id)}
              >
                Add course
              </button>
            </div>
          ))}
        </Modal.Body>
      </Modal> */}
      <Modal
        size="lg"
        show={tutorialShow}
        onHide={() => setTutorialShow(false)}
      >
        <Modal.Header>
          <Modal.Title className="title-text">
            Welcome to Studyo!
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ImageGallery
            showThumbnails={false}
            showFullscreenButton={false}
            showPlayButton={false}
            items={images}
          />
        </Modal.Body>
        <Modal.Footer>
          <button
            className="custom-btn-secondary"
            onClick={handleCheckTutorial}
          >
            Do not show this again
          </button>
          <button
            className="custom-btn"
            onClick={() => setTutorialShow(false)}
          >
            Close
          </button>
        </Modal.Footer>
      </Modal>
      <Header name={props.name} badge={props.badge} />
      <div className="container mb-2 flex-grow-1">
        <div className="d-flex justify-content-between">
          <div className="mt-5 mb-3 title-text">My Courses</div>
          {/* <button
            className="custom-btn"
            style={{
              height: 'fit-content',
              marginTop: 'auto',
              marginBottom: '15px',
            }}
            onClick={handleOpenNew}
          >
            Add new course
          </button> */}
        </div>
        <div className="p-1 bg-light shadow-sm mb-4">
          <div className="input-group">
            <input
              type="search"
              placeholder="Find class by code or name"
              aria-describedby="button-addon1"
              className="body-text form-control border-0 bg-light"
              onChange={(value) => setSearch(value.target.value)}
            />
            <div className="input-group-append">
              <button
                id="button-addon1"
                className="btn btn-link text-primary"
                onClick={handleSearch}
              >
                <SearchIcon></SearchIcon>
              </button>
            </div>
          </div>
        </div>
        {rows}
      </div>
      <Footer />
    </div>
  );
};

export default MainPage;
