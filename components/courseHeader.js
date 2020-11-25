import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import styles from './courseHeader.module.scss';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
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
      <div className={`h-100 w-100 ${styles['header-overlay']}`}>
        <div className="container">
          <div className="row">
            <div className={`col ${styles['course-title']}`}></div>
            <div className="col-6">
              <h1
                className={`title-text text-center ${styles['course-title']}`}
              >
                <Link href={`/course/${courseid}`}>
                  <a style={{ textDecoration: 'none', color: 'white' }}>
                    {courseid} {course.name}
                  </a>
                </Link>
              </h1>
            </div>
            <div className="col">
              <div
                className={`body-text text-right ${styles['course-detail']}`}
              >
                Prof. {course.professor} <br /> {course.userNumber}{' '}
                students joined
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseHeader;
