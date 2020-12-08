import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import styles from './courseHeader.module.scss';
import { Row, Col } from 'react-bootstrap';
import * as courseAPI from 'api/course';

const CourseHeader = ({ courseId }) => {
  const [course, setCourse] = useState({});

  useEffect(() => {
    if (courseId) {
      courseAPI.courseInfo(courseId).then(({ data }) => {
        setCourse(data);
      });
    }
  }, [courseId]);

  return (
    <div className={styles['header-fill-img']}>
      <div className={styles['header-overlay']}>
        <div
          className={`container d-flex flex-lg-row flex-column justify-content-between align-items-lg-center align-items-start`}
        >
          <div className="d-flex flex-column py-4">
            <h1 style={{ color: '#ffffff' }} className={`title-text`}>
              {courseId} {course.name}
            </h1>
            <div style={{ color: '#ffffff' }}>
              Prof. {course.professor}
            </div>
            <div style={{ color: '#ffffff' }}>
              {course.userNumber} students joined
            </div>
          </div>
          <Link href={`/course/${courseId}/question`}>
            <a className="custom-btn-transparent mb-3 mb-lg-0">
              My Questions
            </a>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CourseHeader;
