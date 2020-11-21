import React from 'react';
import styles from './lectureHeader.module.scss';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

const LectureHeader = ({ lectureid, courseid }) => {
  return (
    <div className={styles['header-fill']}>
      <div className={`h-100 w-100 ${styles['header-overlay']}`}>
        <div className="container h-100">
          <div className="row h-100">
            <div className={`col ${styles['course-title']}`}>
              <a
                href={`/course/${courseid}`}
                className={`subtitle-text ${styles['course-title']}`}
              >
                <ArrowBackIcon></ArrowBackIcon>
                {courseid}
              </a>
            </div>
            <h1
              className={`col-6 title-text text-center ${styles['course-title']}`}
            >
              Lecture {lectureid}
            </h1>
            <div class="col"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LectureHeader;
