import React, { useEffect, useState } from 'react';
import Header from 'components/header.js';
import { Card } from 'react-bootstrap';
import SearchIcon from '@material-ui/icons/Search';

import * as courseAPI from 'api/course';

const MainPage = () => {
  // let courses = [{ code: 'CS350', name: 'intro', prof: 'hi' }];
  // let courses = [];
  const [courses, setCourses] = useState([]);
  let result;

  const CourseElem = (props) => {
    return (
      <Card className="w-100 mb-2">
        <Card.Body>
          <div className="container row">
            <div className="title-text mr-2">{props.code}</div>
            <div className="title-text-light">{props.name}</div>
          </div>
          <div className="mt-2 body-text">Prof. {props.prof}</div>
          <a
            href={`/course/${props.code}`}
            type="button"
            className="mt-4 custom-btn"
          >
            Enter
          </a>
        </Card.Body>
      </Card>
    );
  };

  const rows = courses.map((post) => (
    <>
      <CourseElem code={post.code} name={post.name} prof={post.prof} />
      <div className="divider" />
    </>
  ));

  const getCourseList = async () => {
    result = await courseAPI.list();
    setCourses(result.data);
  };

  useEffect(() => {
    getCourseList();
  }, []);

  return (
    <div
      style={{
        minHeight: '100vh',
        fontFamily: 'NanumSquare',
      }}
      className="d-flex flex-column"
    >
      <Header />
      <div className="container">
        <div className="mt-5 pt-5 mb-3 title-text">My Courses</div>
        <div className="p-1 bg-light rounded rounded-pill shadow-sm mb-4">
          <div className="input-group">
            <input
              type="search"
              placeholder="Find class by code or name"
              aria-describedby="button-addon1"
              className="body-text form-control border-0 bg-light"
            />
            <div className="input-group-append">
              <button
                id="button-addon1"
                type="submit"
                className="btn btn-link text-primary"
              >
                <SearchIcon></SearchIcon>
              </button>
            </div>
          </div>
        </div>
        {rows}
      </div>
    </div>
  );
};

export default MainPage;
