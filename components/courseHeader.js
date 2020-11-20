import React from 'react';
import styles from './courseHeader.module.scss';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

const CourseHeader = ({ courseid }) => {
  let courseName = 'Introduction to Software Engineering'; // Todo: load course naem
  let studentNum = 21; //Todo: load student number
  let profName = 'Doo-Hwan Bae'; //Todo: load prof name

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
              {courseid} {courseName}
            </h1>
            <div className="col">
              <div
                className={`body-text text-right ${styles['course-detail']}`}
              >
                Prof.{profName} <br /> {studentNum} students joined
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseHeader;
