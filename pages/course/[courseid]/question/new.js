import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Header from 'components/header';
import CourseHeader from 'components/courseHeader';
import * as courseAPI from 'api/course';
import * as questionAPI from 'api/question';

import getServerSideProps from 'utils/checkAuth';
export { getServerSideProps };

const NewQuestion = (props) => {
  const router = useRouter();
  const { courseid } = router.query;

  const [newTitle, setNewTitle] = useState();
  const onInputTitle = ({ target: { value } }) => {
    setNewTitle(value);
  };
  const [newContent, setNewContent] = useState();
  const onInputContent = ({ target: { value } }) => setNewContent(value);
  const [newLecture, setNewLecture] = useState();
  const onInputLecture = ({ target: { value } }) => setNewLecture(value);

  const [lectures, setLectures] = useState([]);
  useEffect(() => {
    if (courseid) {
      courseAPI.courseLectures(courseid).then(({ data }) => {
        setLectures(data);
        if (data.length > 0) {
          setNewLecture(data[0].id);
        }
      });
    }
  }, [courseid]);

  const addQuestion = () => {
    if (
      newTitle &&
      newContent &&
      newLecture &&
      !/^\s+$/.test(newTitle) &&
      !/^\s+$/.test(newContent)
    ) {
      questionAPI
        .post(newLecture, newTitle, newContent)
        .then((res) => router.reload())
        .then(router.push(`/course/${courseid}/question`)); //Todo: change to next
    }
  };

  const onCancel = () => {
    router.push(`/course/${courseid}/question`);
  };

  const lectureOptions = lectures.map((lecture) => {
    if (lecture) {
      let keywordsString = '';
      lecture.Keywords.sort((a, b) => b.votes - a.votes)
        .slice(0, 3)
        .map((keyword, index) => {
          if (index === 0) keywordsString += keyword.word;
          else keywordsString += ', ' + keyword.word;
        });
      return (
        <>
          <option value={lecture.id}>
            Lecture {lecture.number} - {keywordsString}
          </option>
        </>
      );
    }
  });

  return (
    <>
      <Header name={props.name} />
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
              onChange={onInputTitle}
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
              onChange={onInputContent}
            />
            <label class="subtitle-text mt-2" for="exampleInputEmail1">
              Lecture
            </label>
            <select class="form-control" onChange={onInputLecture}>
              {lectureOptions}
            </select>
            <small id="emailHelp" class="form-text text-muted">
              Your question will be shared to your classmates in the review
              quiz.
            </small>
          </div>
        </form>
        <hr />
        <button
          type="button"
          className="mt-4 ml-3 custom-btn float-right"
          onClick={() => addQuestion()}
        >
          Submit
        </button>
        <button
          onClick={onCancel}
          type="button"
          className="mt-4 custom-btn-secondary float-right"
        >
          Cancel
        </button>
      </div>
    </>
  );
};

export default NewQuestion;
