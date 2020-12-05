import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import styles from './courseHeader.module.scss';
import { Row, Col } from 'react-bootstrap';
import * as courseAPI from 'api/course';

const CourseHeader = ({ courseid }) => {
  const [course, setCourse] = useState({});

  useEffect(() => {
    if (courseid) {
      courseAPI.courseInfo(courseid).then(({ data }) => {
        setCourse(data);
      });
    }
  }, [courseid]);

  return (
    <div className={styles['header-fill-img']}>
      <div
        className={`d-flex align-items-stretch h-100 w-100 ${styles['header-overlay']}`}
      >
        <div className="container d-flex justify-content-between align-items-center">
          <div className="d-flex flex-column">
            <h1
              style={{ color: '#ffffff' }}
              className={`title-text text-center`}
            >
              {courseid} {course.name}
            </h1>
            <div style={{ color: '#ffffff' }}>
              Prof. {course.professor}
            </div>
            <div style={{ color: '#ffffff' }}>
              {course.userNumber} students joined
            </div>
          </div>
          <Link href={`/course/${courseid}/question`}>
            <a className="custom-btn-transparent">My Questions</a>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CourseHeader;
