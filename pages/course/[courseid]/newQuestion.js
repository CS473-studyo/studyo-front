import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Header from '../../../components/header';
import CourseHeader from '../../../components/courseHeader';
import * as courseAPI from 'api/course';

const Course = () => {
  const router = useRouter();
  const { courseid } = router.query;

  const [lectures, setLectures] = useState([]);

  useEffect(() => {
    if (courseid) {
      courseAPI.courseLectures(courseid).then((res) => {
        setLectures(res.data);
        console.log(res.data);
      });
    }
  }, [courseid]);

  const lectureOptions = lectures.map((lecture) => (
    <>
      <option>Lecture {lecture.number}</option>
    </>
  ));

  return (
    <>
      <Header />
      <CourseHeader courseid={courseid} />
      <div className="container">
        <div className="title-text mt-5 mb-3" style={{ color: '#234382' }}>
          New Questions
        </div>
        <form>
          <div class="form-group">
            <label class="subtitle-text" for="exampleInputEmail1">
              Title
            </label>
            <input
              type="text"
              class="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              placeholder="Title"
            />
            <label class="subtitle-text mt-2" for="exampleInputEmail1">
              Content
            </label>
            <textarea
              type="text"
              class="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              placeholder="Write your question here!"
            />
            <label class="subtitle-text mt-2" for="exampleInputEmail1">
              Lecture
            </label>
            <select class="form-control">{lectureOptions}</select>
            <small id="emailHelp" class="form-text text-muted">
              Your question will be shared to your classmates in the review
              quiz.
            </small>
          </div>
        </form>
        <hr />
        <button
          href={`/course/${courseid}/questionlist`}
          type="button"
          className="mt-4 ml-3 custom-btn float-right"
        >
          Submit
        </button>
        <button
          href={`/course/${courseid}/questionlist`}
          type="button"
          className="mt-4 custom-btn-secondary float-right"
        >
          Cancel
        </button>
      </div>
    </>
  );
};

export default Course;
