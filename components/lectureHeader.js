import React, { useState, useEffect } from 'react';
import styles from './lectureHeader.module.scss';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import * as lectureAPI from 'api/lecture';
import Link from 'next/link';

const LectureHeader = ({ lectureid, courseid }) => {
  const [lecture, setLecture] = useState({});

  useEffect(() => {
    if (lectureid) {
      lectureAPI.lectureInfo(lectureid).then((res) => {
        setLecture(res.data);
      });
    }
  }, [lectureid]);

  return (
    <div className={styles['header-fill']}>
      <div className={`h-100 w-100 ${styles['header-overlay']}`}>
        <div className="container h-100">
          <div className="row h-100">
            <div className={`col ${styles['course-title']}`}>
              <Link href={`/course/${courseid}`}>
                <a className={`subtitle-text ${styles['course-title']}`}>
                  <ArrowBackIcon></ArrowBackIcon>
                  {courseid}
                </a>
              </Link>
            </div>
            <h1
              className={`col-6 title-text text-center ${styles['course-title']}`}
            >
              Lecture {lecture.number}
            </h1>
            <div class="col"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LectureHeader;
