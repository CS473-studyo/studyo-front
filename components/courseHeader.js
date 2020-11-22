import React, { useState, useEffect } from 'react';
import styles from './courseHeader.module.scss';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import * as courseAPI from 'api/course';

const CourseHeader = ({ courseid }) => {
  const [course, setCourse] = useState({});

  useEffect(() => {
    if (courseid) {
      courseAPI.courseInfo(courseid).then((res) => {
        setCourse(res.data);
        console.log(res.data);
      });
    }
  }, [courseid]);

  return (
    <div className={styles['header-fill-img']}>
      <div className={`h-100 w-100 ${styles['header-overlay']}`}>
        <div className="container h-100">
          <div className="row h-100">
            <div className={`col ${styles['course-title']}`}>
              <a
                href="/main"
                className={`title-text ${styles['course-title']}`}
              >
                <ArrowBackIcon fontSize="large"></ArrowBackIcon>
                Main
              </a>
            </div>
            <h1
              className={`col-6 title-text text-center ${styles['course-title']}`}
            >
              {courseid} {course.name}
            </h1>
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
