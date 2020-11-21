import { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

import Header from 'components/header';
import CourseHeader from 'components/courseHeader';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

const QuestionDetail = () => {
  const router = useRouter();
  const { courseid, questionid } = router.query;

  const [question, setQuestion] = useState({
    num: '1',
    title: 'hello',
    date: 'Aug. 8',
    lecture: '4',
    id: '123',
  }); //Todo: questionid 이용해서 question 가져오기

  return (
    <>
      <Header />
      <CourseHeader courseid={courseid} />
      <div className="container">
        <div className="title-text mt-5" style={{ color: '#234382' }}>
          <Link href={`/course/${courseid}/questionlist`}>
            <a style={{ textDecoration: 'none', color: '#234382' }}>
              <ArrowBackIcon
                fontSize="large"
                classNmae="mr-1"
              ></ArrowBackIcon>
              Questions #{question.num}
            </a>
          </Link>
        </div>
        <div className="row mt-4 subtitle-text ml-2 mr-2">
          <div className="col-1">#</div>
          <div className="col-8 row align-items-center">Title</div>
          <div className="col-3">Date</div>
        </div>
        <hr />
        {/* <div className="mt-2">{rows}</div> */}
      </div>
    </>
  );
};

export default QuestionDetail;
